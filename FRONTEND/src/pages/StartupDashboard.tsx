
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import FundingOverview from '@/components/startup/FundingOverview';
import FundingProgress from '@/components/startup/FundingProgress';
import InvestorList from '@/components/startup/InvestorList';
import DealComparison from '@/components/startup/DealComparison';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

// Create a dashboard home component for the main route
const StartupDashboardHome: React.FC = () => {
  // Sample company data
  const companyName = "EcoTech Solutions";
  const industry = "Clean Energy";
  const stage = "Series A";
  const founded = "2022";

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{companyName}</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>{industry}</span>
          <span>•</span>
          <span>{stage}</span>
          <span>•</span>
          <span>Founded {founded}</span>
        </div>
      </div>
      
      <div className="space-y-8">
        <FundingOverview />
        
        <div className="grid lg:grid-cols-2 gap-6">
          <FundingProgress />
          
          <Card>
            <CardHeader>
              <CardTitle>Company Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Monthly Revenue</h3>
                  <p className="text-2xl font-bold">$125,000</p>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                    <span>12% from last month</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Growth Rate</h3>
                  <p className="text-2xl font-bold">18%</p>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                    <span>2% from last quarter</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Customer Count</h3>
                  <p className="text-2xl font-bold">1,850</p>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                    <span>250 new this month</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Burn Rate</h3>
                  <p className="text-2xl font-bold">$85,000/mo</p>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                    <span>5% from last month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <InvestorList />
        
        <DealComparison />
      </div>
    </div>
  );
};

// Component for the Funding page
const FundingPage: React.FC = () => (
  <div className="flex-1 overflow-y-auto p-6">
    <h1 className="text-2xl font-bold mb-6">Funding</h1>
    <div className="space-y-8">
      <FundingOverview />
      <FundingProgress />
      <DealComparison />
    </div>
  </div>
);

// Component for the Investors page
const InvestorsPage: React.FC = () => (
  <div className="flex-1 overflow-y-auto p-6">
    <h1 className="text-2xl font-bold mb-6">Investors</h1>
    <InvestorList />
  </div>
);

// Component for the Analytics page
const AnalyticsPage: React.FC = () => (
  <div className="flex-1 overflow-y-auto p-6">
    <h1 className="text-2xl font-bold mb-6">Analytics</h1>
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">User Acquisition</h3>
            <p className="text-2xl font-bold">253 users/day</p>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              <span>15% from last month</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Retention Rate</h3>
            <p className="text-2xl font-bold">84%</p>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              <span>3% from last quarter</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Component for the Notifications page
const NotificationsPage: React.FC = () => (
  <div className="flex-1 overflow-y-auto p-6">
    <h1 className="text-2xl font-bold mb-6">Notifications</h1>
    <Card>
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <div className="font-medium">New Investor Interest</div>
            <div className="text-sm text-muted-foreground">Aspen Ventures has shown interest in your startup</div>
            <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
          </div>
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="font-medium">Funding Milestone</div>
            <div className="text-sm text-muted-foreground">You've reached 50% of your funding goal!</div>
            <div className="text-xs text-muted-foreground mt-1">Yesterday</div>
          </div>
          <div className="border-l-4 border-amber-500 pl-4 py-2">
            <div className="font-medium">Deal Update</div>
            <div className="text-sm text-muted-foreground">Blue Harbor Capital has updated their investment offer</div>
            <div className="text-xs text-muted-foreground mt-1">3 days ago</div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Component for the Profile page
const ProfilePage: React.FC = () => (
  <div className="flex-1 overflow-y-auto p-6">
    <h1 className="text-2xl font-bold mb-6">Profile</h1>
    <Card>
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Company Name</label>
            <p className="font-medium">EcoTech Solutions</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Industry</label>
            <p className="font-medium">Clean Energy</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Founded</label>
            <p className="font-medium">2022</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Website</label>
            <p className="font-medium">www.ecotechsolutions.com</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Description</label>
            <p className="text-gray-600">EcoTech Solutions develops affordable renewable energy solutions for residential and commercial applications, focusing on solar and wind integration.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Component for the Settings page
const SettingsPage: React.FC = () => (
  <div className="flex-1 overflow-y-auto p-6">
    <h1 className="text-2xl font-bold mb-6">Settings</h1>
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email Notifications</label>
            <div className="flex items-center mt-1 space-x-2">
              <input type="checkbox" id="emailNotif" className="rounded text-vault-600" defaultChecked />
              <label htmlFor="emailNotif">Receive email notifications</label>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Privacy</label>
            <div className="flex items-center mt-1 space-x-2">
              <input type="checkbox" id="publicProfile" className="rounded text-vault-600" defaultChecked />
              <label htmlFor="publicProfile">Make profile visible to investors</label>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Two-Factor Authentication</label>
            <div className="flex items-center mt-1 space-x-2">
              <input type="checkbox" id="twoFactor" className="rounded text-vault-600" />
              <label htmlFor="twoFactor">Enable two-factor authentication</label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Component for the Help page
const HelpPage: React.FC = () => (
  <div className="flex-1 overflow-y-auto p-6">
    <h1 className="text-2xl font-bold mb-6">Help & Support</h1>
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">How do I update my company profile?</h3>
            <p className="text-gray-600 mt-1">You can update your company profile by navigating to the Profile section and clicking on the Edit button.</p>
          </div>
          <div>
            <h3 className="font-medium">How do investors find my startup?</h3>
            <p className="text-gray-600 mt-1">Investors can discover your startup through our matching algorithm, search features, and industry filters.</p>
          </div>
          <div>
            <h3 className="font-medium">How do I respond to an investment offer?</h3>
            <p className="text-gray-600 mt-1">When you receive an investment offer, you'll get a notification. You can view and respond to offers from the Funding section.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const StartupDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar userType="startup" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader userType="startup" userName="Sarah Johnson" />
        
        <Routes>
          <Route index element={<StartupDashboardHome />} />
          <Route path="funding" element={<FundingPage />} />
          <Route path="investors" element={<InvestorsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="*" element={<StartupDashboardHome />} />
        </Routes>
      </div>
    </div>
  );
};

export default StartupDashboard;
