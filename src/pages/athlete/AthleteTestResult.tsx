
import React from 'react';
import AthleteLayout from '@/layouts/AthleteLayout';
import PageLayout from '@/components/layout/PageLayout';

const AthleteTestResult = () => {
  return (
    <AthleteLayout>
      <PageLayout
        title="Test Results"
        showBreadcrumbs={true}
      >
        <div className="bg-athlex-gray-900 border border-gray-700 rounded-lg p-6">
          <p className="text-center text-gray-400">Test results functionality will be implemented here</p>
        </div>
      </PageLayout>
    </AthleteLayout>
  );
};

export default AthleteTestResult;
