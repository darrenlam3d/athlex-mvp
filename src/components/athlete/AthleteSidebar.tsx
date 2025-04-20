
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, BarChart2, Upload, Apple, Star, MessageSquare, Settings, Home } from 'lucide-react';
import SharedSidebar from '@/components/dashboard/SharedSidebar';

const AthleteSidebar = () => {
  const navItems = [
    { icon: Home, text: 'Dashboard', path: '/athlete/dashboard' },
    { icon: Upload, text: 'Upload Data', path: '/athlete/upload' },
    { icon: BarChart2, text: 'Stats', path: '/athlete/stats' },
    { icon: Apple, text: 'Nutrition', path: '/athlete/nutrition' },
    { icon: Calendar, text: 'Calendar', path: '/athlete/calendar' },
    { icon: Star, text: 'Recommendations', path: '/athlete/recommendations' },
    { icon: MessageSquare, text: 'Messages', path: '/athlete/messages' },
    { icon: Settings, text: 'Settings', path: '/athlete/settings' },
  ];

  return <SharedSidebar navItems={navItems} />;
};

export default AthleteSidebar;
