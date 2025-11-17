import { useState } from "react";
import { Filter, Download, Search, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const transactions = [
    { id: 1, name: "John Doe", type: "sent", amount: 500, date: "Today, 2:30 PM", status: "completed", avatar: "JD" },
    { id: 2, name: "Sarah Smith", type: "received", amount: 1200, date: "Today, 11:15 AM", status: "completed", avatar: "SS" },
    { id: 3, name: "Electric Bill", type: "sent", amount: 2400, date: "Yesterday, 6:45 PM", status: "completed", avatar: "EB" },
    { id: 4, name: "Mike Johnson", type: "sent", amount: 750, date: "Yesterday, 3:20 PM", status: "completed", avatar: "MJ" },
    { id: 5, name: "Alice Brown", type: "received", amount: 3000, date: "Dec 15, 2024", status: "completed", avatar: "AB" },
    { id: 6, name: "Mobile Recharge", type: "sent", amount: 399, date: "Dec 15, 2024", status: "completed", avatar: "MR" },
    { id: 7, name: "Robert Wilson", type: "sent", amount: 1500, date: "Dec 14, 2024", status: "completed", avatar: "RW" },
    { id: 8, name: "Emma Davis", type: "received", amount: 850, date: "Dec 14, 2024", status: "completed", avatar: "ED" },
  ];

  const filteredTransactions = transactions.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground px-6 py-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/60" />
          <Input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-white/20"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mt-4">
          <Button variant="outline" size="sm" className="border-white/20 text-primary-foreground hover:bg-white/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="border-white/20 text-primary-foreground hover:bg-white/10">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="px-6 py-6 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <div className="flex items-center gap-2 mb-1">
              <ArrowDownLeft className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">Received</span>
            </div>
            <p className="text-2xl font-bold text-success">₹5,050</p>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <ArrowUpRight className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Sent</span>
            </div>
            <p className="text-2xl font-bold text-primary">₹5,549</p>
          </Card>
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="hover:shadow-md transition-shadow">
              <div className="p-4 flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full ${
                    transaction.type === "received"
                      ? "bg-gradient-success"
                      : "bg-gradient-primary"
                  } flex items-center justify-center text-white font-semibold`}
                >
                  {transaction.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{transaction.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                      {transaction.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold text-lg ${
                      transaction.type === "received" ? "text-success" : "text-foreground"
                    }`}
                  >
                    {transaction.type === "received" ? "+" : "-"}₹{transaction.amount}
                  </p>
                  {transaction.type === "received" ? (
                    <ArrowDownLeft className="w-4 h-4 text-success ml-auto" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
