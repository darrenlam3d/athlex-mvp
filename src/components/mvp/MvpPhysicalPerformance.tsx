
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { Zap, Gauge, Timer, Dumbbell, Heart, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the physical performance metrics
const strengthData = [
  { day: 'Mon', value: 2.1 },
  { day: 'Tue', value: 2.15 },
  { day: 'Wed', value: 2.2 },
  { day: 'Thu', value: 2.18 },
  { day: 'Fri', value: 2.25 },
  { day: 'Sat', value: 2.3 },
  { day: 'Sun', value: 2.28 },
];

const powerData = [
  { day: 'Mon', value: 540 },
  { day: 'Tue', value: 560 },
  { day: 'Wed', value: 590 },
  { day: 'Thu', value: 575 },
  { day: 'Fri', value: 605 },
  { day: 'Sat', value: 620 },
  { day: 'Sun', value: 610 },
];

const sprintData = [
  { distance: '10m', time: 1.8, previous: 1.85 },
  { distance: '20m', time: 2.9, previous: 3.0 },
  { distance: '40m', time: 5.1, previous: 5.3 },
];

const MicroTrendBar = ({ data, valueKey = 'value', height = 40, color = "#9b87f5" }) => (
  <div className="h-10">
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <Tooltip 
          content={({ active, payload }) => 
            active && payload && payload.length ? (
              <div className="bg-gray-900 border border-gray-800 p-2 rounded text-xs">
                {payload[0].payload.day}: {payload[0].value}
              </div>
            ) : null
          }
        />
        <Bar dataKey={valueKey} fill={color} radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const MetricCard = ({ title, value, unit, trend, icon: Icon, children }) => (
  <Card className="bg-gray-900/60 border-gray-800">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm flex items-center gap-2">
        <Icon className="h-4 w-4 text-athlex-accent" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold">{value}</span>
          <span className="text-sm text-gray-400">{unit}</span>
        </div>
        {trend && (
          <span className={`text-xs px-1.5 py-0.5 rounded ${trend.includes('+') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
            {trend}
          </span>
        )}
      </div>
      {children}
    </CardContent>
  </Card>
);

const MvpPhysicalPerformance = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center gap-2 pb-2 border-b border-gray-800">
        <Dumbbell className="h-5 w-5 text-athlex-accent" />
        Physical Performance
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <MetricCard 
          title="Strength-to-Weight Ratio" 
          value="2.28" 
          unit="x BW" 
          trend="+0.12" 
          icon={Dumbbell}
        >
          <MicroTrendBar data={strengthData} />
          <p className="text-xs text-gray-400 mt-2">Deadlift max relative to body weight</p>
        </MetricCard>
        
        <MetricCard 
          title="Power Output" 
          value="610" 
          unit="watts" 
          trend="+25" 
          icon={Zap}
        >
          <MicroTrendBar data={powerData} color="#8B5CF6" />
          <p className="text-xs text-gray-400 mt-2">Peak power output in training</p>
        </MetricCard>
        
        <MetricCard 
          title="Sprint Performance" 
          value="5.1" 
          unit="sec (40m)" 
          trend="-0.2" 
          icon={Timer}
        >
          <div className="space-y-2 mt-1">
            {sprintData.map((item) => (
              <div key={item.distance} className="flex items-center justify-between text-xs">
                <span>{item.distance}</span>
                <div className="flex items-center gap-3">
                  <span>{item.time}s</span>
                  <span className="text-green-400">
                    {(item.previous - item.time).toFixed(2)}s
                  </span>
                </div>
              </div>
            ))}
          </div>
        </MetricCard>
        
        <MetricCard 
          title="Explosive Acceleration" 
          value="4.8" 
          unit="m/s²" 
          trend="+0.3" 
          icon={Gauge}
        >
          <div className="h-10 w-full bg-gray-800/50 rounded-sm mt-1">
            <div 
              className="h-full bg-gradient-to-r from-athlex-accent to-athlex-accent-alt rounded-sm" 
              style={{ width: '85%' }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">First 5m acceleration measurement</p>
        </MetricCard>
        
        <MetricCard 
          title="Reaction Time" 
          value="215" 
          unit="ms" 
          trend="-12" 
          icon={Activity}
        >
          <div className="h-10 w-full bg-gray-800/50 rounded-sm mt-1">
            <div 
              className="h-full bg-gradient-to-r from-athlex-accent to-athlex-accent-alt rounded-sm" 
              style={{ width: '78%' }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Visual stimulus response time</p>
        </MetricCard>
        
        <MetricCard 
          title="VO2 Max" 
          value="58.2" 
          unit="ml/kg/min" 
          trend="+1.5" 
          icon={Heart}
        >
          <div className="flex items-center justify-center py-1">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  className="stroke-gray-800 fill-transparent" 
                  strokeWidth="8"
                />
                <circle 
                  cx="50" cy="50" r="45" 
                  className="stroke-athlex-accent fill-transparent" 
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset="56"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
                <text 
                  x="50" y="50" 
                  className="text-xs fill-white font-medium"
                  dominantBaseline="middle" 
                  textAnchor="middle"
                >
                  Excellent
                </text>
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1 text-center">80% percentile for age group</p>
        </MetricCard>
      </div>
    </div>
  );
};

export default MvpPhysicalPerformance;
