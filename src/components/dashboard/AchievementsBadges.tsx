
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Award, Star, Trophy, Target, Zap } from 'lucide-react';

const AchievementsBadges = () => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Achievements & Badges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-purple-900/50 p-4 rounded-full mb-2">
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <span className="text-sm font-medium">Top 5%</span>
            <span className="text-xs text-gray-400">Endurance</span>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-900/50 p-4 rounded-full mb-2">
              <Star className="h-8 w-8 text-blue-400" />
            </div>
            <span className="text-sm font-medium">All-Star</span>
            <span className="text-xs text-gray-400">Performance</span>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-900/50 p-4 rounded-full mb-2">
              <Zap className="h-8 w-8 text-green-400" />
            </div>
            <span className="text-sm font-medium">Quick Learner</span>
            <span className="text-xs text-gray-400">Technique</span>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-medium flex items-center mb-1">
            <Target className="h-5 w-5 mr-2 text-orange-400" />
            Next Milestone
          </h3>
          <p className="text-sm text-gray-400 mb-3">
            Complete 5 more training sessions to earn the "Dedication" badge!
          </p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '70%' }}></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">Progress</span>
            <span className="text-xs font-medium">7/10</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsBadges;
