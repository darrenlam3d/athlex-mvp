
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Lightbulb } from 'lucide-react';

const goals = [
  {
    title: "Improve sprint speed by 5%",
    progress: 65,
    suggestion: "Try interval training to boost your acceleration"
  },
  {
    title: "Increase vertical jump by 3 inches",
    progress: 42,
    suggestion: "Focus on plyometric exercises this week"
  },
  {
    title: "Master crossover dribble technique",
    progress: 90,
    suggestion: "You're almost there! Practice ball handling drills daily"
  }
];

const GoalTracking = () => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Goal Tracking</CardTitle>
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
              <div className="flex items-start mt-2 bg-blue-900/20 p-3 rounded-lg">
                <Lightbulb className="h-5 w-5 text-blue-400 mr-2 mt-0.5 shrink-0" />
                <p className="text-sm text-blue-200">{goal.suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalTracking;
