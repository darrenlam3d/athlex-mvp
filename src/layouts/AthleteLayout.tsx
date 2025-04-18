
import React, { ReactNode } from 'react';
import BaseLayout from './BaseLayout';
import SharedSidebar from '@/components/dashboard/SharedSidebar';
import { 
  LayoutDashboard, 
  BarChart2, 
  Calendar, 
  Target, 
  Utensils, 
  Users, 
  Settings 
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, text: 'Dashboard', path: '/athlete/dashboard' },
  { icon: BarChart2, text: 'Performance', path: '/athlete/performance' },
  { icon: Calendar, text: 'Training Log', path: '/athlete/training-log' },
  { icon: Target, text: 'Goals', path: '/athlete/goals' },
  { icon: Utensils, text: 'Nutrition', path: '/athlete/nutrition' },
  { icon: Users, text: 'Community', path: '/athlete/community' },
  { icon: Settings, text: 'Settings', path: '/athlete/settings' },
];

interface AthleteLayoutProps {
  children: ReactNode;
}

const AthleteLayout = ({ children }: AthleteLayoutProps) => {
  return (
    <BaseLayout
      sidebarContent={<SharedSidebar navItems={navItems} />}
    >
      {children}
    </BaseLayout>
  );
};

export default AthleteLayout;
