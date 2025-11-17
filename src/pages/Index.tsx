import { useState } from "react";
import { Home, Send, Clock, User } from "lucide-react";
import Dashboard from "@/components/Dashboard";
import SendMoney from "@/components/SendMoney";
import Transactions from "@/components/Transactions";
import Profile from "@/components/Profile";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"home" | "send" | "history" | "profile">("home");

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Content */}
      <div className="animate-fade-in">
        {activeTab === "home" && <Dashboard />}
        {activeTab === "send" && <SendMoney />}
        {activeTab === "history" && <Transactions />}
        {activeTab === "profile" && <Profile />}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                activeTab === "home" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </button>
            
            <button
              onClick={() => setActiveTab("send")}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                activeTab === "send" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Send className="w-6 h-6" />
              <span className="text-xs font-medium">Send</span>
            </button>
            
            <button
              onClick={() => setActiveTab("history")}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                activeTab === "history" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Clock className="w-6 h-6" />
              <span className="text-xs font-medium">History</span>
            </button>
            
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                activeTab === "profile" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
