
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/contexts/ProfileContext';
import MvpPerformanceChart from './MvpPerformanceChart';
import MvpTrainingRecommendation from './MvpTrainingRecommendation';

const MvpAthleteView = () => {
  const { profileData } = useProfile();
  
  // Stats state
  const [stats, setStats] = useState({
    sprintDistance: '142.8',
    passCompletionRate: '78.5',
    tackleSuccess: '62.3',
    aerialDuelsWon: '14',
    shotsOnTarget: '3',
    distanceCovered: '10.4'
  });
  
  const handleStatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStats({
      ...stats,
      [e.target.name]: e.target.value
    });
  };
  
  const getInitials = () => {
    return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`;
  };
  
  return (
    <div className="space-y-6">
      {/* Basic Profile */}
      <Card className="bg-gray-900/60 border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle>Athlete Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileData.profileImage} alt={`${profileData.firstName} ${profileData.lastName}`} />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{`${profileData.firstName} ${profileData.lastName}`}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  <div>
                    <p className="text-sm text-gray-400">Age</p>
                    <p className="font-medium">{profileData.age || '22'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Sport</p>
                    <p className="font-medium">{profileData.sport}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Position</p>
                    <p className="font-medium">{profileData.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Tactical Role</p>
                    <p className="font-medium">{profileData.tacticalRole || 'Box-to-Box'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats Entry */}
      <Card className="bg-gray-900/60 border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle>Performance Metrics Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="sprintDistance">Sprint Distance (m)</Label>
              <Input 
                id="sprintDistance" 
                name="sprintDistance" 
                value={stats.sprintDistance} 
                onChange={handleStatsChange} 
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="passCompletionRate">Pass Completion (%)</Label>
              <Input 
                id="passCompletionRate" 
                name="passCompletionRate" 
                value={stats.passCompletionRate} 
                onChange={handleStatsChange} 
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="tackleSuccess">Tackle Success (%)</Label>
              <Input 
                id="tackleSuccess" 
                name="tackleSuccess" 
                value={stats.tackleSuccess} 
                onChange={handleStatsChange} 
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="aerialDuelsWon">Aerial Duels Won</Label>
              <Input 
                id="aerialDuelsWon" 
                name="aerialDuelsWon" 
                value={stats.aerialDuelsWon} 
                onChange={handleStatsChange} 
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="shotsOnTarget">Shots on Target</Label>
              <Input 
                id="shotsOnTarget" 
                name="shotsOnTarget" 
                value={stats.shotsOnTarget} 
                onChange={handleStatsChange} 
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="distanceCovered">Distance Covered (km)</Label>
              <Input 
                id="distanceCovered" 
                name="distanceCovered" 
                value={stats.distanceCovered} 
                onChange={handleStatsChange} 
                className="mt-1" 
              />
            </div>
          </div>
          <Button className="mt-4">Update Performance Data</Button>
        </CardContent>
      </Card>
      
      {/* Performance Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MvpPerformanceChart />
        <MvpTrainingRecommendation />
      </div>
    </div>
  );
};

export default MvpAthleteView;
