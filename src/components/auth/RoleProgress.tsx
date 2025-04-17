
import React from 'react';

interface RoleProgressProps {
  step: 'account' | 'profile';
}

const RoleProgress = ({ step }: RoleProgressProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex justify-center items-center gap-4">
        <div className={`flex items-center ${step === 'account' ? 'text-athlex-accent' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
            ${step === 'account' ? 'border-athlex-accent bg-athlex-accent/10' : 'border-gray-600 bg-gray-800/50'}`}>
            1
          </div>
          <span className="ml-2">Account Setup</span>
        </div>
        <div className={`w-16 h-0.5 ${step === 'profile' ? 'bg-athlex-accent' : 'bg-gray-600'}`} />
        <div className={`flex items-center ${step === 'profile' ? 'text-athlex-accent' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
            ${step === 'profile' ? 'border-athlex-accent bg-athlex-accent/10' : 'border-gray-600 bg-gray-800/50'}`}>
            2
          </div>
          <span className="ml-2">Profile Details</span>
        </div>
      </div>
    </div>
  );
};

export default RoleProgress;
