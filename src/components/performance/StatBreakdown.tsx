
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Video } from 'lucide-react';

const StatBreakdown = () => {
  const stats = [
    { name: 'Speed', value: 86, unit: 'mph' },
    { name: 'Agility', value: 92, unit: '' },
    { name: 'Endurance', value: 78, unit: '' },
    { name: 'Shooting', value: 89, unit: '%' },
    { name: 'Ball Control', value: 84, unit: '' }
  ];

  return (
    <Card className="border-gray-700 bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Latest Session Stats</CardTitle>
        <CardDescription className="text-gray-400 mt-1">
          Detailed breakdown of your most recent training (Apr 3, 2025)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/60">
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            <TabsTrigger value="details">Session Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics" className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-800/30 rounded-lg p-4">
                  <div className="text-sm text-gray-400">{stat.name}</div>
                  <div className="flex items-end mt-1">
                    <span className="text-2xl font-semibold">{stat.value}</span>
                    {stat.unit && <span className="text-sm text-gray-400 ml-1">{stat.unit}</span>}
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-athlex-accent h-1.5 rounded-full" 
                      style={{ width: `${stat.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button className="flex items-center gap-2 text-sm border border-gray-700 text-gray-300 px-4 py-2 rounded-md hover:bg-gray-800">
                <Video className="h-4 w-4" />
                View Session Video
              </button>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Session Type</div>
                  <div className="mt-1 font-medium">Shooting Drills</div>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Duration</div>
                  <div className="mt-1 font-medium">90 minutes</div>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Intensity</div>
                  <div className="mt-1 font-medium">High</div>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Coach</div>
                  <div className="mt-1 font-medium">Michael Johnson</div>
                </div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4">
                <div className="text-sm text-gray-400">Notes</div>
                <div className="mt-1 text-sm">
                  Focus on 3-point shooting from various positions. Worked on quick release and form consistency. Improved accuracy by 5% compared to last session.
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StatBreakdown;
