
import React, { useState } from 'react';
import { useProfile } from '@/contexts/ProfileContext';
import MvpRoleSelector from '@/components/mvp/MvpRoleSelector';
import MvpAthleteView from '@/components/mvp/MvpAthleteView';
import MvpScoutView from '@/components/mvp/MvpScoutView';

const MVP = () => {
  // State to track the selected role
  const [activeRole, setActiveRole] = useState<'athlete' | 'scout'>('athlete');
  
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container py-8 px-4 mx-auto max-w-7xl">
        <header className="mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/4fa9ab4b-66d6-42dc-979f-661fee5226e5.png" 
              alt="ATHLEX Logo" 
              className="h-10" 
            />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2 gradient-text">ATHLEX MVP Demo</h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto">
            Experience the core features of ATHLEX platform — connecting athlete performance data with 
            AI-powered insights for athletes, scouts, and coaches.
          </p>
        </header>
        
        <MvpRoleSelector activeRole={activeRole} onRoleChange={setActiveRole} />
        
        <main className="mt-8 animate-fade-in">
          {activeRole === 'athlete' ? (
            <MvpAthleteView />
          ) : (
            <MvpScoutView />
          )}
        </main>
      </div>
    </div>
  );
};

export default MVP;
