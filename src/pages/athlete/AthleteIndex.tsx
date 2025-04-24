
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AthleteLayout from '@/layouts/AthleteLayout';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, 
  Target, 
  Dumbbell, 
  HeartPulse, 
  Activity,
  User
} from 'lucide-react';

const AthleteIndex = () => {
  const { user } = useAuth();
  
  const menuItems = [
    {
      title: 'Dashboard',
      description: 'View your performance metrics and insights',
      icon: BarChart2,
      path: '/athlete/dashboard',
      color: 'bg-blue-500/10 text-blue-500'
    },
    {
      title: 'Goals',
      description: 'Set and track your performance goals',
      icon: Target,
      path: '/athlete/goals',
      color: 'bg-green-500/10 text-green-500'
    },
    {
      title: 'Training Log',
      description: 'Log and track your training sessions',
      icon: Dumbbell,
      path: '/athlete/training',
      color: 'bg-purple-500/10 text-purple-500'
    },
    {
      title: 'Wellness',
      description: 'Log sleep, mood and recovery metrics',
      icon: HeartPulse,
      path: '/athlete/wellness',
      color: 'bg-red-500/10 text-red-500'
    },
    {
      title: 'Test Results',
      description: 'Record performance test results',
      icon: Activity,
      path: '/athlete/test',
      color: 'bg-amber-500/10 text-amber-500'
    },
    {
      title: 'Profile',
      description: 'Manage your athlete profile',
      icon: User,
      path: '/athlete/profile',
      color: 'bg-cyan-500/10 text-cyan-500'
    }
  ];
  
  return (
    <AthleteLayout>
      <PageLayout 
        title={`Athlete Portal`}
        showBreadcrumbs={true}
      >
        <div className="mb-6">
          <p className="text-gray-400">
            Welcome to the Athlete Portal. Select an option below to get started.
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
        
        <div className="mt-8">
          <Card className="border-gray-700 bg-athlex-gray-900/60">
            <CardHeader>
              <CardTitle className="text-athlex-accent">ATHLEX MVP Demo</CardTitle>
              <CardDescription>
                Try the MVP dashboard with demo data
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link to="/athlex-mvp">
                <Button variant="outline" className="text-athlex-accent border-athlex-accent">
                  Open MVP Dashboard
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </PageLayout>
    </AthleteLayout>
  );
};

export default AthleteIndex;
