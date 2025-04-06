
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, Calendar, Medal, TrendingUp } from 'lucide-react';

const ProgressSnapshot = () => {
  const goals = [
    { name: 'Increase Sprint Speed', progress: 75 },
    { name: 'Improve Passing Accuracy', progress: 82 },
    { name: 'Master Ball Control Drills', progress: 60 },
  ];
  
  const recentSessions = [
    { 
      date: 'Today', 
      time: '9:30 AM', 
      type: 'Technical',
      focus: 'Passing & Movement', 
      intensity: 'High',
      highlight: 'Reached 90% pass completion'
    },
    { 
      date: 'Yesterday', 
      time: '5:00 PM', 
      type: 'Physical',
      focus: 'Sprint Training', 
      intensity: 'Very High',
      highlight: 'New top speed: 31.2 km/h'
    },
    { 
      date: '2 days ago', 
      time: '4:30 PM', 
      type: 'Tactical',
      focus: 'Defensive Positioning', 
      intensity: 'Medium',
      highlight: null
    },
  ];

  return (
    <Card className="border-gray-700 bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Progress Snapshot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Top stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <Activity className="h-4 w-4 text-green-400" />
              <span className="text-sm">Session Streak</span>
            </div>
            <div className="text-xl font-bold">7 days</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <span className="text-sm">Top Speed</span>
            </div>
            <div className="text-xl font-bold">31.2 km/h</div>
          </div>
        </div>
        
        {/* Goal progress */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Medal className="h-5 w-5 text-yellow-400" />
            <h3 className="font-medium">Goal Progress</h3>
          </div>
          
          <div className="space-y-3">
            {goals.map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{goal.name}</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent sessions */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-purple-400" />
            <h3 className="font-medium">Recent Sessions</h3>
          </div>
          
          <div className="space-y-3">
            {recentSessions.map((session, index) => (
              <div key={index} className="bg-gray-800 p-3 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{session.date}</span>
                  <span className="text-xs text-gray-400">{session.time}</span>
                </div>
                <div className="flex gap-2 mb-1">
                  <span className={`text-xs rounded-full px-2 py-0.5 
                    ${session.type === 'Technical' ? 'bg-blue-900/30 text-blue-300' : ''}
                    ${session.type === 'Physical' ? 'bg-green-900/30 text-green-300' : ''}
                    ${session.type === 'Tactical' ? 'bg-orange-900/30 text-orange-300' : ''}
                  `}>
                    {session.type}
                  </span>
                  <span className={`text-xs rounded-full px-2 py-0.5 
                    ${session.intensity === 'Low' ? 'bg-gray-700 text-gray-300' : ''}
                    ${session.intensity === 'Medium' ? 'bg-yellow-900/30 text-yellow-300' : ''}
                    ${session.intensity === 'High' ? 'bg-orange-900/30 text-orange-300' : ''}
                    ${session.intensity === 'Very High' ? 'bg-red-900/30 text-red-300' : ''}
                  `}>
                    {session.intensity}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{session.focus}</p>
                {session.highlight && (
                  <p className="text-xs text-green-400 mt-1">{session.highlight}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSnapshot;
