
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MvpAthlete } from './MvpScoutView';

interface MvpAthleteListProps {
  athletes: MvpAthlete[];
  selectedAthleteId: string;
  onSelectAthlete: (athlete: MvpAthlete) => void;
}

const MvpAthleteList = ({ athletes, selectedAthleteId, onSelectAthlete }: MvpAthleteListProps) => {
  return (
    <div className="space-y-2">
      {athletes.map((athlete) => (
        <div 
          key={athlete.id}
          className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 transition-all ${
            selectedAthleteId === athlete.id 
              ? 'bg-athlex-accent/20 border border-athlex-accent/40' 
              : 'bg-gray-800/50 border border-transparent hover:bg-gray-800'
          }`}
          onClick={() => onSelectAthlete(athlete)}
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={athlete.image} alt={athlete.name} />
            <AvatarFallback>{athlete.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{athlete.name}</h3>
            <p className="text-sm text-gray-400 truncate">
              {athlete.age} • {athlete.position} • {athlete.tacticalRole}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MvpAthleteList;
