
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import ActivityFeed from '@/components/community/ActivityFeed';
import ChallengesSection from '@/components/community/ChallengesSection';
import Leaderboards from '@/components/community/Leaderboards';
import CommunityHighlights from '@/components/community/CommunityHighlights';
import TipsBreakthroughs from '@/components/community/TipsBreakthroughs';

const Community = () => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold mb-6">Community & Challenges</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column - Activity Feed */}
                <div className="lg:col-span-2 space-y-6">
                  <ActivityFeed />
                  <TipsBreakthroughs />
                </div>
                
                {/* Right column - Challenges, Leaderboards, Highlights */}
                <div className="space-y-6">
                  <ChallengesSection />
                  <Leaderboards />
                  <CommunityHighlights />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Community;
