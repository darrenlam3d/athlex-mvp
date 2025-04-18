import React, { useCallback, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LucideIcon, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface NavItem {
  icon: LucideIcon;
  text: string;
  path: string;
}

interface SharedSidebarProps {
  navItems: NavItem[];
}

const SharedSidebar = ({ navItems }: SharedSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);

  // Handle navigation with debounce to prevent rapid clicks
  const handleNavigation = useCallback((path: string) => {
    // Prevent navigation during transition
    if (isTransitioning) return false;
    
    // Debounce rapid clicks (300ms)
    const now = Date.now();
    if (now - lastClickTime < 300) {
      return false;
    }
    
    // Set transitioning state and update last click time
    setIsTransitioning(true);
    setLastClickTime(now);
    
    // Check if we're already on this path
    if (location.pathname === path) {
      setIsTransitioning(false);
      return false;
    }
    
    // Perform navigation
    try {
      navigate(path);
      return true;
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("An error occurred while navigating");
      setIsTransitioning(false);
      return false;
    }
  }, [isTransitioning, lastClickTime, location.pathname, navigate]);

  // Reset transitioning state when location changes
  React.useEffect(() => {
    setIsTransitioning(false);
  }, [location]);

  // Handle sign out with navigation
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Successfully signed out');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b border-athlex-gray-800">
        <NavLink to="/" className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/4fa9ab4b-66d6-42dc-979f-661fee5226e5.png" 
            alt="ATHLEX Logo" 
            className="h-10 w-auto" 
          />
        </NavLink>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname.startsWith(item.path.split('/').slice(0, 3).join('/'))}
                disabled={isTransitioning}
              >
                <NavLink
                  to={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.path);
                  }}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                      isActive
                        ? 'bg-athlex-gray-800 text-athlex-accent'
                        : 'text-white/70 hover:bg-athlex-gray-800 hover:text-white',
                      isTransitioning && 'opacity-50 pointer-events-none'
                    )
                  }
                >
                  <item.icon size={18} />
                  <span>{item.text}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-athlex-gray-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-white/70 hover:text-white"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SharedSidebar;
