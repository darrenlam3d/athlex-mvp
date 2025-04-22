
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart2, 
  Calendar, 
  Target, 
  Utensils, 
  Users, 
  Settings, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const AthleteSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const navItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/athlete-dashboard' },
    { icon: Sparkles, text: 'ATHLEX MVP', path: '/athlex-mvp', special: true },
    { icon: BarChart2, text: 'Performance', path: '/athlete-performance' },
    { icon: Calendar, text: 'Training Log', path: '/athlete-training-log' },
    { icon: Target, text: 'Goals', path: '/athlete-performance-goals' },
    { icon: Utensils, text: 'Nutrition', path: '/athlete-nutrition' },
    { icon: Users, text: 'Community', path: '/community' },
    { icon: Settings, text: 'Settings', path: '/athlete-settings' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <aside className="w-64 bg-athlex-gray-900 text-white h-screen sticky top-0 border-r border-athlex-gray-800 flex flex-col">
      <div className="p-4 border-b border-athlex-gray-800 flex justify-center items-center">
        <Link to="/athlete-dashboard" className="flex items-center justify-center">
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
                  location.pathname === item.path 
                    ? 'bg-athlex-gray-800 text-athlex-accent' 
                    : 'text-white/70 hover:bg-athlex-gray-800 hover:text-white'
                } ${item.special ? 'bg-athlex-accent/10 border border-athlex-accent/30' : ''}`}
              >
                <item.icon size={18} />
                <span>{item.text}</span>
                {item.special && (
                  <span className="ml-auto text-xs bg-athlex-accent text-white px-1.5 py-0.5 rounded-full">
                    New
                  </span>
                )}
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

export default AthleteSidebar;
