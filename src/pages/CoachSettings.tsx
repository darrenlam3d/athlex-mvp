
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BasicInfo from '@/components/settings/BasicInfo';
import NotificationPreferences from '@/components/settings/NotificationPreferences';
import PrivacyControls from '@/components/settings/PrivacyControls';
import CoachTeamSettings from '@/components/settings/CoachTeamSettings';
import CoachTrainingSettings from '@/components/settings/CoachTrainingSettings';
import CoachPermissionsSettings from '@/components/settings/CoachPermissionsSettings';
import AccountSettings from '@/components/settings/AccountSettings';
import CoachLayout from '@/layouts/CoachLayout';

const CoachSettings = () => {
  return (
    <CoachLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Coach Settings</h1>
        
        <Tabs defaultValue="basic-info" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-7 mb-6 bg-athlex-gray-800">
            <TabsTrigger value="basic-info">Profile Info</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic-info">
            <BasicInfo />
          </TabsContent>
          
          <TabsContent value="team">
            <CoachTeamSettings />
          </TabsContent>
          
          <TabsContent value="training">
            <CoachTrainingSettings />
          </TabsContent>
          
          <TabsContent value="permissions">
            <CoachPermissionsSettings />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationPreferences />
          </TabsContent>
          
          <TabsContent value="privacy">
            <PrivacyControls />
          </TabsContent>
          
          <TabsContent value="account">
            <AccountSettings />
          </TabsContent>
        </Tabs>
      </div>
    </CoachLayout>
  );
};

export default CoachSettings;
