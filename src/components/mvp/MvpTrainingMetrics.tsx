
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarDays, TrendingUp, Award, Target, BarChart2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for the training metrics
const trainingVolumeData = [
  { week: 'W1', strength: 3, cardio: 2, technical: 4 },
  { week: 'W2', strength: 4, cardio: 3, technical: 3 },
  { week: 'W3', strength: 2, cardio: 4, technical: 5 },
  { week: 'W4', strength: 5, cardio: 2, technical: 4 },
  { week: 'W5', strength: 4, cardio: 3, technical: 3 },
  { week: 'W6', strength: 3, cardio: 5, technical: 2 },
];

const workloadRatioData = [
  { week: 'W1', ratio: 0.8 },
  { week: 'W2', ratio: 0.9 },
  { week: 'W3', ratio: 1.1 },
  { week: 'W4', ratio: 1.3 },
  { week: 'W5', ratio: 1.2 },
  { week: 'W6', ratio: 1.0 },
];

const goalCompletionData = [
  { month: 'Jan', rate: 78 },
  { month: 'Feb', rate: 82 },
  { month: 'Mar', rate: 85 },
  { month: 'Apr', rate: 80 },
  { month: 'May', rate: 92 },
  { month: 'Jun', rate: 88 },
];

const skillExecutionData = [
  { skill: 'Passing', rate: 85 },
  { skill: 'Shooting', rate: 72 },
  { skill: 'Dribbling', rate: 78 },
  { skill: 'Tackling', rate: 68 },
  { skill: 'Positioning', rate: 82 },
];

const personalRecords = [
  { 
    title: 'Squat Max', 
    value: '140kg', 
    date: '3 days ago', 
    improvement: '+5kg'
  },
  { 
    title: 'Bench Press', 
    value: '95kg', 
    date: '1 week ago', 
    improvement: '+2.5kg'
  },
  { 
    title: 'Vertical Jump', 
    value: '76cm', 
    date: '2 weeks ago', 
    improvement: '+3cm'
  },
  { 
    title: '5km Run', 
    value: '18:45', 
    date: '1 month ago', 
    improvement: '-0:32'
  },
];

const MvpTrainingMetrics = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center gap-2 pb-2 border-b border-gray-800">
        <BarChart2 className="h-5 w-5 text-athlex-accent" />
        Training Metrics
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-900/60 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-athlex-accent" />
              Training Volume (Weekly)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trainingVolumeData} margin={{ top: 5, right: 5, left: 5, bottom: 15 }}>
                  <XAxis dataKey="week" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <Tooltip 
                    content={({ active, payload }) => 
                      active && payload && payload.length ? (
                        <div className="bg-gray-900 border border-gray-800 p-2 rounded text-xs">
                          <p className="mb-1 font-medium">{payload[0]?.payload.week}</p>
                          <p className="text-purple-300">Strength: {payload[0]?.value} hrs</p>
                          <p className="text-blue-300">Cardio: {payload[1]?.value} hrs</p>
                          <p className="text-green-300">Technical: {payload[2]?.value} hrs</p>
                          <p className="font-medium mt-1">
                            Total: {(payload[0]?.value + payload[1]?.value + payload[2]?.value)} hrs
                          </p>
                        </div>
                      ) : null
                    }
                  />
                  <Bar dataKey="strength" fill="#9b87f5" stackId="a" />
                  <Bar dataKey="cardio" fill="#60A5FA" stackId="a" />
                  <Bar dataKey="technical" fill="#4ADE80" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-athlex-accent"></span>
                <span className="text-xs">Strength</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-xs">Cardio</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-xs">Technical</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/60 border-gray-800">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-athlex-accent" />
              Acute:Chronic Workload Ratio
            </CardTitle>
            <Badge className="bg-green-900/30 text-green-400">Optimal Zone</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={workloadRatioData} margin={{ top: 5, right: 5, left: 5, bottom: 15 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="week" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <YAxis domain={[0, 2]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <Tooltip 
                    content={({ active, payload }) => 
                      active && payload && payload.length ? (
                        <div className="bg-gray-900 border border-gray-800 p-2 rounded text-xs">
                          <p>{payload[0]?.payload.week}</p>
                          <p className="font-medium">Ratio: {payload[0]?.value}</p>
                        </div>
                      ) : null
                    }
                  />
                  {/* Safe zone rectangle */}
                  <rect x="0%" y="67.5%" width="100%" height="15%" fill="rgba(74, 222, 128, 0.1)" />
                  <Line 
                    type="monotone" 
                    dataKey="ratio" 
                    stroke="#9b87f5" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: "#9b87f5" }}
                    activeDot={{ r: 6, fill: "#9b87f5" }}
                  />
                  {/* Danger threshold line */}
                  <Line 
                    type="monotone" 
                    dataKey={() => 1.5} 
                    stroke="#F87171" 
                    strokeWidth={1} 
                    strokeDasharray="4 4" 
                    dot={false}
                  />
                  {/* Safety threshold line */}
                  <Line 
                    type="monotone" 
                    dataKey={() => 0.8} 
                    stroke="#4ADE80" 
                    strokeWidth={1} 
                    strokeDasharray="4 4" 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="text-xs">
                <span className="text-green-400 inline-block mr-2">●</span>
                <span className="text-gray-400">Safe Zone (0.8 - 1.3)</span>
              </div>
              <div className="text-xs">
                <span className="text-red-400 inline-block mr-2">●</span>
                <span className="text-gray-400">Injury Risk (>1.5)</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/60 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="h-4 w-4 text-athlex-accent" />
              Goal Completion & Skill Execution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="text-sm font-medium">Goal Completion Rate</h4>
                  <span className="text-sm font-medium text-athlex-accent">88%</span>
                </div>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={goalCompletionData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <Tooltip 
                        content={({ active, payload }) => 
                          active && payload && payload.length ? (
                            <div className="bg-gray-900 border border-gray-800 p-2 rounded text-xs">
                              <p>{payload[0]?.payload.month}</p>
                              <p className="font-medium">Rate: {payload[0]?.value}%</p>
                            </div>
                          ) : null
                        }
                      />
                      <Line 
                        type="monotone" 
                        dataKey="rate" 
                        stroke="#9b87f5" 
                        strokeWidth={2} 
                        dot={{ r: 3, fill: "#9b87f5" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="text-sm font-medium">Skill Execution Rate</h4>
                  <span className="text-sm font-medium text-athlex-accent-alt">77%</span>
                </div>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={skillExecutionData} 
                      layout="vertical" 
                      margin={{ top: 5, right: 5, left: 50, bottom: 5 }}
                    >
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis 
                        dataKey="skill" 
                        type="category" 
                        tick={{ fill: '#9ca3af', fontSize: 10 }} 
                      />
                      <Tooltip 
                        content={({ active, payload }) => 
                          active && payload && payload.length ? (
                            <div className="bg-gray-900 border border-gray-800 p-2 rounded text-xs">
                              <p>{payload[0]?.payload.skill}</p>
                              <p className="font-medium">Rate: {payload[0]?.value}%</p>
                            </div>
                          ) : null
                        }
                      />
                      <Bar 
                        dataKey="rate" 
                        fill="#8B5CF6" 
                        radius={[0, 4, 4, 0]}
                        barSize={10} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/60 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Award className="h-4 w-4 text-athlex-accent" />
              Personal Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personalRecords.map((record, idx) => (
                <div key={idx} className="border border-gray-800 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-sm font-medium">{record.title}</h5>
                      <p className="text-xs text-gray-400">{record.date}</p>
                    </div>
                    <Badge 
                      className={`${record.improvement.startsWith('+') ? 'bg-green-900/30 text-green-400' : 'bg-blue-900/30 text-blue-400'}`}
                    >
                      {record.improvement}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center">
                    <Award className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-lg font-semibold">{record.value}</span>
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

export default MvpTrainingMetrics;
