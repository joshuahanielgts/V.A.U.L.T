import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EyeIcon, StarIcon } from 'lucide-react';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

// Sample potential investors data
const potentialInvestors = [
  {
    id: 1,
    name: "Aspen Ventures",
    type: "VC Firm",
    interest: "high",
    amount: 1500000,
    previousDeals: 15,
    status: "interested",
  },
  {
    id: 2,
    name: "Sarah Chen",
    type: "Angel Investor",
    interest: "medium",
    amount: 250000,
    previousDeals: 8,
    status: "negotiating",
  },
  {
    id: 3,
    name: "Blue Harbor Capital",
    type: "VC Firm",
    interest: "high",
    amount: 2000000,
    previousDeals: 22,
    status: "interested",
  },
  {
    id: 4,
    name: "Michael Robertson",
    type: "Angel Investor",
    interest: "low",
    amount: 150000,
    previousDeals: 5,
    status: "considering",
  },
  {
    id: 5,
    name: "TechFuture Fund",
    type: "VC Firm",
    interest: "medium",
    amount: 750000,
    previousDeals: 18,
    status: "considering",
  },
];

const InvestorList: React.FC = () => {
  const [selectedInvestor, setSelectedInvestor] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewClick = (investor: any) => {
    setSelectedInvestor(investor);
    setDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Potential Investors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead className="text-right">Potential Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {potentialInvestors.map((investor) => (
                <TableRow key={investor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${investor.name}`} />
                        <AvatarFallback>{investor.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{investor.name}</div>
                        <div className="text-xs text-muted-foreground">{investor.previousDeals} previous deals</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{investor.type}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {["high", "medium", "low"].map((level, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < (investor.interest === "high" ? 3 : investor.interest === "medium" ? 2 : 1)
                              ? "fill-amber-400 stroke-amber-400"
                              : "text-gray-200 stroke-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    ${new Intl.NumberFormat('en-US').format(investor.amount)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={`
                        ${investor.status === 'negotiating' ? 'border-green-500 text-green-600 bg-green-50' : ''}
                        ${investor.status === 'interested' ? 'border-blue-500 text-blue-600 bg-blue-50' : ''}
                        ${investor.status === 'considering' ? 'border-amber-500 text-amber-600 bg-amber-50' : ''}
                      `}
                    >
                      {investor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => handleViewClick(investor)}>
                      <EyeIcon className="h-3.5 w-3.5" />
                      <span>View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal/Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          {selectedInvestor && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedInvestor.name}</DialogTitle>
                <DialogDescription>{selectedInvestor.type}</DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-2 text-sm">
                <div><strong>Status:</strong> {selectedInvestor.status}</div>
                <div><strong>Interest Level:</strong> {selectedInvestor.interest}</div>
                <div><strong>Potential Amount:</strong> ${new Intl.NumberFormat('en-US').format(selectedInvestor.amount)}</div>
                <div><strong>Previous Deals:</strong> {selectedInvestor.previousDeals}</div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InvestorList;
