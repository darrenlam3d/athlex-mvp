
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Eye, Lock, Shield, Save, AlertTriangle, Activity, ChartBar, Download } from 'lucide-react';

const PrivacyControls = () => {
  return (
    <div className="space-y-6">
      <Card className="border-gray-700 bg-card">
        <CardContent className="pt-6 space-y-6">
          <h3 className="text-lg font-medium">Profile Visibility</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-900/20 p-2 rounded-full">
                  <Eye className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <Label htmlFor="discovery-mode" className="block font-medium mb-1">Discovery Mode</Label>
                  <p className="text-xs text-gray-400">
                    When enabled, your profile can be discovered by scouts and coaches
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Switch id="discovery-mode" defaultChecked />
                <span className="text-xs text-gray-400">On</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-900/20 p-2 rounded-full">
                  <Activity className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <Label htmlFor="performance-metrics" className="block font-medium mb-1">Performance Metrics</Label>
                  <p className="text-xs text-gray-400">
                    Control who can see your detailed performance metrics
                  </p>
                </div>
              </div>
              <div>
                <RadioGroup defaultValue="verified">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="metrics-public" />
                    <Label htmlFor="metrics-public" className="text-sm">Public</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="verified" id="metrics-verified" />
                    <Label htmlFor="metrics-verified" className="text-sm">Verified Users</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="metrics-private" />
                    <Label htmlFor="metrics-private" className="text-sm">Private</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-900/20 p-2 rounded-full">
                  <ChartBar className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <Label htmlFor="peer-comparison" className="block font-medium mb-1">Peer Comparison</Label>
                  <p className="text-xs text-gray-400">
                    Allow your anonymized data to be used in peer comparisons
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Switch id="peer-comparison" defaultChecked />
                <span className="text-xs text-gray-400">On</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-gray-700 bg-card">
        <CardContent className="pt-6 space-y-6">
          <h3 className="text-lg font-medium">Account Security & Data</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-900/20 p-2 rounded-full">
                  <Lock className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <Label className="block font-medium mb-1">Two-Factor Authentication</Label>
                  <p className="text-xs text-gray-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-900/20 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <Label className="block font-medium mb-1">Change Password</Label>
                  <p className="text-xs text-gray-400">
                    Update your password regularly for better security
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-900/20 p-2 rounded-full">
                  <Download className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <Label className="block font-medium mb-1">Download Your Data</Label>
                  <p className="text-xs text-gray-400">
                    Export all your performance data and profile information
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">Export</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-red-900/20 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <Label className="block font-medium mb-1">Delete Account</Label>
                  <p className="text-xs text-gray-400">
                    Permanently delete your account and all associated data
                  </p>
                </div>
              </div>
              <Button variant="destructive" size="sm">Delete</Button>
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
    </div>
  );
};

export default PrivacyControls;
