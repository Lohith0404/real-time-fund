import { useEffect, useState } from "react";
import { Gift, TrendingUp, History, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Rewards = () => {
  const [rewards, setRewards] = useState({ points: 0, cashback_amount: 0 });
  const [rewardHistory, setRewardHistory] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchRewards();
    fetchRewardHistory();
  }, []);

  const fetchRewards = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("rewards")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      if (data) setRewards(data);
    } catch (error) {
      console.error("Error fetching rewards:", error);
    }
  };

  const fetchRewardHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("reward_transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setRewardHistory(data || []);
    } catch (error) {
      console.error("Error fetching reward history:", error);
    }
  };

  const offers = [
    { title: "5% Cashback", desc: "On all UPI payments", minAmount: 500 },
    { title: "Flat ₹50 OFF", desc: "On bill payments above ₹1000", minAmount: 1000 },
    { title: "10x Reward Points", desc: "On mobile recharges", minAmount: 299 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="bg-gradient-primary text-primary-foreground px-6 py-12 rounded-b-3xl">
        <h1 className="text-2xl font-bold mb-2">Rewards & Offers</h1>
        <p className="text-primary-foreground/80">Earn rewards on every transaction</p>
      </div>

      {/* Reward Cards */}
      <div className="px-6 -mt-10 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-6 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground shadow-lg">
            <Award className="w-8 h-8 mb-3" />
            <p className="text-sm opacity-90 mb-1">Reward Points</p>
            <p className="text-3xl font-bold">{rewards.points}</p>
          </Card>

          <Card className="p-6 bg-gradient-success text-white shadow-lg">
            <Gift className="w-8 h-8 mb-3" />
            <p className="text-sm opacity-90 mb-1">Cashback</p>
            <p className="text-3xl font-bold">₹{rewards.cashback_amount.toFixed(2)}</p>
          </Card>
        </div>
      </div>

      {/* Active Offers */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Active Offers
          </h2>
        </div>

        <div className="space-y-3">
          {offers.map((offer, index) => (
            <Card key={index} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">{offer.title}</h3>
                  <p className="text-sm text-muted-foreground">{offer.desc}</p>
                  <p className="text-xs text-primary mt-2">Min. transaction: ₹{offer.minAmount}</p>
                </div>
                <Button size="sm" variant="outline" className="ml-4">
                  Claim
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Reward History */}
      <div className="px-6 pb-20">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-primary" />
          Reward History
        </h2>

        <div className="space-y-3">
          {rewardHistory.length > 0 ? (
            rewardHistory.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{item.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">+₹{item.cashback_amount}</p>
                    <p className="text-xs text-muted-foreground">{item.points} pts</p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <Gift className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">No rewards yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Start making transactions to earn rewards!
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
