import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from "@/hooks/use-toast";
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import AthleteLayout from '@/layouts/AthleteLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Loader2, 
  AlertTriangle, 
  User, 
  Calendar, 
  BarChart2,
  Target,
  Plus,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { mockAthlete } from '@/lib/mockData';
import { Link } from 'react-router-dom';

// Mock data for now - will connect to Supabase later
const mockHealthKitData = [
  { date: '2025-04-16', value: 7.2, type: 'sleep' },
  { date: '2025-04-17', value: 6.5, type: 'sleep' },
  { date: '2025-04-18', value: 8.0, type: 'sleep' },
  { date: '2025-04-19', value: 7.5, type: 'sleep' },
  { date: '2025-04-20', value: 6.8, type: 'sleep' },
  { date: '2025-04-21', value: 7.3, type: 'sleep' },
  { date: '2025-04-22', value: 7.9, type: 'sleep' },
];

const mockWellnessData = {
  soreness_score: 3,
  fatigue_score: 2,
  mood_score: 4,
  timestamp: '2025-04-22T08:30:00Z'
};

const mockTestResults = [
  { id: 'test1', test_type: 'Vertical Jump', score: '65 cm', timestamp: '2025-04-20T10:15:00Z' },
  { id: 'test2', test_type: 'Sprint 40m', score: '5.1s', timestamp: '2025-04-18T09:30:00Z' },
  { id: 'test3', test_type: 'Shuttle Run', score: '10.2s', timestamp: '2025-04-15T14:45:00Z' },
];

const mockSessionData = [
  { week: 'Week 1', load: 350 },
  { week: 'Week 2', load: 400 },
  { week: 'Week 3', load: 300 },
  { week: 'Week 4', load: 450 },
  { week: 'Current', load: 600 },
];

const calculateACWR = (data: any[]) => {
  if (data.length < 5) return null;
  
  const currentWeekLoad = data[data.length - 1].load;
  const previousWeeksLoad = (data[data.length - 2].load + data[data.length - 3].load + 
                            data[data.length - 4].load + data[data.length - 5].load) / 4;
  
  return currentWeekLoad / previousWeeksLoad;
};

const AthleteMvpDashboard = () => {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const [athleteName, setAthleteName] = useState("Athlete");
  const [healthKitConnected, setHealthKitConnected] = useState(false);

  // Fetch athlete profile data
  const { data: athleteData, isLoading: profileLoading } = useQuery({
    queryKey: ['athleteProfile'],
    queryFn: async () => {
      // In a real app, we would fetch from Supabase
      console.log('AthleteMvpDashboard - Fetching athlete profile');
      
      // For demo purposes, use mock data
      return mockAthlete;
    },
    meta: {
      onSuccess: (data) => {
        if (data) {
          const firstName = data.first_name || "";
          setAthleteName(firstName || "Athlete");
        }
      },
      onError: (error) => {
        console.error("Profile fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data. Using default values.",
          variant: "destructive",
        });
      }
    }
  });

  // Simulate connecting to HealthKit
  const connectToHealthKit = () => {
    setHealthKitConnected(true);
    toast({
      title: "Success",
      description: "HealthKit Connected Successfully!",
      variant: "default",
    });
  };

  // Calculate ACWR for training load
  const acwr = calculateACWR(mockSessionData);
  const showRecoveryMessage = acwr !== null && acwr > 1.5;

  return (
    <AthleteLayout>
      <div className="container mx-auto py-8 px-4 md:px-8">
        {/* Demo Mode Banner */}
        <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-md p-3 mb-6 text-yellow-200 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
          <span><strong>ATHLEX MVP Demo:</strong> This dashboard is showing simulated data.</span>
        </div>
        
        {/* Header with Welcome Message */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              Welcome back, {athleteName}
            </h1>
            <p className="text-gray-400 mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <div className="flex items-center bg-athlex-gray-800 p-2 rounded-full">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-athlex-accent to-purple-700 flex items-center justify-center mr-2">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="text-white mr-2 hidden md:inline">{athleteName}</span>
          </div>
        </div>
        
        {/* HealthKit Connection Card */}
        <Card className="mb-6 bg-athlex-gray-900/80 border-athlex-gray-800 overflow-hidden">
          <div className="relative overflow-hidden">
            {healthKitConnected && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent" />
            )}
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Data Integration</h3>
                <p className="text-sm text-gray-400">
                  {healthKitConnected ? 
                    "HealthKit is connected and syncing data" : 
                    "Connect your HealthKit to sync your health data"}
                </p>
              </div>
              <Button
                onClick={connectToHealthKit}
                variant={healthKitConnected ? "outline" : "default"}
                className={healthKitConnected ? "border-green-500 text-green-500" : ""}
                disabled={healthKitConnected}
              >
                {healthKitConnected ? "Connected" : "Connect HealthKit"}
                {healthKitConnected && <RefreshCw className="ml-2 h-4 w-4 animate-spin" />}
              </Button>
            </CardContent>
          </div>
        </Card>
        
        {/* Tabs for Main Dashboard Sections */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="bg-athlex-gray-800/60 border-athlex-gray-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Sleep Data Card */}
            <Card className="bg-athlex-gray-900/80 border-athlex-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Sleep Duration (hrs)</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockHealthKitData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: '#888' }}
                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis tick={{ fill: '#888' }} domain={[5, 9]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #333' }} 
                        labelStyle={{ color: '#fff' }}
                        formatter={(value) => [`${value} hrs`, 'Sleep']}
                        labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#9b87f5" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: '#9b87f5' }} 
                        activeDot={{ r: 6, fill: '#9b87f5' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Training Load Card */}
            <Card className="bg-athlex-gray-900/80 border-athlex-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Weekly Training Load (sRPE)</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockSessionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                      <XAxis dataKey="week" tick={{ fill: '#888' }} />
                      <YAxis tick={{ fill: '#888' }} domain={[0, 800]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #333' }} 
                        labelStyle={{ color: '#fff' }}
                        formatter={(value) => [`${value} units`, 'Training Load']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="load" 
                        stroke="#8B5CF6" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: '#8B5CF6' }} 
                        activeDot={{ r: 6, fill: '#8B5CF6' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Conditional ACWR alert */}
                {showRecoveryMessage && (
                  <div className="mt-4 bg-red-900/20 border border-red-800/40 rounded-lg p-4 text-red-200">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Recovery Alert</h4>
                        <p className="text-sm mt-1">
                          Training load increased significantly this week (ACWR: {acwr.toFixed(2)}). 
                          Focus on recovery to reduce injury risk.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Recent Test Results */}
            <Card className="bg-athlex-gray-900/80 border-athlex-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Recent Test Results</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="divide-y divide-gray-800">
                  {mockTestResults.map(test => (
                    <div key={test.id} className="py-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{test.test_type}</h4>
                        <p className="text-sm text-gray-400">
                          {new Date(test.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-semibold text-athlex-accent">{test.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4 border-gray-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Log Test Result
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Performance Tab - Add content here */}
          <TabsContent value="performance" className="space-y-6 mt-6">
            <Card className="bg-athlex-gray-900/80 border-athlex-gray-800">
              <CardHeader>
                <CardTitle className="text-xl">Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Detailed performance analytics will appear here once you log more training data.</p>
                <div className="flex space-x-4 mt-6">
                  <Button variant="outline" className="flex-1 border-gray-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Log Session
                  </Button>
                  <Button variant="outline" className="flex-1 border-gray-700">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    View History
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-athlex-gray-900/80 border-athlex-gray-800">
              <CardHeader>
                <CardTitle className="text-xl">Training Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Improve sprint speed</h4>
                      <span className="text-sm text-gray-400">65%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2.5">
                      <div
                        className="bg-athlex-accent h-2.5 rounded-full"
                        style={{ width: '65%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Increase vertical jump</h4>
                      <span className="text-sm text-gray-400">40%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2.5">
                      <div
                        className="bg-athlex-accent h-2.5 rounded-full"
                        style={{ width: '40%' }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4 border-gray-700">
                  <Target className="h-4 w-4 mr-2" />
                  Add New Goal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Wellness Tab */}
          <TabsContent value="wellness" className="space-y-6 mt-6">
            <Card className="bg-athlex-gray-900/80 border-athlex-gray-800">
              <CardHeader>
                <CardTitle className="text-xl">Wellness Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-athlex-gray-800/60 rounded-lg p-4 text-center">
                    <h3 className="text-sm text-gray-400">Soreness</h3>
                    <div className="text-3xl font-bold mt-2">{mockWellnessData.soreness_score}</div>
                    <div className="text-xs text-gray-500 mt-1">out of 5</div>
                  </div>
                  
                  <div className="bg-athlex-gray-800/60 rounded-lg p-4 text-center">
                    <h3 className="text-sm text-gray-400">Fatigue</h3>
                    <div className="text-3xl font-bold mt-2">{mockWellnessData.fatigue_score}</div>
                    <div className="text-xs text-gray-500 mt-1">out of 5</div>
                  </div>
                  
                  <div className="bg-athlex-gray-800/60 rounded-lg p-4 text-center">
                    <h3 className="text-sm text-gray-400">Mood</h3>
                    <div className="text-3xl font-bold mt-2">{mockWellnessData.mood_score}</div>
                    <div className="text-xs text-gray-500 mt-1">out of 5</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 mt-4">
                  Last updated: {new Date(mockWellnessData.timestamp).toLocaleString()}
                </p>
                
                <Button variant="outline" size="sm" className="w-full mt-4 border-gray-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Log Wellness Score
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <Link to="/log-training">
            <Button 
              variant="outline" 
              className="bg-athlex-gray-900/80 border-athlex-gray-800 hover:border-athlex-accent p-4 h-auto flex flex-col items-center w-full"
            >
              <Calendar className="h-5 w-5 mb-2" />
              <span>Log Session</span>
            </Button>
          </Link>
          
          <Link to="/log-wellness">
            <Button 
              variant="outline" 
              className="bg-athlex-gray-900/80 border-athlex-gray-800 hover:border-athlex-accent p-4 h-auto flex flex-col items-center w-full"
            >
              <Activity className="h-5 w-5 mb-2" />
              <span>Log Wellness</span>
            </Button>
          </Link>
          
          <Link to="/log-test-result">
            <Button 
              variant="outline" 
              className="bg-athlex-gray-900/80 border-athlex-gray-800 hover:border-athlex-accent p-4 h-auto flex flex-col items-center w-full"
            >
              <Target className="h-5 w-5 mb-2" />
              <span>Log Test Result</span>
            </Button>
          </Link>
        </div>
      </div>
    </AthleteLayout>
  );
};

export default AthleteMvpDashboard;
