
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const InvestmentChart = () => {
  // Sample data for portfolio allocation
  const sectorData = [
    { name: 'Technology', value: 45, color: '#16a34a' },
    { name: 'Healthcare', value: 20, color: '#22c55e' },
    { name: 'Finance', value: 15, color: '#4ade80' },
    { name: 'Consumer', value: 10, color: '#86efac' },
    { name: 'Energy', value: 10, color: '#bbf7d0' },
  ];
  
  const stageData = [
    { name: 'Seed', value: 15, color: '#16a34a' },
    { name: 'Series A', value: 35, color: '#22c55e' },
    { name: 'Series B', value: 30, color: '#4ade80' },
    { name: 'Series C+', value: 20, color: '#86efac' },
  ];
  
  const geographyData = [
    { name: 'North America', value: 50, color: '#16a34a' },
    { name: 'Europe', value: 25, color: '#22c55e' },
    { name: 'Asia Pacific', value: 15, color: '#4ade80' },
    { name: 'Latin America', value: 7, color: '#86efac' },
    { name: 'Africa', value: 3, color: '#bbf7d0' },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Portfolio Allocation</CardTitle>
        <CardDescription>
          Breakdown of your investment portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sector">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="sector">By Sector</TabsTrigger>
            <TabsTrigger value="stage">By Stage</TabsTrigger>
            <TabsTrigger value="geography">By Geography</TabsTrigger>
          </TabsList>

          <TabsContent value="sector" className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="stage" className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="geography" className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={geographyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {geographyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InvestmentChart;
