
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
    { day: 'Mon', shooting: 78, speed: 82, agility: 75 },
    { day: 'Tue', shooting: 80, speed: 83, agility: 79 },
    { day: 'Wed', shooting: 84, speed: 81, agility: 80 },
    { day: 'Thu', shooting: 82, speed: 85, agility: 83 },
    { day: 'Fri', shooting: 86, speed: 87, agility: 82 },
    { day: 'Sat', shooting: 90, speed: 86, agility: 84 },
    { day: 'Sun', shooting: 88, speed: 89, agility: 86 }
  ];

  // Monthly performance data
  const monthlyData = [
    { month: 'Jan', shooting: 70, speed: 75, agility: 68 },
    { month: 'Feb', shooting: 74, speed: 78, agility: 72 },
    { month: 'Mar', shooting: 79, speed: 81, agility: 76 },
    { month: 'Apr', shooting: 85, speed: 84, agility: 80 },
  ];

  // Chart configuration for styling
  const chartConfig = {
    shooting: {
      label: "Shooting",
      theme: {
        light: "#9b87f5",
        dark: "#9b87f5"
      }
    },
    speed: {
      label: "Speed",
      theme: {
        light: "#6ee7b7",
        dark: "#6ee7b7"
      }
    },
    agility: {
      label: "Agility",
      theme: {
        light: "#93c5fd",
        dark: "#93c5fd"
      }
    }
  };

  return (
    <Card className="border-gray-700 bg-card text-card-foreground">
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
            <div className="h-[300px] w-full">
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
                      dataKey="shooting" 
                      stroke="var(--color-shooting)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--color-shooting)", r: 4 }}
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
                      dataKey="agility" 
                      stroke="var(--color-agility)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--color-agility)", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="mt-4 bg-gray-800/30 p-3 rounded-lg">
              <h4 className="font-medium text-athlex-accent">Weekly Insights</h4>
              <p className="text-sm mt-1">Your shooting accuracy has improved significantly this week (+10%). Keep up the consistent practice!</p>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly" className="pt-4">
            <div className="h-[300px] w-full">
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
                      dataKey="shooting" 
                      stroke="var(--color-shooting)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--color-shooting)", r: 4 }}
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
                      dataKey="agility" 
                      stroke="var(--color-agility)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--color-agility)", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="mt-4 bg-gray-800/30 p-3 rounded-lg">
              <h4 className="font-medium text-athlex-accent">Monthly Insights</h4>
              <p className="text-sm mt-1">Your overall performance has shown steady improvement over the past 3 months. All metrics are trending upward.</p>
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
