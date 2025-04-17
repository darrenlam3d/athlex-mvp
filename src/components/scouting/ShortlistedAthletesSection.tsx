
import React from 'react';
import { Card } from '@/components/ui/card';
import AthleteCard, { AthleteWithConnectionStatus } from './AthleteCard';
import { Users } from 'lucide-react';

interface ShortlistedAthletesSectionProps {
  athletes?: AthleteWithConnectionStatus[];
  isLoading: boolean;
  onRemoveFromShortlist: (athleteId: string) => void;
  onOpenChat: (athleteId: string) => void;
  onSelectAthlete: (athlete: AthleteWithConnectionStatus) => void;
}

const ShortlistedAthletesSection: React.FC<ShortlistedAthletesSectionProps> = ({
  athletes = [],
  isLoading,
  onRemoveFromShortlist,
  onOpenChat,
  onSelectAthlete
}) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!athletes.length) {
    return (
      <Card className="p-6 text-center">
        <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">No Shortlisted Athletes</h3>
        <p className="text-gray-400">Athletes you shortlist will appear here</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {athletes.map((athlete) => (
        <AthleteCard
          key={athlete.id}
          athlete={athlete}
          onRemoveFromShortlist={onRemoveFromShortlist}
          onOpenChat={onOpenChat}
          onClick={() => onSelectAthlete(athlete)}
        />
      ))}
    </div>
  );
};

export default ShortlistedAthletesSection;
