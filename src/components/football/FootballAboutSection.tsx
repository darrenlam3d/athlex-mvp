
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User, CalendarDays, Ruler, Weight } from 'lucide-react';
import { useProfile } from '@/contexts/ProfileContext';
import { positionOptions } from '@/utils/footballPositions';

const FootballAboutSection = () => {
  const { profileData } = useProfile();

  // Find the position label from our centralized options
  const getPositionLabel = (positionCode: string) => {
    const position = positionOptions.find(p => p.value === positionCode);
    return position ? position.label : positionCode;
  };

  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">About</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4">
          {profileData.bio}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-400 block">Age</span>
              <span className="font-medium">{profileData.age}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-400 block">Height</span>
              <span className="font-medium">{profileData.height} cm</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Weight className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-400 block">Weight</span>
              <span className="font-medium">{profileData.weight} kg</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-400 block">Position</span>
              <span className="font-medium">{profileData.position} ({getPositionLabel(profileData.position)})</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FootballAboutSection;
