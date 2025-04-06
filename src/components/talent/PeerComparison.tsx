
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PeerComparison = () => {
  const [comparisonType, setComparisonType] = useState('performance');
  const [peerGroup, setPeerGroup] = useState('position');
  
  // Sample data for the comparison chart
  const performanceData = [
    { name: 'Speed', you: 85, peerAvg: 72, top10: 92 },
    { name: 'Stamina', you: 90, peerAvg: 75, top10: 94 },
    { name: 'Passing', you: 78, peerAvg: 70, top10: 88 },
    { name: 'Shooting', you: 65, peerAvg: 68, top10: 85 },
    { name: 'Tackling', you: 82, peerAvg: 71, top10: 90 },
  ];
  
  const physicalData = [
    { name: 'Sprint (km/h)', you: 32.1, peerAvg: 30.2, top10: 33.6 },
    { name: 'Stamina (km)', you: 11.2, peerAvg: 10.1, top10: 12.3 },
    { name: 'Recovery', you: 75, peerAvg: 65, top10: 85 },
    { name: 'Agility', you: 80, peerAvg: 72, top10: 88 },
    { name: 'Strength', you: 68, peerAvg: 70, top10: 82 },
  ];
  
  const chartData = comparisonType === 'performance' ? performanceData : physicalData;
  
  return (
    <Card className="border-gray-700 bg-card">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <CardTitle className="text-xl font-medium">Peer Comparison</CardTitle>
          <div className="flex gap-2">
            <Select value={comparisonType} onValueChange={setComparisonType}>
              <SelectTrigger className="w-[140px] h-8 bg-gray-800 border-gray-700">
                <SelectValue placeholder="Metric" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="physical">Physical</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={peerGroup} onValueChange={setPeerGroup}>
              <SelectTrigger className="w-[140px] h-8 bg-gray-800 border-gray-700">
                <SelectValue placeholder="Peers" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="position">Same Position</SelectItem>
                <SelectItem value="age">Same Age Group</SelectItem>
                <SelectItem value="region">Same Region</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.375rem' }}
                itemStyle={{ color: '#f3f4f6' }}
                labelStyle={{ color: '#f3f4f6', fontWeight: 'bold' }}
              />
              <Legend 
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: "20px" }}
              />
              <Bar dataKey="peerAvg" name="Peer Average" fill="#6b7280" />
              <Bar dataKey="you" name="You" fill="#9b87f5" />
              <Bar dataKey="top10" name="Top 10%" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-athlex-accent font-medium">Your Strengths</h4>
            <p className="text-sm mt-1">
              {comparisonType === 'performance' 
                ? 'Your stamina is in the top 15% among central midfielders in your age group.'
                : 'Your sprint speed ranks highly, and your recovery time is better than 70% of peers.'}
            </p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-athlex-accent font-medium">Areas to Improve</h4>
            <p className="text-sm mt-1">
              {comparisonType === 'performance' 
                ? 'Focus on shooting practice to match the average for your position.'
                : 'Strength training could help you match peer averages in that area.'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeerComparison;
