
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BenchmarkComparison = () => {
  const benchmarkData = [
    {
      name: 'Speed',
      you: 85,
      average: 70,
      top10: 92,
    },
    {
      name: 'Agility',
      you: 80,
      average: 72,
      top10: 90,
    },
    {
      name: 'Endurance',
      you: 75,
      average: 68,
      top10: 88,
    },
    {
      name: 'Shooting',
      you: 92,
      average: 75,
      top10: 95,
    },
    {
      name: 'Ball Control',
      you: 88,
      average: 73,
      top10: 94,
    },
  ];

  // Chart configuration for styling
  const chartConfig = {
    you: {
      label: "You",
      theme: {
        light: "#9b87f5",
        dark: "#9b87f5"
      }
    },
    average: {
      label: "Avg. Point Guard",
      theme: {
        light: "#6b7280",
        dark: "#6b7280"
      }
    },
    top10: {
      label: "Top 10%",
      theme: {
        light: "#f59e0b",
        dark: "#f59e0b"
      }
    }
  };

  return (
    <Card className="border-gray-700 bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Benchmark Comparison</CardTitle>
        <CardDescription className="text-gray-400 mt-1">
          How you compare to similar players (Point Guards, Age 22-25)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={benchmarkData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
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
                <Legend />
                <Bar dataKey="average" fill="var(--color-average)" />
                <Bar dataKey="you" fill="var(--color-you)" />
                <Bar dataKey="top10" fill="var(--color-top10)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-800/30 rounded-lg p-4">
            <h4 className="text-athlex-accent font-medium">Top Performance</h4>
            <p className="text-sm mt-1">Your shooting accuracy (92%) is in the top 15% of point guards in your age group.</p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4">
            <h4 className="text-athlex-accent font-medium">Area to Improve</h4>
            <p className="text-sm mt-1">Your endurance (75%) is above average but has the largest gap compared to top performers.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BenchmarkComparison;
