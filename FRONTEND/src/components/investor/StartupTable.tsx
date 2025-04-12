
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

// Sample startup investment data
const startupInvestments = [
  {
    id: 1,
    name: "TechFlow AI",
    sector: "AI/ML",
    invested: 500000,
    currentValue: 750000,
    roi: 50,
    status: "growing",
  },
  {
    id: 2,
    name: "MediHealth",
    sector: "Healthcare",
    invested: 350000,
    currentValue: 420000,
    roi: 20,
    status: "stable",
  },
  {
    id: 3,
    name: "GreenEnergy",
    sector: "CleanTech",
    invested: 600000,
    currentValue: 540000,
    roi: -10,
    status: "declining",
  },
  {
    id: 4,
    name: "FinTrack",
    sector: "FinTech",
    invested: 250000,
    currentValue: 375000,
    roi: 50,
    status: "growing",
  },
  {
    id: 5,
    name: "BlockChain Secure",
    sector: "Blockchain",
    invested: 400000,
    currentValue: 600000,
    roi: 50,
    status: "growing",
  },
];

const StartupTable: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Companies</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Startup</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead className="text-right">Invested</TableHead>
              <TableHead className="text-right">Current Value</TableHead>
              <TableHead className="text-right">ROI</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {startupInvestments.map((startup) => (
              <TableRow key={startup.id}>
                <TableCell className="font-medium">{startup.name}</TableCell>
                <TableCell>{startup.sector}</TableCell>
                <TableCell className="text-right">
                  ${new Intl.NumberFormat('en-US').format(startup.invested)}
                </TableCell>
                <TableCell className="text-right">
                  ${new Intl.NumberFormat('en-US').format(startup.currentValue)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    {startup.roi > 0 ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={startup.roi >= 0 ? "text-green-600" : "text-red-600"}>
                      {startup.roi}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant="outline" 
                    className={`
                      ${startup.status === 'growing' ? 'border-green-500 text-green-600 bg-green-50' : ''}
                      ${startup.status === 'stable' ? 'border-blue-500 text-blue-600 bg-blue-50' : ''}
                      ${startup.status === 'declining' ? 'border-red-500 text-red-600 bg-red-50' : ''}
                    `}
                  >
                    {startup.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StartupTable;
