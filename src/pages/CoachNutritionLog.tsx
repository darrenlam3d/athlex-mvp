
import React, { useState } from 'react';
import CoachLayout from '@/layouts/CoachLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Apple, Calendar, Filter, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CoachNutritionLog = () => {
  const [selectedAthlete, setSelectedAthlete] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  return (
    <CoachLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Athlete Nutrition Logs</h1>
            <p className="text-athlex-gray-400">Monitor and analyze your athletes' nutrition data</p>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Select value={selectedAthlete} onValueChange={setSelectedAthlete}>
              <SelectTrigger className="w-[180px] bg-athlex-gray-800 border-athlex-gray-700">
                <Users className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select Athlete" />
              </SelectTrigger>
              <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                <SelectItem value="all">All Athletes</SelectItem>
                <SelectItem value="athlete1">Arif Rahman</SelectItem>
                <SelectItem value="athlete2">Lena Koh</SelectItem>
                <SelectItem value="athlete3">Marcus Ng</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[150px] bg-athlex-gray-800 border-athlex-gray-700">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="summary" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-athlex-gray-800">
            <TabsTrigger value="summary">Nutrition Summary</TabsTrigger>
            <TabsTrigger value="meals">Meal Logs</TabsTrigger>
            <TabsTrigger value="plans">Nutrition Plans</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Main Content Placeholder */}
        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Nutrition Overview</CardTitle>
            <Button variant="outline" className="border-athlex-gray-700">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Apple className="h-16 w-16 text-athlex-gray-600 mb-4" />
              <h3 className="text-xl font-medium mb-2">Athlete Nutrition Tracking</h3>
              <p className="text-athlex-gray-400 max-w-md mb-6">
                This section will display nutrition logs and analytics for your athletes,
                including macro distributions, caloric intake, and nutrition plan adherence.
              </p>
              <Button variant="outline" className="border-athlex-gray-700">
                View Sample Nutrition Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CoachLayout>
  );
};

export default CoachNutritionLog;
