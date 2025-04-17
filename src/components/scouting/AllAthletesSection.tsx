
import React from 'react';
import { Card } from '@/components/ui/card';
import AthleteCard, { AthleteWithConnectionStatus } from './AthleteCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface AllAthletesSectionProps {
  athletes: AthleteWithConnectionStatus[];
  isLoading: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSport: string;
  onSportChange: (value: string) => void;
  selectedPosition: string;
  onPositionChange: (value: string) => void;
  selectedAgeRange: string;
  onAgeRangeChange: (value: string) => void;
  selectedGender: string;
  onGenderChange: (value: string) => void;
  onAddToShortlist: (athleteId: string) => void;
  onSelectAthlete: (athlete: AthleteWithConnectionStatus) => void;
}

const AllAthletesSection: React.FC<AllAthletesSectionProps> = ({
  athletes,
  isLoading,
  searchTerm,
  onSearchChange,
  selectedSport,
  onSportChange,
  selectedPosition,
  onPositionChange,
  selectedAgeRange,
  onAgeRangeChange,
  selectedGender,
  onGenderChange,
  onAddToShortlist,
  onSelectAthlete
}) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative col-span-full md:col-span-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search athletes..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <Select value={selectedSport} onValueChange={onSportChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sports</SelectItem>
            <SelectItem value="football">Football</SelectItem>
            <SelectItem value="basketball">Basketball</SelectItem>
            <SelectItem value="tennis">Tennis</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedPosition} onValueChange={onPositionChange}>
          <SelectTrigger>
            <SelectValue placeholder="Position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Positions</SelectItem>
            <SelectItem value="forward">Forward</SelectItem>
            <SelectItem value="midfielder">Midfielder</SelectItem>
            <SelectItem value="defender">Defender</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {athletes.map((athlete) => (
          <AthleteCard
            key={athlete.id}
            athlete={athlete}
            onAddToShortlist={onAddToShortlist}
            onClick={() => onSelectAthlete(athlete)}
          />
        ))}
      </div>
    </div>
  );
};

export default AllAthletesSection;
