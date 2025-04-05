
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowDownRight, ArrowUpRight, ArrowRight, Flag, Target } from 'lucide-react';

const TrainingGoalAlignment = () => {
  const goalAlignments = [
    {
      id: 1,
      goal: 'Improve 3-point shooting accuracy to 45%',
      status: 'good',
      training: '6 shooting sessions in last 14 days',
      analysis: 'Your training frequency supports this goal. Recent shooting accuracy is trending upward (+3%).',
      suggestion: null
    },
    {
      id: 2,
      goal: 'Increase vertical jump to 32 inches',
      status: 'poor',
      training: '1 leg strength training in last 14 days',
      analysis: 'Insufficient leg strength training to support your vertical jump goal.',
      suggestion: 'Add 2 plyometric sessions per week to accelerate progress.'
    },
    {
      id: 3,
      goal: 'Improve defensive footwork',
      status: 'moderate',
      training: '3 agility sessions in last 14 days',
      analysis: 'Your training frequency is adequate but could be more specialized.',
      suggestion: 'Try adding defensive slide drills to your agility work.'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good':
        return <ArrowUpRight className="h-5 w-5 text-green-400" />;
      case 'moderate':
        return <ArrowRight className="h-5 w-5 text-yellow-400" />;
      case 'poor':
        return <ArrowDownRight className="h-5 w-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'good':
        return 'bg-green-900/30 text-green-400';
      case 'moderate':
        return 'bg-yellow-900/30 text-yellow-400';
      case 'poor':
        return 'bg-red-900/30 text-red-400';
      default:
        return '';
    }
  };

  return (
    <Card className="border-gray-700 bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-medium">Training-to-Goal Alignment</CardTitle>
            <CardDescription className="text-gray-400 mt-1">
              How your current training supports your active goals
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-athlex-accent text-sm">
            <Flag className="h-4 w-4" />
            Manage Goals
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goalAlignments.map(alignment => (
            <div key={alignment.id} className="bg-gray-800/30 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-athlex-accent" />
                  <h3 className="font-medium">{alignment.goal}</h3>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${getStatusClass(alignment.status)}`}>
                  {alignment.status === 'good' ? 'On Track' : 
                   alignment.status === 'moderate' ? 'Needs Focus' : 'Insufficient Training'}
                </span>
              </div>
              
              <div className="pl-7 mt-2">
                <div className="text-sm text-gray-400">
                  <span className="text-gray-300">Recent Activity:</span> {alignment.training}
                </div>
                
                <div className="flex items-start gap-2 mt-3">
                  {getStatusIcon(alignment.status)}
                  <div>
                    <div className="text-sm">{alignment.analysis}</div>
                    {alignment.suggestion && (
                      <div className="text-sm text-athlex-accent mt-1">{alignment.suggestion}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="bg-athlex-accent/10 border border-athlex-accent/30 rounded-lg p-4">
            <h3 className="font-medium flex items-center gap-2">
              <Target className="h-5 w-5 text-athlex-accent" />
              Overall Goal Alignment
            </h3>
            <p className="text-sm mt-2">
              Your training is well-aligned with 1 of 3 goals. Consider adjusting your training schedule to better support your vertical jump goal, which currently has insufficient training activity.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingGoalAlignment;
