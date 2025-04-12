
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const FundingProgress: React.FC = () => {
  // Sample funding progress data over time
  const fundingData = [
    { month: 'Jan', funding: 0 },
    { month: 'Feb', funding: 150000 },
    { month: 'Mar', funding: 350000 },
    { month: 'Apr', funding: 800000 },
    { month: 'May', funding: 1200000 },
    { month: 'Jun', funding: 1650000 },
    { month: 'Jul', funding: 2750000 },
    { month: 'Aug', funding: 2750000 }, // Current month
    { month: 'Sep', funding: null }, // Future months
    { month: 'Oct', funding: null },
    { month: 'Nov', funding: null },
    { month: 'Dec', funding: null },
  ];

  // Filter out null values for the chart
  const chartData = fundingData.filter(item => item.funding !== null);

  // Format the y-axis tick values
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    } else {
      return `$${value}`;
    }
  };

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-md">
          <p className="text-sm font-medium">{`${label}`}</p>
          <p className="text-sm text-vault-600">
            {`Funding: $${new Intl.NumberFormat('en-US').format(payload[0].value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funding Progress</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
            <defs>
              <linearGradient id="fundingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis tickFormatter={formatYAxis} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="funding"
              stroke="#16a34a"
              fillOpacity={1}
              fill="url(#fundingGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FundingProgress;
