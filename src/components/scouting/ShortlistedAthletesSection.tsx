
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AthleteCard, { Athlete, AthleteWithConnectionStatus } from '@/components/scouting/AthleteCard';

interface ShortlistedAthletesSectionProps {
  athletes: Athlete[] | null;
  isLoading: boolean;
  onRemoveFromShortlist: (athleteId: string) => void;
  onOpenChat: (athleteId: string) => void;
}

const ShortlistedAthletesSection: React.FC<ShortlistedAthletesSectionProps> = ({
  athletes,
  isLoading,
  onRemoveFromShortlist,
  onOpenChat
}) => {
  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardHeader>
        <CardTitle>Shortlisted Athletes</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">Loading shortlisted athletes...</div>
        ) : athletes && athletes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {athletes.map((athlete) => (
              <AthleteCard
                key={athlete.id}
                athlete={athlete}
                type="shortlisted"
                onRemoveFromShortlist={onRemoveFromShortlist}
                onOpenChat={onOpenChat}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-athlex-gray-400">
            <p>You haven't shortlisted any athletes yet.</p>
            <p className="mt-2">Browse the "Recommended" or "All Athletes" tabs to find talent.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShortlistedAthletesSection;
