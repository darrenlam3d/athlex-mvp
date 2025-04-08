
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, User, Activity, Video, Users, Search, MessageSquare, Settings, Plus, LogOut, UserRound, UsersRound } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useProfile } from '@/contexts/ProfileContext';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Switch } from '@/components/ui/switch';

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { profileData } = useProfile();
  const { userRole, toggleUserRole } = useUserRole();

  const getInitials = () => {
    return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`;
  };

  const handleRoleToggle = () => {
    toggleUserRole();
    
    // Navigate to the appropriate dashboard based on role
    if (userRole === 'athlete') {
      navigate('/scout-dashboard');
    } else {
      navigate('/profile');
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        {/* Profile quick access */}
        <div className="py-4 px-4 border-b border-gray-700/50">
          <Link to="/" className="block mb-4">
            <img 
              src="/lovable-uploads/4fa9ab4b-66d6-42dc-979f-661fee5226e5.png" 
              alt="ATHLEX Logo" 
              className="h-7" 
            />
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profileData.profileImage} alt={`${profileData.firstName} ${profileData.lastName}`} />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <h3 className="font-semibold truncate">{`${profileData.firstName} ${profileData.lastName}`}</h3>
              <p className="text-xs text-gray-400 truncate">{`${profileData.sport} · ${profileData.position}`}</p>
            </div>
          </div>
          
          {/* User Role Toggle */}
          <div className="flex items-center justify-between mt-3 p-2 bg-gray-800/50 rounded-md">
            <div className="flex items-center gap-2">
              {userRole === 'athlete' ? (
                <UserRound size={16} className="text-green-400" />
              ) : (
                <UsersRound size={16} className="text-blue-400" />
              )}
              <span className="text-sm">
                {userRole === 'athlete' ? 'Athlete View' : 'Scout/Coach View'}
              </span>
            </div>
            <Switch 
              checked={userRole === 'scout'}
              onCheckedChange={handleRoleToggle}
            />
          </div>
        </div>
        
        <SidebarMenu className="mt-4">
          {userRole === 'athlete' ? (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === '/home'} tooltip="Home">
                  <Link to="/home">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === '/profile'} tooltip="My Profile">
                  <Link to="/profile">
                    <User />
                    <span>My Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === '/performance'} tooltip="My Performance">
                  <Link to="/performance">
                    <Activity />
                    <span>My Performance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === '/training'} tooltip="Training & Insights">
                  <Link to="/training">
                    <Video />
                    <span>Training & Insights</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === '/community'} tooltip="Community & Challenges">
                  <Link to="/community">
                    <Users />
                    <span>Community & Challenges</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === '/talent-discovery'} tooltip="Talent Discovery">
                  <Link to="/talent-discovery">
                    <Search />
                    <span>Talent Discovery</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === '/messages'} tooltip="Messages & Endorsements">
                  <Link to="/messages">
                    <MessageSquare />
                    <span>Messages & Endorsements</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          ) : (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === '/scout-dashboard'} tooltip="Scout Dashboard">
                  <Link to="/scout-dashboard">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === '/talent-discovery'} tooltip="Talent Search">
                  <Link to="/talent-discovery">
                    <Search />
                    <span>Talent Search</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === '/messages'} tooltip="Messages">
                  <Link to="/messages">
                    <MessageSquare />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={currentPath === '/settings'} tooltip="Settings & Profile">
              <Link to="/settings">
                <Settings />
                <span>Settings & Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-gray-700/50 px-4 py-4 mt-auto space-y-3">
        {userRole === 'athlete' ? (
          <>
            <Button className="w-full" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Log Training
            </Button>
            <Button className="w-full" variant="outline" size="sm">
              Share Profile
            </Button>
          </>
        ) : (
          <>
            <Button className="w-full" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Athlete
            </Button>
            <Button className="w-full" variant="outline" size="sm">
              Create Report
            </Button>
          </>
        )}
        <Button className="w-full justify-start text-gray-400 hover:text-white" variant="ghost" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
