
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import CoachLayout from '@/layouts/CoachLayout';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, 
  Users,
  Calendar,
  FileText,
  Settings
} from 'lucide-react';

const CoachIndex = () => {
  const { user } = useAuth();
  
  const menuItems = [
    {
      title: 'Dashboard',
      description: 'Overview of your coaching metrics',
      icon: BarChart2,
      path: '/coach/dashboard',
      color: 'bg-blue-500/10 text-blue-500'
    },
    {
      title: 'Athletes',
      description: 'Manage your athletes',
      icon: Users,
      path: '/coach/athletes',
      color: 'bg-green-500/10 text-green-500'
    },
    {
      title: 'Training Plans',
      description: 'Create and assign training plans',
      icon: Calendar,
      path: '/coach/training',
      color: 'bg-purple-500/10 text-purple-500'
    },
    {
      title: 'Reports',
      description: 'View and create performance reports',
      icon: FileText,
      path: '/coach/reports',
      color: 'bg-amber-500/10 text-amber-500'
    },
    {
      title: 'Settings',
      description: 'Manage your coaching preferences',
      icon: Settings,
      path: '/coach/settings',
      color: 'bg-gray-500/10 text-gray-400'
    }
  ];
  
  return (
    <CoachLayout>
      <PageLayout 
        title={`Coach Portal`}
        showBreadcrumbs={true}
      >
        <div className="mb-6">
          <p className="text-gray-400">
            Welcome to the Coach Portal. Select an option below to get started.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Card key={index} className="border-gray-700 bg-athlex-gray-900 hover:bg-athlex-gray-800 transition-colors">
              <Link to={item.path} className="block h-full">
                <CardHeader className="pb-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color} mb-4`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-2">
                  <Button variant="ghost" className="w-full justify-center">
                    Go to {item.title}
                  </Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </PageLayout>
    </CoachLayout>
  );
};

export default CoachIndex;
