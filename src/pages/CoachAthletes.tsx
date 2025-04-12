
import React, { useState } from 'react';
import CoachLayout from '@/layouts/CoachLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Search, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CoachAthletes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [positionFilter, setPositionFilter] = useState('all');
  
  return (
    <CoachLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Athletes</h1>
            <p className="text-athlex-gray-400">Manage and monitor your assigned athletes</p>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <Card className="bg-athlex-gray-900 border-athlex-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filter Athletes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-athlex-gray-400" />
                <Input
                  placeholder="Search by name or team..." 
                  className="pl-9 bg-athlex-gray-800 border-athlex-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={sportFilter} onValueChange={setSportFilter}>
                <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sport" />
                </SelectTrigger>
                <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                  <SelectItem value="all">All Sports</SelectItem>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="athletics">Athletics</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="striker">Striker</SelectItem>
                  <SelectItem value="midfielder">Midfielder</SelectItem>
                  <SelectItem value="defender">Defender</SelectItem>
                  <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Content Placeholder */}
        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Assigned Athletes</CardTitle>
            <Button className="bg-athlex-accent hover:bg-athlex-accent/90">
              <Users className="mr-2 h-4 w-4" />
              Assign New Athlete
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-16 w-16 text-athlex-gray-600 mb-4" />
              <h3 className="text-xl font-medium mb-2">Athlete Management</h3>
              <p className="text-athlex-gray-400 max-w-md mb-6">
                This section will display your assigned athletes with performance metrics, 
                training adherence, and progress towards goals.
              </p>
              <Button variant="outline" className="border-athlex-gray-700">
                View Sample Athletes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CoachLayout>
  );
};

export default CoachAthletes;
