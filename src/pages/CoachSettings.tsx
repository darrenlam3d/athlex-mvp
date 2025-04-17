
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import CoachSidebar from '@/components/dashboard/CoachSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BasicInfo from '@/components/settings/BasicInfo';
import NotificationPreferences from '@/components/settings/NotificationPreferences';
import PrivacyControls from '@/components/settings/PrivacyControls';
import CoachTeamSettings from '@/components/settings/CoachTeamSettings';
import CoachAvailability from '@/components/settings/CoachAvailability';

const CoachSettings = () => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <CoachSidebar />
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold mb-6">Coach Settings</h1>
              
              <Tabs defaultValue="basic-info" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6 bg-gray-800">
                  <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
                  <TabsTrigger value="team">Team Management</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic-info">
                  <BasicInfo />
                </TabsContent>
                
                <TabsContent value="team">
                  <CoachTeamSettings />
                </TabsContent>
                
                <TabsContent value="availability">
                  <CoachAvailability />
                </TabsContent>
                
                <TabsContent value="notifications">
                  <NotificationPreferences />
                </TabsContent>
                
                <TabsContent value="privacy">
                  <PrivacyControls />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default CoachSettings;
