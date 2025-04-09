
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DiscoverabilityPanel from '@/components/talent/DiscoverabilityPanel';
import PlayerCardBuilder from '@/components/talent/PlayerCardBuilder';
import PeerComparison from '@/components/talent/PeerComparison';
import TalentPathway from '@/components/talent/TalentPathway';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TalentDiscovery = () => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">Talent Discovery</h1>
                <Link to="/scouting-reports">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Scouting Reports
                  </Button>
                </Link>
              </div>
              
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
