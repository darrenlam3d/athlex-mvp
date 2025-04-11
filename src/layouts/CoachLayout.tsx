
import React, { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import CoachSidebar from '@/components/dashboard/CoachSidebar';

interface CoachLayoutProps {
  children: ReactNode;
}

const CoachLayout: React.FC<CoachLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <CoachSidebar />
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default CoachLayout;
