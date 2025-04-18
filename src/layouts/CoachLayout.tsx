
import React, { ReactNode } from 'react';
import BaseLayout from './BaseLayout';
import SharedSidebar from '@/components/dashboard/SharedSidebar';
import { 
  LayoutDashboard, 
  Users, 
  Calendar,
  Award,
  FileText,
  Settings, 
  Apple 
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, text: 'Dashboard', path: '/coach/dashboard' },
  { icon: Users, text: 'Athletes', path: '/coach/athletes' },
  { icon: Calendar, text: 'Training Plans', path: '/coach/training-plans' },
  { icon: Apple, text: 'Nutrition Log', path: '/coach/nutrition' },
  { icon: Award, text: 'Performance', path: '/coach/performance' },
  { icon: FileText, text: 'Reports', path: '/coach/reports' },
  { icon: Settings, text: 'Settings', path: '/coach/settings' },
];

interface CoachLayoutProps {
  children: ReactNode;
}

const CoachLayout = ({ children }: CoachLayoutProps) => {
  return (
    <BaseLayout
      sidebarContent={<SharedSidebar navItems={navItems} />}
    >
      {children}
    </BaseLayout>
  );
};

export default CoachLayout;
