
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Edit, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/contexts/ProfileContext';

const FootballProfileSummary = () => {
  const navigate = useNavigate();
  const { profileData } = useProfile();
  
  const handleEditProfile = () => {
    navigate('/settings');
  };

  const getInitials = () => {
    return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`;
  };

  return (
    <Card className="bg-card text-card-foreground border-gray-700 overflow-hidden relative">
      {/* Background banner image - football pitch */}
      <div className="h-24 md:h-36 bg-gradient-to-r from-green-900/60 to-green-700/60 w-full"></div>
      
      <CardContent className="pt-0 relative px-4 pb-5">
        <div className="flex flex-col md:flex-row md:items-end -mt-10 md:-mt-16 gap-4">
          {/* Profile Avatar */}
          <Avatar className="h-20 w-20 md:h-32 md:w-32 border-4 border-card">
            <AvatarImage src={profileData.profileImage} alt={`${profileData.firstName} ${profileData.lastName}`} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 py-2">
            {/* Name and badge */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold">{`${profileData.firstName} ${profileData.lastName}`}</h1>
              {profileData.verified && <CheckCircle className="h-5 w-5 text-blue-400" />}
              <Badge variant="secondary" className="text-xs">Pro Athlete</Badge>
            </div>
            
            {/* Football Profile */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-300 mb-2">
              <span>{`${profileData.sport} · ${profileData.position}`}</span>
              <span>{profileData.preferredFoot} Foot</span>
              <span>{profileData.tacticalRole}</span>
              <span>#{profileData.jerseyNumber}</span>
            </div>
            
            {/* Stats */}
            <div className="flex gap-4 mt-2">
              <div>
                <span className="text-gray-400 text-xs block">Player Rating</span>
                <span className="font-bold text-lg">{profileData.playerRating}</span>
              </div>
              <div>
                <span className="text-gray-400 text-xs block">Jersey #</span>
                <span className="font-bold text-lg">{profileData.jerseyNumber}</span>
              </div>
              <div>
                <span className="text-gray-400 text-xs block">Role Progress</span>
                <span className="font-bold text-lg">65%</span>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-2 md:mt-0 w-full md:w-auto justify-start md:self-end">
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleEditProfile}>
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600 flex items-center gap-1">
              <Upload className="h-4 w-4" />
              Upload Session
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FootballProfileSummary;
