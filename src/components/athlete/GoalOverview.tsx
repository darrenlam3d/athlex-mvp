
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export interface Goal {
  id: string;
  metric: string;
  current: number;
  target: number;
  unit: string;
  end_date: string;
  progress: number;
}

export interface GoalOverviewProps {
  goals: Goal[];
}

const GoalOverview: React.FC<GoalOverviewProps> = ({ goals }) => {
  return (
    <Card className="bg-gray-900/60 border-gray-800 mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Goal Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map(goal => (
            <div key={goal.id} className="space-y-2">
              <div className="flex justify-between">
                <h4 className="font-medium">{goal.metric}</h4>
                <span className="text-sm text-gray-400">Target: {goal.target} {goal.unit}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2.5">
                <div 
                  className="bg-athlex-accent h-2.5 rounded-full" 
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span>{goal.current} {goal.unit}</span>
                <span>Due: {new Date(goal.end_date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalOverview;
