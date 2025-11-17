import { useState } from "react";
import { Eye, EyeOff, Smartphone, Zap, CreditCard, TrendingUp, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);

  const quickActions = [
    { icon: Smartphone, label: "To Mobile", color: "bg-primary" },
    { icon: CreditCard, label: "To Bank", color: "bg-accent" },
    { icon: Zap, label: "Recharge", color: "bg-success" },
    { icon: TrendingUp, label: "Invest", color: "bg-primary-dark" },
  ];

  const recentTransactions = [
    { id: 1, name: "John Doe", type: "sent", amount: 500, time: "2 hours ago", avatar: "JD" },
    { id: 2, name: "Sarah Smith", type: "received", amount: 1200, time: "5 hours ago", avatar: "SS" },
    { id: 3, name: "Mike Johnson", type: "sent", amount: 750, time: "Yesterday", avatar: "MJ" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground px-6 pt-8 pb-32 rounded-b-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Hello, User!</h1>
            <p className="text-primary-foreground/80 text-sm">Welcome back</p>
          </div>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </Button>
        </div>

        {/* Balance Card */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-primary-foreground shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary-foreground/80 text-sm">Total Balance</span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-primary-foreground/80 hover:text-primary-foreground transition"
              >
                {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-4xl font-bold mb-4">
              {showBalance ? "₹12,450.00" : "₹••••••"}
            </div>
            <div className="flex items-center gap-4">
              <Button className="flex-1 bg-white text-primary hover:bg-white/90">
                Add Money
              </Button>
              <Button variant="outline" className="flex-1 border-white/20 text-primary-foreground hover:bg-white/10">
                Withdraw
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-20 mb-8">
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-2 p-4 bg-card rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <div className={`${action.color} w-12 h-12 rounded-full flex items-center justify-center text-white`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-foreground text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Recent Transactions</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            See All
          </Button>
        </div>

        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <Card key={transaction.id} className="hover:shadow-md transition-shadow">
              <div className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                  {transaction.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{transaction.name}</h3>
                  <p className="text-sm text-muted-foreground">{transaction.time}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      transaction.type === "received" ? "text-success" : "text-foreground"
                    }`}
                  >
                    {transaction.type === "received" ? "+" : "-"}₹{transaction.amount}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    {transaction.type === "received" ? (
                      <ArrowDownLeft className="w-4 h-4 text-success" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
