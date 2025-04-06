
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, ChevronRight, Zap } from 'lucide-react';

const TacticalDevelopment = () => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Tactical Role Development</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Role */}
          <div className="bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-blue-300">Current Role</span>
                <h3 className="text-xl font-bold text-white">Roaming Playmaker (CM)</h3>
              </div>
              <div className="bg-blue-700/40 px-3 py-1 rounded-full text-sm">
                65% Complete
              </div>
            </div>
            
            <Progress value={65} className="h-2 mt-2 mb-4" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <h4 className="font-medium text-blue-300 mb-1">Role Attributes</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-1 text-green-400" />
                    Vision & Passing Range
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-1 text-green-400" />
                    Press Resistance
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-1 text-amber-400" />
                    Spatial Awareness
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-1 text-amber-400" />
                    Recovery Runs
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-3">
                <h4 className="font-medium text-blue-300 mb-1">Recommended Focus</h4>
                <div className="flex items-start mt-1">
                  <Zap className="h-4 w-4 text-yellow-400 mr-2 mt-0.5 shrink-0" />
                  <p className="text-sm">Improve lateral movement efficiency and zone coverage between defensive and attacking thirds</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Next Role */}
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-gray-400" />
              <div>
                <span className="text-xs text-gray-400">Next Unlockable Role</span>
                <h4 className="font-medium">Interzone Connector</h4>
              </div>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              Complete your current role development and achieve at least 80% in spatial awareness metrics to unlock this advanced tactical role.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TacticalDevelopment;
