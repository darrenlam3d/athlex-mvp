
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar,
  Award,
  FileText,
  Settings, 
  LogOut 
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from 'sonner';

const CoachSidebar = () => {
  const location = useLocation();
  const { toast } = useToast();
  
  const navItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/coach-dashboard' },
    { icon: Users, text: 'Athletes', path: '/coach-athletes' },
    { icon: Calendar, text: 'Training Plans', path: '/coach-training-plans' },
    { icon: Award, text: 'Performance', path: '/coach-performance' },
    { icon: FileText, text: 'Reports', path: '/coach-reports' },
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

  return (
    <aside className="w-64 bg-athlex-gray-900 text-white h-screen sticky top-0 border-r border-athlex-gray-800 flex flex-col">
      <div className="p-4 border-b border-athlex-gray-800">
        <Link to="/coach-dashboard" className="flex items-center">
          <img 
            src="/lovable-uploads/4fa9ab4b-66d6-42dc-979f-661fee5226e5.png" 
            alt="ATHLEX Logo" 
            className="h-7 w-auto mr-2" 
          />
          <span className="text-xl font-bold gradient-text">ATHLEX</span>
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.path 
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

export default CoachSidebar;
