
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar, Filter } from 'lucide-react';

const PerformanceTimeline = () => {
  const sessions = [
    {
      id: 1,
      date: '2025-04-03',
      type: 'Football Training',
      activity: 'Sprint Drills',
      duration: '90 mins',
      highlights: 'Achieved 32.4 km/h top speed, new personal best'
    },
    {
      id: 2,
      date: '2025-04-01',
      type: 'Match',
      activity: 'U23 Academy Match',
      duration: '70 mins',
      highlights: '6.8 km covered, 1 assist, 85% pass completion'
    },
    {
      id: 3,
      date: '2025-03-29',
      type: 'Football Training',
      activity: 'Technical Ball Control',
      duration: '60 mins',
      highlights: 'Mastered advanced close control techniques'
    }
  ];

  return (
    <Card className="border-gray-700 bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-medium">Performance Timeline</CardTitle>
            <CardDescription className="text-gray-400 mt-1">
              Training sessions and match performances
            </CardDescription>
          </div>
          <button className="flex items-center text-sm px-3 py-1.5 text-gray-300 rounded-md border border-gray-700 hover:bg-gray-800">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/60">
            <TabsTrigger value="all">All Activity</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="games">Games</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="pt-4 space-y-4">
            {sessions.map(session => (
              <div key={session.id} className="flex gap-4 border-b border-gray-700/60 pb-4">
                <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-lg p-2 min-w-[60px]">
                  <Calendar className="h-5 w-5 text-athlex-accent mb-1" />
                  <div className="text-sm font-medium">{new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap justify-between items-start">
                    <h4 className="font-medium">{session.type}</h4>
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded">{session.duration}</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{session.activity}</p>
                  <p className="text-sm text-athlex-accent mt-2">{session.highlights}</p>
                </div>
              </div>
            ))}
            <button className="w-full text-sm text-athlex-accent py-2 border border-dashed border-gray-700 rounded-md hover:bg-gray-800/30">
              View More History
            </button>
          </TabsContent>
          
          <TabsContent value="training" className="pt-4">
            <div className="text-center py-6 text-gray-400">
              Filter applied: Training sessions only
            </div>
          </TabsContent>
          
          <TabsContent value="games" className="pt-4">
            <div className="text-center py-6 text-gray-400">
              Filter applied: Games only
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceTimeline;
