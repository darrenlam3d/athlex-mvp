
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';

interface SidebarProps {
  navItems: {
    icon: React.ElementType;
    text: string;
    path: string;
  }[];
  logo?: string;
}

const SharedSidebar = ({ navItems, logo }: SidebarProps) => {
  const location = useLocation();
  const { signOut } = useAuth();
  
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-4 border-b border-athlex-gray-800">
        <Link to="/" className="flex items-center justify-center">
          <img 
            src={logo || "/lovable-uploads/4fa9ab4b-66d6-42dc-979f-661fee5226e5.png"} 
            alt="ATHLEX Logo" 
            className="h-10 w-auto" 
          />
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="flex-1">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton 
                isActive={location.pathname === item.path}
                tooltip={item.text}
              >
                <Link to={item.path} className="flex items-center gap-3 w-full">
                  <item.icon size={18} />
                  <span>{item.text}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-athlex-gray-800">
        <Button 
          variant="outline" 
          className="w-full justify-start text-white/70 hover:text-white border-athlex-gray-700"
          onClick={signOut}
        >
          <LogOut size={18} className="mr-2" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SharedSidebar;
