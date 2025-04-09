
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MvpAthleteList from './MvpAthleteList';
import MvpAthleteDetail from './MvpAthleteDetail';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample data for athlete profiles
export interface MvpAthlete {
  id: string;
  name: string;
  age: number;
  position: string;
  tacticalRole: string;
  image: string;
  team?: string;
  nationality?: string;
  stats: {
    xG: number;
    passCompletion: number;
    tackles: number;
    aerialDuelsWon: number;
    shotsOnTarget: number;
    distanceCovered: number;
  };
  positionAverage: {
    xG: number;
    passCompletion: number;
    tackles: number;
    aerialDuelsWon: number;
    shotsOnTarget: number;
    distanceCovered: number;
  };
}

const sampleAthletes: MvpAthlete[] = [
  {
    id: '1',
    name: 'James Wilson',
    age: 22,
    position: 'Midfielder',
    tacticalRole: 'Box-to-Box',
    team: 'Manchester City',
    nationality: 'England',
    image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2076',
    stats: {
      xG: 0.34,
      passCompletion: 87.2,
      tackles: 6.4,
      aerialDuelsWon: 4,
      shotsOnTarget: 1.8,
      distanceCovered: 12.3
    },
    positionAverage: {
      xG: 0.22,
      passCompletion: 79.5,
      tackles: 4.8,
      aerialDuelsWon: 3.2,
      shotsOnTarget: 1.2,
      distanceCovered: 10.8
    }
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    age: 24,
    position: 'Forward',
    tacticalRole: 'Inside Forward',
    team: 'Arsenal WFC',
    nationality: 'USA',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e6349?q=80&w=1974',
    stats: {
      xG: 0.68,
      passCompletion: 76.8,
      tackles: 2.1,
      aerialDuelsWon: 5.3,
      shotsOnTarget: 3.6,
      distanceCovered: 9.8
    },
    positionAverage: {
      xG: 0.45,
      passCompletion: 72.1,
      tackles: 1.8,
      aerialDuelsWon: 3.9,
      shotsOnTarget: 2.4,
      distanceCovered: 9.5
    }
  },
  {
    id: '3',
    name: 'Marcus Chen',
    age: 20,
    position: 'Defender',
    tacticalRole: 'Fullback',
    team: 'Tottenham Hotspur',
    nationality: 'China',
    image: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?q=80&w=1974',
    stats: {
      xG: 0.12,
      passCompletion: 83.6,
      tackles: 8.2,
      aerialDuelsWon: 6.7,
      shotsOnTarget: 0.4,
      distanceCovered: 10.9
    },
    positionAverage: {
      xG: 0.08,
      passCompletion: 78.9,
      tackles: 6.5,
      aerialDuelsWon: 5.2,
      shotsOnTarget: 0.3,
      distanceCovered: 9.7
    }
  },
  {
    id: '4',
    name: 'Luka Petrović',
    age: 25,
    position: 'Midfielder',
    tacticalRole: 'Playmaker',
    team: 'Real Madrid',
    nationality: 'Croatia',
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2070',
    stats: {
      xG: 0.22,
      passCompletion: 91.4,
      tackles: 3.8,
      aerialDuelsWon: 2.1,
      shotsOnTarget: 1.3,
      distanceCovered: 11.7
    },
    positionAverage: {
      xG: 0.18,
      passCompletion: 82.3,
      tackles: 3.2,
      aerialDuelsWon: 2.0,
      shotsOnTarget: 1.0,
      distanceCovered: 10.5
    }
  }
];

const MvpScoutView = () => {
  const [selectedAthlete, setSelectedAthlete] = useState<MvpAthlete | null>(sampleAthletes[0]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredAthletes = sampleAthletes.filter(athlete => 
    athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    athlete.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    athlete.tacticalRole.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <Card className="bg-gray-900/60 border-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Athletes Database</CardTitle>
              <Badge className="bg-athlex-accent/80">{sampleAthletes.length} Players</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search athletes..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" title="Filter">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="Refresh">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            
            <MvpAthleteList 
              athletes={filteredAthletes} 
              selectedAthleteId={selectedAthlete?.id || ''} 
              onSelectAthlete={(athlete) => setSelectedAthlete(athlete)} 
            />
          </CardContent>
        </Card>
        
        <MvpScoutFilters />
      </div>
      
      <div className="lg:col-span-2">
        {selectedAthlete && (
          <MvpAthleteDetail athlete={selectedAthlete} />
        )}
      </div>
    </div>
  );
};

export default MvpScoutView;
