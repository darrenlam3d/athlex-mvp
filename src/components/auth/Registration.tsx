
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRoleRegistration } from '@/hooks/useRoleRegistration';
import UniversalRegistrationForm from './UniversalRegistrationForm';
import AthleteRegistrationForm from './AthleteRegistrationForm';
import CoachRegistrationForm from './CoachRegistrationForm';
import RoleRegistrationLayout from './RoleRegistrationLayout';
import { UniversalFormValues } from './UniversalRegistrationForm';
import type { UserRole } from '@/contexts/UserRoleContext';

type NonEmptyUserRole = Exclude<UserRole, ''>;

interface LocationState {
  userData?: {
    email: string;
    fullName: string;
  };
}

const RoleRegistration = () => {
  const location = useLocation();
  const { userData } = (location.state as LocationState) || {};
  const [step, setStep] = useState<'account' | 'profile'>('account');
  
  const {
    selectedRole,
    setSelectedRole,
    isLoading,
    handleUniversalSubmit,
    handleAthleteSubmit,
    handleCoachSubmit,
  } = useRoleRegistration();

  const renderProfileForm = () => {
    switch (selectedRole) {
      case 'athlete':
        return <AthleteRegistrationForm onSubmit={handleAthleteSubmit} isLoading={isLoading} />;
      case 'coach':
        return <CoachRegistrationForm onSubmit={handleCoachSubmit} isLoading={isLoading} />;
      default:
        return null;
    }
  };

  const safeSelectedRole = selectedRole as NonEmptyUserRole;
  
  const handleRoleSelect = (role: NonEmptyUserRole) => {
    setSelectedRole(role);
  };

  return (
    <RoleRegistrationLayout step={step}>
      {step === 'account' ? (
        <UniversalRegistrationForm 
          onSubmit={(data: UniversalFormValues) => {
            handleUniversalSubmit(data);
            setStep('profile');
          }}
          selectedRole={safeSelectedRole}
          onSelectRole={handleRoleSelect}
          isLoading={isLoading}
          initialData={userData}
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
