
import React from 'react';
import ScoutLayout from '@/layouts/ScoutLayout';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ScoutDashboard = () => {
  return (
    <ScoutLayout>
      <PageLayout
        title="Scout Dashboard"
        showBreadcrumbs={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-gray-700 bg-athlex-gray-900">
            <CardHeader>
              <CardTitle>Talent Pool</CardTitle>
              <CardDescription>Athletes you are tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Talent pool overview will be shown here</p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-700 bg-athlex-gray-900">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from tracked athletes</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Recent activity will be shown here</p>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </ScoutLayout>
  );
};

export default ScoutDashboard;
