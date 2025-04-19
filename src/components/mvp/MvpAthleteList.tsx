
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MvpAthlete } from '@/types/mvpTypes';
import { Badge } from '@/components/ui/badge';
import { Flag, Users } from 'lucide-react';

interface MvpAthleteListProps {
  athletes: MvpAthlete[];
  selectedAthleteId: string;
  onSelectAthlete: (athlete: MvpAthlete) => void;
}

const MvpAthleteList = ({ athletes, selectedAthleteId, onSelectAthlete }: MvpAthleteListProps) => {
  if (athletes.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-400">No athletes found matching your search criteria.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {athletes.map((athlete) => (
        <div 
          key={athlete.id}
          className={`p-3 rounded-lg cursor-pointer flex items-start gap-3 transition-all ${
            selectedAthleteId === athlete.id 
              ? 'bg-athlex-accent/20 border border-athlex-accent/40' 
              : 'bg-gray-800/50 border border-transparent hover:bg-gray-800'
          }`}
          onClick={() => onSelectAthlete(athlete)}
        >
          <Avatar className="h-12 w-12 border border-gray-700">
            <AvatarImage src={athlete.image} alt={athlete.name} />
            <AvatarFallback>{athlete.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between">
              <h3 className="font-medium truncate">{athlete.name}</h3>
              <Badge variant="outline" className="ml-2 text-xs">
                {athlete.age}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-400 truncate">
              {athlete.position} • {athlete.tacticalRole}
            </p>
            
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              {athlete.nationality && (
                <div className="flex items-center gap-1">
                  <Flag className="h-3 w-3" />
                  <span>{athlete.nationality}</span>
                </div>
              )}
              {athlete.team && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{athlete.team}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MvpAthleteList;
