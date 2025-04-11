
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Search,
  Star,
  FileText,
  FilePen,
  Settings, 
  LogOut 
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from 'sonner';

const ScoutSidebar = () => {
  const location = useLocation();
  const { toast } = useToast();
  
  const navItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/scout-dashboard' },
    { icon: Star, text: 'Shortlisted', path: '/scout-dashboard#shortlist' },
    { icon: Search, text: 'Talent Discovery', path: '/scout-dashboard#all' },
    { icon: FilePen, text: 'Scout Notes', path: '/scout-notes' },
    { icon: FileText, text: 'Scouting Reports', path: '/scouting-reports' },
    { icon: Users, text: 'Community', path: '/community' },
    { icon: Settings, text: 'Settings', path: '/settings' },
  ];

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      sonnerToast.success('Signed out successfully', {
        duration: 3000,
      });
      
      // Redirect to login page
      window.location.href = '/';
    } catch (error) {
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  // Updated isActive function to correctly determine the active state
  const isActive = (itemPath) => {
    // For the main dashboard path (without hash)
    if (itemPath === '/scout-dashboard' && location.pathname === '/scout-dashboard' && !location.hash) {
      return true;
    }
    
    // For paths with hash fragments
    if (itemPath.includes('#')) {
      const [path, hash] = itemPath.split('#');
      return location.pathname === path && location.hash === `#${hash}`;
    }
    
    // For all other paths (without hash)
    if (!itemPath.includes('#')) {
      return location.pathname === itemPath;
    }
    
    return false;
  };

  return (
    <aside className="w-64 bg-athlex-gray-900 text-white h-screen sticky top-0 border-r border-athlex-gray-800 flex flex-col">
      <div className="p-4 border-b border-athlex-gray-800 flex justify-center items-center">
        <Link to="/scout-dashboard" className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/4fa9ab4b-66d6-42dc-979f-661fee5226e5.png" 
            alt="ATHLEX Logo" 
            className="h-10 w-auto" 
          />
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-athlex-gray-800 text-athlex-accent' 
                    : 'text-white/70 hover:bg-athlex-gray-800 hover:text-white'
                }`}
              >
                <item.icon size={18} />
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-athlex-gray-800">
        <Button 
          variant="outline" 
          className="w-full justify-start text-white/70 hover:text-white border-athlex-gray-700"
          onClick={handleSignOut}
        >
          <LogOut size={18} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default ScoutSidebar;
