
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRound, UsersRound, HeartPulse } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { setUserRole } = useUserRole();

  const handleRoleSelect = (role: 'athlete' | 'scout' | 'coach') => {
    setUserRole(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-athlex-background text-white flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <img 
          src="/lovable-uploads/4fa9ab4b-66d6-42dc-979f-661fee5226e5.png" 
          alt="ATHLEX Logo" 
          className="h-14 mx-auto mb-6" 
        />
        <h1 className="text-3xl font-bold mb-2">Welcome to ATHLEX</h1>
        <p className="text-gray-400">Select your role to continue</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <Card className="bg-card border-gray-700 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20">
          <CardHeader className="text-center">
            <div className="mx-auto bg-blue-900/30 p-4 rounded-full mb-4">
              <UserRound className="h-8 w-8 text-blue-400" />
            </div>
            <CardTitle>Athlete</CardTitle>
            <CardDescription className="text-gray-400">Track your performance and get discovered</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-center text-gray-400">
            <p>Access your performance metrics, training plans, and increase your visibility to scouts worldwide.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleRoleSelect('athlete')} className="w-full">
              Log in as Athlete
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-card border-gray-700 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20">
          <CardHeader className="text-center">
            <div className="mx-auto bg-orange-900/30 p-4 rounded-full mb-4">
              <UsersRound className="h-8 w-8 text-orange-400" />
            </div>
            <CardTitle>Scout</CardTitle>
            <CardDescription className="text-gray-400">Discover and evaluate talent</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-center text-gray-400">
            <p>Find promising athletes, analyze their stats, and manage your recruitment pipeline effectively.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleRoleSelect('scout')} className="w-full">
              Log in as Scout
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-card border-gray-700 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20">
          <CardHeader className="text-center">
            <div className="mx-auto bg-green-900/30 p-4 rounded-full mb-4">
              <HeartPulse className="h-8 w-8 text-green-400" />
            </div>
            <CardTitle>Coach</CardTitle>
            <CardDescription className="text-gray-400">Develop and manage your athletes</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-center text-gray-400">
            <p>Track athlete progress, assign training sessions, and provide personalized development guidance.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleRoleSelect('coach')} className="w-full">
              Log in as Coach
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <p className="mt-8 text-sm text-gray-500">
        Don't have an account? <a href="/edge-signup" className="text-primary hover:underline">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
