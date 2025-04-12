
import React, { useState } from 'react';
import CoachLayout from '@/layouts/CoachLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Plus, Filter, Users, Share2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CoachReports = () => {
  const [reportType, setReportType] = useState('performance');
  const [selectedAthlete, setSelectedAthlete] = useState('all');
  
  return (
    <CoachLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Athlete Reports Generated</h1>
            <p className="text-athlex-gray-400">View, generate and share athlete reports</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button className="bg-athlex-accent hover:bg-athlex-accent/90">
              <Plus className="mr-2 h-4 w-4" />
              Generate New Report
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="recent" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-athlex-gray-800">
            <TabsTrigger value="recent">Recent Reports</TabsTrigger>
            <TabsTrigger value="shared">Shared Reports</TabsTrigger>
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Filter Section */}
        <Card className="bg-athlex-gray-900 border-athlex-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filter Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                  <FileText className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                  <SelectItem value="performance">Performance Report</SelectItem>
                  <SelectItem value="scouting">Scouting Report</SelectItem>
                  <SelectItem value="training">Training Progress</SelectItem>
                  <SelectItem value="nutrition">Nutrition Analysis</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedAthlete} onValueChange={setSelectedAthlete}>
                <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                  <Users className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Athlete" />
                </SelectTrigger>
                <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                  <SelectItem value="all">All Athletes</SelectItem>
                  <SelectItem value="athlete1">Arif Rahman</SelectItem>
                  <SelectItem value="athlete2">Lena Koh</SelectItem>
                  <SelectItem value="athlete3">Marcus Ng</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="h-10 bg-athlex-gray-800 border-athlex-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Content Placeholder */}
        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Generated Reports</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" className="border-athlex-gray-700">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" className="border-athlex-gray-700">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-16 w-16 text-athlex-gray-600 mb-4" />
              <h3 className="text-xl font-medium mb-2">Report Management System</h3>
              <p className="text-athlex-gray-400 max-w-md mb-6">
                This section will display reports you've generated for athletes,
                including performance assessments, scouting reports, and development plans.
              </p>
              <Button variant="outline" className="border-athlex-gray-700">
                View Sample Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CoachLayout>
  );
};

export default CoachReports;
