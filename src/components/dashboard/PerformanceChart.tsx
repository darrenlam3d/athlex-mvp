import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, TrendingUp } from 'lucide-react';
import { mockPerformanceData } from '@/lib/mockData';

const PerformanceChart = () => {
  const [timeRange, setTimeRange] = useState('7D');
  const [metric, setMetric] = useState('speed');
  
  // Calculate date range based on selection
  const getDateRange = () => {
    const end = new Date();
    let start = new Date();
    
    switch (timeRange) {
      case '7D':
        start.setDate(start.getDate() - 7);
        break;
      case '30D':
        start.setDate(start.getDate() - 30);
        break;
      case '90D':
        start.setDate(start.getDate() - 90);
        break;
      default:
        start.setDate(start.getDate() - 7);
    }
    
    return { start, end };
  };
  
  // Check if Supabase is configured
  const isConfigured = isSupabaseConfigured();
  
  // Fetch performance data from Supabase or use mock data
  const { data, isLoading, error } = useQuery({
    queryKey: ['performanceData', timeRange, metric],
    queryFn: async () => {
      // If Supabase is not configured, return mock data
      if (!isConfigured) {
        console.log('Using mock performance data');
        
        // Format mock data for the chart
        return mockPerformanceData.map(log => ({
          name: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          [metric]: log[metric],
          date: log.date,
        }));
      }
      
      // Otherwise, fetch from Supabase
      const { start, end } = getDateRange();
      const user = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('training_logs')
        .select('date, speed, endurance, stamina, strength')
        .eq('user_id', user.data?.user?.id)
        .gte('date', start.toISOString())
        .lte('date', end.toISOString())
        .order('date', { ascending: true });
      
      if (error) throw error;
      
      // Format data for the chart
      return data.map(log => ({
        name: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        [metric]: log[metric],
        date: log.date,
      }));
    },
  });
  
  // Calculate improvement percentage
  const calculateImprovement = () => {
    if (!data || data.length < 2) return null;
    
    const first = data[0][metric];
    const last = data[data.length - 1][metric];
    const percentChange = ((last - first) / first) * 100;
    
    return {
      value: percentChange.toFixed(1),
      positive: percentChange > 0,
    };
  };
  
  const improvement = calculateImprovement();

  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-medium text-white">Performance Tracking</CardTitle>
        
        <div className="flex items-center gap-4">
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-[120px] bg-athlex-gray-800 border-athlex-gray-700">
              <SelectValue placeholder="Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="speed">Speed</SelectItem>
              <SelectItem value="endurance">Endurance</SelectItem>
              <SelectItem value="stamina">Stamina</SelectItem>
              <SelectItem value="strength">Strength</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[80px] bg-athlex-gray-800 border-athlex-gray-700">
              <SelectValue placeholder="Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7D">7D</SelectItem>
              <SelectItem value="30D">30D</SelectItem>
              <SelectItem value="90D">90D</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
          </div>
        ) : error ? (
          <div className="h-[300px] flex items-center justify-center text-red-400">
            Error loading performance data
          </div>
        ) : data?.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            No performance data found for this time range
          </div>
        ) : (
          <div className="h-[300px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" tick={{ fill: '#888' }} />
                <YAxis tick={{ fill: '#888' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #333' }} 
                  labelStyle={{ color: '#fff' }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey={metric} 
                  stroke="#9b87f5" 
                  strokeWidth={3} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
      
      {improvement && (
        <CardFooter>
          <div className={`flex items-center px-3 py-1 rounded-full ${
            improvement.positive 
              ? 'bg-green-900/50 text-green-400' 
              : 'bg-red-900/50 text-red-400'
          }`}>
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>{improvement.positive ? '+' : ''}{improvement.value}% since {timeRange}</span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default PerformanceChart;
