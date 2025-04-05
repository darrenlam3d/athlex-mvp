
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Activity, CalendarDays, Clock, ChartBar, Trophy } from 'lucide-react';

const ActivitySummary = () => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Activity Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center text-center">
            <Activity className="h-6 w-6 text-blue-400 mb-2" />
            <span className="text-2xl font-bold">3</span>
            <span className="text-xs text-gray-400">Sessions Today</span>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center text-center">
            <CalendarDays className="h-6 w-6 text-purple-400 mb-2" />
            <span className="text-2xl font-bold">12</span>
            <span className="text-xs text-gray-400">Sessions This Week</span>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center text-center">
            <Clock className="h-6 w-6 text-green-400 mb-2" />
            <span className="text-2xl font-bold">8.5h</span>
            <span className="text-xs text-gray-400">Time Spent Training</span>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center text-center">
            <Trophy className="h-6 w-6 text-yellow-400 mb-2" />
            <span className="text-lg font-bold">Agility Drills</span>
            <span className="text-xs text-gray-400">Top Activity</span>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center text-center">
            <ChartBar className="h-6 w-6 text-red-400 mb-2" />
            <span className="text-2xl font-bold">4,720</span>
            <span className="text-xs text-gray-400">Calories Burned</span>
          </div>
        </div>
        
        <div className="mt-4 bg-purple-900/20 border border-purple-900/30 rounded-lg p-3 text-sm text-center">
          <p className="text-purple-200">
            <span className="font-medium">Stay consistent to build momentum!</span> You're in the top 20% of active users this week.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivitySummary;
