
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Award, TrendingUp } from 'lucide-react';

const PersonalBests = () => {
  const personalBests = [
    {
      id: 1,
      category: 'Shooting',
      metric: '3-point accuracy',
      value: '42%',
      date: 'Apr 1, 2025',
      icon: <Award className="h-5 w-5 text-yellow-500" />,
      improvement: '+8% from previous best'
    },
    {
      id: 2,
      category: 'Physical',
      metric: 'Vertical Jump',
      value: '30 inches',
      date: 'Mar 25, 2025',
      icon: <Award className="h-5 w-5 text-yellow-500" />,
      improvement: '+2 inches from previous best'
    },
    {
      id: 3,
      category: 'Game',
      metric: 'Points Scored',
      value: '28 pts',
      date: 'Mar 18, 2025',
      icon: <Award className="h-5 w-5 text-yellow-500" />,
      improvement: '+5 points from previous best'
    }
  ];

  const badges = [
    {
      id: 1,
      name: 'Sharpshooter',
      description: 'Achieved 40%+ 3-point accuracy',
      date: 'Apr 1, 2025',
      icon: '🎯'
    },
    {
      id: 2,
      name: 'Consistency King',
      description: 'Trained 5+ days per week for a month',
      date: 'Mar 31, 2025',
      icon: '📊'
    },
    {
      id: 3,
      name: 'Team Player',
      description: '10+ assists in a single game',
      date: 'Mar 18, 2025',
      icon: '🤝'
    }
  ];

  return (
    <Card className="border-gray-700 bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Personal Bests & Achievements</CardTitle>
        <CardDescription className="text-gray-400 mt-1">
          Your top performances and earned recognition
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-athlex-accent" />
              Personal Records
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {personalBests.map(best => (
                <div key={best.id} className="bg-gray-800/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    {best.icon}
                    <span className="text-xs text-gray-400">{best.date}</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-gray-400">{best.category}</div>
                    <div className="font-medium">{best.metric}</div>
                    <div className="text-2xl font-bold text-athlex-accent mt-1">{best.value}</div>
                    <div className="text-xs text-green-400 mt-1">{best.improvement}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <Award className="mr-2 h-5 w-5 text-yellow-500" />
              Badges Earned
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {badges.map(badge => (
                <div key={badge.id} className="bg-gray-800/30 rounded-lg p-4 flex items-start">
                  <div className="text-2xl mr-3">{badge.icon}</div>
                  <div>
                    <div className="font-medium">{badge.name}</div>
                    <div className="text-sm text-gray-400 mt-1">{badge.description}</div>
                    <div className="text-xs text-gray-500 mt-1">Earned: {badge.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalBests;
