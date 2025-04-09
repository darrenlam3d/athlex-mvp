
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MvpTrainingRecommendation from './MvpTrainingRecommendation';
import { MvpAthlete } from './MvpScoutView';

interface MvpAthleteDetailProps {
  athlete: MvpAthlete;
}

const MvpAthleteDetail = ({ athlete }: MvpAthleteDetailProps) => {
  const [notes, setNotes] = useState('Impressive ball control. Needs work on defensive positioning. Strong vision for passes.');
  const [showRecommendation, setShowRecommendation] = useState(false);
  
  // Transform data for the comparison chart
  const comparisonData = [
    {
      name: 'xG',
      Athlete: athlete.stats.xG,
      Average: athlete.positionAverage.xG,
    },
    {
      name: 'Pass %',
      Athlete: athlete.stats.passCompletion,
      Average: athlete.positionAverage.passCompletion,
    },
    {
      name: 'Tackles',
      Athlete: athlete.stats.tackles,
      Average: athlete.positionAverage.tackles,
    },
    {
      name: 'Aerial Duels',
      Athlete: athlete.stats.aerialDuelsWon,
      Average: athlete.positionAverage.aerialDuelsWon,
    },
    {
      name: 'Shots',
      Athlete: athlete.stats.shotsOnTarget,
      Average: athlete.positionAverage.shotsOnTarget,
    },
    {
      name: 'Distance',
      Athlete: athlete.stats.distanceCovered,
      Average: athlete.positionAverage.distanceCovered,
    },
  ];

  return (
    <>
      {!showRecommendation ? (
        <div className="space-y-6">
          <Card className="bg-gray-900/60 border-gray-800">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={athlete.image} alt={athlete.name} />
                  <AvatarFallback>{athlete.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{athlete.name}</CardTitle>
                  <p className="text-sm text-gray-400">
                    {athlete.age} years • {athlete.position} • {athlete.tacticalRole}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stats" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800/60">
                  <TabsTrigger value="stats">Statistics</TabsTrigger>
                  <TabsTrigger value="comparison">Comparison</TabsTrigger>
                </TabsList>
                
                <TabsContent value="stats" className="pt-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Expected Goals (xG)</p>
                      <p className="text-xl font-semibold">{athlete.stats.xG.toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Pass Completion</p>
                      <p className="text-xl font-semibold">{athlete.stats.passCompletion}%</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Tackles per 90</p>
                      <p className="text-xl font-semibold">{athlete.stats.tackles}</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Aerial Duels Won</p>
                      <p className="text-xl font-semibold">{athlete.stats.aerialDuelsWon}</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Shots on Target</p>
                      <p className="text-xl font-semibold">{athlete.stats.shotsOnTarget}</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Distance (km)</p>
                      <p className="text-xl font-semibold">{athlete.stats.distanceCovered}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="comparison" className="pt-4">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={comparisonData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" tick={{ fill: '#ccc' }} />
                        <YAxis tick={{ fill: '#ccc' }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#222', 
                            border: '1px solid #444',
                            borderRadius: '4px',
                            color: '#fff'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="Athlete" fill="#9b87f5" />
                        <Bar dataKey="Average" fill="#555" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/60 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle>Scout Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                placeholder="Add your notes about this athlete here..."
                className="min-h-[120px]"
              />
            </CardContent>
            <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
              <Button variant="outline">Save Notes</Button>
              <Button onClick={() => setShowRecommendation(true)}>
                View Recommendation
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="bg-gray-900/60 border-gray-800">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle>AI Training Recommendation for {athlete.name}</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setShowRecommendation(false)}>
                Back to Profile
              </Button>
            </CardHeader>
            <CardContent>
              <MvpTrainingRecommendation />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default MvpAthleteDetail;
