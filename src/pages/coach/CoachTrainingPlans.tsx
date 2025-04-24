
import React from 'react';
import CoachLayout from '@/layouts/CoachLayout';
import PageLayout from '@/components/layout/PageLayout';

const CoachTrainingPlans = () => {
  return (
    <CoachLayout>
      <PageLayout
        title="Training Plans"
        showBreadcrumbs={true}
      >
        <div className="bg-athlex-gray-900 border border-gray-700 rounded-lg p-6">
          <p className="text-center text-gray-400">Training plans functionality will be implemented here</p>
        </div>
      </PageLayout>
    </CoachLayout>
  );
};

export default CoachTrainingPlans;
