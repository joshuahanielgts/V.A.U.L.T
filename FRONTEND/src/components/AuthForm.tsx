
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { LockIcon, MailIcon, UserIcon, BuildingIcon } from 'lucide-react';

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('investor');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Predefined credentials
    const investorCredentials = { 
      email: 'investor@vault.com', 
      password: 'VaultInvestor2025!' 
    };
    const startupCredentials = { 
      email: 'startup@vault.com', 
      password: 'VaultStartup2025!' 
    };

    // Validate credentials
    const isInvestor = 
      email === investorCredentials.email && 
      password === investorCredentials.password;
    
    const isStartup = 
      email === startupCredentials.email && 
      password === startupCredentials.password;

    if (isInvestor) {
      toast.success('Logged in as Investor');
      navigate('/investor-dashboard');
    } else if (isStartup) {
      toast.success('Logged in as Startup');
      navigate('/startup-dashboard');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg animate-fade-in glass-card">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome to VAULT</CardTitle>
        <CardDescription className="text-center">
          Login to connect with {userType === 'investor' ? 'promising startups' : 'potential investors'}
        </CardDescription>
      </CardHeader>
      <Tabs defaultValue="investor" onValueChange={setUserType} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="investor" className="flex items-center gap-2">
            <BuildingIcon size={16} />
            <span>Investor</span>
          </TabsTrigger>
          <TabsTrigger value="startup" className="flex items-center gap-2">
            <UserIcon size={16} />
            <span>Startup</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="investor">
          <CardContent className="pt-6">
            <form onSubmit={handleLogin}>
              <div className="grid gap-5">
                <div className="space-y-2">
                  <Label htmlFor="investor-email">Email</Label>
                  <div className="relative">
                    <div className="absolute left-2.5 top-2.5 text-muted-foreground">
                      <MailIcon size={18} />
                    </div>
                    <Input 
                      id="investor-email"
                      type="email" 
                      placeholder="investor@vault.com" 
                      className="pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="investor-password">Password</Label>
                  <div className="relative">
                    <div className="absolute left-2.5 top-2.5 text-muted-foreground">
                      <LockIcon size={18} />
                    </div>
                    <Input 
                      id="investor-password"
                      type="password" 
                      className="pl-9"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">Login as Investor</Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <div className="text-sm text-center text-muted-foreground">
              Demo credentials: investor@vault.com / VaultInvestor2025!
            </div>
          </CardFooter>
        </TabsContent>

        <TabsContent value="startup">
          <CardContent className="pt-6">
            <form onSubmit={handleLogin}>
              <div className="grid gap-5">
                <div className="space-y-2">
                  <Label htmlFor="startup-email">Email</Label>
                  <div className="relative">
                    <div className="absolute left-2.5 top-2.5 text-muted-foreground">
                      <MailIcon size={18} />
                    </div>
                    <Input 
                      id="startup-email"
                      type="email" 
                      placeholder="startup@vault.com" 
                      className="pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startup-password">Password</Label>
                  <div className="relative">
                    <div className="absolute left-2.5 top-2.5 text-muted-foreground">
                      <LockIcon size={18} />
                    </div>
                    <Input 
                      id="startup-password"
                      type="password" 
                      className="pl-9"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">Login as Startup</Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <div className="text-sm text-center text-muted-foreground">
              Demo credentials: startup@vault.com / VaultStartup2025!
            </div>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;

