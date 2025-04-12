
import React from 'react';
import AuthForm from '@/components/AuthForm';
import Logo from '@/components/Logo';
import { BanknoteIcon, LockIcon, TrendingUpIcon, ShieldIcon, BarChartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: <BanknoteIcon className="h-6 w-6 text-vault-600" />,
    title: 'Smart Financial Tools',
    description: 'Track expenses, get investment advice, and access peer-to-peer lending opportunities.'
  },
  {
    icon: <ShieldIcon className="h-6 w-6 text-vault-600" />,
    title: 'Blockchain Security',
    description: 'Ensure transparent, tamper-proof transactions with our advanced blockchain technology.'
  },
  {
    icon: <TrendingUpIcon className="h-6 w-6 text-vault-600" />,
    title: 'Funding Accessibility',
    description: 'Connect with AI-curated crowdfunding and lending opportunities.'
  },
  {
    icon: <BarChartIcon className="h-6 w-6 text-vault-600" />,
    title: 'Data-Driven Insights',
    description: 'Turn complex financial data into practical insights with our AI-powered analytics.'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 border-b bg-white">
        <div className="container mx-auto flex justify-between items-center">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-vault-700 hover:text-vault-800 hover:bg-vault-50">
              About
            </Button>
            <Button variant="ghost" className="text-vault-700 hover:text-vault-800 hover:bg-vault-50">
              Features
            </Button>
            <Button variant="ghost" className="text-vault-700 hover:text-vault-800 hover:bg-vault-50">
              Contact
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 grid lg:grid-cols-2">
        {/* Left Side - Hero Content */}
        <div className="money-pattern flex items-center justify-center p-8 lg:p-16 border-r">
          <div className="max-w-lg space-y-6">
            <div className="bg-vault-50 text-vault-700 font-medium rounded-full py-1 px-4 inline-block text-sm">
              Financial Intelligence Platform
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Connecting <span className="text-vault-600">Startups</span> with <span className="text-vault-600">Investors</span>
            </h1>
            <p className="text-gray-600 text-lg">
              VAULT combines AI, blockchain, and cloud technology to simplify and modernize 
              financial connections between innovative startups and forward-thinking investors.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <div className="mt-1 text-vault-600">{feature.icon}</div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex items-center justify-center p-8 bg-gradient-to-br from-white to-vault-50">
          <AuthForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Logo size="sm" />
          </div>
          <p>© 2025 VAULT Financial Intelligence Platform. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4 text-xs">
            <a href="#" className="text-gray-500 hover:text-vault-600">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-vault-600">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-vault-600">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
