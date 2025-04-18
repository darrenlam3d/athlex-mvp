
import React, { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BaseLayoutProps {
  children: ReactNode;
  sidebarContent: ReactNode;
}

const BaseLayout = ({ children, sidebarContent }: BaseLayoutProps) => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          {/* Mobile Trigger - Fixed Position */}
          <div className="fixed top-4 left-4 z-50 md:hidden">
            <SidebarTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </SidebarTrigger>
          </div>

          {/* Sidebar */}
          {sidebarContent}

          {/* Main Content - Add padding for mobile trigger */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto pt-16 md:pt-4">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default BaseLayout;
