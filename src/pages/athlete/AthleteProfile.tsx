
import React from 'react';
import AthleteLayout from '@/layouts/AthleteLayout';
import PageLayout from '@/components/layout/PageLayout';

const AthleteProfile = () => {
  return (
    <AthleteLayout>
      <PageLayout
        title="Athlete Profile"
        showBreadcrumbs={true}
      >
        <div className="bg-athlex-gray-900 border border-gray-700 rounded-lg p-6">
          <p className="text-center text-gray-400">Athlete profile functionality will be implemented here</p>
        </div>
      </PageLayout>
    </AthleteLayout>
  );
};

export default AthleteProfile;
