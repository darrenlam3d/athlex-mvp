
import React from 'react';

interface ScoutWelcomeHeaderProps {
  userName: string;
}

const ScoutWelcomeHeader = ({ userName }: ScoutWelcomeHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {userName}</h1>
        <p className="text-athlex-gray-400">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
    </div>
  );
};

export default ScoutWelcomeHeader;
