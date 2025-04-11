
import React, { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AthleteSidebar from '@/components/dashboard/AthleteSidebar';

interface AthleteLayoutProps {
  children: ReactNode;
}

const AthleteLayout: React.FC<AthleteLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AthleteSidebar />
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AthleteLayout;
