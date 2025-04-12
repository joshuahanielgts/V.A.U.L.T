
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, DollarSignIcon } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const InvestmentOverview: React.FC = () => {
  // Sample data
  const totalInvested = 2500000;
  const currentValue = 3250000;
  const percentageGrowth = 30;
  const portfolioHealth = 85;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Invested</CardDescription>
          <CardTitle className="text-3xl font-semibold flex items-center">
            <DollarSignIcon className="mr-1 h-5 w-5 text-vault-600" />
            {new Intl.NumberFormat('en-US').format(totalInvested)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            Across 15 startups
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Current Value</CardDescription>
          <CardTitle className="text-3xl font-semibold flex items-center">
            <DollarSignIcon className="mr-1 h-5 w-5 text-vault-600" />
            {new Intl.NumberFormat('en-US').format(currentValue)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-xs">
            <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-green-600 font-medium">+${new Intl.NumberFormat('en-US').format(currentValue - totalInvested)}</span>
            <span className="text-muted-foreground ml-2">since initial investment</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-3xl font-semibold flex items-center">
            <span className={percentageGrowth >= 0 ? "text-green-600" : "text-red-600"}>
              {percentageGrowth >= 0 ? "+" : ""}{percentageGrowth}%
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-xs">
            {percentageGrowth >= 0 ? (
              <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
            )}
            <span className="text-muted-foreground">Year-to-date</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Portfolio Health</CardDescription>
          <CardTitle className="text-3xl font-semibold">
            {portfolioHealth}%
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={portfolioHealth} className="h-2" />
          <div className="text-xs text-muted-foreground mt-2">
            Based on risk assessment
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentOverview;
