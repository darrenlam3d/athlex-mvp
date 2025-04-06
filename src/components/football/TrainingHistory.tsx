
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, RefreshCw, Zap, Route } from 'lucide-react';

const TrainingHistory = () => {
  const personalBests = [
    {
      metric: "Top Speed",
      value: "32.4 km/h",
      date: "Apr 2, 2025",
      icon: <Zap className="h-5 w-5 text-yellow-400" />,
    },
    {
      metric: "Sprint Test (40m)",
      value: "4.82s",
      date: "Mar 28, 2025",
      icon: <RefreshCw className="h-5 w-5 text-purple-400" />,
    },
    {
      metric: "High-Intensity Distance",
      value: "4.3 km",
      date: "Mar 15, 2025",
      icon: <Route className="h-5 w-5 text-green-400" />,
    }
  ];

  const recentSessions = [
    {
      id: 1,
      type: "Technical Training",
      date: "Apr 5, 2025",
      duration: "90 min",
      focus: "Passing & Movement",
      intensity: "Medium"
    },
    {
      id: 2,
      type: "Match Simulation",
      date: "Apr 3, 2025",
      duration: "75 min",
      focus: "Tactical Awareness",
      intensity: "High"
    },
    {
      id: 3,
      type: "Recovery Session",
      date: "Apr 2, 2025",
      duration: "45 min",
      focus: "Active Recovery",
      intensity: "Low"
    }
  ];

  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Personal Bests & Training History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Personal Bests */}
          <div>
            <h3 className="text-lg font-medium mb-3">Personal Records</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {personalBests.map((best, index) => (
                <div key={index} className="bg-gray-800/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    {best.icon}
                    <span className="text-xs text-gray-400">{best.date}</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-gray-400">{best.metric}</div>
                    <div className="text-2xl font-bold text-athlex-accent mt-1">{best.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Training Sessions */}
          <div>
            <h3 className="text-lg font-medium mb-3">Recent Training Sessions</h3>
            <div className="space-y-3">
              {recentSessions.map(session => (
                <div key={session.id} className="bg-gray-800/30 rounded-lg p-4">
                  <div className="flex flex-wrap justify-between items-start">
                    <div>
                      <h4 className="font-medium">{session.type}</h4>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> 
                          {session.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> 
                          {session.duration}
                        </span>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`
                        ${session.intensity === 'High' ? 'border-red-500 text-red-400' : 
                          session.intensity === 'Medium' ? 'border-yellow-500 text-yellow-400' : 
                          'border-green-500 text-green-400'}
                      `}
                    >
                      {session.intensity} Intensity
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-400">Focus:</span> {session.focus}
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

export default TrainingHistory;
