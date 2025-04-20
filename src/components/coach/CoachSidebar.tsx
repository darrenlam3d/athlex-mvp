
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users, BarChart2, Apple, MessageSquare, Settings, Home } from 'lucide-react';
import SharedSidebar from '@/components/dashboard/SharedSidebar';

const CoachSidebar = () => {
  const navItems = [
    { icon: Home, text: 'Dashboard', path: '/coach/dashboard' },
    { icon: Users, text: 'My Athletes', path: '/coach/athletes' },
    { icon: Calendar, text: 'Assign Training', path: '/coach/assign' },
    { icon: Apple, text: 'Nutrition Logs', path: '/coach/nutrition' },
    { icon: BarChart2, text: 'Insights', path: '/coach/insights' },
    { icon: MessageSquare, text: 'Messages', path: '/coach/messages' },
    { icon: Settings, text: 'Settings', path: '/coach/settings' },
  ];

  return <SharedSidebar navItems={navItems} />;
};

export default CoachSidebar;
