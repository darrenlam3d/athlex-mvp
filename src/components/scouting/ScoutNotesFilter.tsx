
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ScoutNotesFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSport: string;
  onSportChange: (value: string) => void;
  selectedPosition: string;
  onPositionChange: (value: string) => void;
}

const ScoutNotesFilter: React.FC<ScoutNotesFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedSport,
  onSportChange,
  selectedPosition,
  onPositionChange
}) => {
  const sports = ['All', 'Football', 'Basketball', 'Netball', 'Swimming', 'Badminton'];
  const positions = {
    'All': ['All'],
    'Football': ['All', 'Striker', 'Midfielder', 'Defender', 'Goalkeeper', 'Left Back', 'Right Back'],
    'Basketball': ['All', 'Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
    'Netball': ['All', 'Goal Shooter', 'Goal Attack', 'Wing Attack', 'Center', 'Wing Defense', 'Goal Defense', 'Goal Keeper'],
    'Swimming': ['All', 'Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly'],
    'Badminton': ['All', 'Singles', 'Doubles', 'Mixed Doubles']
  };

  return (
    <div className="bg-athlex-gray-900 rounded-lg p-4 mb-6 border border-athlex-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-athlex-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by athlete name"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-athlex-gray-800 border-athlex-gray-700 text-white"
          />
        </div>
        
        <div>
          <Select value={selectedSport} onValueChange={onSportChange}>
            <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700 text-white">
              <SelectValue placeholder="Select Sport" />
            </SelectTrigger>
            <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700 text-white">
              {sports.map((sport) => (
                <SelectItem key={sport} value={sport.toLowerCase()}>
                  {sport}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select 
            value={selectedPosition} 
            onValueChange={onPositionChange}
            disabled={selectedSport === 'all'}
          >
            <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700 text-white">
              <SelectValue placeholder="Select Position" />
            </SelectTrigger>
            <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700 text-white">
              {positions[selectedSport === 'all' ? 'All' : selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)].map((position) => (
                <SelectItem key={position} value={position.toLowerCase()}>
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ScoutNotesFilter;
