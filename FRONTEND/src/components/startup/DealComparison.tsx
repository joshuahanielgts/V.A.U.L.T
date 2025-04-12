import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";

// Sample deals data
const deals = [
  {
    id: 1,
    investor: "Aspen Ventures",
    amount: 1500000,
    equity: 12,
    valuation: 12500000,
    terms: [
      { term: "Board Seat", included: true },
      { term: "Pro Rata Rights", included: true },
      { term: "Liquidation Preference", included: true, note: "1.5x" },
      { term: "Vesting Schedule", included: true },
      { term: "Anti-Dilution", included: true },
    ],
    recommendationScore: 92,
  },
  {
    id: 2,
    investor: "Blue Harbor Capital",
    amount: 2000000,
    equity: 18,
    valuation: 11100000,
    terms: [
      { term: "Board Seat", included: true },
      { term: "Pro Rata Rights", included: true },
      { term: "Liquidation Preference", included: true, note: "2x" },
      { term: "Vesting Schedule", included: true },
      { term: "Anti-Dilution", included: true },
    ],
    recommendationScore: 78,
  },
  {
    id: 3,
    investor: "TechFuture Fund",
    amount: 750000,
    equity: 6,
    valuation: 12500000,
    terms: [
      { term: "Board Seat", included: false },
      { term: "Pro Rata Rights", included: true },
      { term: "Liquidation Preference", included: true, note: "1x" },
      { term: "Vesting Schedule", included: true },
      { term: "Anti-Dilution", included: false },
    ],
    recommendationScore: 85,
  },
];

const DealComparison: React.FC = () => {
  const [selectedDeal, setSelectedDeal] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDetailsClick = (deal: any) => {
    setSelectedDeal(deal);
    setDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Deal Comparison</CardTitle>
          <CardDescription>Compare offers from potential investors</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investor</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Equity (%)</TableHead>
                <TableHead className="text-right">Valuation</TableHead>
                <TableHead>Key Terms</TableHead>
                <TableHead className="text-right">AI Score</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">{deal.investor}</TableCell>
                  <TableCell className="text-right">
                    ${new Intl.NumberFormat('en-US').format(deal.amount)}
                  </TableCell>
                  <TableCell className="text-right">{deal.equity}%</TableCell>
                  <TableCell className="text-right">
                    ${new Intl.NumberFormat('en-US').format(deal.valuation)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1.5 flex-wrap">
                      {deal.terms.map((term, i) => (
                        <Badge 
                          key={i}
                          variant="outline" 
                          className={`text-xs py-0 h-5 ${
                            term.included 
                              ? 'border-green-500 text-green-600 bg-green-50' 
                              : 'border-red-500 text-red-600 bg-red-50'
                          }`}
                        >
                          {term.included ? (
                            <CheckCircleIcon className="h-3 w-3 mr-1" />
                          ) : (
                            <XCircleIcon className="h-3 w-3 mr-1" />
                          )}
                          {term.term}
                          {term.note && <span className="text-xs"> ({term.note})</span>}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className={`
                      ${deal.recommendationScore >= 90 ? 'bg-green-500' : ''}
                      ${deal.recommendationScore >= 80 && deal.recommendationScore < 90 ? 'bg-blue-500' : ''}
                      ${deal.recommendationScore < 80 ? 'bg-amber-500' : ''}
                    `}>
                      {deal.recommendationScore}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="w-full" onClick={() => handleDetailsClick(deal)}>
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Deal Details Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          {selectedDeal && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedDeal.investor}</DialogTitle>
                <DialogDescription>Detailed view of the deal terms and structure</DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-2 text-sm">
                <div><strong>Amount:</strong> ${new Intl.NumberFormat('en-US').format(selectedDeal.amount)}</div>
                <div><strong>Equity:</strong> {selectedDeal.equity}%</div>
                <div><strong>Valuation:</strong> ${new Intl.NumberFormat('en-US').format(selectedDeal.valuation)}</div>
                <div><strong>AI Recommendation Score:</strong> {selectedDeal.recommendationScore}</div>
                <div className="mt-3">
                  <strong>Terms:</strong>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedDeal.terms.map((term: any, i: number) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className={`text-xs py-0 h-5 ${
                          term.included
                            ? 'border-green-500 text-green-600 bg-green-50'
                            : 'border-red-500 text-red-600 bg-red-50'
                        }`}
                      >
                        {term.included ? (
                          <CheckCircleIcon className="h-3 w-3 mr-1" />
                        ) : (
                          <XCircleIcon className="h-3 w-3 mr-1" />
                        )}
                        {term.term}{term.note ? ` (${term.note})` : ''}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DealComparison;
