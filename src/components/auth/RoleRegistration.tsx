
import { useState } from 'react';
import { useRoleRegistration } from '@/hooks/useRoleRegistration';
import RoleSelector from './RoleSelector';
import CoachRegistrationForm from './CoachRegistrationForm';
import ScoutRegistrationForm from './ScoutRegistrationForm';
import AthleteRegistrationForm from './AthleteRegistrationForm';
import UniversalRegistrationForm from './UniversalRegistrationForm';
import { UniversalFormValues } from './UniversalRegistrationForm';

const RoleRegistration = () => {
  const [step, setStep] = useState<'account' | 'profile'>('account');
  
  const {
    selectedRole,
    setSelectedRole,
    isLoading,
    handleUniversalSubmit,
    handleAthleteSubmit,
    handleCoachSubmit,
    handleScoutSubmit,
    universalFormData,
    setUniversalFormData
  } = useRoleRegistration();

  // Step 1: Universal account creation with role selection
  if (step === 'account') {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4">
        <UniversalRegistrationForm 
          onSubmit={(data: UniversalFormValues) => {
            handleUniversalSubmit(data);
            setStep('profile');
          }}
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
          isLoading={isLoading}
        />
      </div>
    );
  }

  // Step 2: Role-specific profile completion
  return (
    <div className="flex justify-center p-4 w-full max-w-4xl mx-auto">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-athlex-accent to-purple-400 bg-clip-text text-transparent">
          Complete Your {selectedRole?.charAt(0).toUpperCase() + selectedRole?.slice(1)} Profile
        </h2>
        
        {selectedRole === 'athlete' ? (
          <AthleteRegistrationForm onSubmit={handleAthleteSubmit} isLoading={isLoading} />
        ) : selectedRole === 'coach' ? (
          <CoachRegistrationForm onSubmit={handleCoachSubmit} isLoading={isLoading} />
        ) : (
          <ScoutRegistrationForm onSubmit={handleScoutSubmit} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default RoleRegistration;
