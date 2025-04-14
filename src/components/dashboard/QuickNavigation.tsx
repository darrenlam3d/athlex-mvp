
import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Utensils, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RoleSelector from './RoleSelector';

const QuickNavigation = () => {
  const quickLinks = [
    {
      text: 'Log Training',
      icon: ClipboardList,
      path: '/training-log',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      text: 'Log Meal',
      icon: Utensils,
      path: '/nutrition',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      text: 'Update Profile',
      icon: User,
      path: '/settings',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      text: 'View Community',
      icon: Users,
      path: '/community',
      color: 'bg-orange-600 hover:bg-orange-700',
    },
  ];

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Quick Actions</h2>
        
        <div>
          <RoleSelector />
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((link, index) => (
          <Link to={link.path} key={index} className="w-full">
            <Button 
              className={`w-full h-20 flex flex-col items-center justify-center ${link.color}`}
            >
              <link.icon className="h-6 w-6 mb-2" />
              <span>{link.text}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickNavigation;
