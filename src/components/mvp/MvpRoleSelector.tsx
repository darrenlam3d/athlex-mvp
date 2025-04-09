
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRound, UsersRound } from 'lucide-react';

interface MvpRoleSelectorProps {
  activeRole: 'athlete' | 'scout';
  onRoleChange: (role: 'athlete' | 'scout') => void;
}

const MvpRoleSelector = ({ activeRole, onRoleChange }: MvpRoleSelectorProps) => {
  return (
    <Card className="p-6 bg-gray-900/60 border-gray-800">
      <h2 className="text-lg font-medium mb-4 text-center">Select Your View</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
            activeRole === 'athlete' 
              ? 'border-athlex-accent bg-gray-800/70' 
              : 'border-gray-700 bg-gray-800/30 hover:bg-gray-800/50'
          }`}
          onClick={() => onRoleChange('athlete')}
        >
          <div className="flex flex-col items-center text-center p-4">
            <div className={`p-3 rounded-full mb-3 ${
              activeRole === 'athlete' ? 'bg-athlex-accent/20' : 'bg-gray-700/30'
            }`}>
              <UserRound size={28} className={activeRole === 'athlete' ? 'text-athlex-accent' : 'text-gray-400'} />
            </div>
            <h3 className="text-lg font-medium mb-2">Enter as Athlete</h3>
            <p className="text-sm text-gray-400">
              Track your performance metrics, view personalized training recommendations, and monitor your progress.
            </p>
            
            <Button 
              variant={activeRole === 'athlete' ? 'default' : 'outline'} 
              className="mt-4" 
              onClick={() => onRoleChange('athlete')}
            >
              Select Athlete View
            </Button>
          </div>
        </div>
        
        <div 
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
            activeRole === 'scout' 
              ? 'border-athlex-accent bg-gray-800/70' 
              : 'border-gray-700 bg-gray-800/30 hover:bg-gray-800/50'
          }`}
          onClick={() => onRoleChange('scout')}
        >
          <div className="flex flex-col items-center text-center p-4">
            <div className={`p-3 rounded-full mb-3 ${
              activeRole === 'scout' ? 'bg-athlex-accent/20' : 'bg-gray-700/30'
            }`}>
              <UsersRound size={28} className={activeRole === 'scout' ? 'text-athlex-accent' : 'text-gray-400'} />
            </div>
            <h3 className="text-lg font-medium mb-2">Enter as Scout/Coach</h3>
            <p className="text-sm text-gray-400">
              Discover talent, analyze athlete statistics, compare performances, and make data-driven decisions.
            </p>
            
            <Button 
              variant={activeRole === 'scout' ? 'default' : 'outline'} 
              className="mt-4" 
              onClick={() => onRoleChange('scout')}
            >
              Select Scout View
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MvpRoleSelector;
