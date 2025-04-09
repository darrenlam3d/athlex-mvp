
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, BedDouble, Activity, BarChart3 } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the readiness metrics
const hrvData = [
  { day: 'Mon', value: 58 },
  { day: 'Tue', value: 62 },
  { day: 'Wed', value: 65 },
  { day: 'Thu', value: 61 },
  { day: 'Fri', value: 68 },
  { day: 'Sat', value: 72 },
  { day: 'Sun', value: 69 },
];

const restingHRData = [
  { day: 'Mon', value: 62 },
  { day: 'Tue', value: 60 },
  { day: 'Wed', value: 58 },
  { day: 'Thu', value: 59 },
  { day: 'Fri', value: 56 },
  { day: 'Sat', value: 55 },
  { day: 'Sun', value: 57 },
];

const sleepData = [
  { day: 'Mon', deep: 1.5, light: 5.0, rem: 1.2 },
  { day: 'Tue', deep: 1.8, light: 4.8, rem: 1.3 },
  { day: 'Wed', deep: 2.1, light: 4.5, rem: 1.5 },
  { day: 'Thu', deep: 1.7, light: 4.9, rem: 1.1 },
  { day: 'Fri', deep: 2.0, light: 4.7, rem: 1.4 },
  { day: 'Sat', deep: 2.3, light: 5.2, rem: 1.6 },
  { day: 'Sun', deep: 2.1, light: 5.0, rem: 1.5 },
];

const CircularGauge = ({ value, max, title, color }) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r="45" 
            className="stroke-gray-800 fill-transparent" 
            strokeWidth="8"
          />
          <circle 
            cx="50" cy="50" r="45" 
            className={`stroke-${color} fill-transparent`} 
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          <text 
            x="50" y="45" 
            className="text-xl fill-white font-semibold"
            dominantBaseline="middle" 
            textAnchor="middle"
          >
            {value}
          </text>
          <text 
            x="50" y="65" 
            className="text-xs fill-gray-400"
            dominantBaseline="middle" 
            textAnchor="middle"
          >
            / {max}
          </text>
        </svg>
      </div>
      <span className="text-sm mt-2">{title}</span>
    </div>
  );
};

const MvpReadinessRecovery = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center gap-2 pb-2 border-b border-gray-800">
        <BedDouble className="h-5 w-5 text-athlex-accent" />
        Readiness & Recovery
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-900/60 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Heart className="h-4 w-4 text-athlex-accent" />
              Heart Rate Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="text-sm font-medium">Resting HR</h4>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-green-900/30 text-green-400">-5 BPM</span>
                </div>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={restingHRData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <Line type="monotone" dataKey="value" stroke="#9b87f5" strokeWidth={2} dot={{ r: 3 }} />
                      <Tooltip 
                        content={({ active, payload }) => 
                          active && payload && payload.length ? (
                            <div className="bg-gray-900 border border-gray-800 p-2 rounded text-xs">
                              {payload[0].payload.day}: {payload[0].value} BPM
                            </div>
                          ) : null
                        }
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="text-sm font-medium">HRV</h4>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-green-900/30 text-green-400">+11 ms</span>
                </div>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hrvData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} />
                      <Tooltip 
                        content={({ active, payload }) => 
                          active && payload && payload.length ? (
                            <div className="bg-gray-900 border border-gray-800 p-2 rounded text-xs">
                              {payload[0].payload.day}: {payload[0].value} ms
                            </div>
                          ) : null
                        }
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="mt-4 border-t border-gray-800 pt-4">
              <div className="flex items-baseline justify-between mb-2">
                <h4 className="text-sm font-medium">Heart Rate Recovery (HRR)</h4>
                <span className="text-sm font-medium text-athlex-accent">46 BPM</span>
              </div>
              <p className="text-xs text-gray-400">1-minute recovery from peak exercise</p>
              <div className="h-2 w-full bg-gray-800/50 rounded-full mt-2">
                <div 
                  className="h-full bg-gradient-to-r from-athlex-accent to-athlex-accent-alt rounded-full" 
                  style={{ width: '82%' }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">82% of elite athlete benchmark</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/60 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BedDouble className="h-4 w-4 text-athlex-accent" />
              Sleep Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between mb-2">
              <h4 className="text-sm font-medium">Sleep Duration & Phases</h4>
              <span className="text-sm font-medium">7.9 hrs</span>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sleepData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }} barSize={20} stackOffset="expand">
                  <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <Tooltip 
                    content={({ active, payload }) => 
                      active && payload && payload.length ? (
                        <div className="bg-gray-900 border border-gray-800 p-2 rounded text-xs">
                          <p className="mb-1">{payload[0]?.payload.day}</p>
                          <p className="text-indigo-300">Deep: {payload[0]?.value} hrs</p>
                          <p className="text-purple-300">REM: {payload[2]?.value} hrs</p>
                          <p className="text-blue-300">Light: {payload[1]?.value} hrs</p>
                          <p className="font-medium mt-1">
                            Total: {(payload[0]?.value + payload[1]?.value + payload[2]?.value).toFixed(1)} hrs
                          </p>
                        </div>
                      ) : null
                    }
                  />
                  <Bar dataKey="deep" stackId="sleep" fill="#6366F1" />
                  <Bar dataKey="light" stackId="sleep" fill="#60A5FA" />
                  <Bar dataKey="rem" stackId="sleep" fill="#A78BFA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                <span className="text-xs">Deep (26%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-xs">REM (19%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-xs">Light (55%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/60 border-gray-800 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4 text-athlex-accent" />
              Perceived Exertion (Borg Scale)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-sm font-medium mb-2">Recent Workouts</h4>
                <div className="space-y-3">
                  {[
                    { date: 'Today', type: 'Speed Training', score: 8 },
                    { date: 'Yesterday', type: 'Match Play', score: 9 },
                    { date: '3 days ago', type: 'Recovery Session', score: 4 },
                    { date: '5 days ago', type: 'Strength Training', score: 7 },
                  ].map((workout, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">{workout.type}</p>
                        <p className="text-xs text-gray-400">{workout.date}</p>
                      </div>
                      <div 
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          workout.score >= 8 ? 'bg-red-900/30 text-red-400' :
                          workout.score >= 6 ? 'bg-orange-900/30 text-orange-400' : 
                          'bg-green-900/30 text-green-400'
                        }`}
                      >
                        {workout.score}/10
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="flex items-end justify-center gap-4">
                  <CircularGauge value={7} max={10} title="Weekly Avg" color="athlex-accent" />
                  <CircularGauge value={6.2} max={10} title="Monthly Avg" color="athlex-accent-alt" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MvpReadinessRecovery;
