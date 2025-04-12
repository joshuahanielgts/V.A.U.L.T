
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  HomeIcon,
  TrendingUpIcon,
  BarChartIcon,
  WalletIcon,
  BellIcon,
  SettingsIcon,
  HelpCircleIcon,
  UserIcon,
  LogOutIcon,
} from 'lucide-react';

interface SidebarProps {
  userType: 'investor' | 'startup';
}

const DashboardSidebar: React.FC<SidebarProps> = ({ userType }) => {
  const navigate = useNavigate();
  
  const investorLinks = [
    { label: 'Dashboard', icon: <HomeIcon size={18} />, to: '/investor-dashboard' },
    { label: 'Portfolio', icon: <BarChartIcon size={18} />, to: '/investor-dashboard/portfolio' },
    { label: 'Opportunities', icon: <TrendingUpIcon size={18} />, to: '/investor-dashboard/opportunities' },
    { label: 'Transactions', icon: <WalletIcon size={18} />, to: '/investor-dashboard/transactions' },
    { label: 'Notifications', icon: <BellIcon size={18} />, to: '/investor-dashboard/notifications' },
  ];

  const startupLinks = [
    { label: 'Dashboard', icon: <HomeIcon size={18} />, to: '/startup-dashboard' },
    { label: 'Funding', icon: <WalletIcon size={18} />, to: '/startup-dashboard/funding' },
    { label: 'Investors', icon: <UserIcon size={18} />, to: '/startup-dashboard/investors' },
    { label: 'Analytics', icon: <BarChartIcon size={18} />, to: '/startup-dashboard/analytics' },
    { label: 'Notifications', icon: <BellIcon size={18} />, to: '/startup-dashboard/notifications' },
  ];

  const links = userType === 'investor' ? investorLinks : startupLinks;
  
  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <Logo size="md" />
        </div>
      </div>
      
      <div className="flex-1 py-6 px-3 flex flex-col">
        <div className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-vault-50 text-vault-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                )
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="mt-auto space-y-1 pt-6 border-t border-gray-100">
          <NavLink
            to={`/${userType}-dashboard/settings`}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-vault-50 text-vault-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              )
            }
          >
            <SettingsIcon size={18} />
            Settings
          </NavLink>
          <NavLink
            to={`/${userType}-dashboard/help`}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-vault-50 text-vault-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              )
            }
          >
            <HelpCircleIcon size={18} />
            Help & Support
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <LogOutIcon size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
