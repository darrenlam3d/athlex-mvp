import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, Calendar, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { format, parseISO, isAfter } from 'date-fns';

interface Goal {
  goal_id: string;
  metric: string;
  target_value: number;
  current_value: number;
  start_date: string;
  end_date: string;
  progress_percent: number;
  status: string;
}

interface ActiveGoalsListProps {
  goals: Goal[];
  onCreateGoal: () => void;
}

const ActiveGoalsList: React.FC<ActiveGoalsListProps> = ({ goals, onCreateGoal }) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusBadge = (status: string, endDate: string) => {
    // Safely parse the date string, return early if it's undefined or invalid
    if (!endDate) {
      return <Badge variant="secondary">Unknown</Badge>;
    }
    
    try {
      const endDateObj = parseISO(endDate);
      const isExpired = isAfter(new Date(), endDateObj);
      
      if (isExpired && status !== 'Completed') {
        return <Badge variant="destructive">Expired</Badge>;
      }
      
      switch (status) {
        case 'Completed':
          return <Badge className="bg-green-600">Completed</Badge>;
        case 'In Progress':
          return <Badge className="bg-blue-600">In Progress</Badge>;
        case 'Not Started':
          return <Badge variant="outline">Not Started</Badge>;
        default:
          return <Badge variant="secondary">{status}</Badge>;
      }
    } catch (error) {
      console.error("Error parsing date:", endDate, error);
      return <Badge variant="secondary">Invalid Date</Badge>;
    }
  };

  const isDecreasingMetric = (metric: string) => {
    return metric.toLowerCase().includes('time') || 
           metric.toLowerCase().includes('seconds') ||
           metric.toLowerCase().includes('minutes');
  };
  
  // Helper function to safely format dates
  const safelyFormatDate = (dateStr: string, formatStr: string) => {
    if (!dateStr) return 'Unknown';
    
    try {
      const date = parseISO(dateStr);
      return format(date, formatStr);
    } catch (error) {
      console.error("Error formatting date:", dateStr, error);
      return 'Invalid Date';
    }
  };

  return (
    <Card className="border-gray-700 bg-athlex-gray-900">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center text-xl font-medium">
              <Target className="h-5 w-5 mr-2 text-athlex-accent" />
              Active Performance Goals
            </CardTitle>
            <CardDescription className="text-gray-400 mt-1">
              Track your progress toward specific performance targets
            </CardDescription>
          </div>
          <Button onClick={onCreateGoal} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {goals.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-gray-700 rounded-lg">
            <Target className="h-10 w-10 mx-auto text-gray-500 mb-2" />
            <h3 className="text-lg font-medium mb-1">No active goals yet</h3>
            <p className="text-gray-400 mb-4 max-w-sm mx-auto">
              Set specific, measurable targets to track your performance improvement
            </p>
            <Button onClick={onCreateGoal} variant="outline" className="mx-auto">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Goal
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {goals.map((goal) => {
              const decreasing = isDecreasingMetric(goal.metric);
              
              return (
                <div key={goal.goal_id} className="bg-athlex-gray-800/50 rounded-lg p-5 border border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">
                        {goal.metric}
                      </h3>
                      <div className="flex items-center text-sm text-gray-400 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {safelyFormatDate(goal.start_date, 'MMM d')} - {safelyFormatDate(goal.end_date, 'MMM d, yyyy')}
                      </div>
                    </div>
                    {getStatusBadge(goal.status, goal.end_date)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-400">Current:</span>
                      <span className="text-xl font-medium flex items-center">
                        {goal.current_value}
                        {decreasing ? (
                          <TrendingDown className="h-4 w-4 ml-1 text-green-400" />
                        ) : (
                          <TrendingUp className="h-4 w-4 ml-1 text-green-400" />
                        )}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-400">Target:</span>
                      <span className="text-xl font-medium">{goal.target_value}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{goal.progress_percent}%</span>
                    </div>
                    <Progress 
                      value={goal.progress_percent} 
                      className={`h-2 ${getProgressColor(goal.progress_percent)}`} 
                    />
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-athlex-accent">
                      View Details
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveGoalsList;
