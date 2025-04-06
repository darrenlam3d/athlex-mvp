
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const TrendGraphs = () => {
  // Weekly performance data
  const weeklyData = [
    { day: 'Mon', distance: 7.8, speed: 31.2, passing: 82 },
    { day: 'Tue', distance: 8.2, speed: 31.5, passing: 84 },
    { day: 'Wed', distance: 8.4, speed: 32.0, passing: 86 },
    { day: 'Thu', distance: 8.6, speed: 32.3, passing: 85 },
    { day: 'Fri', distance: 9.0, speed: 32.8, passing: 87 },
    { day: 'Sat', distance: 9.2, speed: 33.0, passing: 89 },
    { day: 'Sun', distance: 9.1, speed: 32.9, passing: 90 }
  ];

  // Monthly performance data
  const monthlyData = [
    { month: 'Jan', distance: 7.0, speed: 30.2, passing: 78 },
    { month: 'Feb', distance: 7.8, speed: 31.0, passing: 82 },
    { month: 'Mar', distance: 8.5, speed: 32.1, passing: 86 },
    { month: 'Apr', distance: 9.0, speed: 32.9, passing: 90 },
  ];

  // Chart configuration for styling
  const chartConfig = {
    distance: {
      label: "Distance (km)",
      theme: {
        light: "#9b87f5",
        dark: "#9b87f5"
      }
    },
    speed: {
      label: "Top Speed (km/h)",
      theme: {
        light: "#6ee7b7",
        dark: "#6ee7b7"
      }
    },
    passing: {
      label: "Passing (%)",
      theme: {
        light: "#93c5fd",
        dark: "#93c5fd"
      }
    }
  };

  return (
    <Card className="border-gray-700 bg-card text-card-foreground min-h-[700px]">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Performance Trends</CardTitle>
        <CardDescription className="text-gray-400 mt-1">
          Track your progress over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/60">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="pt-4">
            <div className="flex flex-col space-y-6">
              {/* Chart container with fixed height - separate from insights */}
              <div className="h-[400px] w-full">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weeklyData}
                      margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="distance" 
                        stroke="var(--color-distance)" 
                        strokeWidth={2}
                        dot={{ fill: "var(--color-distance)", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="speed" 
                        stroke="var(--color-speed)" 
                        strokeWidth={2}
                        dot={{ fill: "var(--color-speed)", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="passing" 
                        stroke="var(--color-passing)" 
                        strokeWidth={2}
                        dot={{ fill: "var(--color-passing)", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              
              {/* Insights box - clearly positioned below the chart with proper spacing */}
              <div className="bg-gray-800/30 p-4 rounded-lg mt-8">
                <h4 className="font-medium text-athlex-accent">Weekly Insights</h4>
                <p className="text-sm mt-1">Your passing accuracy has improved significantly this week (+8%). Keep up the consistent technical training!</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly" className="pt-4">
            <div className="flex flex-col space-y-6">
              {/* Chart container with fixed height - separate from insights */}
              <div className="h-[400px] w-full">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="distance" 
                        stroke="var(--color-distance)" 
                        strokeWidth={2}
                        dot={{ fill: "var(--color-distance)", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="speed" 
                        stroke="var(--color-speed)" 
                        strokeWidth={2}
                        dot={{ fill: "var(--color-speed)", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="passing" 
                        stroke="var(--color-passing)" 
                        strokeWidth={2}
                        dot={{ fill: "var(--color-passing)", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              
              {/* Insights box - clearly positioned below the chart with proper spacing */}
              <div className="bg-gray-800/30 p-4 rounded-lg mt-8">
                <h4 className="font-medium text-athlex-accent">Monthly Insights</h4>
                <p className="text-sm mt-1">Your overall performance has shown steady improvement over the past 3 months. Distance covered, speed, and passing accuracy are all trending upward.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="seasonal" className="pt-4">
            <div className="text-center py-12 text-gray-400">
              Seasonal data will be available once you have at least 6 months of tracking.
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrendGraphs;
