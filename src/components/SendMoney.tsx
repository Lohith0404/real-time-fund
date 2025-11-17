import { useState } from "react";
import { ArrowLeft, User, Smartphone, QrCode, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const SendMoney = () => {
  const [step, setStep] = useState<"select" | "enter" | "confirm" | "success">("select");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const methods = [
    { icon: User, label: "To Contact", value: "contact" },
    { icon: Smartphone, label: "Phone Number", value: "phone" },
    { icon: QrCode, label: "Scan QR", value: "qr" },
  ];

  const handleContinue = () => {
    if (step === "enter" && recipient && amount) {
      setStep("confirm");
    }
  };

  const handleSend = () => {
    setStep("success");
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: `₹${amount} sent to ${recipient}`,
      });
      setStep("select");
      setRecipient("");
      setAmount("");
    }, 2000);
  };

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-success/10 to-background">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-gradient-success flex items-center justify-center mx-auto mb-6 animate-scale">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground mb-4">₹{amount} sent to {recipient}</p>
          <div className="text-sm text-muted-foreground">Redirecting...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground px-6 py-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => step === "select" ? null : setStep(step === "confirm" ? "enter" : "select")}
            className="text-primary-foreground hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Send Money</h1>
        </div>
      </div>

      <div className="px-6 py-8">
        {step === "select" && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground mb-6">Choose a method</h2>
            {methods.map((method, index) => (
              <Card
                key={index}
                className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => setStep("enter")}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white">
                    <method.icon className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-foreground">{method.label}</span>
                </div>
              </Card>
            ))}
          </div>
        )}

        {step === "enter" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Recipient Phone Number / UPI ID
              </label>
              <Input
                type="text"
                placeholder="Enter phone or UPI ID"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="text-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-foreground">
                  ₹
                </span>
                <Input
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-2xl font-bold pl-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4">
              {[500, 1000, 2000].map((preset) => (
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

            <Button
              className="w-full h-12 text-lg bg-gradient-primary"
              onClick={handleContinue}
              disabled={!recipient || !amount}
            >
              Continue
            </Button>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-card to-primary/5">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-2">Sending to</p>
                <p className="text-lg font-semibold text-foreground mb-4">{recipient}</p>
                <div className="text-4xl font-bold text-primary">₹{amount}</div>
              </div>

              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-medium text-foreground">UPI</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Transaction Fee</span>
                  <span className="font-medium text-success">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="font-bold text-foreground">₹{amount}</span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button className="w-full h-12 text-lg bg-gradient-primary" onClick={handleSend}>
                Confirm & Send
              </Button>
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={() => setStep("enter")}
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

export default SendMoney;
