
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AthleteLayout from '@/layouts/AthleteLayout';
import ProfileSettings from '@/components/settings/athlete/ProfileSettings';
import PerformanceSettings from '@/components/settings/athlete/PerformanceSettings';
import WearableSettings from '@/components/settings/athlete/WearableSettings';
import TrainingSettings from '@/components/settings/athlete/TrainingSettings';
import NotificationSettings from '@/components/settings/athlete/NotificationSettings';
import PrivacySettings from '@/components/settings/athlete/PrivacySettings';
import AccountSettings from '@/components/settings/AccountSettings';

const AthleteSettings = () => {
  return (
    <AthleteLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-7 mb-6 bg-athlex-gray-800">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="wearables">Wearables</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>
          
          <TabsContent value="performance">
            <PerformanceSettings />
          </TabsContent>
          
          <TabsContent value="wearables">
            <WearableSettings />
          </TabsContent>
          
          <TabsContent value="training">
            <TrainingSettings />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="privacy">
            <PrivacySettings />
          </TabsContent>
          
          <TabsContent value="account">
            <AccountSettings />
          </TabsContent>
        </Tabs>
      </div>
    </AthleteLayout>
  );
};

export default AthleteSettings;
