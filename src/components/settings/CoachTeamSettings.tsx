
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Save, Users, Briefcase, MessageSquare } from 'lucide-react';

const CoachTeamSettings = () => {
  return (
    <Card className="border-gray-700 bg-card">
      <CardContent className="pt-6 space-y-6">
        <h3 className="text-lg font-medium">Team Management Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-900/20 p-2 rounded-full">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <Label htmlFor="auto-roster" className="block font-medium mb-1">Automatic Roster Updates</Label>
                <p className="text-xs text-gray-400">
                  Automatically update team roster based on attendance
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Switch id="auto-roster" defaultChecked />
              <span className="text-xs text-gray-400">On</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-900/20 p-2 rounded-full">
                <Briefcase className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <Label htmlFor="team-visibility" className="block font-medium mb-1">Team Visibility</Label>
                <p className="text-xs text-gray-400">
                  Control who can view your team's information
                </p>
              </div>
            </div>
            <div>
              <RadioGroup defaultValue="private">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="visibility-public" />
                  <Label htmlFor="visibility-public" className="text-sm">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="visibility-private" />
                  <Label htmlFor="visibility-private" className="text-sm">Private</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="invite" id="visibility-invite" />
                  <Label htmlFor="visibility-invite" className="text-sm">Invite Only</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-900/20 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <Label htmlFor="team-chat" className="block font-medium mb-1">Team Chat</Label>
                <p className="text-xs text-gray-400">
                  Enable team-wide communication features
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Switch id="team-chat" defaultChecked />
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

export default CoachTeamSettings;
