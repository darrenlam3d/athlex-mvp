
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserRound, UsersRound, HeartPulse, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

const RoleSelector = () => {
  const navigate = useNavigate();
  const { role, setUserRole } = useAuth();
  
  const roleIcons = {
    athlete: <UserRound className="h-4 w-4" />,
    scout: <UsersRound className="h-4 w-4" />,
    coach: <HeartPulse className="h-4 w-4" />
  };
  
  const roleLabels = {
    athlete: 'Athlete',
    scout: 'Scout',
    coach: 'Coach'
  };
  
  const handleRoleSwitch = (newRole: 'athlete' | 'scout' | 'coach') => {
    if (newRole === role) return;
    
    setUserRole(newRole);
    
    toast.success(`Switched to ${newRole} view`, {
      description: `You are now viewing the app as a ${newRole}`,
      duration: 3000,
    });
    
    // Redirect to the corresponding dashboard
    navigate(`/${newRole}-dashboard`);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-athlex-gray-800 border-athlex-gray-700 hover:bg-athlex-gray-700"
        >
          {roleIcons[role] || roleIcons.athlete}
          <span>View as {roleLabels[role] || 'Athlete'}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-athlex-gray-800 border-athlex-gray-700">
        <DropdownMenuItem 
          className={`flex items-center gap-2 ${role === 'athlete' ? 'bg-athlex-gray-700' : ''}`}
          onClick={() => handleRoleSwitch('athlete')}
        >
          <UserRound className="h-4 w-4" />
          <span>Athlete View</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={`flex items-center gap-2 ${role === 'scout' ? 'bg-athlex-gray-700' : ''}`}
          onClick={() => handleRoleSwitch('scout')}
        >
          <UsersRound className="h-4 w-4" />
          <span>Scout View</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={`flex items-center gap-2 ${role === 'coach' ? 'bg-athlex-gray-700' : ''}`}
          onClick={() => handleRoleSwitch('coach')}
        >
          <HeartPulse className="h-4 w-4" />
          <span>Coach View</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSelector;
