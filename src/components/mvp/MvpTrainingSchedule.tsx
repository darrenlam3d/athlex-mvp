
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

const MvpTrainingSchedule = () => {
  return (
    <Card className="bg-gray-900/60 border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-athlex-accent" />
            Upcoming Training Schedule
          </CardTitle>
          <Badge className="bg-athlex-accent/80">Week 22</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Today's session */}
            <div className="bg-athlex-accent/10 border border-athlex-accent/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-athlex-accent" />
                  Today - Morning Session
                </h3>
                <Badge variant="outline" className="border-green-500 text-green-500">In Progress</Badge>
              </div>
              <p className="text-sm mb-3">Focus on ball control and first touch drills based on your last performance analysis.</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock className="h-3.5 w-3.5" /> 9:00 AM - 11:30 AM
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <CheckCircle className="h-3.5 w-3.5" /> High Priority
                </div>
              </div>
            </div>
            
            {/* Afternoon session */}
            <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-athlex-accent" />
                  Today - Tactical Session
                </h3>
                <Badge variant="outline" className="border-gray-500 text-gray-500">Upcoming</Badge>
              </div>
              <p className="text-sm mb-3">Team tactical review and positional play exercises with video analysis.</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock className="h-3.5 w-3.5" /> 3:00 PM - 5:00 PM
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <CheckCircle className="h-3.5 w-3.5" /> Medium Priority
                </div>
              </div>
            </div>
            
            {/* Tomorrow's session */}
            <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-athlex-accent" />
                  Tomorrow - Strength & Conditioning
                </h3>
                <Badge variant="outline" className="border-gray-500 text-gray-500">Upcoming</Badge>
              </div>
              <p className="text-sm mb-3">Personalized gym session focusing on lower body strength and explosive power.</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock className="h-3.5 w-3.5" /> 8:30 AM - 10:30 AM
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <CheckCircle className="h-3.5 w-3.5" /> High Priority
                </div>
              </div>
            </div>
            
            {/* Recovery session */}
            <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-athlex-accent" />
                  Tomorrow - Recovery Session
                </h3>
                <Badge variant="outline" className="border-gray-500 text-gray-500">Upcoming</Badge>
              </div>
              <p className="text-sm mb-3">Light recovery with pool session, stretching and massage therapy.</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock className="h-3.5 w-3.5" /> 4:00 PM - 5:30 PM
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <CheckCircle className="h-3.5 w-3.5" /> Medium Priority
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-800">
            <h4 className="font-medium text-gray-300 mb-2">Weekly Focus Areas</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-athlex-accent/10 border border-athlex-accent/30 p-3 rounded-lg text-sm">
                <div className="font-medium mb-1">Ball Control & First Touch</div>
                <div className="text-gray-400 text-xs">Based on AI recommendation</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 p-3 rounded-lg text-sm">
                <div className="font-medium mb-1">Defensive Positioning</div>
                <div className="text-gray-400 text-xs">Coach's feedback</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 p-3 rounded-lg text-sm">
                <div className="font-medium mb-1">Explosive Speed</div>
                <div className="text-gray-400 text-xs">Performance data analysis</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MvpTrainingSchedule;
