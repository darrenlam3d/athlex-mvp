
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export interface AthleteHeaderProps {
  athlete: {
    id: string;
    name: string;
    sport: string;
    position: string;
    tacticalRole?: string;
    school: string;
    club: string;
    image?: string;
  };
  onAddToShortlist: () => void;
}

const AthleteHeader: React.FC<AthleteHeaderProps> = ({ athlete, onAddToShortlist }) => {
  const navigate = useNavigate();
  
  const handleSendMessage = () => {
    navigate(`/messages?athlete=${athlete.id}`);
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'A';
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-6">
      <div className="flex-1">
        <Card className="bg-gray-900/60 border-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <Avatar className="h-24 w-24 rounded-xl">
                <AvatarImage src={athlete?.image} alt={athlete?.name} />
                <AvatarFallback className="bg-athlex-accent/20 text-athlex-accent text-xl">
                  {getInitials(athlete?.name || '')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl md:text-3xl font-bold">{athlete?.name}</h1>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
                  <Badge className="bg-athlex-accent/20 text-athlex-accent">{athlete?.sport}</Badge>
                  <Badge className="bg-gray-800">{athlete?.position}</Badge>
                  {athlete?.tacticalRole && (
                    <Badge variant="outline">{athlete?.tacticalRole}</Badge>
                  )}
                </div>
                <div className="mt-3 text-gray-400">
                  <p>{athlete?.school} • {athlete?.club}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="w-full md:w-64 space-y-3">
        <Button className="w-full" onClick={onAddToShortlist}>
          <Star className="mr-2 h-4 w-4" />
          Add to Shortlist
        </Button>
        <Button variant="outline" className="w-full" onClick={handleSendMessage}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Message Athlete
        </Button>
      </div>
    </div>
  );
};

export default AthleteHeader;
