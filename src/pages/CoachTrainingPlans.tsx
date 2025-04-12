
import React from 'react';
import CoachLayout from '@/layouts/CoachLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ClipboardList, PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CoachTrainingPlans = () => {
  return (
    <CoachLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Assigned Training Plans</h1>
            <p className="text-athlex-gray-400">Create and manage training plans for your athletes</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button className="bg-athlex-accent hover:bg-athlex-accent/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Plan
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="active" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-athlex-gray-800">
            <TabsTrigger value="active">Active Plans</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Main Content Placeholder */}
        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Training Plans</CardTitle>
            <Button variant="outline" className="border-athlex-gray-700">
              <Calendar className="mr-2 h-4 w-4" />
              View Calendar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ClipboardList className="h-16 w-16 text-athlex-gray-600 mb-4" />
              <h3 className="text-xl font-medium mb-2">Training Plan Management</h3>
              <p className="text-athlex-gray-400 max-w-md mb-6">
                This section will display training plans you've created for your athletes,
                along with schedule details and athlete assignments.
              </p>
              <Button variant="outline" className="border-athlex-gray-700">
                View Sample Plans
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CoachLayout>
  );
};

export default CoachTrainingPlans;
