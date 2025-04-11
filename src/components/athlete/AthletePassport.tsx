
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export interface AthletePassportProps {
  athlete: {
    height?: string;
    weight?: string;
    dominant_foot?: string;
    date_of_birth?: string;
    nationality?: string;
    bio?: string;
  };
}

const AthletePassport: React.FC<AthletePassportProps> = ({ athlete }) => {
  return (
    <Card className="bg-gray-900/60 border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl">Athlete Passport</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Height</p>
            <p className="font-medium">{athlete?.height}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Weight</p>
            <p className="font-medium">{athlete?.weight}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Dominant Foot</p>
            <p className="font-medium">{athlete?.dominant_foot}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Date of Birth</p>
            <p className="font-medium">{athlete?.date_of_birth ? new Date(athlete.date_of_birth).toLocaleDateString() : ''}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Nationality</p>
            <p className="font-medium">{athlete?.nationality}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-400 mb-1">Bio</p>
          <p className="text-sm">{athlete?.bio}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AthletePassport;
