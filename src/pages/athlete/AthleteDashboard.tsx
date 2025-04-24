
import React from 'react';
import AthleteLayout from '@/layouts/AthleteLayout';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AthleteDashboard = () => {
  return (
    <AthleteLayout>
      <PageLayout
        title="Athlete Dashboard"
        showBreadcrumbs={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-2 border-gray-700 bg-athlex-gray-900">
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Your recent performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Performance metrics will be shown here</p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-700 bg-athlex-gray-900">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <Button variant="outline" size="sm" className="justify-start">
                Log Training Session
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                Log Wellness Data
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                Record Test Result
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                Set New Goal
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </AthleteLayout>
  );
};

export default AthleteDashboard;
