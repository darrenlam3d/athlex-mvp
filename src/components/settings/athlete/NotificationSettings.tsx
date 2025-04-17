
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save, Bell } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const NotificationSettings = () => {
  const trainingNotifications = [
    { id: 'new_plan', label: 'New Training Plan', description: 'When a coach assigns you a new training plan', enabled: true },
    { id: 'reminder', label: 'Training Reminders', description: 'Reminders before scheduled training sessions', enabled: true },
    { id: 'completion', label: 'Training Completion', description: 'Reminders to log completed training sessions', enabled: true },
  ];

  const coachNotifications = [
    { id: 'feedback', label: 'Coach Feedback', description: 'When coaches leave feedback on your performance', enabled: true },
    { id: 'request', label: 'Coach Requests', description: 'When a coach requests to work with you', enabled: true },
  ];

  const performanceNotifications = [
    { id: 'weekly', label: 'Weekly Summary Reports', description: 'Weekly performance and progress reports', enabled: true },
    { id: 'goal', label: 'Goal Achievement', description: 'When you reach or make progress on goals', enabled: true },
    { id: 'fatigue', label: 'Fatigue & Readiness Warnings', description: 'Alerts when your readiness is below threshold', enabled: false },
  ];

  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-white">
          <Bell className="h-5 w-5 text-athlex-accent" />
          Notification Settings
        </CardTitle>
        <CardDescription className="text-athlex-gray-400">
          Manage what notifications you receive and how
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-white font-medium">All Notifications</Label>
            <p className="text-sm text-athlex-gray-400">Master toggle for all notifications</p>
          </div>
          <Switch
            checked={true}
            onCheckedChange={() => {}}
          />
        </div>

        <Separator className="bg-athlex-gray-800" />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Training Notifications</h3>
          <div className="space-y-4">
            {trainingNotifications.map(notification => (
              <div key={notification.id} className="flex items-center justify-between">
                <div>
                  <Label htmlFor={notification.id} className="text-white">{notification.label}</Label>
                  <p className="text-sm text-athlex-gray-400">{notification.description}</p>
                </div>
                <Switch
                  id={notification.id}
                  checked={notification.enabled}
                  onCheckedChange={() => {}}
                />
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-athlex-gray-800" />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Coach Interactions</h3>
          <div className="space-y-4">
            {coachNotifications.map(notification => (
              <div key={notification.id} className="flex items-center justify-between">
                <div>
                  <Label htmlFor={notification.id} className="text-white">{notification.label}</Label>
                  <p className="text-sm text-athlex-gray-400">{notification.description}</p>
                </div>
                <Switch
                  id={notification.id}
                  checked={notification.enabled}
                  onCheckedChange={() => {}}
                />
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-athlex-gray-800" />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Performance & Progress</h3>
          <div className="space-y-4">
            {performanceNotifications.map(notification => (
              <div key={notification.id} className="flex items-center justify-between">
                <div>
                  <Label htmlFor={notification.id} className="text-white">{notification.label}</Label>
                  <p className="text-sm text-athlex-gray-400">{notification.description}</p>
                </div>
                <Switch
                  id={notification.id}
                  checked={notification.enabled}
                  onCheckedChange={() => {}}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            className="bg-athlex-accent hover:bg-athlex-accent-alt"
            onClick={() => toast.success('Notification settings saved successfully')}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
