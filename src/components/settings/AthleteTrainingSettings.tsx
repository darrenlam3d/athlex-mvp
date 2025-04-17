
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Save, Activity, Timer, Dumbbell } from 'lucide-react';

const AthleteTrainingSettings = () => {
  return (
    <Card className="border-gray-700 bg-card">
      <CardContent className="pt-6 space-y-6">
        <h3 className="text-lg font-medium">Training Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-900/20 p-2 rounded-full">
                <Timer className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <Label htmlFor="auto-tracking" className="block font-medium mb-1">Automatic Training Tracking</Label>
                <p className="text-xs text-gray-400">
                  Automatically track training sessions when detected
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Switch id="auto-tracking" defaultChecked />
              <span className="text-xs text-gray-400">On</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-900/20 p-2 rounded-full">
                <Activity className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <Label htmlFor="intensity-preference" className="block font-medium mb-1">Default Training Intensity</Label>
                <p className="text-xs text-gray-400">
                  Set your preferred training intensity level
                </p>
              </div>
            </div>
            <div>
              <RadioGroup defaultValue="moderate">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="intensity-light" />
                  <Label htmlFor="intensity-light" className="text-sm">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="intensity-moderate" />
                  <Label htmlFor="intensity-moderate" className="text-sm">Moderate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intense" id="intensity-intense" />
                  <Label htmlFor="intensity-intense" className="text-sm">Intense</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-900/20 p-2 rounded-full">
                <Dumbbell className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <Label htmlFor="equipment-tracking" className="block font-medium mb-1">Equipment Usage Tracking</Label>
                <p className="text-xs text-gray-400">
                  Track equipment usage and maintenance schedules
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Switch id="equipment-tracking" defaultChecked />
              <span className="text-xs text-gray-400">On</span>
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AthleteTrainingSettings;
