
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DiscoverabilityPanel from '@/components/talent/DiscoverabilityPanel';
import PlayerCardBuilder from '@/components/talent/PlayerCardBuilder';
import PeerComparison from '@/components/talent/PeerComparison';
import TalentPathway from '@/components/talent/TalentPathway';

const TalentDiscovery = () => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold mb-6">Talent Discovery</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top row */}
                <DiscoverabilityPanel />
                <PlayerCardBuilder />
                
                {/* Bottom row */}
                <PeerComparison />
                <TalentPathway />
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default TalentDiscovery;
