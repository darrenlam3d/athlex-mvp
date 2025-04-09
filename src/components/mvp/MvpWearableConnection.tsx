
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Watch, Smartphone, BarChart, ChevronDown, RefreshCw, Check } from 'lucide-react';
import { toast } from 'sonner';

const MvpWearableConnection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [wearableType, setWearableType] = useState('garmin');
  const [simulateData, setSimulateData] = useState(true);
  const [syncing, setSyncing] = useState(false);
  
  const handleSync = () => {
    setSyncing(true);
    // Simulate syncing process
    setTimeout(() => {
      setSyncing(false);
      toast.success('Wearable data successfully synced', {
        description: 'Latest metrics have been updated',
        action: {
          label: 'View',
          onClick: () => setIsExpanded(true)
        },
      });
    }, 2000);
  };
  
  return (
    <Collapsible 
      open={isExpanded} 
      onOpenChange={setIsExpanded} 
      className="w-full bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden"
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Watch className="h-5 w-5 text-athlex-accent" />
          <div>
            <h3 className="text-sm font-medium">Wearable Data Connection</h3>
            <p className="text-xs text-gray-400">
              {simulateData 
                ? 'Using simulated wearable data for demo' 
                : `Connected to ${wearableType === 'garmin' ? 'Garmin Connect' : wearableType === 'apple' ? 'Apple Health' : 'Android Health'}`
              }
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-athlex-accent border-athlex-accent/30 hover:bg-athlex-accent/10"
            onClick={handleSync}
            disabled={syncing}
          >
            {syncing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-1" />
                Sync Now
              </>
            )}
          </Button>
          
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-400">
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      
      <CollapsibleContent>
        <CardContent className="pt-0 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="simulate-data" className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-gray-400" />
                  Simulate Wearable Data
                </Label>
                <Switch
                  id="simulate-data"
                  checked={simulateData}
                  onCheckedChange={setSimulateData}
                />
              </div>
              
              <div>
                <Label htmlFor="wearable-type" className="text-sm mb-2 block">Wearable Platform</Label>
                <Select value={wearableType} onValueChange={setWearableType}>
                  <SelectTrigger id="wearable-type" className="w-full">
                    <SelectValue placeholder="Select wearable type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="garmin">
                      <div className="flex items-center gap-2">
                        <Watch className="h-4 w-4" />
                        Garmin Connect
                      </div>
                    </SelectItem>
                    <SelectItem value="apple">
                      <div className="flex items-center gap-2">
                        <Watch className="h-4 w-4" />
                        Apple HealthKit
                      </div>
                    </SelectItem>
                    <SelectItem value="android">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        Android Health Connect
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Button 
                  className="w-full bg-athlex-accent hover:bg-athlex-accent/90"
                  onClick={() => {
                    toast.success('Settings saved successfully');
                    setIsExpanded(false);
                  }}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Save Connection Settings
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Connected Data Types</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Heart Rate', enabled: true },
                  { label: 'Sleep Data', enabled: true },
                  { label: 'Activity Tracking', enabled: true },
                  { label: 'VO2 Max', enabled: true },
                  { label: 'HRV Analysis', enabled: true },
                  { label: 'Running Dynamics', enabled: false },
                  { label: 'Strength Workouts', enabled: true },
                  { label: 'Calories Burned', enabled: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${item.enabled ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-xs text-gray-400 mt-2">
                <p>Last sync: Today at 10:45 AM</p>
                <p className="mt-1">
                  Note: Simulated data is used for demonstration purposes. 
                  In a real implementation, actual wearable data would be imported.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MvpWearableConnection;
