
import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Home, Activity, Users, Search, MessageSquare, Settings, User, Award, CheckCircle, Video, Calendar, Flag } from 'lucide-react';

import ProfileSummary from '@/components/dashboard/ProfileSummary';
import AboutSection from '@/components/dashboard/AboutSection';
import ActivitySummary from '@/components/dashboard/ActivitySummary';
import PerformanceOverview from '@/components/dashboard/PerformanceOverview';
import GoalTracking from '@/components/dashboard/GoalTracking';
import TrainingRecommendations from '@/components/dashboard/TrainingRecommendations';
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
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold mb-8">Athlete Dashboard</h1>
              
              {/* Top row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-1">
                  <ProfileSummary />
                </div>
                <div className="lg:col-span-2">
                  <AboutSection />
                </div>
              </div>
              
              {/* Activity Summary - 3rd section */}
              <div className="mb-6">
                <ActivitySummary />
              </div>
              
              {/* Performance & Goals row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <PerformanceOverview />
                <GoalTracking />
              </div>
              
              {/* Training & Achievements row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <TrainingRecommendations />
                <AchievementsBadges />
              </div>
              
              {/* Final row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TalentDiscovery />
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
