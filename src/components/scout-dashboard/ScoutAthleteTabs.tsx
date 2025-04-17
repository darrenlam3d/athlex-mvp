
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AthleteWithConnectionStatus } from '@/components/scouting/AthleteCard';
import { MvpAthlete } from '@/components/mvp/MvpScoutView';
import ShortlistedAthletesSection from '@/components/scouting/ShortlistedAthletesSection';
import RecommendedAthletesSection from '@/components/scouting/RecommendedAthletesSection';
import AllAthletesSection from '@/components/scouting/AllAthletesSection';

interface ScoutAthleteTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  shortlistedAthletes?: AthleteWithConnectionStatus[];
  recommendedAthletes?: AthleteWithConnectionStatus[];
  allAthletes?: AthleteWithConnectionStatus[];
  isLoadingShortlisted: boolean;
  isLoadingRecommended: boolean;
  isLoadingAll: boolean;
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
  onRemoveFromShortlist: (athleteId: string) => void;
  onOpenChat: (athleteId: string) => void;
  onSelectAthlete: (athlete: AthleteWithConnectionStatus) => void;
}

const ScoutAthleteTabs = ({
  activeTab,
  onTabChange,
  shortlistedAthletes = [],
  recommendedAthletes = [],
  allAthletes = [],
  isLoadingShortlisted,
  isLoadingRecommended,
  isLoadingAll,
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
  onRemoveFromShortlist,
  onOpenChat,
  onSelectAthlete,
}: ScoutAthleteTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-6">
      <TabsList className="bg-athlex-gray-800 w-full md:w-auto mb-4">
        <TabsTrigger value="shortlisted">Shortlisted Athletes</TabsTrigger>
        <TabsTrigger value="recommended">Recommended</TabsTrigger>
        <TabsTrigger value="all">All Athletes</TabsTrigger>
      </TabsList>
      
      <TabsContent value="shortlisted" className="space-y-6">
        <ShortlistedAthletesSection
          athletes={shortlistedAthletes}
          isLoading={isLoadingShortlisted}
          onRemoveFromShortlist={onRemoveFromShortlist}
          onOpenChat={onOpenChat}
          onSelectAthlete={onSelectAthlete}
        />
      </TabsContent>
      
      <TabsContent value="recommended" className="space-y-6">
        <RecommendedAthletesSection
          athletes={recommendedAthletes}
          isLoading={isLoadingRecommended}
          onAddToShortlist={onAddToShortlist}
          onSelectAthlete={onSelectAthlete}
        />
      </TabsContent>
      
      <TabsContent value="all" className="space-y-6">
        <AllAthletesSection
          athletes={allAthletes}
          isLoading={isLoadingAll}
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
          onAddToShortlist={onAddToShortlist}
          onSelectAthlete={onSelectAthlete}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ScoutAthleteTabs;
