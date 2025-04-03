
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', you: 30, peers: 20 },
  { name: 'Feb', you: 35, peers: 25 },
  { name: 'Mar', you: 32, peers: 28 },
  { name: 'Apr', you: 40, peers: 30 },
  { name: 'May', you: 45, peers: 35 },
  { name: 'Jun', you: 50, peers: 38 },
];

const PerformanceOverview = () => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">Performance Overview</CardTitle>
        <div className="flex items-center px-2 py-1 rounded bg-green-900/50 text-green-400 text-sm">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+12%</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
              <XAxis dataKey="name" tick={{ fill: '#888' }} />
              <YAxis tick={{ fill: '#888' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #333' }} 
                labelStyle={{ color: '#fff' }} 
              />
              <Line 
                type="monotone" 
                dataKey="you" 
                stroke="#8B5CF6" 
                strokeWidth={3} 
                dot={{ r: 4 }} 
                name="You" 
              />
              <Line 
                type="monotone" 
                dataKey="peers" 
                stroke="#475569" 
                strokeWidth={2} 
                dot={{ r: 3 }} 
                name="Peers" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Latest Score</p>
            <p className="text-2xl font-bold">86.5</p>
          </div>
          <div>
            <p className="text-sm font-medium text-right">vs. Peers</p>
            <p className="text-xl font-semibold text-right text-green-400">+15%</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Full Analytics</Button>
      </CardFooter>
    </Card>
  );
};

export default PerformanceOverview;
