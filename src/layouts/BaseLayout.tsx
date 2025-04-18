
import React, { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';

interface BaseLayoutProps {
  children: ReactNode;
  sidebarContent: ReactNode;
}

const BaseLayout = ({ children, sidebarContent }: BaseLayoutProps) => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          {sidebarContent}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default BaseLayout;
