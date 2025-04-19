
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MvpAthleteView = () => {
  return (
    <Card className="bg-gray-900/60 border-gray-800">
      <CardHeader>
        <CardTitle>Athlete Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">
          Our comprehensive athlete dashboard has been simplified in this version. Please check back soon for the full athlete experience.
        </p>
      </CardContent>
    </Card>
  );
};

export default MvpAthleteView;
