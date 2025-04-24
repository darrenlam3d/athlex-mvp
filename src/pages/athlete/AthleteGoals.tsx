
import React from 'react';
import AthleteLayout from '@/layouts/AthleteLayout';
import PageLayout from '@/components/layout/PageLayout';
import { GoalsPage } from '@/pages/GoalsPage'; // Import the existing page component

const AthleteGoals = () => {
  return (
    <AthleteLayout>
      <PageLayout
        title="Performance Goals"
        showBreadcrumbs={true}
      >
        <GoalsPage />
      </PageLayout>
    </AthleteLayout>
  );
};

export default AthleteGoals;
