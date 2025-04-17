
import React from 'react';
import { Card } from '@/components/ui/card';
import AthleteCard, { AthleteWithConnectionStatus } from './AthleteCard';
import { Users } from 'lucide-react';

interface RecommendedAthletesSectionProps {
  athletes?: AthleteWithConnectionStatus[];
  isLoading: boolean;
  onAddToShortlist: (athleteId: string) => void;
  onSelectAthlete: (athlete: AthleteWithConnectionStatus) => void;
}

const RecommendedAthletesSection: React.FC<RecommendedAthletesSectionProps> = ({
  athletes = [],
  isLoading,
  onAddToShortlist,
  onSelectAthlete
}) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!athletes.length) {
    return (
      <Card className="p-6 text-center">
        <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">No Recommended Athletes</h3>
        <p className="text-gray-400">We'll recommend athletes based on your preferences</p>
      </Card>
    );
  }

  return (
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
  );
};

export default RecommendedAthletesSection;
