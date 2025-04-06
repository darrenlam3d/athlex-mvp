
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Zap, Repeat, ArrowUpRight, RefreshCw, Route } from 'lucide-react';

const FootballPerformance = () => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-medium">Performance Summary</CardTitle>
          <span className="text-xs text-gray-400">Last updated: Today, 10:23 AM</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center text-center">
            <Zap className="h-6 w-6 text-yellow-400 mb-2" />
            <span className="text-2xl font-bold">32.4</span>
            <span className="text-xs text-gray-400">Top Speed (km/h)</span>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center text-center">
            <Repeat className="h-6 w-6 text-purple-400 mb-2" />
            <span className="text-2xl font-bold">47</span>
            <span className="text-xs text-gray-400">Sprint Count</span>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center text-center">
            <ArrowUpRight className="h-6 w-6 text-blue-400 mb-2" />
            <span className="text-2xl font-bold">86</span>
            <span className="text-xs text-gray-400">Explosive Accel. Score</span>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center text-center">
            <Route className="h-6 w-6 text-green-400 mb-2" />
            <span className="text-lg font-bold">10.2 km</span>
            <span className="text-xs text-gray-400">Distance Covered</span>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center text-center">
            <RefreshCw className="h-6 w-6 text-red-400 mb-2" />
            <span className="text-2xl font-bold">132</span>
            <span className="text-xs text-gray-400">Accel/Decel Count</span>
          </div>
        </div>
        
        <div className="mt-4 bg-blue-900/20 border border-blue-900/30 rounded-lg p-3 text-sm">
          <p className="text-blue-200">
            <span className="font-medium">Motion Capture Analysis:</span> Your explosive acceleration puts you in the top 15% of central midfielders in our database.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FootballPerformance;
