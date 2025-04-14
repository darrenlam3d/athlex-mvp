
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const ScoutSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const navItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/scout-dashboard' },
    { icon: Star, text: 'Shortlisted', path: '/scout-dashboard', hash: 'shortlist' },
    { icon: Search, text: 'Talent Discovery', path: '/scout-dashboard', hash: 'all' },
    { icon: FilePen, text: 'Scout Notes', path: '/scout-notes' },
    { icon: FileText, text: 'Scouting Reports', path: '/scout-reports' },
    { icon: Users, text: 'Community', path: '/community' },
    { icon: Settings, text: 'Settings', path: '/settings' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  // Updated isActive function to correctly determine the active state
  const isActive = (itemPath, itemHash) => {
    if (itemHash) {
      // For items with hash
      return location.pathname === itemPath && location.hash === `#${itemHash}`;
    } else {
      // For items without hash
      return location.pathname === itemPath && !location.hash;
    }
  };

  // Handle navigation with hash fragments
  const handleNavigation = (path, hash) => {
    if (hash) {
      navigate(`${path}#${hash}`);
    } else {
      navigate(path);
    }
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
            <li key={item.text}>
              <button
                onClick={() => handleNavigation(item.path, item.hash)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors w-full text-left ${
                  isActive(item.path, item.hash)
                    ? 'bg-athlex-gray-800 text-athlex-accent' 
                    : 'text-white/70 hover:bg-athlex-gray-800 hover:text-white'
                }`}
              >
                <item.icon size={18} />
                <span>{item.text}</span>
              </button>
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
