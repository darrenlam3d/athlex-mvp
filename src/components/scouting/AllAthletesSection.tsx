
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AthleteCard, { Athlete } from '@/components/scouting/AthleteCard';
import ScoutingFilters from '@/components/scouting/ScoutingFilters';

interface AllAthletesSectionProps {
  athletes: Athlete[];
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
  onAddToShortlist
}) => {
  // Filter athletes by search term
  const filteredAthletes = athletes.filter(athlete => 
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (athlete.sport && athlete.sport.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (athlete.position && athlete.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (athlete.club && athlete.club.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <ScoutingFilters
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        selectedSport={selectedSport}
        onSportChange={onSportChange}
        selectedPosition={selectedPosition}
        onPositionChange={onPositionChange}
        selectedAgeRange={selectedAgeRange}
        onAgeRangeChange={onAgeRangeChange}
        selectedGender={selectedGender}
        onGenderChange={onGenderChange}
      />
      
      <Card className="bg-athlex-gray-900 border-athlex-gray-800">
        <CardHeader>
          <CardTitle>All Athletes</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading athletes...</div>
          ) : filteredAthletes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAthletes.map((athlete) => (
                <AthleteCard
                  key={athlete.id}
                  athlete={athlete}
                  type="all"
                  onAddToShortlist={onAddToShortlist}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-athlex-gray-400">
              <p>No athletes match your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default AllAthletesSection;
