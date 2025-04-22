
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Info, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AthleteCardProps {
  id: string;
  name: string;
  sport: string;
  position: string;
  club?: string;
  profilePhoto?: string;
  performanceScore?: number;
  recentSpeedKmh?: number;
  isShortlisted?: boolean;
  onShortlist?: (id: string) => void;
}

const AthleteCard: React.FC<AthleteCardProps> = ({
  id,
  name,
  sport,
  position,
  club,
  profilePhoto,
  performanceScore,
  recentSpeedKmh,
  isShortlisted = false,
  onShortlist
}) => {
  const handleShortlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShortlist) {
      onShortlist(id);
    }
  };

  return (
    <Link to={`/athlete/${id}`}>
      <Card className="bg-athlex-gray-900/60 border-athlex-gray-800 overflow-hidden transition-all duration-300 hover:border-athlex-accent">
        <CardContent className="p-0">
          <div className="relative">
            {/* Profile Photo */}
            <div className="h-48 bg-gradient-to-b from-athlex-gray-800 to-athlex-gray-900 flex items-center justify-center">
              {profilePhoto ? (
                <img 
                  src={profilePhoto}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-athlex-accent/20 border border-athlex-accent/40 flex items-center justify-center">
                  <span className="text-xl font-bold text-athlex-accent">
                    {name.split(' ').map(part => part[0]).join('')}
                  </span>
                </div>
              )}
            </div>
            
            {/* Shortlist Button */}
            <button
              onClick={handleShortlist}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors
                ${isShortlisted ? 'bg-yellow-500 text-black' : 'bg-athlex-gray-800/80 text-white hover:bg-athlex-accent/80'}`}
            >
              <Star className="h-4 w-4" />
            </button>
            
            {/* Performance Badge */}
            {performanceScore && (
              <div className="absolute bottom-3 right-3 bg-athlex-gray-800/90 rounded-full px-2 py-1 text-xs font-semibold">
                <span className="text-athlex-accent">{performanceScore}</span>
                <span className="text-white ml-1">/ 100</span>
              </div>
            )}
          </div>
          
          {/* Athlete Info */}
          <div className="p-4">
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="text-gray-400 text-sm mt-1">
              <p>{sport} • {position}</p>
              {club && <p className="mt-1">{club}</p>}
            </div>
            
            {/* Metrics */}
            {recentSpeedKmh && (
              <div className="mt-3 bg-athlex-gray-800/50 rounded p-2 text-sm flex items-center">
                <Info className="h-4 w-4 mr-2 text-athlex-accent" />
                <span>Recent Speed: <span className="font-semibold text-athlex-accent">{recentSpeedKmh} km/h</span></span>
              </div>
            )}
            
            {/* View Profile Button */}
            <Button variant="ghost" size="sm" className="w-full mt-3 border border-gray-800">
              <span>View Profile</span>
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AthleteCard;
