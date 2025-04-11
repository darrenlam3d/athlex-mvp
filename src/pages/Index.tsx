
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useUserRole } from '@/contexts/UserRoleContext';
import { toast } from 'sonner';

const Index = () => {
  const { userRole, setUserRole } = useUserRole();

  // Add a function to set user role for testing
  const handleSetScoutRole = () => {
    setUserRole('scout');
    toast.success("Set user role to 'scout'");
    console.log("Set user role to 'scout'");
  };

  const handleSetCoachRole = () => {
    setUserRole('coach');
    toast.success("Set user role to 'coach'");
    console.log("Set user role to 'coach'");
  };

  const handleSetAthleteRole = () => {
    setUserRole('athlete');
    toast.success("Set user role to 'athlete'");
    console.log("Set user role to 'athlete'");
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-athlex-background text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Welcome to ATHLEX</h1>
          <p className="text-lg text-gray-400 mb-8">Your all-in-one platform for athlete management and scouting.</p>
          <div className="space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/athlete-dashboard">
                <Button variant="secondary">Athlete Dashboard</Button>
              </Link>
              <Link to="/scout-dashboard">
                <Button variant="secondary">Scout Dashboard</Button>
              </Link>
              <Link to="/coach-dashboard">
                <Button variant="secondary">Coach Dashboard</Button>
              </Link>
            </div>
            <div className="mt-6">
              <p className="text-gray-400 mb-2">Current role: <span className="font-semibold">{userRole}</span></p>
              <Link to="/login">
                <Button variant="default">Go to Login Page</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add role testing buttons at the bottom */}
      <div className="fixed bottom-4 right-4 flex gap-2">
        <Button variant="secondary" size="sm" onClick={handleSetAthleteRole}>
          Set Athlete Role
        </Button>
        <Button variant="secondary" size="sm" onClick={handleSetScoutRole}>
          Set Scout Role
        </Button>
        <Button variant="secondary" size="sm" onClick={handleSetCoachRole}>
          Set Coach Role
        </Button>
      </div>
    </div>
  );
};

export default Index;
