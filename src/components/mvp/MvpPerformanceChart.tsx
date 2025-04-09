
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the performance trend
const performanceData = [
  { week: 'Week 1', rating: 72 },
  { week: 'Week 2', rating: 74 },
  { week: 'Week 3', rating: 73 },
  { week: 'Week 4', rating: 76 },
  { week: 'Week 5', rating: 75 },
  { week: 'Week 6', rating: 79 },
  { week: 'Week 7', rating: 82 },
  { week: 'Week 8', rating: 84 },
];

const MvpPerformanceChart = () => {
  return (
    <Card className="bg-gray-900/60 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle>Performance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performanceData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis 
                dataKey="week" 
                tick={{ fill: '#ccc' }} 
                axisLine={{ stroke: '#666' }} 
              />
              <YAxis 
                domain={[60, 100]} 
                tick={{ fill: '#ccc' }} 
                axisLine={{ stroke: '#666' }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#222', 
                  border: '1px solid #444',
                  borderRadius: '4px',
                  color: '#fff'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="rating" 
                stroke="#9b87f5" 
                activeDot={{ r: 8, fill: '#9b87f5', stroke: '#fff' }} 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-sm text-gray-400">
          <p>Your performance score has improved by 12 points over the last 8 weeks.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MvpPerformanceChart;
