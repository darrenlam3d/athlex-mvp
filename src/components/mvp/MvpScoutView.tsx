
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MvpAthleteList from './MvpAthleteList';
import MvpAthleteDetail from './MvpAthleteDetail';

// Sample data for athlete profiles
export interface MvpAthlete {
  id: string;
  name: string;
  age: number;
  position: string;
  tacticalRole: string;
  image: string;
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
  }
];

const MvpScoutView = () => {
  const [selectedAthlete, setSelectedAthlete] = useState<MvpAthlete | null>(sampleAthletes[0]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card className="bg-gray-900/60 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle>Athletes</CardTitle>
          </CardHeader>
          <CardContent>
            <MvpAthleteList 
              athletes={sampleAthletes} 
              selectedAthleteId={selectedAthlete?.id || ''} 
              onSelectAthlete={(athlete) => setSelectedAthlete(athlete)} 
            />
          </CardContent>
        </Card>
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
