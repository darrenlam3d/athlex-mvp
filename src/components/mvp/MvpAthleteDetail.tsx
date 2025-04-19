
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import MvpTrainingRecommendation from './MvpTrainingRecommendation';
import { MvpAthlete } from '@/types/mvpTypes';
import { Badge } from '@/components/ui/badge';
import { Share2, Download, Star, Flag, Users, BarChart as BarChartIcon, PieChart, Activity, Award } from 'lucide-react';

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

  // Radar chart data
  const radarData = [
    { subject: 'Pace', A: Math.round(athlete.stats.distanceCovered * 7), fullMark: 100 },
    { subject: 'Shooting', A: Math.round(athlete.stats.xG * 100 + athlete.stats.shotsOnTarget * 5), fullMark: 100 },
    { subject: 'Passing', A: Math.round(athlete.stats.passCompletion), fullMark: 100 },
    { subject: 'Dribbling', A: Math.round(60 + Math.random() * 20), fullMark: 100 },
    { subject: 'Defense', A: Math.round(athlete.stats.tackles * 10), fullMark: 100 },
    { subject: 'Physical', A: Math.round(athlete.stats.aerialDuelsWon * 12), fullMark: 100 },
  ];

  return (
    <>
      {!showRecommendation ? (
        <div className="space-y-6">
          <Card className="bg-gray-900/60 border-gray-800 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-athlex-accent/30 to-athlex-accent-alt/30"></div>
            <CardHeader className="pb-2 relative">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20 border-4 border-gray-900 absolute -top-12">
                  <AvatarImage src={athlete.image} alt={athlete.name} />
                  <AvatarFallback>{athlete.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-24">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <CardTitle className="text-xl gradient-text">{athlete.name}</CardTitle>
                    <Badge className="bg-athlex-accent/80">Top Prospect</Badge>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <p className="text-gray-400">
                      {athlete.age} years • {athlete.position} • {athlete.tacticalRole}
                    </p>
                    {athlete.nationality && (
                      <div className="flex items-center gap-1 text-gray-400">
                        <Flag className="h-3 w-3" />
                        <span>{athlete.nationality}</span>
                      </div>
                    )}
                    {athlete.team && (
                      <div className="flex items-center gap-1 text-gray-400">
                        <Users className="h-3 w-3" />
                        <span>{athlete.team}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-auto flex gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Star className="h-3.5 w-3.5 mr-1" /> Shortlist
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Share2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stats" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800/60">
                  <TabsTrigger value="stats" className="flex items-center gap-1.5">
                    <BarChartIcon className="h-4 w-4" /> Statistics
                  </TabsTrigger>
                  <TabsTrigger value="comparison" className="flex items-center gap-1.5">
                    <PieChart className="h-4 w-4" /> Comparison
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="flex items-center gap-1.5">
                    <Activity className="h-4 w-4" /> Profile
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="stats" className="pt-4 animate-fade-in">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Expected Goals (xG)</p>
                      <p className="text-xl font-semibold">{athlete.stats.xG.toFixed(2)}</p>
                      <div className="text-xs mt-1 flex items-center">
                        <span className={athlete.stats.xG > athlete.positionAverage.xG ? "text-green-500" : "text-red-500"}>
                          {athlete.stats.xG > athlete.positionAverage.xG ? "+" : ""}
                          {((athlete.stats.xG / athlete.positionAverage.xG - 1) * 100).toFixed(1)}%
                        </span>
                        <span className="text-gray-500 ml-1">vs position avg</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Pass Completion</p>
                      <p className="text-xl font-semibold">{athlete.stats.passCompletion}%</p>
                      <div className="text-xs mt-1 flex items-center">
                        <span className={athlete.stats.passCompletion > athlete.positionAverage.passCompletion ? "text-green-500" : "text-red-500"}>
                          {athlete.stats.passCompletion > athlete.positionAverage.passCompletion ? "+" : ""}
                          {((athlete.stats.passCompletion / athlete.positionAverage.passCompletion - 1) * 100).toFixed(1)}%
                        </span>
                        <span className="text-gray-500 ml-1">vs position avg</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Tackles per 90</p>
                      <p className="text-xl font-semibold">{athlete.stats.tackles}</p>
                      <div className="text-xs mt-1 flex items-center">
                        <span className={athlete.stats.tackles > athlete.positionAverage.tackles ? "text-green-500" : "text-red-500"}>
                          {athlete.stats.tackles > athlete.positionAverage.tackles ? "+" : ""}
                          {((athlete.stats.tackles / athlete.positionAverage.tackles - 1) * 100).toFixed(1)}%
                        </span>
                        <span className="text-gray-500 ml-1">vs position avg</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Aerial Duels Won</p>
                      <p className="text-xl font-semibold">{athlete.stats.aerialDuelsWon}</p>
                      <div className="text-xs mt-1 flex items-center">
                        <span className={athlete.stats.aerialDuelsWon > athlete.positionAverage.aerialDuelsWon ? "text-green-500" : "text-red-500"}>
                          {athlete.stats.aerialDuelsWon > athlete.positionAverage.aerialDuelsWon ? "+" : ""}
                          {((athlete.stats.aerialDuelsWon / athlete.positionAverage.aerialDuelsWon - 1) * 100).toFixed(1)}%
                        </span>
                        <span className="text-gray-500 ml-1">vs position avg</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Shots on Target</p>
                      <p className="text-xl font-semibold">{athlete.stats.shotsOnTarget}</p>
                      <div className="text-xs mt-1 flex items-center">
                        <span className={athlete.stats.shotsOnTarget > athlete.positionAverage.shotsOnTarget ? "text-green-500" : "text-red-500"}>
                          {athlete.stats.shotsOnTarget > athlete.positionAverage.shotsOnTarget ? "+" : ""}
                          {((athlete.stats.shotsOnTarget / athlete.positionAverage.shotsOnTarget - 1) * 100).toFixed(1)}%
                        </span>
                        <span className="text-gray-500 ml-1">vs position avg</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Distance Covered (km)</p>
                      <p className="text-xl font-semibold">{athlete.stats.distanceCovered}</p>
                      <div className="text-xs mt-1 flex items-center">
                        <span className={athlete.stats.distanceCovered > athlete.positionAverage.distanceCovered ? "text-green-500" : "text-red-500"}>
                          {athlete.stats.distanceCovered > athlete.positionAverage.distanceCovered ? "+" : ""}
                          {((athlete.stats.distanceCovered / athlete.positionAverage.distanceCovered - 1) * 100).toFixed(1)}%
                        </span>
                        <span className="text-gray-500 ml-1">vs position avg</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="comparison" className="pt-4 animate-fade-in">
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
                
                <TabsContent value="profile" className="pt-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h3 className="text-base font-medium mb-3">Player Overview</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Position</span>
                            <span>{athlete.position}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Role</span>
                            <span>{athlete.tacticalRole}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Age</span>
                            <span>{athlete.age} years</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Team</span>
                            <span>{athlete.team || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Nationality</span>
                            <span>{athlete.nationality || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h3 className="text-base font-medium mb-3">AI Scouting Insight</h3>
                        <p className="text-sm text-gray-300">
                          {athlete.name} shows exceptional talent in
                          {athlete.position === 'Midfielder' ? ' distributing the ball and controlling the midfield tempo.' : 
                          athlete.position === 'Forward' ? ' finding scoring opportunities and creating chances.' : 
                          ' defensive positioning and breaking up opposition plays.'}
                        </p>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <Badge className="justify-center py-1 bg-athlex-accent/20 text-athlex-accent border-athlex-accent/30 hover:bg-athlex-accent/30">
                            {athlete.position === 'Midfielder' ? 'Vision' : 
                             athlete.position === 'Forward' ? 'Finishing' : 
                             'Tackling'}
                          </Badge>
                          <Badge className="justify-center py-1 bg-athlex-accent/20 text-athlex-accent border-athlex-accent/30 hover:bg-athlex-accent/30">
                            {athlete.position === 'Midfielder' ? 'Game Intelligence' : 
                             athlete.position === 'Forward' ? 'Positioning' : 
                             'Aerial Ability'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                          <PolarGrid stroke="#444" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#ccc' }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#ccc' }} />
                          <Radar name="Skills" dataKey="A" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.6} />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/60 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-athlex-accent" />
                Scout Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                placeholder="Add your notes about this athlete here..."
                className="min-h-[120px] bg-gray-800/50 border-gray-700 focus:border-athlex-accent/50"
              />
            </CardContent>
            <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
              <Button variant="outline">Save Notes</Button>
              <Button 
                onClick={() => setShowRecommendation(true)}
                className="bg-athlex-accent hover:bg-athlex-accent/90"
              >
                View Recommendation
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="bg-gray-900/60 border-gray-800">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-athlex-accent" />
                AI Training Recommendation for {athlete.name}
              </CardTitle>
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
