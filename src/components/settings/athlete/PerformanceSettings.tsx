
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { BarChart2, Save } from 'lucide-react';

const PerformanceSettings = () => {
  const [showStats, setShowStats] = React.useState(true);
  const [goalValue, setGoalValue] = React.useState(75);

  const metrics = [
    { id: 'speed', label: 'Speed', enabled: true },
    { id: 'distance', label: 'Distance', enabled: true },
    { id: 'heartRate', label: 'Heart Rate', enabled: false },
    { id: 'calories', label: 'Calories Burned', enabled: true },
  ];

  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-white">
          <BarChart2 className="h-5 w-5 text-athlex-accent" />
          Performance Preferences
        </CardTitle>
        <CardDescription className="text-athlex-gray-400">
          Customize your performance tracking and visibility settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-white text-lg">Dashboard Metrics</Label>
          <div className="grid gap-4">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex items-center justify-between">
                <Label htmlFor={metric.id} className="text-white">
                  {metric.label}
                </Label>
                <Switch
                  id={metric.id}
                  checked={metric.enabled}
                  onCheckedChange={() => {}}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-athlex-gray-800">
          <div className="flex items-center justify-between">
            <Label className="text-white">Public Stats Visibility</Label>
            <Switch
              checked={showStats}
              onCheckedChange={setShowStats}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-athlex-gray-800">
          <Label className="text-white">Performance Goal Target (%)</Label>
          <Slider
            value={[goalValue]}
            onValueChange={(value) => setGoalValue(value[0])}
            max={100}
            step={1}
            className="w-full"
          />
          <p className="text-sm text-athlex-gray-400">Current target: {goalValue}%</p>
        </div>

        <div className="space-y-4 pt-4 border-t border-athlex-gray-800">
          <Label className="text-white">Benchmark Comparison Group</Label>
          <Select defaultValue="peers">
            <SelectTrigger className="w-full bg-athlex-gray-800 border-athlex-gray-700">
              <SelectValue placeholder="Select comparison group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="peers">Peers (Same Age & Level)</SelectItem>
              <SelectItem value="elite">Elite Athletes</SelectItem>
              <SelectItem value="average">Average Players</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end pt-4">
          <Button className="bg-athlex-accent hover:bg-athlex-accent-alt">
            <Save className="mr-2 h-4 w-4" />
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceSettings;
