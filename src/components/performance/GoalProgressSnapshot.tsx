
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Flag } from 'lucide-react';

const GoalProgressSnapshot = () => {
  const goals = [
    {
      id: 1,
      title: 'Improve passing accuracy',
      target: '90%',
      current: '85%',
      progress: 84,
      dueDate: 'May 1, 2025',
      status: 'on-track'
    },
    {
      id: 2,
      title: 'Increase top speed',
      target: '33 km/h',
      current: '32 km/h',
      progress: 70,
      dueDate: 'June 15, 2025',
      status: 'on-track'
    },
    {
      id: 3,
      title: 'Improve defensive positioning',
      target: 'Advanced',
      current: 'Intermediate',
      progress: 60,
      dueDate: 'May 30, 2025',
      status: 'needs-attention'
    }
  ];

  return (
    <Card className="border-gray-700 bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-medium">Goal Progress</CardTitle>
            <CardDescription className="text-gray-400 mt-1">
              Performance linked to your active goals
            </CardDescription>
          </div>
          <button className="flex items-center gap-2 text-athlex-accent text-sm">
            <Flag className="h-4 w-4" />
            All Goals
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map(goal => (
            <div key={goal.id} className="bg-gray-800/30 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{goal.title}</h4>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  goal.status === 'on-track' ? 'bg-green-900/30 text-green-400' : 'bg-amber-900/30 text-amber-400'
                }`}>
                  {goal.status === 'on-track' ? 'On Track' : 'Needs Attention'}
                </span>
              </div>
              
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>Current: {goal.current}</span>
                <span>Target: {goal.target}</span>
              </div>
              
              <div className="mt-2">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      goal.status === 'on-track' ? 'bg-athlex-accent' : 'bg-amber-500'
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>{goal.progress}%</span>
                  <span>Due: {goal.dueDate}</span>
                </div>
              </div>
              
              <div className="mt-3">
                <a href="#" className="text-sm flex items-center text-athlex-accent">
                  View detailed breakdown
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalProgressSnapshot;
