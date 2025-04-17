
import { useRoleRegistration } from '@/hooks/useRoleRegistration';
import RoleSelector from './RoleSelector';
import CoachRegistrationForm from './CoachRegistrationForm';
import ScoutRegistrationForm from './ScoutRegistrationForm';
import AthleteRegistrationForm from './AthleteRegistrationForm';

const RoleRegistration = () => {
  const {
    selectedRole,
    setSelectedRole,
    isLoading,
    handleAthleteSubmit,
    handleCoachSubmit,
    handleScoutSubmit
  } = useRoleRegistration();

  if (!selectedRole) {
    return <RoleSelector onSelectRole={setSelectedRole} />;
  }

  return (
    <div className="flex justify-center p-4">
      {selectedRole === 'athlete' ? (
        <AthleteRegistrationForm onSubmit={handleAthleteSubmit} isLoading={isLoading} />
      ) : selectedRole === 'coach' ? (
        <CoachRegistrationForm onSubmit={handleCoachSubmit} isLoading={isLoading} />
      ) : (
        <ScoutRegistrationForm onSubmit={handleScoutSubmit} isLoading={isLoading} />
      )}
    </div>
  );
};

export default RoleRegistration;
