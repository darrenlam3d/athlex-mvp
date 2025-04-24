
import React from 'react';
import CoachLayout from '@/layouts/CoachLayout';
import PageLayout from '@/components/layout/PageLayout';

const CoachReports = () => {
  return (
    <CoachLayout>
      <PageLayout
        title="Performance Reports"
        showBreadcrumbs={true}
      >
        <div className="bg-athlex-gray-900 border border-gray-700 rounded-lg p-6">
          <p className="text-center text-gray-400">Performance reports functionality will be implemented here</p>
        </div>
      </PageLayout>
    </CoachLayout>
  );
};

export default CoachReports;
