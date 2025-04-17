
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import ScoutSidebar from '@/components/dashboard/ScoutSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BasicInfo from '@/components/settings/BasicInfo';
import NotificationPreferences from '@/components/settings/NotificationPreferences';
import PrivacyControls from '@/components/settings/PrivacyControls';
import ScoutingPreferences from '@/components/settings/ScoutingPreferences';
import ScoutReportTemplates from '@/components/settings/ScoutReportTemplates';
import AccountSettings from '@/components/settings/AccountSettings';
import ScoutLayout from '@/layouts/ScoutLayout';

const ScoutSettings = () => {
  return (
    <ScoutLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Scout Settings</h1>
        
        <Tabs defaultValue="basic-info" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-6 bg-athlex-gray-800">
            <TabsTrigger value="basic-info">Profile Info</TabsTrigger>
            <TabsTrigger value="preferences">Scouting Preferences</TabsTrigger>
            <TabsTrigger value="templates">Evaluation Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic-info">
            <BasicInfo />
          </TabsContent>
          
          <TabsContent value="preferences">
            <ScoutingPreferences />
          </TabsContent>
          
          <TabsContent value="templates">
            <ScoutReportTemplates />
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
    </ScoutLayout>
  );
};

export default ScoutSettings;
