
import React, { useState } from 'react';
import CoachLayout from '@/layouts/CoachLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Calendar, Download, Filter, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CoachPerformance = () => {
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  return (
    <CoachLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Team Performance Overview</h1>
            <p className="text-athlex-gray-400">Monitor and analyze your team's performance metrics</p>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-[180px] bg-athlex-gray-800 border-athlex-gray-700">
                <Users className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select Team" />
              </SelectTrigger>
              <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="team1">Tampines Elite</SelectItem>
                <SelectItem value="team2">Phoenix Academy</SelectItem>
                <SelectItem value="team3">Harbour FC</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[150px] bg-athlex-gray-800 border-athlex-gray-700">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="season">This Season</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="border-athlex-gray-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="team" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-athlex-gray-800">
            <TabsTrigger value="team">Team Overview</TabsTrigger>
            <TabsTrigger value="individual">Individual Athletes</TabsTrigger>
            <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Main Content Placeholder */}
        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription className="text-athlex-gray-400">
                Team and individual performance metrics
              </CardDescription>
            </div>
            <Button variant="outline" className="border-athlex-gray-700">
              <Filter className="mr-2 h-4 w-4" />
              Filter Metrics
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BarChart3 className="h-16 w-16 text-athlex-gray-600 mb-4" />
              <h3 className="text-xl font-medium mb-2">Performance Analysis Dashboard</h3>
              <p className="text-athlex-gray-400 max-w-md mb-6">
                This section will display comprehensive performance analytics for your team and individual athletes,
                including physical metrics, skill development, and match performance data.
              </p>
              <Button variant="outline" className="border-athlex-gray-700">
                View Sample Performance Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CoachLayout>
  );
};

export default CoachPerformance;
