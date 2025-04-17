
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save, Dumbbell, BrainCircuit } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

const TrainingSettings = () => {
  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-white">
          <Dumbbell className="h-5 w-5 text-athlex-accent" />
          Training & Recovery Settings
        </CardTitle>
        <CardDescription className="text-athlex-gray-400">
          Customize your training recommendations and recovery tracking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white font-medium">AI Training Recommendations</Label>
              <p className="text-sm text-athlex-gray-400">Receive personalized training plans based on your activity</p>
            </div>
            <Switch
              checked={true}
              onCheckedChange={() => {}}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-athlex-gray-800">
          <Label className="text-white font-medium">Preferred Training Intensity</Label>
          <RadioGroup defaultValue="medium" className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="flex items-center space-x-2 rounded-md border border-athlex-gray-700 p-3 bg-athlex-gray-800">
              <RadioGroupItem value="low" id="intensity-low" />
              <Label htmlFor="intensity-low" className="text-white">Low Intensity</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border border-athlex-accent/50 p-3 bg-athlex-accent/10">
              <RadioGroupItem value="medium" id="intensity-medium" />
              <Label htmlFor="intensity-medium" className="text-white">Medium Intensity</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border border-athlex-gray-700 p-3 bg-athlex-gray-800">
              <RadioGroupItem value="high" id="intensity-high" />
              <Label htmlFor="intensity-high" className="text-white">High Intensity</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4 pt-4 border-t border-athlex-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white font-medium">Readiness & Wellness Tracking</Label>
              <p className="text-sm text-athlex-gray-400">Track daily readiness scores and get advice on recovery</p>
            </div>
            <Switch
              checked={true}
              onCheckedChange={() => {}}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-athlex-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white font-medium">Recovery Reminders</Label>
              <p className="text-sm text-athlex-gray-400">Receive reminders to prioritize recovery on rest days</p>
            </div>
            <Switch
              checked={true}
              onCheckedChange={() => {}}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-athlex-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white font-medium">Mental Training</Label>
              <p className="text-sm text-athlex-gray-400">Include mental training exercises in your plan</p>
            </div>
            <Switch
              checked={false}
              onCheckedChange={() => {}}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            className="bg-athlex-accent hover:bg-athlex-accent-alt"
            onClick={() => toast.success('Training settings saved successfully')}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingSettings;
