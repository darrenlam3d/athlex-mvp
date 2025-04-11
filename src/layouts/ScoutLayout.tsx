
import React, { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import ScoutSidebar from '@/components/dashboard/ScoutSidebar';

interface ScoutLayoutProps {
  children: ReactNode;
}

const ScoutLayout: React.FC<ScoutLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <ScoutSidebar />
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ScoutLayout;
