
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartIcon, CheckCircle2 } from 'lucide-react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const mockHistoryGoals = [
  {
    id: 1,
    metric: "Sprint Speed",
    target: "24 km/h",
    achieved: "24.5 km/h",
    completed_date: "2025-03-15",
    status: "Completed"
  },
  {
    id: 2,
    metric: "Vertical Jump",
    target: "65 cm",
    achieved: "67 cm",
    completed_date: "2025-02-28",
    status: "Completed"
  },
  {
    id: 3,
    metric: "5km Run",
    target: "22 minutes",
    achieved: "23.5 minutes",
    completed_date: "2025-02-10",
    status: "Expired"
  }
];

const GoalHistorySection = () => {
  return (
    <Card className="border-gray-700 bg-athlex-gray-900">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl font-medium">
          <ChartIcon className="h-5 w-5 mr-2 text-athlex-accent" />
          Goal History
        </CardTitle>
        <CardDescription className="text-gray-400">
          Review your past performance goals and achievements
        </CardDescription>
      </CardHeader>
      <CardContent>
        {mockHistoryGoals.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No completed goals yet. Your goal history will appear here.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-transparent">
                <TableHead className="text-gray-300">Metric</TableHead>
                <TableHead className="text-gray-300">Target</TableHead>
                <TableHead className="text-gray-300">Achieved</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHistoryGoals.map((goal) => (
                <TableRow key={goal.id} className="border-gray-700">
                  <TableCell className="font-medium">{goal.metric}</TableCell>
                  <TableCell>{goal.target}</TableCell>
                  <TableCell>{goal.achieved}</TableCell>
                  <TableCell>{goal.completed_date}</TableCell>
                  <TableCell>
                    {goal.status === "Completed" ? (
                      <Badge className="flex items-center bg-green-950 text-green-400 gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Expired</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalHistorySection;
