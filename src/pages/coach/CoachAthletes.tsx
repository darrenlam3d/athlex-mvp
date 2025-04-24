
import React from 'react';
import CoachLayout from '@/layouts/CoachLayout';
import PageLayout from '@/components/layout/PageLayout';

const CoachAthletes = () => {
  return (
    <CoachLayout>
      <PageLayout
        title="Manage Athletes"
        showBreadcrumbs={true}
      >
        <div className="bg-athlex-gray-900 border border-gray-700 rounded-lg p-6">
          <p className="text-center text-gray-400">Athlete management functionality will be implemented here</p>
        </div>
      </PageLayout>
    </CoachLayout>
  );
};

export default CoachAthletes;
