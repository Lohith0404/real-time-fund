import { ChevronRight, User, Bell, Shield, HelpCircle, LogOut, CreditCard, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Profile = () => {
  const menuItems = [
    { icon: User, label: "Personal Information", color: "text-primary" },
    { icon: CreditCard, label: "Payment Methods", color: "text-accent" },
    { icon: Bell, label: "Notifications", color: "text-primary-dark" },
    { icon: Shield, label: "Security & Privacy", color: "text-success" },
    { icon: Settings, label: "Settings", color: "text-muted-foreground" },
    { icon: HelpCircle, label: "Help & Support", color: "text-primary" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      {/* Header with Profile Info */}
      <div className="bg-gradient-primary text-primary-foreground px-6 py-12 rounded-b-3xl">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 border-4 border-white/20 mb-4">
            <AvatarFallback className="bg-white/20 text-primary-foreground text-2xl font-bold">
              U
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mb-1">User Name</h1>
          <p className="text-primary-foreground/80">user@example.com</p>
          <p className="text-primary-foreground/80 text-sm">+91 98765 43210</p>
          
          <Button 
            variant="outline" 
            className="mt-6 border-white/20 text-primary-foreground hover:bg-white/10"
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 -mt-10 mb-6">
        <Card className="p-6 shadow-lg">
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">₹12,450</p>
              <p className="text-xs text-muted-foreground mt-1">Balance</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">142</p>
              <p className="text-xs text-muted-foreground mt-1">Transactions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">₹2,340</p>
              <p className="text-xs text-muted-foreground mt-1">Rewards</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Menu Items */}
      <div className="px-6 space-y-3">
        {menuItems.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-${item.color}/10 to-${item.color}/5 flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className="flex-1 font-medium text-foreground">{item.label}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        ))}

        {/* Logout Button */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-destructive/20">
          <div className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            <span className="flex-1 font-medium text-destructive">Logout</span>
            <ChevronRight className="w-5 h-5 text-destructive" />
          </div>
        </Card>
      </div>

      {/* App Version */}
      <div className="text-center py-8 text-sm text-muted-foreground">
        <p>PhonePay Clone</p>
        <p>Version 1.0.0</p>
      </div>
    </div>
  );
};

export default Profile;
