
import React from 'react';
import { useUserRole } from '@/contexts/UserRoleContext';
import SharedSidebar from './SharedSidebar';
import { 
  LayoutDashboard, 
  FileText,
  Users,
  Settings, 
  Search,
  ClipboardList,
  Calendar,
  Award,
  Apple,
  BarChart2,
  Target,
  Utensils
} from 'lucide-react';

const ScoutNavItems = [
  { icon: LayoutDashboard, text: 'Dashboard', path: '/scout-dashboard' },
  { icon: FileText, text: 'Scouting Reports', path: '/scout-reports' },
  { icon: ClipboardList, text: 'Scout Notes', path: '/scout-notes' },
  { icon: Users, text: 'Community', path: '/scout-community' },
  { icon: Settings, text: 'Settings', path: '/scout-settings' },
];

const CoachNavItems = [
  { icon: LayoutDashboard, text: 'Dashboard', path: '/coach-dashboard' },
  { icon: Users, text: 'Athletes', path: '/coach-athletes' },
  { icon: Calendar, text: 'Training Plans', path: '/coach-training-plans' },
  { icon: Apple, text: 'Nutrition Log', path: '/coach-nutrition' },
  { icon: Award, text: 'Performance', path: '/coach-performance' },
  { icon: FileText, text: 'Reports', path: '/coach-reports' },
  { icon: Settings, text: 'Settings', path: '/coach-settings' },
];

const AthleteNavItems = [
  { icon: LayoutDashboard, text: 'Dashboard', path: '/athlete-dashboard' },
  { icon: BarChart2, text: 'Performance', path: '/athlete-performance' },
  { icon: Calendar, text: 'Training Log', path: '/athlete-training-log' },
  { icon: Target, text: 'Goals', path: '/athlete-performance-goals' },
  { icon: Utensils, text: 'Nutrition', path: '/athlete-nutrition' },
  { icon: Users, text: 'Community', path: '/community' },
  { icon: Settings, text: 'Settings', path: '/athlete-settings' },
];

const DashboardSidebar = () => {
  const { userRole } = useUserRole();
  
  switch (userRole) {
    case 'scout':
      return <SharedSidebar navItems={ScoutNavItems} />;
    case 'coach':
      return <SharedSidebar navItems={CoachNavItems} />;
    case 'athlete':
    default:
      return <SharedSidebar navItems={AthleteNavItems} />;
  }
};

export default DashboardSidebar;
