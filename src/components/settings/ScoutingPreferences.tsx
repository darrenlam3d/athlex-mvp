
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Save, Target, Filter, Flag } from 'lucide-react';

const ScoutingPreferences = () => {
  return (
    <Card className="border-gray-700 bg-card">
      <CardContent className="pt-6 space-y-6">
        <h3 className="text-lg font-medium">Scouting Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-900/20 p-2 rounded-full">
                <Target className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <Label htmlFor="auto-recommendations" className="block font-medium mb-1">Automatic Recommendations</Label>
                <p className="text-xs text-gray-400">
                  Receive AI-powered athlete recommendations
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Switch id="auto-recommendations" defaultChecked />
              <span className="text-xs text-gray-400">On</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-900/20 p-2 rounded-full">
                <Filter className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <Label htmlFor="scouting-focus" className="block font-medium mb-1">Scouting Focus</Label>
                <p className="text-xs text-gray-400">
                  Set your primary scouting criteria
                </p>
              </div>
            </div>
            <div>
              <RadioGroup defaultValue="balanced">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="performance" id="focus-performance" />
                  <Label htmlFor="focus-performance" className="text-sm">Performance</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="potential" id="focus-potential" />
                  <Label htmlFor="focus-potential" className="text-sm">Potential</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="balanced" id="focus-balanced" />
                  <Label htmlFor="focus-balanced" className="text-sm">Balanced</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-900/20 p-2 rounded-full">
                <Flag className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <Label htmlFor="talent-alerts" className="block font-medium mb-1">Talent Alerts</Label>
                <p className="text-xs text-gray-400">
                  Get notified about exceptional talent matches
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Switch id="talent-alerts" defaultChecked />
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

export default ScoutingPreferences;
