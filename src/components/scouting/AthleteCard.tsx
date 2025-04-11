import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, MessageSquare, Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export interface Athlete {
  id: string;
  name: string;
  sport: string;
  position?: string;
  club?: string;
  recent_speed_kmh?: number;
  performance_score?: number;
  profile_photo?: string;
  connection_status?: 'not_connected' | 'pending' | 'connected';
}

// Type for use in ChatPanel to ensure connection_status is always present
export interface AthleteWithConnectionStatus extends Athlete {
  connection_status: 'not_connected' | 'pending' | 'connected';
}

interface AthleteCardProps {
  athlete: Athlete;
  type: 'shortlisted' | 'recommended' | 'all';
  onAddToShortlist?: (athleteId: string) => void;
  onRemoveFromShortlist?: (athleteId: string) => void;
  onOpenChat?: (athleteId: string) => void;
}

const AthleteCard: React.FC<AthleteCardProps> = ({ 
  athlete, 
  type,
  onAddToShortlist,
  onRemoveFromShortlist,
  onOpenChat
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const handleAddToShortlist = () => {
    if (onAddToShortlist) {
      onAddToShortlist(athlete.id);
      toast.success(`${athlete.name} added to shortlist`);
    }
  };

  const handleRemoveFromShortlist = () => {
    if (onRemoveFromShortlist) {
      onRemoveFromShortlist(athlete.id);
      toast.success(`${athlete.name} removed from shortlist`);
    }
  };

  const handleOpenChat = () => {
    if (onOpenChat) {
      onOpenChat(athlete.id);
    }
  };

  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800 overflow-hidden hover:border-athlex-accent/50 transition-colors">
      <CardContent className="p-5">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="w-16 h-16 mb-3">
            <AvatarImage src={athlete.profile_photo} alt={athlete.name} />
            <AvatarFallback className="bg-athlex-accent/20 text-athlex-accent">
              {getInitials(athlete.name)}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg">{athlete.name}</h3>
          <div className="text-sm text-athlex-gray-400 mt-1">
            {athlete.sport}{athlete.position ? ` • ${athlete.position}` : ''}
          </div>
          {athlete.club && (
            <div className="text-sm text-athlex-gray-500 mt-1">
              {athlete.club}
            </div>
          )}
        </div>
        
        <div className="mt-3 bg-athlex-gray-800/50 rounded-lg p-2 mb-4">
          {athlete.recent_speed_kmh && (
            <div className="text-center">
              <span className="text-xs text-athlex-gray-400">Recent Speed</span>
              <p className="font-bold text-athlex-accent">{athlete.recent_speed_kmh} km/h</p>
            </div>
          )}
          {athlete.performance_score && (
            <div className="text-center">
              <span className="text-xs text-athlex-gray-400">Performance Score</span>
              <p className="font-bold text-athlex-accent">{athlete.performance_score}</p>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-white border-athlex-gray-700"
            asChild
          >
            <Link to={`/athlete/${athlete.id}`}>
              <Eye className="mr-1 h-4 w-4" />
              View
            </Link>
          </Button>
          
          {type === 'shortlisted' && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-white border-athlex-gray-700"
                onClick={handleOpenChat}
              >
                <MessageSquare className="mr-1 h-4 w-4" />
                Message
              </Button>
              
              <Button 
                variant="destructive" 
                size="sm" 
                className="flex-none px-2"
                onClick={handleRemoveFromShortlist}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
          
          {type === 'recommended' && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-athlex-accent border-athlex-accent"
              onClick={handleAddToShortlist}
            >
              <Star className="mr-1 h-4 w-4" />
              Shortlist
            </Button>
          )}
          
          {type === 'all' && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-athlex-accent border-athlex-accent"
              onClick={handleAddToShortlist}
            >
              <Star className="mr-1 h-4 w-4" />
              Shortlist
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AthleteCard;
