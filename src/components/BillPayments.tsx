import { useState } from "react";
import { ArrowLeft, Zap, Droplet, Wifi, Smartphone, Film, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const BillPayments = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState<"categories" | "details" | "confirm">("categories");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [billNumber, setBillNumber] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const categories = [
    { icon: Zap, label: "Electricity", color: "bg-yellow-500", value: "electricity" },
    { icon: Droplet, label: "Water", color: "bg-blue-500", value: "water" },
    { icon: Wifi, label: "Broadband", color: "bg-purple-500", value: "broadband" },
    { icon: Smartphone, label: "Postpaid", color: "bg-green-500", value: "postpaid" },
    { icon: Film, label: "DTH", color: "bg-red-500", value: "dth" },
    { icon: Shield, label: "Insurance", color: "bg-indigo-500", value: "insurance" },
  ];

  const handlePayBill = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please login to make payments",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("transactions").insert({
        user_id: user.id,
        type: "bill_payment",
        status: "completed",
        amount: parseFloat(amount),
        description: `${selectedCategory} bill payment`,
        category: selectedCategory,
        recipient_name: billNumber,
      });

      if (error) throw error;

      toast({
        title: "Bill Payment Successful!",
        description: `₹${amount} paid for ${selectedCategory}`,
      });

      setStep("categories");
      setBillNumber("");
      setAmount("");
      setSelectedCategory("");
    } catch (error) {
      console.error("Error making payment:", error);
      toast({
        title: "Payment Failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="bg-gradient-primary text-primary-foreground px-6 py-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => (step === "categories" ? onBack() : setStep("categories"))}
            className="text-primary-foreground hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Bill Payments</h1>
        </div>
      </div>

      <div className="px-6 py-8">
        {step === "categories" && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground mb-6">Select Bill Type</h2>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category, index) => (
                <Card
                  key={index}
                  className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                  onClick={() => {
                    setSelectedCategory(category.value);
                    setStep("details");
                  }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`${category.color} w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg`}>
                      <category.icon className="w-7 h-7" />
                    </div>
                    <span className="font-semibold text-foreground text-center">{category.label}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === "details" && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-card to-primary/5">
              <h3 className="font-bold text-lg text-foreground mb-4 capitalize">{selectedCategory} Bill</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Bill Number / Consumer ID
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter bill number"
                    value={billNumber}
                    onChange={(e) => setBillNumber(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-foreground">
                      ₹
                    </span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-xl font-bold pl-12"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Button
              className="w-full h-12 text-lg bg-gradient-primary"
              onClick={() => setStep("confirm")}
              disabled={!billNumber || !amount}
            >
              Continue to Pay
            </Button>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-card to-primary/5">
              <h3 className="text-center text-sm text-muted-foreground mb-2">Paying for</h3>
              <h2 className="text-center text-lg font-semibold text-foreground capitalize mb-6">
                {selectedCategory} Bill
              </h2>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary">₹{amount}</div>
              </div>

              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bill Number</span>
                  <span className="font-medium text-foreground">{billNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Convenience Fee</span>
                  <span className="font-medium text-success">FREE</span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button className="w-full h-12 text-lg bg-gradient-primary" onClick={handlePayBill}>
                Pay Now
              </Button>
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={() => setStep("details")}
              >
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillPayments;
