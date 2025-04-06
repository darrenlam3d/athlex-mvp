
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';

import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import ProfileSummary from '@/components/dashboard/ProfileSummary';
import AboutSection from '@/components/dashboard/AboutSection';
import FootballActivitySummary from '@/components/football/FootballActivitySummary';
import FootballPerformance from '@/components/football/FootballPerformance';
import FootballGoalTracking from '@/components/football/FootballGoalTracking';
import FootballAchievements from '@/components/football/FootballAchievements';
import TacticalDevelopment from '@/components/football/TacticalDevelopment';
import TrainingHistory from '@/components/football/TrainingHistory';

const Profile = () => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {/* Profile Summary */}
              <ProfileSummary />
              
              {/* About Me */}
              <div className="mt-5">
                <AboutSection />
              </div>
              
              {/* Performance Summary Panel */}
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
