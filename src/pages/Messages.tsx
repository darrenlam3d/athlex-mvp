
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DirectMessages from '@/components/messages/DirectMessages';
import EndorsementRequests from '@/components/messages/EndorsementRequests';
import PublicEndorsements from '@/components/messages/PublicEndorsements';
import GroupChats from '@/components/messages/GroupChats';

const Messages = () => {
  const [activeTab, setActiveTab] = useState('direct-messages');
  
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold mb-6">Messages & Endorsements</h1>
              
              <Tabs defaultValue="direct-messages" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-6 bg-gray-800">
                  <TabsTrigger value="direct-messages">Direct Messages</TabsTrigger>
                  <TabsTrigger value="endorsement-requests">Endorsement Requests</TabsTrigger>
                  <TabsTrigger value="public-endorsements">Public Endorsements</TabsTrigger>
                  <TabsTrigger value="group-chats">Group Chats</TabsTrigger>
                </TabsList>
                
                <TabsContent value="direct-messages" className="space-y-6">
                  <DirectMessages />
                </TabsContent>
                
                <TabsContent value="endorsement-requests" className="space-y-6">
                  <EndorsementRequests />
                </TabsContent>
                
                <TabsContent value="public-endorsements" className="space-y-6">
                  <PublicEndorsements />
                </TabsContent>
                
                <TabsContent value="group-chats" className="space-y-6">
                  <GroupChats />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Messages;
