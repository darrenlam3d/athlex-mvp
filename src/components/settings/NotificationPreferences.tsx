
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Bell, MessageSquare, Clipboard, User, Users, Calendar, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotificationPreferences = () => {
  const { userRole } = useUserRole();
  
  // Notification groups specific to different user roles
  const coachNotifications = [
    { id: 'logsSubmitted', label: 'Logs Submitted', description: 'Get notified when athletes submit training or nutrition logs', icon: Calendar, isOn: true },
    { id: 'injuryFlags', label: 'Injury Flags', description: 'Immediate notifications for injury reports', icon: AlertTriangle, isOn: true },
    { id: 'coachMessages', label: 'Messages', description: 'Receive notifications for new messages', icon: MessageSquare, isOn: true },
  ];
  
  const athleteNotifications = [
    { id: 'trainingReminders', label: 'Training Reminders', description: 'Get reminders about upcoming training sessions', icon: Calendar, isOn: true },
    { id: 'coachFeedback', label: 'Coach Feedback', description: 'Notifications when coaches provide feedback', icon: Users, isOn: true },
    { id: 'athleteMessages', label: 'Messages', description: 'Receive notifications for new messages', icon: MessageSquare, isOn: true },
  ];
  
  // Determine which notification set to use based on role
  const notificationGroups = 
    userRole === 'coach' ? coachNotifications : athleteNotifications;
    
  const [notifications, setNotifications] = React.useState(notificationGroups);

  const toggleNotification = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, isOn: !notification.isOn } : notification
      )
    );
  };

  const savePreferences = () => {
    console.log('Saving notification preferences:', notifications);
    // TODO: Save to Supabase
  };

  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-white">
          <Bell className="h-5 w-5 text-athlex-accent" />
          Notification Preferences
        </CardTitle>
        <CardDescription className="text-athlex-gray-400">
          Manage which notifications you receive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-center justify-between py-3 border-b border-athlex-gray-800">
            <div className="flex items-start gap-4">
              <notification.icon className="h-5 w-5 mt-0.5 text-athlex-accent" />
              <div>
                <Label htmlFor={notification.id} className="text-white font-medium">
                  {notification.label}
                </Label>
                <p className="text-sm text-athlex-gray-400">
                  {notification.description}
                </p>
              </div>
            </div>
            <Switch
              id={notification.id}
              checked={notification.isOn}
              onCheckedChange={() => toggleNotification(notification.id)}
            />
          </div>
        ))}
      
        <div className="pt-4 flex justify-end">
          <Button onClick={savePreferences} className="bg-athlex-accent hover:bg-athlex-accent-alt">
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPreferences;
