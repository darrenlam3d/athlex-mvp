
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Save, Watch } from 'lucide-react';
import { toast } from 'sonner';

const WearableSettings = () => {
  const [syncing, setSyncing] = React.useState(false);
  const [lastSync, setLastSync] = React.useState<string | null>(null);
  
  const wearables = [
    { id: 'apple', name: 'Apple HealthKit', connected: true, metrics: ['Heart Rate', 'Steps', 'Sleep', 'Calories'] },
    { id: 'garmin', name: 'Garmin Connect', connected: false, metrics: ['Heart Rate', 'GPS', 'Running Metrics'] },
    { id: 'android', name: 'Android Health', connected: false, metrics: ['Steps', 'Heart Rate', 'Activity'] },
  ];

  const metrics = [
    { id: 'heart_rate', label: 'Heart Rate', enabled: true },
    { id: 'steps', label: 'Steps', enabled: true },
    { id: 'distance', label: 'Distance', enabled: true },
    { id: 'sleep', label: 'Sleep', enabled: false },
    { id: 'calories', label: 'Calories Burned', enabled: true },
  ];

  const handleSyncNow = () => {
    setSyncing(true);
    // Simulate sync
    setTimeout(() => {
      setSyncing(false);
      setLastSync(new Date().toLocaleString());
      toast.success('Wearable data synchronized successfully');
    }, 2000);
  };

  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-white">
          <Watch className="h-5 w-5 text-athlex-accent" />
          Wearable Device Settings
        </CardTitle>
        <CardDescription className="text-athlex-gray-400">
          Connect and manage your wearable fitness devices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Connected Devices</h3>
          <div className="space-y-4">
            {wearables.map((device) => (
              <div key={device.id} className="flex items-center justify-between border-b border-athlex-gray-800 pb-3">
                <div>
                  <p className="text-white font-medium">{device.name}</p>
                  <p className="text-sm text-athlex-gray-400">
                    {device.connected ? 
                      `Connected · Syncing ${device.metrics.join(', ')}` : 
                      'Not connected'}
                  </p>
                </div>
                <Switch 
                  checked={device.connected}
                  onCheckedChange={() => {
                    toast.success(device.connected ? 
                      `Disconnected from ${device.name}` : 
                      `Connected to ${device.name}`);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-medium text-white">Metrics to Sync</h3>
          <div className="grid gap-3">
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

        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <Label className="text-white">Daily Automatic Sync</Label>
            <Switch
              checked={true}
              onCheckedChange={() => {}}
            />
          </div>
        </div>

        <div className="pt-4 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-between sm:items-center">
          <div>
            {lastSync && (
              <p className="text-sm text-athlex-gray-400">Last synced: {lastSync}</p>
            )}
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={handleSyncNow} 
              disabled={syncing}
              className="bg-athlex-accent hover:bg-athlex-accent-alt"
            >
              {syncing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {!syncing && <Watch className="mr-2 h-4 w-4" />}
              Sync Now
            </Button>
            <Button className="bg-athlex-accent hover:bg-athlex-accent-alt">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WearableSettings;
