
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useUserRole } from '@/contexts/UserRoleContext';

const Index = () => {
  const { setUserRole } = useUserRole();

  // Add a function to set user role for testing
  const handleSetScoutRole = () => {
    setUserRole('scout');
    console.log("Set user role to 'scout'");
    // You could also navigate to the scout dashboard here
  };

  const handleSetCoachRole = () => {
    setUserRole('coach');
    console.log("Set user role to 'coach'");
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-athlex-background text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Welcome to ATHLEX</h1>
          <p className="text-lg text-gray-400 mb-8">Your all-in-one platform for athlete management and scouting.</p>
          <div className="space-x-4">
            <Link to="/athlete-dashboard">
              <Button variant="secondary">Athlete Dashboard</Button>
            </Link>
            <Link to="/scout-dashboard">
              <Button variant="secondary">Scout Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Add role testing buttons at the bottom */}
      <div className="fixed bottom-4 right-4 flex gap-2">
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
