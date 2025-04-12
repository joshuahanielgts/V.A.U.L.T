
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import InvestmentOverview from '@/components/investor/InvestmentOverview';
import InvestmentChart from '@/components/investor/InvestmentChart';
import StartupTable from '@/components/investor/StartupTable';

// Import these components at the top of your file
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUpIcon, 
  ChevronsUpIcon, 
  AlertCircleIcon, 
  RefreshCwIcon 
} from 'lucide-react';

// Nested page components
const InvestorDashboardHome = () => {
  return (
    <div className="space-y-8">
      <InvestmentOverview />
      
      <div className="grid lg:grid-cols-2 gap-6">
        <InvestmentChart />
        
        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`rounded-full p-2 ${activityColors[activity.type].bg}`}>
                    <activity.icon className={`h-4 w-4 ${activityColors[activity.type].text}`} />
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <StartupTable />
    </div>
  );
};

const Portfolio = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Portfolio</h1>
    <p className="text-muted-foreground">Manage and track your investment portfolio</p>
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Management</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your portfolio details will appear here.</p>
      </CardContent>
    </Card>
  </div>
);

const Opportunities = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Investment Opportunities</h1>
    <p className="text-muted-foreground">Discover new startups to invest in</p>
    <Card>
      <CardHeader>
        <CardTitle>Available Opportunities</CardTitle>
      </CardHeader>
      <CardContent>
        <p>New investment opportunities will appear here.</p>
      </CardContent>
    </Card>
  </div>
);

const Transactions = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Transactions</h1>
    <p className="text-muted-foreground">View your transaction history</p>
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your transactions will appear here.</p>
      </CardContent>
    </Card>
  </div>
);

const Notifications = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Notifications</h1>
    <p className="text-muted-foreground">View your alerts and updates</p>
    <Card>
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your notifications will appear here.</p>
      </CardContent>
    </Card>
  </div>
);

const Settings = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Settings</h1>
    <p className="text-muted-foreground">Manage your account settings</p>
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your settings will appear here.</p>
      </CardContent>
    </Card>
  </div>
);

const Profile = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Investor Profile</h1>
    <p className="text-muted-foreground">Manage your investor profile</p>
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your profile information will appear here.</p>
      </CardContent>
    </Card>
  </div>
);

const HelpSupport = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Help & Support</h1>
    <p className="text-muted-foreground">Get assistance with the platform</p>
    <Card>
      <CardHeader>
        <CardTitle>Support Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Help resources and contact information will appear here.</p>
      </CardContent>
    </Card>
  </div>
);

// Sample activities data
const activities = [
  {
    type: "investment",
    icon: TrendingUpIcon,
    title: "New investment opportunity",
    description: "TechFlow AI is raising a Series A round",
    time: "2 hours ago"
  },
  {
    type: "profit",
    icon: ChevronsUpIcon,
    title: "Portfolio value increased",
    description: "Your investment in MediHealth grew by 5%",
    time: "Yesterday"
  },
  {
    type: "alert",
    icon: AlertCircleIcon,
    title: "Market alert",
    description: "Tech sector showing signs of volatility",
    time: "2 days ago"
  },
  {
    type: "update",
    icon: RefreshCwIcon,
    title: "Startup update",
    description: "FinTrack launched their new mobile app",
    time: "1 week ago"
  }
];

const activityColors = {
  investment: { bg: "bg-blue-100", text: "text-blue-600" },
  profit: { bg: "bg-green-100", text: "text-green-600" },
  alert: { bg: "bg-amber-100", text: "text-amber-600" },
  update: { bg: "bg-purple-100", text: "text-purple-600" }
};

const InvestorDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar userType="investor" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader userType="investor" userName="John Wilson" />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Investor Dashboard</h1>
            <p className="text-muted-foreground">Monitor your investment performance and portfolio</p>
          </div>
          
          <Routes>
            <Route index element={<InvestorDashboardHome />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="help" element={<HelpSupport />} />
            <Route path="*" element={<Navigate to="/investor-dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
