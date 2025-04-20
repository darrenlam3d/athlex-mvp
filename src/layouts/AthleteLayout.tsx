
import React, { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AthleteSidebar from '@/components/athlete/AthleteSidebar';

interface AthleteLayoutProps {
  children: ReactNode;
}

const AthleteLayout: React.FC<AthleteLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-athlex-background text-white">
        <AthleteSidebar />
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AthleteLayout;
