
import { useState } from 'react';
import { useRoleRegistration } from '@/hooks/useRoleRegistration';
import UniversalRegistrationForm from './UniversalRegistrationForm';
import AthleteRegistrationForm from './AthleteRegistrationForm';
import CoachRegistrationForm from './CoachRegistrationForm';
import ScoutRegistrationForm from './ScoutRegistrationForm';
import RoleRegistrationLayout from './RoleRegistrationLayout';
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
  } = useRoleRegistration();

  const renderProfileForm = () => {
    switch (selectedRole) {
      case 'athlete':
        return <AthleteRegistrationForm onSubmit={handleAthleteSubmit} isLoading={isLoading} />;
      case 'coach':
        return <CoachRegistrationForm onSubmit={handleCoachSubmit} isLoading={isLoading} />;
      case 'scout':
        return <ScoutRegistrationForm onSubmit={handleScoutSubmit} isLoading={isLoading} />;
      default:
        return null;
    }
  };

  return (
    <RoleRegistrationLayout step={step}>
      {step === 'account' ? (
        <UniversalRegistrationForm 
          onSubmit={(data: UniversalFormValues) => {
            handleUniversalSubmit(data);
            setStep('profile');
          }}
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
          isLoading={isLoading}
        />
      ) : (
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-athlex-accent to-purple-400 bg-clip-text text-transparent">
            Complete Your {selectedRole?.charAt(0).toUpperCase() + selectedRole?.slice(1)} Profile
          </h2>
          {renderProfileForm()}
        </div>
      )}
    </RoleRegistrationLayout>
  );
};

export default RoleRegistration;
