
import React, { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BaseLayoutProps {
  children: ReactNode;
  sidebarContent: ReactNode;
}

const BaseLayout = ({ children, sidebarContent }: BaseLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-athlex-background">
        {/* Mobile Trigger */}
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <SidebarTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Menu className="h-4 w-4" />
            </Button>
          </SidebarTrigger>
        </div>

        {/* Sidebar */}
        {sidebarContent}

        {/* Main Content */}
        <SidebarInset className="flex-1">
          <div className="p-4 md:p-6 pt-16 md:pt-4">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default BaseLayout;
