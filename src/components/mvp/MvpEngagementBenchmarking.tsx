
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BarChart, Award, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, BarChart as RechartsBarChart, Bar } from 'recharts';

// Mock data for benchmarking
const percentileData = [
  { attribute: 'Strength', value: 85, fullMark: 100 },
  { attribute: 'Speed', value: 92, fullMark: 100 },
  { attribute: 'Endurance', value: 78, fullMark: 100 },
  { attribute: 'Agility', value: 88, fullMark: 100 },
  { attribute: 'Technical', value: 72, fullMark: 100 },
  { attribute: 'Tactical', value: 68, fullMark: 100 },
];

const consistencyData = [
  { week: 'W1', value: 85 },
  { week: 'W2', value: 88 },
  { week: 'W3', value: 82 },
  { week: 'W4', value: 91 },
  { week: 'W5', value: 87 },
  { week: 'W6', value: 94 },
  { week: 'W7', value: 90 },
  { week: 'W8', value: 93 },
];

const milestones = [
  { 
    title: '1000km Distance Covered', 
    progress: 85, 
    date: '3 weeks remaining',
    icon: <Award className="h-8 w-8 text-yellow-500" />
  },
  { 
    title: '50 Training Sessions', 
    progress: 92, 
    date: 'Completed 2 days ago',
    icon: <TrendingUp className="h-8 w-8 text-green-500" />
  },
  { 
    title: '25 Team Games', 
    progress: 68, 
    date: '8 more to go',
    icon: <Users className="h-8 w-8 text-blue-500" />
  },
  { 
    title: 'Skill Master: Passing', 
    progress: 100, 
    date: 'Achieved',
    icon: <Award className="h-8 w-8 text-purple-500" />
  },
];

const MvpEngagementBenchmarking = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center gap-2 pb-2 border-b border-gray-800">
        <Users className="h-5 w-5 text-athlex-accent" />
        Engagement & Benchmarking
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-900/60 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-athlex-accent" />
              Percentile Ranking (vs. Peer Group)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={120} data={percentileData}>
                  <PolarGrid stroke="#444" />
                  <PolarAngleAxis dataKey="attribute" tick={{ fill: '#ccc' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#ccc' }} />
                  <Radar 
                    name="Your Percentile" 
                    dataKey="value" 
                    stroke="#9b87f5" 
                    fill="#9b87f5" 
                    fillOpacity={0.3} 
                  />
                  <Tooltip 
                    content={({ active, payload }) => 
                      active && payload && payload.length ? (
                        <div className="bg-gray-900 border border-gray-800 p-2 rounded text-xs">
                          <p>{payload[0]?.payload.attribute}</p>
                          <p className="font-medium">Percentile: {payload[0]?.value}</p>
                        </div>
                      ) : null
                    }
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-2">
              <div className="flex justify-center items-center gap-2">
                <Badge className="bg-athlex-accent/30 text-athlex-accent">Top 15%</Badge>
                <span className="text-sm">Overall Ranking</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                You rank particularly high in Speed and Agility compared to your peer group
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/60 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-athlex-accent" />
              Consistency Index
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-2xl font-semibold gradient-text">90.8%</h4>
                <p className="text-xs text-gray-400">8-Week Average</p>
              </div>
              <Badge className="bg-green-900/30 text-green-400">Excellent</Badge>
            </div>
            
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={consistencyData} margin={{ top: 5, right: 5, left: 5, bottom: 15 }}>
                  <XAxis dataKey="week" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <Tooltip 
                    content={({ active, payload }) => 
                      active && payload && payload.length ? (
                        <div className="bg-gray-900 border border-gray-800 p-2 rounded text-xs">
                          <p>{payload[0]?.payload.week}</p>
                          <p className="font-medium">Consistency: {payload[0]?.value}%</p>
                        </div>
                      ) : null
                    }
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#9b87f5" 
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#9b87f5" }}
                    activeDot={{ r: 6, fill: "#9b87f5" }}
                  />
                  {/* Threshold line */}
                  <Line 
                    type="monotone" 
                    dataKey={() => 80} 
                    stroke="#4ADE80" 
                    strokeWidth={1} 
                    strokeDasharray="4 4" 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4">
              <p className="text-xs text-gray-400">
                Consistency measures your adherence to training plans and scheduled sessions,
                as well as consistent effort levels during training.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/60 border-gray-800 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Award className="h-4 w-4 text-athlex-accent" />
              Milestone Recognition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="border border-gray-800 rounded p-4 relative overflow-hidden">
                  {/* Background progress indicator */}
                  <div 
                    className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-athlex-accent/10 to-athlex-accent-alt/10"
                    style={{ width: `${milestone.progress}%` }}
                  ></div>
                  
                  <div className="relative flex flex-col items-center text-center">
                    <div className="mb-3">{milestone.icon}</div>
                    <h4 className="text-sm font-medium mb-1">{milestone.title}</h4>
                    <p className="text-xs text-gray-400">{milestone.date}</p>
                    
                    <div className="w-full mt-3">
                      <div className="h-1.5 w-full bg-gray-800 rounded-full">
                        <div 
                          className="h-full bg-gradient-to-r from-athlex-accent to-athlex-accent-alt rounded-full"
                          style={{ width: `${milestone.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-400">
                        <span>0%</span>
                        <span>{milestone.progress}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    
                    {milestone.progress === 100 && (
                      <Badge className="mt-2 bg-athlex-accent-alt">Completed</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MvpEngagementBenchmarking;
