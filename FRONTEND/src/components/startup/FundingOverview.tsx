
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSignIcon, PercentIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const FundingOverview: React.FC = () => {
  // Sample data
  const totalFundingGoal = 5000000;
  const currentFunding = 2750000;
  const percentageFunded = Math.round((currentFunding / totalFundingGoal) * 100);
  const interestedInvestors = 24;
  const activeDeals = 6;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Funding Goal</CardDescription>
          <CardTitle className="text-3xl font-semibold flex items-center">
            <DollarSignIcon className="mr-1 h-5 w-5 text-vault-600" />
            {new Intl.NumberFormat('en-US').format(totalFundingGoal)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            Series A Round
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Current Funding</CardDescription>
          <div className="flex justify-between items-baseline">
            <CardTitle className="text-3xl font-semibold flex items-center">
              <DollarSignIcon className="mr-1 h-5 w-5 text-vault-600" />
              {new Intl.NumberFormat('en-US').format(currentFunding)}
            </CardTitle>
            <span className="text-vault-700 font-semibold">{percentageFunded}%</span>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={percentageFunded} className="h-2" />
          <div className="text-xs text-muted-foreground mt-2">
            ${new Intl.NumberFormat('en-US').format(totalFundingGoal - currentFunding)} remaining to goal
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Interested Investors</CardDescription>
          <CardTitle className="text-3xl font-semibold flex items-center">
            <UsersIcon className="mr-1 h-5 w-5 text-vault-600" />
            {interestedInvestors}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +3 new this month
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Active Deals</CardDescription>
          <CardTitle className="text-3xl font-semibold flex items-center">
            <TrendingUpIcon className="mr-1 h-5 w-5 text-vault-600" />
            {activeDeals}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            2 pending approval
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundingOverview;
