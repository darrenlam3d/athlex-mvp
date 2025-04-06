
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Lightbulb, Plus, Calendar } from 'lucide-react';

const goals = [
  {
    title: "Increase sprint speed by 10%",
    progress: 65,
    startDate: "Mar 15, 2025",
    endDate: "Apr 15, 2025",
    suggestion: "Try plyometric training to boost your acceleration"
  },
  {
    title: "Improve passing accuracy to 85%",
    progress: 78,
    startDate: "Mar 1, 2025",
    endDate: "May 1, 2025",
    suggestion: "Focus on first-touch control drills"
  },
  {
    title: "Develop better defensive transitions",
    progress: 42,
    startDate: "Mar 10, 2025",
    endDate: "Apr 30, 2025",
    suggestion: "Work on your recovery runs after possession loss"
  }
];

const FootballGoalTracking = () => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Training Goals & Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{goal.title}</h4>
                <span className="text-sm font-medium">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-2" />
              <div className="flex justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> 
                  {goal.startDate} - {goal.endDate}
                </span>
              </div>
              <div className="flex items-start mt-2 bg-blue-900/20 p-3 rounded-lg">
                <Lightbulb className="h-5 w-5 text-blue-400 mr-2 mt-0.5 shrink-0" />
                <p className="text-sm text-blue-200">{goal.suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Goal
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FootballGoalTracking;
