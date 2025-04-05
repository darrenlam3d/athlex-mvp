
import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, Activity, Video, Users, Search, MessageSquare, Settings, Plus, LogOut } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const DashboardSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        {/* Profile quick access */}
        <div className="py-4 px-4 border-b border-gray-700/50">
          <Link to="/" className="block mb-4">
            <img 
              src="/lovable-uploads/8f087e79-abca-4837-ac54-e0f2ef1c9421.png" 
              alt="ATHLEX Logo" 
              className="h-8" 
            />
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21" alt="Alex Thompson" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <h3 className="font-semibold truncate">Alex Thompson</h3>
              <p className="text-xs text-gray-400 truncate">Basketball · Point Guard</p>
            </div>
          </div>
        </div>
        
        <SidebarMenu className="mt-4">
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
      
      <SidebarFooter className="border-t border-gray-700/50 px-4 py-4 mt-auto space-y-3">
        <Button className="w-full" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Log Training
        </Button>
        <Button className="w-full" variant="outline" size="sm">
          Share Profile
        </Button>
        <Button className="w-full justify-start text-gray-400 hover:text-white" variant="ghost" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
