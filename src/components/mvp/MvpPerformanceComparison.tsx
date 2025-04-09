
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

// Mock data for the performance comparison
const comparisonData = [
  { subject: 'Pace', player: 85, teamAvg: 72, positionAvg: 77, fullMark: 100 },
  { subject: 'Shooting', player: 65, teamAvg: 68, positionAvg: 70, fullMark: 100 },
  { subject: 'Passing', player: 90, teamAvg: 75, positionAvg: 82, fullMark: 100 },
  { subject: 'Dribbling', player: 80, teamAvg: 70, positionAvg: 75, fullMark: 100 },
  { subject: 'Defense', player: 60, teamAvg: 65, positionAvg: 67, fullMark: 100 },
  { subject: 'Physical', player: 78, teamAvg: 72, positionAvg: 74, fullMark: 100 },
];

const MvpPerformanceComparison = () => {
  return (
    <Card className="bg-gray-900/60 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle>Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={comparisonData}>
              <PolarGrid stroke="#444" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#ccc' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#ccc' }} />
              <Radar 
                name="You" 
                dataKey="player" 
                stroke="#9b87f5" 
                fill="#9b87f5" 
                fillOpacity={0.3} 
              />
              <Radar 
                name="Team Average" 
                dataKey="teamAvg" 
                stroke="#555" 
                fill="#555" 
                fillOpacity={0.3} 
              />
              <Radar 
                name="Position Average" 
                dataKey="positionAvg" 
                stroke="#8B5CF6" 
                fill="#8B5CF6" 
                fillOpacity={0.3} 
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-gray-400">
          <p>Your passing and dribbling skills are significantly above both team and position averages, while there's room for improvement in defensive capabilities.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MvpPerformanceComparison;
