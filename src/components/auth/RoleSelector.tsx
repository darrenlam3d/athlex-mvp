
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/contexts/UserRoleContext';
import { User, Dumbbell } from 'lucide-react';

const RoleSelector = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setUserRole } = useUserRole();

  const selectRole = (role: 'athlete' | 'coach') => {
    // In a real app, we would store this in Supabase
    setUserRole(role);
    
    // Navigate to the appropriate dashboard
    if (role === 'athlete') {
      navigate('/athlete-dashboard');
    } else if (role === 'coach') {
      navigate('/coach-dashboard');
    }
    
    toast({
      title: "Role selected!",
      description: `You are now using ATHLEX as a ${role}.`,
      action: (
        <ToastAction altText="OK">OK</ToastAction>
      ),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-athlex-gray-900 p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome to ATHLEX</h1>
          <p className="text-athlex-gray-400 mt-2">
            Choose how you want to use the platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            className="bg-athlex-gray-800 border-athlex-gray-700 hover:border-athlex-accent transition-all cursor-pointer"
            onClick={() => selectRole('athlete')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center justify-center">
                <Dumbbell className="mr-2 h-5 w-5 text-athlex-accent" />
                Athlete
              </CardTitle>
              <CardDescription className="text-center text-athlex-gray-400">
                Track your performance
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                variant="outline"
                className="mt-2 border-athlex-gray-600 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  selectRole('athlete');
                }}
              >
                Continue as Athlete
              </Button>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-athlex-gray-800 border-athlex-gray-700 hover:border-athlex-accent transition-all cursor-pointer"
            onClick={() => selectRole('coach')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center justify-center">
                <User className="mr-2 h-5 w-5 text-athlex-accent" />
                Coach
              </CardTitle>
              <CardDescription className="text-center text-athlex-gray-400">
                Manage your athletes
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                variant="outline"
                className="mt-2 border-athlex-gray-600 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  selectRole('coach');
                }}
              >
                Continue as Coach
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
