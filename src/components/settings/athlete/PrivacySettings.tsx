
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Save, Shield, Share2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const PrivacySettings = () => {
  const [profileVisibility, setProfileVisibility] = React.useState('coaches');
  
  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-white">
          <Shield className="h-5 w-5 text-athlex-accent" />
          Privacy & Sharing Settings
        </CardTitle>
        <CardDescription className="text-athlex-gray-400">
          Control who can see your profile and performance data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Profile Visibility</h3>
          <RadioGroup 
            value={profileVisibility} 
            onValueChange={setProfileVisibility}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 rounded-md border border-athlex-gray-700 p-3 bg-athlex-gray-800">
              <RadioGroupItem value="public" id="visibility-public" />
              <div className="flex-1">
                <Label htmlFor="visibility-public" className="text-white">Public</Label>
                <p className="text-sm text-athlex-gray-400">Anyone can view your profile and basic stats</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 rounded-md border border-athlex-accent/50 p-3 bg-athlex-accent/10">
              <RadioGroupItem value="coaches" id="visibility-coaches" />
              <div className="flex-1">
                <Label htmlFor="visibility-coaches" className="text-white">Coaches & Scouts Only</Label>
                <p className="text-sm text-athlex-gray-400">Only verified coaches and scouts can view your full profile</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 rounded-md border border-athlex-gray-700 p-3 bg-athlex-gray-800">
              <RadioGroupItem value="private" id="visibility-private" />
              <div className="flex-1">
                <Label htmlFor="visibility-private" className="text-white">Private</Label>
                <p className="text-sm text-athlex-gray-400">Only you and approved connections can view your profile</p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <Separator className="bg-athlex-gray-800" />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Scout Access Permissions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Allow Scout Search</Label>
                <p className="text-sm text-athlex-gray-400">Let scouts find you in search results</p>
              </div>
              <Switch
                checked={true}
                onCheckedChange={() => {}}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Performance Metrics Visibility</Label>
                <p className="text-sm text-athlex-gray-400">Show detailed metrics to scouts</p>
              </div>
              <Switch
                checked={true}
                onCheckedChange={() => {}}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Training History Access</Label>
                <p className="text-sm text-athlex-gray-400">Allow scouts to view your training history</p>
              </div>
              <Switch
                checked={false}
                onCheckedChange={() => {}}
              />
            </div>
          </div>
        </div>

        <Separator className="bg-athlex-gray-800" />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Shareable Profile</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Enable Shareable Profile</Label>
                <p className="text-sm text-athlex-gray-400">Create a public link to share with others</p>
              </div>
              <Switch
                checked={true}
                onCheckedChange={() => {}}
              />
            </div>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="bg-athlex-gray-800 border-athlex-gray-700 text-white hover:bg-athlex-gray-700"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Generate Shareable Link
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            className="bg-athlex-accent hover:bg-athlex-accent-alt"
            onClick={() => toast.success('Privacy settings saved successfully')}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacySettings;
