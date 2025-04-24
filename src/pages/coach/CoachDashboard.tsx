
import React from 'react';
import CoachLayout from '@/layouts/CoachLayout';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CoachDashboard = () => {
  return (
    <CoachLayout>
      <PageLayout
        title="Coach Dashboard"
        showBreadcrumbs={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-gray-700 bg-athlex-gray-900">
            <CardHeader>
              <CardTitle>Athletes Overview</CardTitle>
              <CardDescription>Status of your assigned athletes</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Athletes overview will be shown here</p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-700 bg-athlex-gray-900">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Upcoming sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Schedule will be shown here</p>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </CoachLayout>
  );
};

export default CoachDashboard;
