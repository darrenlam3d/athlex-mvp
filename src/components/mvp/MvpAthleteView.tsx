
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/contexts/ProfileContext';
import MvpPerformanceChart from './MvpPerformanceChart';
import MvpTrainingRecommendation from './MvpTrainingRecommendation';
import MvpMatchSummary from './MvpMatchSummary';
import MvpPerformanceComparison from './MvpPerformanceComparison';
import MvpTrainingSchedule from './MvpTrainingSchedule';
import MvpPhysicalPerformance from './MvpPhysicalPerformance';
import MvpReadinessRecovery from './MvpReadinessRecovery';
import MvpTrainingMetrics from './MvpTrainingMetrics';
import MvpEngagementBenchmarking from './MvpEngagementBenchmarking';
import MvpWearableConnection from './MvpWearableConnection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Activity, Award, Dumbbell, Heart, ListChecks, Users } from 'lucide-react';

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
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-athlex-accent" />
            Athlete Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24 border-2 border-athlex-accent shadow-[0_0_15px_rgba(155,135,245,0.3)]">
                <AvatarImage src={profileData.profileImage} alt={`${profileData.firstName} ${profileData.lastName}`} />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-xl font-semibold gradient-text">{`${profileData.firstName} ${profileData.lastName}`}</h2>
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
      
      {/* Tabs for different views */}
      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800/60">
          <TabsTrigger value="metrics" className="flex items-center gap-1.5">
            <Activity className="h-4 w-4" /> Metrics
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-1.5">
            <BarChart className="h-4 w-4" /> Performance
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center gap-1.5">
            <Award className="h-4 w-4" /> Training
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics" className="mt-4 space-y-6 animate-fade-in">
          {/* Stats Entry */}
          <Card className="bg-gray-900/60 border-gray-800">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Performance Metrics Entry</CardTitle>
                <Badge className="bg-athlex-accent/80">Last Match</Badge>
              </div>
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
              <Button className="mt-4 bg-athlex-accent hover:bg-athlex-accent/90">Update Performance Data</Button>
            </CardContent>
          </Card>
          
          {/* Recent Match Summary Card */}
          <MvpMatchSummary />
        </TabsContent>
        
        <TabsContent value="performance" className="mt-4 space-y-6 animate-fade-in">
          <MvpPerformanceChart />
          <MvpPerformanceComparison />
        </TabsContent>
        
        <TabsContent value="training" className="mt-4 space-y-6 animate-fade-in">
          <MvpTrainingRecommendation />
          <MvpTrainingSchedule />
        </TabsContent>
      </Tabs>
      
      {/* Wearable Physical & Training Metrics Section */}
      <div className="pt-6 mt-8 border-t border-gray-800">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold gradient-text mb-2">Physical & Training Metrics</h2>
            <p className="text-gray-400">
              Comprehensive performance tracking with data from wearables and manual input
            </p>
          </div>
          
          {/* Wearable Connection Component */}
          <MvpWearableConnection />
          
          {/* Physical & Training Metrics Tabs */}
          <Tabs defaultValue="physical-performance" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/60">
              <TabsTrigger value="physical-performance" className="flex items-center gap-1.5">
                <Dumbbell className="h-4 w-4" /> Physical
              </TabsTrigger>
              <TabsTrigger value="readiness-recovery" className="flex items-center gap-1.5">
                <Heart className="h-4 w-4" /> Recovery
              </TabsTrigger>
              <TabsTrigger value="training-metrics" className="flex items-center gap-1.5">
                <ListChecks className="h-4 w-4" /> Training
              </TabsTrigger>
              <TabsTrigger value="benchmarking" className="flex items-center gap-1.5">
                <Users className="h-4 w-4" /> Benchmarking
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="physical-performance" className="mt-4 animate-fade-in">
              <MvpPhysicalPerformance />
            </TabsContent>
            
            <TabsContent value="readiness-recovery" className="mt-4 animate-fade-in">
              <MvpReadinessRecovery />
            </TabsContent>
            
            <TabsContent value="training-metrics" className="mt-4 animate-fade-in">
              <MvpTrainingMetrics />
            </TabsContent>
            
            <TabsContent value="benchmarking" className="mt-4 animate-fade-in">
              <MvpEngagementBenchmarking />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MvpAthleteView;
