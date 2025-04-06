
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BasicInfo from '@/components/settings/BasicInfo';
import FootballProfile from '@/components/settings/FootballProfile';
import NotificationPreferences from '@/components/settings/NotificationPreferences';
import PrivacyControls from '@/components/settings/PrivacyControls';
import ProgressSnapshot from '@/components/settings/ProgressSnapshot';

const Settings = () => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">Settings & Profile</h1>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main settings area - 2/3 width */}
                <div className="lg:col-span-2">
                  <Tabs defaultValue="basic-info" className="w-full">
                    <TabsList className="grid grid-cols-4 mb-6 bg-gray-800">
                      <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
                      <TabsTrigger value="football-profile">Football Profile</TabsTrigger>
                      <TabsTrigger value="notifications">Notifications</TabsTrigger>
                      <TabsTrigger value="privacy">Privacy</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="basic-info" className="space-y-6">
                      <BasicInfo />
                    </TabsContent>
                    
                    <TabsContent value="football-profile" className="space-y-6">
                      <FootballProfile />
                    </TabsContent>
                    
                    <TabsContent value="notifications" className="space-y-6">
                      <NotificationPreferences />
                    </TabsContent>
                    
                    <TabsContent value="privacy" className="space-y-6">
                      <PrivacyControls />
                    </TabsContent>
                  </Tabs>
                </div>
                
                {/* Right sidebar - 1/3 width */}
                <div>
                  <ProgressSnapshot />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Settings;
