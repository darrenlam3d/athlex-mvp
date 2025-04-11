
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export interface PerformanceData {
  speed: Array<{ date: string; value: number }>;
  endurance: Array<{ date: string; value: number }>;
  agility: Array<{ date: string; value: number }>;
}

export interface PerformanceMetricsProps {
  performanceData: PerformanceData;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ performanceData }) => {
  return (
    <Card className="bg-gray-900/60 border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="speed">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="speed">Speed</TabsTrigger>
            <TabsTrigger value="endurance">Endurance</TabsTrigger>
            <TabsTrigger value="agility">Agility</TabsTrigger>
          </TabsList>
          
          <TabsContent value="speed" className="pt-4">
            <ChartContainer className="h-64" config={{ speed: { color: "#9b87f5" } }}>
              <AreaChart data={performanceData.speed}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Area type="monotone" dataKey="value" name="Speed (km/h)" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.3} />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
          
          <TabsContent value="endurance" className="pt-4">
            <ChartContainer className="h-64" config={{ endurance: { color: "#0EA5E9" } }}>
              <AreaChart data={performanceData.endurance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Area type="monotone" dataKey="value" name="VO2 Max" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.3} />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
          
          <TabsContent value="agility" className="pt-4">
            <ChartContainer className="h-64" config={{ agility: { color: "#F97316" } }}>
              <AreaChart data={performanceData.agility}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Area type="monotone" dataKey="value" name="Agility (seconds)" stroke="#F97316" fill="#F97316" fillOpacity={0.3} />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
