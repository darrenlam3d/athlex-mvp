
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AthleteCard, { Athlete } from '@/components/scouting/AthleteCard';

interface RecommendedAthletesSectionProps {
  athletes: Athlete[] | null;
  isLoading: boolean;
  onAddToShortlist: (athleteId: string) => void;
}

const RecommendedAthletesSection: React.FC<RecommendedAthletesSectionProps> = ({
  athletes,
  isLoading,
  onAddToShortlist
}) => {
  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardHeader>
        <CardTitle>Recommended Athletes</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">Loading recommended athletes...</div>
        ) : athletes && athletes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {athletes.map((athlete) => (
              <AthleteCard
                key={athlete.id}
                athlete={athlete}
                type="recommended"
                onAddToShortlist={onAddToShortlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-athlex-gray-400">
            <p>No recommended athletes available at this time.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendedAthletesSection;
