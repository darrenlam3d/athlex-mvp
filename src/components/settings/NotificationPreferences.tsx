
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, Calendar, Award, Video, Target, Users, MessageSquare, Save } from 'lucide-react';

const NotificationPreferences = () => {
  return (
    <div className="space-y-6">
      <Card className="border-gray-700 bg-card">
        <CardContent className="pt-6 space-y-6">
          <h3 className="text-lg font-medium">App & Email Notifications</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-900/20 p-2 rounded-full">
                  <Video className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <Label htmlFor="training-alerts" className="block font-medium mb-1">AI Coach Training Alerts</Label>
                  <p className="text-xs text-gray-400">
                    Receive notifications when your AI coach has training suggestions
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Switch id="training-alerts" defaultChecked />
                <span className="text-xs text-gray-400">On</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-900/20 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <Label htmlFor="training-reminders" className="block font-medium mb-1">Training Session Reminders</Label>
                  <p className="text-xs text-gray-400">
                    Get reminders about upcoming scheduled training sessions
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Switch id="training-reminders" defaultChecked />
                <span className="text-xs text-gray-400">On</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-900/20 p-2 rounded-full">
                  <Target className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <Label htmlFor="goal-progress" className="block font-medium mb-1">Goal Progress Updates</Label>
                  <p className="text-xs text-gray-400">
                    Receive updates on your progress towards set goals
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Switch id="goal-progress" defaultChecked />
                <span className="text-xs text-gray-400">On</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-900/20 p-2 rounded-full">
                  <Award className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <Label htmlFor="achievement-alerts" className="block font-medium mb-1">Achievement Alerts</Label>
                  <p className="text-xs text-gray-400">
                    Get notified when you earn new badges or achievements
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Switch id="achievement-alerts" defaultChecked />
                <span className="text-xs text-gray-400">On</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-gray-700 bg-card">
        <CardContent className="pt-6 space-y-6">
          <h3 className="text-lg font-medium">Social & Discovery Notifications</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-900/20 p-2 rounded-full">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <Label htmlFor="challenge-invites" className="block font-medium mb-1">Challenge Invites</Label>
                  <p className="text-xs text-gray-400">
                    Receive notifications about new challenge invitations
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Switch id="challenge-invites" defaultChecked />
                <span className="text-xs text-gray-400">On</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-900/20 p-2 rounded-full">
                  <Award className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <Label htmlFor="endorsement-requests" className="block font-medium mb-1">Endorsement Requests</Label>
                  <p className="text-xs text-gray-400">
                    Get notified about endorsement requests and completions
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Switch id="endorsement-requests" defaultChecked />
                <span className="text-xs text-gray-400">On</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-orange-900/20 p-2 rounded-full">
                  <Bell className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <Label htmlFor="scout-interest" className="block font-medium mb-1">Scout Interest Alerts</Label>
                  <p className="text-xs text-gray-400">
                    Receive notifications when scouts view your profile
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Switch id="scout-interest" defaultChecked />
                <span className="text-xs text-gray-400">On</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-900/20 p-2 rounded-full">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <Label htmlFor="message-alerts" className="block font-medium mb-1">Message Notifications</Label>
                  <p className="text-xs text-gray-400">
                    Get alerts for new direct messages and mentions
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Switch id="message-alerts" defaultChecked />
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
    </div>
  );
};

export default NotificationPreferences;
