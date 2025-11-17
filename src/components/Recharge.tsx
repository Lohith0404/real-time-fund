import { useState } from "react";
import { ArrowLeft, Smartphone, Wifi, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Recharge = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState<"type" | "details" | "confirm">("type");
  const [rechargeType, setRechargeType] = useState<string>("");
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const types = [
    { icon: Smartphone, label: "Mobile Prepaid", color: "bg-green-500", value: "mobile" },
    { icon: Tv, label: "DTH Recharge", color: "bg-purple-500", value: "dth" },
    { icon: Wifi, label: "Data Card", color: "bg-blue-500", value: "datacard" },
  ];

  const presets = [199, 299, 499, 699];

  const handleRecharge = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please login to make recharge",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("transactions").insert({
        user_id: user.id,
        type: "recharge",
        status: "completed",
        amount: parseFloat(amount),
        description: `${rechargeType} recharge`,
        category: rechargeType,
        recipient_name: number,
      });

      if (error) throw error;

      // Award cashback (2% of recharge amount)
      const cashbackAmount = parseFloat(amount) * 0.02;
      await supabase.rpc("add_cashback", {
        p_user_id: user.id,
        p_amount: cashbackAmount,
        p_points: Math.floor(parseFloat(amount) / 10)
      });

      toast({
        title: "Recharge Successful!",
        description: `₹${amount} recharged. You earned ₹${cashbackAmount.toFixed(2)} cashback!`,
      });

      setStep("type");
      setNumber("");
      setAmount("");
      setRechargeType("");
    } catch (error) {
      console.error("Error making recharge:", error);
      toast({
        title: "Recharge Failed",
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
            onClick={() => (step === "type" ? onBack() : setStep("type"))}
            className="text-primary-foreground hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Recharge</h1>
        </div>
      </div>

      <div className="px-6 py-8">
        {step === "type" && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground mb-6">Select Recharge Type</h2>
            {types.map((type, index) => (
              <Card
                key={index}
                className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => {
                  setRechargeType(type.value);
                  setStep("details");
                }}
              >
                <div className="flex items-center gap-4">
                  <div className={`${type.color} w-12 h-12 rounded-full flex items-center justify-center text-white`}>
                    <type.icon className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-foreground">{type.label}</span>
                </div>
              </Card>
            ))}
          </div>
        )}

        {step === "details" && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-card to-primary/5">
              <h3 className="font-bold text-lg text-foreground mb-4 capitalize">{rechargeType} Recharge</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {rechargeType === "mobile" ? "Mobile Number" : "Account Number"}
                  </label>
                  <Input
                    type="tel"
                    placeholder={rechargeType === "mobile" ? "Enter 10-digit mobile number" : "Enter account number"}
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    maxLength={10}
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
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-xl font-bold pl-12"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-3">Popular Plans</p>
                  <div className="grid grid-cols-4 gap-3">
                    {presets.map((preset) => (
                      <Button
                        key={preset}
                        variant="outline"
                        onClick={() => setAmount(preset.toString())}
                        className="h-12"
                      >
                        ₹{preset}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Button
              className="w-full h-12 text-lg bg-gradient-primary"
              onClick={() => setStep("confirm")}
              disabled={!number || !amount || number.length < 10}
            >
              Continue
            </Button>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-card to-primary/5">
              <h3 className="text-center text-sm text-muted-foreground mb-2">Recharging</h3>
              <h2 className="text-center text-lg font-semibold text-foreground mb-6">
                {number}
              </h2>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary">₹{amount}</div>
              </div>

              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Recharge Type</span>
                  <span className="font-medium text-foreground capitalize">{rechargeType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cashback</span>
                  <span className="font-medium text-success">₹{(parseFloat(amount) * 0.02).toFixed(2)}</span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button className="w-full h-12 text-lg bg-gradient-primary" onClick={handleRecharge}>
                Recharge Now
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

export default Recharge;
