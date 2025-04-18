
import React, { ReactNode } from 'react';
import BaseLayout from './BaseLayout';
import SharedSidebar from '@/components/dashboard/SharedSidebar';
import { 
  LayoutDashboard, 
  FileText,
  Users,
  Settings, 
  ClipboardList
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, text: 'Dashboard', path: '/scout/dashboard' },
  { icon: FileText, text: 'Scouting Reports', path: '/scout/reports' },
  { icon: ClipboardList, text: 'Scout Notes', path: '/scout/notes' },
  { icon: Users, text: 'Community', path: '/scout/community' },
  { icon: Settings, text: 'Settings', path: '/scout/settings' },
];

interface ScoutLayoutProps {
  children: ReactNode;
}

const ScoutLayout = ({ children }: ScoutLayoutProps) => {
  return (
    <BaseLayout
      sidebarContent={<SharedSidebar navItems={navItems} />}
    >
      {children}
    </BaseLayout>
  );
};

export default ScoutLayout;
