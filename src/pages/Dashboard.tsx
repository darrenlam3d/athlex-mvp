
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';

import ProfileSummary from '@/components/dashboard/ProfileSummary';
import AboutSection from '@/components/dashboard/AboutSection';
import ActivitySummary from '@/components/dashboard/ActivitySummary';
import PerformanceOverview from '@/components/dashboard/PerformanceOverview';
import GoalTracking from '@/components/dashboard/GoalTracking';
import AchievementsBadges from '@/components/dashboard/AchievementsBadges';
import TalentDiscovery from '@/components/dashboard/TalentDiscovery';
import CommunityUpdates from '@/components/dashboard/CommunityUpdates';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {/* Top Hero Section */}
              <ProfileSummary />
              
              {/* About Me */}
              <div className="mt-5">
                <AboutSection />
              </div>
              
              {/* Activity Summary */}
              <div className="mt-5">
                <ActivitySummary />
              </div>
              
              {/* Performance Overview */}
              <div className="mt-5">
                <PerformanceOverview />
              </div>
              
              {/* Goal Tracking */}
              <div className="mt-5">
                <GoalTracking />
              </div>
              
              {/* Achievements & Badges */}
              <div className="mt-5">
                <AchievementsBadges />
              </div>
              
              {/* Talent Discovery */}
              <div className="mt-5">
                <TalentDiscovery />
              </div>
              
              {/* Community & Updates */}
              <div className="mt-5 mb-5">
                <CommunityUpdates />
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
