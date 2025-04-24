
import React, { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import ScoutSidebar from '@/components/scout/ScoutSidebar';

interface ScoutLayoutProps {
  children: ReactNode;
}

const ScoutLayout: React.FC<ScoutLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-athlex-background text-white">
        <ScoutSidebar />
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ScoutLayout;
