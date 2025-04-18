
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

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
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const handleNavigation = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
  };

  React.useEffect(() => {
    // Reset transitioning state when location changes
    setIsTransitioning(false);
  }, [location]);

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
                  onClick={handleNavigation}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                      isActive
                        ? 'bg-athlex-gray-800 text-athlex-accent'
                        : 'text-white/70 hover:bg-athlex-gray-800 hover:text-white'
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
    </Sidebar>
  );
};

export default SharedSidebar;
