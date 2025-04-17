
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Save, Calendar, Clock, Globe } from 'lucide-react';

const CoachAvailability = () => {
  return (
    <Card className="border-gray-700 bg-card">
      <CardContent className="pt-6 space-y-6">
        <h3 className="text-lg font-medium">Availability Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-900/20 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <Label htmlFor="auto-schedule" className="block font-medium mb-1">Automatic Scheduling</Label>
                <p className="text-xs text-gray-400">
                  Allow athletes to book available time slots automatically
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Switch id="auto-schedule" defaultChecked />
              <span className="text-xs text-gray-400">On</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-900/20 p-2 rounded-full">
                <Clock className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <Label htmlFor="buffer-time" className="block font-medium mb-1">Session Buffer Time</Label>
                <p className="text-xs text-gray-400">
                  Add buffer time between training sessions
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Switch id="buffer-time" defaultChecked />
              <span className="text-xs text-gray-400">15 min</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-900/20 p-2 rounded-full">
                <Globe className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <Label htmlFor="timezone-sync" className="block font-medium mb-1">Timezone Sync</Label>
                <p className="text-xs text-gray-400">
                  Automatically adjust schedules for different timezones
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Switch id="timezone-sync" defaultChecked />
              <span className="text-xs text-gray-400">On</span>
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoachAvailability;
