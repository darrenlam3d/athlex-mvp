
import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, Activity, Video, Users, Search, MessageSquare, Settings, Plus } from 'lucide-react';

const DashboardSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="py-4 px-4">
          <Link to="/">
            <img 
              src="/lovable-uploads/8f087e79-abca-4837-ac54-e0f2ef1c9421.png" 
              alt="ATHLEX Logo" 
              className="h-8 mb-6" 
            />
          </Link>
        </div>
        
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={true} tooltip="Dashboard">
              <Link to="/dashboard">
                <Home />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="My Performance">
              <Link to="#">
                <Activity />
                <span>My Performance</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Training & Insights">
              <Link to="#">
                <Video />
                <span>Training & Insights</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Community & Challenges">
              <Link to="#">
                <Users />
                <span>Community & Challenges</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Talent Discovery">
              <Link to="#">
                <Search />
                <span>Talent Discovery</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Messages & Endorsements">
              <Link to="#">
                <MessageSquare />
                <span>Messages & Endorsements</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings & Profile">
              <Link to="#">
                <Settings />
                <span>Settings & Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-gray-700 px-4 py-4 mt-auto">
        <Button className="w-full mb-2" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Log Training
        </Button>
        <Button className="w-full" variant="outline" size="sm">
          Share Profile
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
