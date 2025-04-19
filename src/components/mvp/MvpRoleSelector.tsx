
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRound } from 'lucide-react';

interface MvpRoleSelectorProps {
  activeRole: 'athlete';
  onRoleChange: (role: 'athlete') => void;
}

const MvpRoleSelector = ({ activeRole, onRoleChange }: MvpRoleSelectorProps) => {
  return (
    <Card className="p-6 bg-gray-900/60 border-gray-800">
      <h2 className="text-lg font-medium mb-4 text-center gradient-text">ATHLEX for Athletes</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <div 
          className="p-4 rounded-lg border-2 cursor-pointer transition-all border-athlex-accent bg-gray-800/70"
          onClick={() => onRoleChange('athlete')}
        >
          <div className="flex flex-col items-center text-center p-4">
            <div className="p-3 rounded-full mb-3 bg-athlex-accent/20">
              <UserRound size={28} className="text-athlex-accent" />
            </div>
            <h3 className="text-lg font-medium mb-2">Athlete View</h3>
            <p className="text-sm text-gray-400">
              Track your performance metrics, view personalized training recommendations, and monitor your progress.
            </p>
            
            <Button 
              variant="default"
              className="mt-4 bg-athlex-accent hover:bg-athlex-accent/90"
              onClick={() => onRoleChange('athlete')}
            >
              Continue as Athlete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MvpRoleSelector;
