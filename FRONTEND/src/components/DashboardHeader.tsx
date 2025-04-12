import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, SearchIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DashboardHeaderProps {
  userType: 'investor' | 'startup';
  userName: string;
}

interface NewsItem {
  title: string;
  url: string;
  date: string;
  thumbnail: string;
  description: string;
  source: {
    name: string;
  };
}

const NewsList: React.FC<{ newsData: NewsItem[] }> = ({ newsData }) => {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
      {newsData.map((item, idx) => (
        <div
          key={idx}
          className="border rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition cursor-pointer"
          onClick={() => window.open(item.url, '_blank')}
        >
          <img src={item.thumbnail} alt="thumbnail" className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="text-md font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.description.slice(0, 100)}...</p>
            <div className="text-xs text-gray-500 flex justify-between items-center">
              <span>{item.source.name}</span>
              <span>{new Date(item.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userType, userName }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('hi');
  const [country, setCountry] = useState('in');
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleNotificationClick = () => {
    navigate(`/${userType}-dashboard/notifications`);
  };

  const handleProfileClick = () => {
    navigate(`/${userType}-dashboard/profile`);
  };

  const handleSettingsClick = () => {
    navigate(`/${userType}-dashboard/settings`);
  };

  const fetchNews = async () => {
    try {
      const response = await fetch(`https://vault-backend-vkz2.onrender.com/news?query=${query}&country=${country}&language=${language}`);
      const data = await response.json();
      if (data.success) {
        setNewsData(data.data);
        toast.success('News fetched successfully');
      } else {
        toast.error('Failed to fetch news');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error('Error fetching news');
    }
  };

  // Load default news from local sample.json on initial load
  useEffect(() => {
    const loadDefaultNews = async () => {
      try {
        const response = await fetch('/sample.json');
        const data = await response.json();
        if (data.success) {
          setNewsData(data.data);
        } else {
          toast.error('Failed to load default news');
        }
      } catch (error) {
        console.error('Error loading default news:', error);
        toast.error('Error loading default news');
      }
    };

    loadDefaultNews();
  }, []);

  return (
    <>
      <header className="h-16 border-b border-gray-100 bg-white flex items-center justify-between px-6">
        <div className="flex items-center gap-3 w-full md:w-2/3">
          <div className="relative flex-1">
            <SearchIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news..."
              className="pl-9 bg-gray-50 border-0"
            />
          </div>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
          >
            <option value="hi">Hindi</option>
            <option value="en">English</option>
            <option value="ta">Tamil</option>
          </select>

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
          >
            <option value="in">India</option>
            <option value="us">USA</option>
            <option value="gb">UK</option>
          </select>

          <Button onClick={fetchNews} className="text-sm px-4">
            Search
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            onClick={handleNotificationClick}
            variant="ghost"
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-sm font-medium">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userType}-${userName}`} />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">{userName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettingsClick}>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="max-h-[calc(100vh-4rem)] overflow-y-auto mt-4 px-6 pb-6">
        <NewsList newsData={newsData} />
      </div>
    </>
  );
};

export default DashboardHeader;
