
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import HomeTopNav from '@/components/home/HomeTopNav';
import HomeSidebar from '@/components/home/HomeSidebar';
import HomeFeed from '@/components/home/HomeFeed';
import HomeRightPanel from '@/components/home/HomeRightPanel';

const Home = () => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 overflow-y-auto">
            <HomeTopNav />
            
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-12 gap-6">
                <HomeSidebar />
                <HomeFeed />
                <HomeRightPanel />
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Home;
