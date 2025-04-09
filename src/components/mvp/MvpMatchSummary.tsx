
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MvpMatchSummary = () => {
  return (
    <Card className="bg-gray-900/60 border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-athlex-accent" />
            Recent Match Summary
          </CardTitle>
          <Badge className="bg-green-600/80">Win</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-medium">FC Barcelona vs Real Madrid</h3>
          <p className="text-sm text-gray-400">La Liga • May 12, 2023 • Camp Nou</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800/70 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Score</p>
            <p className="text-xl font-semibold">3 - 1</p>
          </div>
          <div className="bg-gray-800/70 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Minutes Played</p>
            <p className="text-xl font-semibold">87'</p>
          </div>
          <div className="bg-gray-800/70 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Team Possession</p>
            <p className="text-xl font-semibold">58%</p>
          </div>
          <div className="bg-gray-800/70 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Player Rating</p>
            <p className="text-xl font-semibold">8.4</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium text-gray-300">Performance Changes</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between bg-green-950/30 border border-green-900/30 p-3 rounded-lg">
              <div>
                <p className="text-sm text-gray-300">Pass Completion</p>
                <p className="text-lg font-medium">+4.2%</p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between bg-green-950/30 border border-green-900/30 p-3 rounded-lg">
              <div>
                <p className="text-sm text-gray-300">Distance Covered</p>
                <p className="text-lg font-medium">+0.6 km</p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between bg-red-950/30 border border-red-900/30 p-3 rounded-lg">
              <div>
                <p className="text-sm text-gray-300">Duels Won</p>
                <p className="text-lg font-medium">-2.1%</p>
              </div>
              <ArrowDownRight className="h-5 w-5 text-red-500" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MvpMatchSummary;
