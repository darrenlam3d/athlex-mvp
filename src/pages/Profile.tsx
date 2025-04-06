
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';

import FootballProfileSummary from '@/components/football/FootballProfileSummary';
import FootballAboutSection from '@/components/football/FootballAboutSection';
import FootballActivitySummary from '@/components/football/FootballActivitySummary';
import FootballPerformance from '@/components/football/FootballPerformance';
import FootballGoalTracking from '@/components/football/FootballGoalTracking';
import FootballAchievements from '@/components/football/FootballAchievements';
import TacticalDevelopment from '@/components/football/TacticalDevelopment';
import TrainingHistory from '@/components/football/TrainingHistory';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

const Profile = () => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {/* Football Profile Summary */}
              <FootballProfileSummary />
              
              {/* About Me & Football Profile */}
              <div className="mt-5">
                <FootballAboutSection />
              </div>
              
              {/* Performance Summary Panel (Football-Specific) */}
              <div className="mt-5">
                <FootballPerformance />
              </div>
              
              {/* Activity Summary */}
              <div className="mt-5">
                <FootballActivitySummary />
              </div>
              
              {/* Training Goals & Progress Tracker */}
              <div className="mt-5">
                <FootballGoalTracking />
              </div>
              
              {/* Tactical Role Development Path */}
              <div className="mt-5">
                <TacticalDevelopment />
              </div>
              
              {/* Personal Bests & Training History */}
              <div className="mt-5">
                <TrainingHistory />
              </div>
              
              {/* Achievements & Badges */}
              <div className="mt-5 mb-5">
                <FootballAchievements />
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Profile;
