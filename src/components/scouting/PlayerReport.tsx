
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Calendar, 
  Clipboard,
  Download,
  Edit,
  FileText,
  Share2, 
  ThumbsUp,
  TrendingUp,
  Video,
  UserPlus
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';

// Mock performance data for the last 6 months
const performanceTrendData = [
  { month: 'Jan', xG: 1.2, passPercent: 91, tacklePercent: 76, sprintDistance: 75 },
  { month: 'Feb', xG: 1.4, passPercent: 92, tacklePercent: 78, sprintDistance: 78 },
  { month: 'Mar', xG: 1.5, passPercent: 93, tacklePercent: 79, sprintDistance: 82 },
  { month: 'Apr', xG: 1.6, passPercent: 93, tacklePercent: 79, sprintDistance: 84 },
  { month: 'May', xG: 1.7, passPercent: 94, tacklePercent: 80, sprintDistance: 86 },
  { month: 'Jun', xG: 1.7, passPercent: 94, tacklePercent: 80, sprintDistance: 88 },
];

// Technical abilities comparison data
const technicalAbilitiesData = [
  { ability: 'Passing', value: 15, fill: '#4ade80' },
  { ability: 'Ball Control', value: 12, fill: '#4ade80' },
  { ability: 'Vision', value: 20, fill: '#4ade80' },
  { ability: 'Shot Accuracy', value: 14, fill: '#4ade80' },
  { ability: 'Free Kicks', value: 18, fill: '#4ade80' },
];

// Physical abilities comparison data
const physicalAbilitiesData = [
  { ability: 'Speed', value: 8, fill: '#4ade80' },
  { ability: 'Stamina', value: 5, fill: '#4ade80' },
  { ability: 'Strength', value: -3, fill: '#f87171' },
  { ability: 'Agility', value: 7, fill: '#4ade80' },
  { ability: 'Jumping', value: -2, fill: '#f87171' },
];

// Radar chart data for overall skills
const radarData = [
  {
    subject: 'Passing',
    Player: 94,
    'Position Avg': 79,
    fullMark: 100,
  },
  {
    subject: 'Shooting',
    Player: 68,
    'Position Avg': 65,
    fullMark: 100,
  },
  {
    subject: 'Dribbling',
    Player: 85,
    'Position Avg': 72,
    fullMark: 100,
  },
  {
    subject: 'Defending',
    Player: 80,
    'Position Avg': 70,
    fullMark: 100,
  },
  {
    subject: 'Physical',
    Player: 75,
    'Position Avg': 78,
    fullMark: 100,
  },
  {
    subject: 'Vision',
    Player: 91,
    'Position Avg': 71,
    fullMark: 100,
  },
];

// Season progression data
const seasonProgressionData = [
  { game: 'Game 1', rating: 7.2 },
  { game: 'Game 2', rating: 7.5 },
  { game: 'Game 3', rating: 8.1 },
  { game: 'Game 4', rating: 7.8 },
  { game: 'Game 5', rating: 8.3 },
  { game: 'Game 6', rating: 7.9 },
  { game: 'Game 7', rating: 8.2 },
  { game: 'Game 8', rating: 8.5 },
  { game: 'Game 9', rating: 8.7 },
  { game: 'Game 10', rating: 8.6 },
];

const PlayerReport = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  const toggleTheme = () => {
    setTheme(current => current === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <div className={`${theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-athlex-background text-white'} rounded-lg p-6 transition-colors duration-200`}>
      <div className="flex justify-between mb-6">
        <Button variant="outline" size="sm" onClick={toggleTheme}>
          Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Report
          </Button>
        </div>
      </div>
      
      {/* Header Section */}
      <Card className={`${theme === 'light' ? 'bg-white' : 'bg-card'} border-gray-700 mb-6`}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <AvatarFallback className="text-xl">JR</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold">James Rodríguez</h1>
                  <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Attacking Midfielder • Central FC
                  </p>
                </div>
                <div className="mt-2 md:mt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">8.7</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${theme === 'light' ? 'bg-green-100 text-green-800' : 'bg-green-900/30 text-green-400'}`}>
                      Excellent
                    </span>
                  </div>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    <Calendar className="inline h-3 w-3 mr-1" />
                    Report Date: June 15, 2025
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className={`p-3 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}`}>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Age</p>
                  <p className="text-lg font-semibold">27</p>
                </div>
                <div className={`p-3 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}`}>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Height</p>
                  <p className="text-lg font-semibold">180 cm</p>
                </div>
                <div className={`p-3 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}`}>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Preferred Foot</p>
                  <p className="text-lg font-semibold">Left</p>
                </div>
                <div className={`p-3 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}`}>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Contract Until</p>
                  <p className="text-lg font-semibold">June 2026</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className={`${theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'} w-full md:w-auto`}>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="notes">Scouting Notes</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Offensive Stats */}
            <Card className={`${theme === 'light' ? 'bg-white' : 'bg-card'} border-gray-700`}>
              <CardHeader className="pb-2">
                <CardTitle>Offensive</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Expected Goals (xG)</span>
                    <span className="font-semibold">1.7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Shot Accuracy</span>
                    <span className="font-semibold">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Pass Completion</span>
                    <span className="font-semibold">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Key Passes/Game</span>
                    <span className="font-semibold">3.2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Defensive Stats */}
            <Card className={`${theme === 'light' ? 'bg-white' : 'bg-card'} border-gray-700`}>
              <CardHeader className="pb-2">
                <CardTitle>Defensive</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Tackle Success</span>
                    <span className="font-semibold">80%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Interceptions/Game</span>
                    <span className="font-semibold">2.4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Aerial Duels Won</span>
                    <span className="font-semibold">65%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Blocks/Game</span>
                    <span className="font-semibold">1.1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Physical Stats */}
            <Card className={`${theme === 'light' ? 'bg-white' : 'bg-card'} border-gray-700`}>
              <CardHeader className="pb-2">
                <CardTitle>Physical</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Sprint Distance</span>
                    <span className="font-semibold">88m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Top Speed</span>
                    <span className="font-semibold">32.4 km/h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Distance Covered</span>
                    <span className="font-semibold">11.2 km</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Intensity</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${theme === 'light' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/30 text-blue-400'}`}>
                      High
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Radar Chart for Overall Skills */}
          <Card className={`${theme === 'light' ? 'bg-white' : 'bg-card'} border-gray-700`}>
            <CardHeader>
              <CardTitle>Overall Skill Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius="80%" data={radarData}>
                    <PolarGrid stroke={theme === 'light' ? '#d1d5db' : '#4b5563'} />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: theme === 'light' ? '#4b5563' : '#d1d5db' }} 
                    />
                    <PolarRadiusAxis stroke={theme === 'light' ? '#d1d5db' : '#4b5563'} />
                    <Radar
                      name="Player"
                      dataKey="Player"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Position Avg"
                      dataKey="Position Avg"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Season Progression Chart */}
          <Card className={`${theme === 'light' ? 'bg-white' : 'bg-card'} border-gray-700`}>
            <CardHeader>
              <CardTitle>Season Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={seasonProgressionData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e5e7eb' : '#374151'} />
                    <XAxis 
                      dataKey="game" 
                      stroke={theme === 'light' ? '#6b7280' : '#9ca3af'} 
                    />
                    <YAxis 
                      domain={[6, 10]} 
                      stroke={theme === 'light' ? '#6b7280' : '#9ca3af'} 
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="rating"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4">
            <Button className="flex items-center">
              <UserPlus className="mr-2 h-4 w-4" />
              Add to Trial List
            </Button>
            <Button className="flex items-center" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Full Report
            </Button>
            <Button className="flex items-center" variant="outline">
              <Video className="mr-2 h-4 w-4" />
              View Match Clips
            </Button>
            <Button className="flex items-center" variant="outline">
              <Clipboard className="mr-2 h-4 w-4" />
              Scout Report Summary
            </Button>
          </div>
        </TabsContent>
        
        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6 mt-6">
          {/* Performance Trend Chart */}
          <Card className={`${theme === 'light' ? 'bg-white' : 'bg-card'} border-gray-700`}>
            <CardHeader>
              <CardTitle>Performance Trend (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceTrendData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e5e7eb' : '#374151'} />
                    <XAxis 
                      dataKey="month" 
                      stroke={theme === 'light' ? '#6b7280' : '#9ca3af'} 
                    />
                    <YAxis stroke={theme === 'light' ? '#6b7280' : '#9ca3af'} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="xG"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="passPercent" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="tacklePercent" stroke="#ffc658" />
                    <Line type="monotone" dataKey="sprintDistance" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Match Impact Analysis */}
          <Card className={`${theme === 'light' ? 'bg-white' : 'bg-card'} border-gray-700`}>
            <CardHeader>
              <CardTitle>Match Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/30'}`}>
                      <Activity className={`h-5 w-5 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">High Game Impact</h3>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        Player consistently influences game outcomes with key passes and creating goal-scoring opportunities.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${theme === 'light' ? 'bg-green-100' : 'bg-green-900/30'}`}>
                      <TrendingUp className={`h-5 w-5 ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">Improving Defensive Contributions</h3>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        Notable improvement in defensive metrics over the past 3 months, particularly in tackling and positioning.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${theme === 'light' ? 'bg-purple-100' : 'bg-purple-900/30'}`}>
                      <ThumbsUp className={`h-5 w-5 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">Set-Piece Specialist</h3>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        Exceptional delivery from corners and free kicks, creating 2.1 chances per game from set pieces.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6 mt-6">
          {/* Technical Abilities Comparison */}
          <Card className={`${theme === 'light' ? 'bg-white' : 'bg-card'} border-gray-700`}>
            <CardHeader>
              <CardTitle>Technical Abilities vs. Position Average</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={technicalAbilitiesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 100,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e5e7eb' : '#374151'} />
                    <XAxis 
                      type="number" 
                      domain={[-20, 20]} 
                      tickFormatter={(value) => `${value > 0 ? '+' : ''}${value}%`}
                      stroke={theme === 'light' ? '#6b7280' : '#9ca3af'} 
                    />
                    <YAxis 
                      dataKey="ability" 
                      type="category" 
                      stroke={theme === 'light' ? '#6b7280' : '#9ca3af'} 
                    />
                    <Tooltip formatter={(value) => [`${value > 0 ? '+' : ''}${value}%`, 'Comparison']} />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Physical Abilities Comparison */}
          <Card className={`${theme === 'light' ? 'bg-white' : 'bg-card'} border-gray-700`}>
            <CardHeader>
              <CardTitle>Physical Abilities vs. Position Average</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={physicalAbilitiesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 100,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e5e7eb' : '#374151'} />
                    <XAxis 
                      type="number" 
                      domain={[-20, 20]} 
                      tickFormatter={(value) => `${value > 0 ? '+' : ''}${value}%`}
                      stroke={theme === 'light' ? '#6b7280' : '#9ca3af'} 
                    />
                    <YAxis 
                      dataKey="ability" 
                      type="category" 
                      stroke={theme === 'light' ? '#6b7280' : '#9ca3af'} 
                    />
                    <Tooltip formatter={(value) => [`${value > 0 ? '+' : ''}${value}%`, 'Comparison']} />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Player Comparison Section */}
          <Card className={`${theme === 'light' ? 'bg-white' : 'bg-card'} border-gray-700`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Player Comparison</CardTitle>
                <Button size="sm">Compare with Another Player</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Select a player to compare stats side by side
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Scouting Notes Tab */}
        <TabsContent value="notes" className="space-y-6 mt-6">
          <Card className={`${theme === 'light' ? 'bg-white' : 'bg-card'} border-gray-700`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Scouting Notes</CardTitle>
                <Button size="sm">Add Note</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'} border-l-4 border-blue-500`}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">Technical Assessment</h3>
                    <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>June 15, 2025</span>
                  </div>
                  <p className={`mt-2 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Exceptional technical ability with the ball. His vision and passing range are elite level, consistently finding teammates in dangerous positions. First touch is immaculate, allowing him to control difficult passes even under pressure.
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'} border-l-4 border-green-500`}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">Physical Development</h3>
                    <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>June 10, 2025</span>
                  </div>
                  <p className={`mt-2 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Has shown marked improvement in physical conditioning over the past season. Still lacks some upper body strength which affects him in shoulder-to-shoulder situations, but compensates with excellent positioning and anticipation.
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'} border-l-4 border-amber-500`}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">Mental Attributes</h3>
                    <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>June 5, 2025</span>
                  </div>
                  <p className={`mt-2 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Leadership qualities becoming more evident as the season progressed. Has high tactical intelligence and game awareness. Responds well to coaching and demonstrates strong resilience when facing setbacks or criticism.
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'} border-l-4 border-purple-500`}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">Development Potential</h3>
                    <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>May 30, 2025</span>
                  </div>
                  <p className={`mt-2 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Has all the attributes to develop into a top-tier attacking midfielder. Already performing above the league average in key metrics, with significant room for growth in physical attributes. With targeted development in strength conditioning, could reach elite status within 1-2 seasons.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Final Recommendation */}
          <Card className={`${theme === 'light' ? 'bg-white' : 'bg-card'} border-gray-700`}>
            <CardHeader>
              <CardTitle>Final Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-green-50 text-green-900' : 'bg-green-900/20 text-green-300'} border border-green-500`}>
                <h3 className="font-semibold text-lg">Highly Recommend Acquisition</h3>
                <p className="mt-2">
                  James Rodríguez represents an exceptional talent with immediate impact potential and significant long-term value. His technical abilities alone make him a standout player, while his leadership qualities and tactical intelligence add further value. Physical development areas are clearly identifiable and addressable through targeted conditioning.
                </p>
                <p className="mt-2">
                  Expected to provide immediate quality in chance creation and set-piece delivery, with potential to develop into a franchise player over the next 2-3 seasons. Acquisition is strongly recommended, with a suggested valuation in the €12-15M range.
                </p>
                <div className="mt-4 flex items-center">
                  <span className="font-medium mr-2">Overall Rating:</span>
                  <span className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-current text-yellow-500" />
                    ))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlayerReport;
