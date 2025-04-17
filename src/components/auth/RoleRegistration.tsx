
import { useRoleRegistration } from '@/hooks/useRoleRegistration';
import RoleSelector from './RoleSelector';
import CoachRegistrationForm from './CoachRegistrationForm';
import ScoutRegistrationForm from './ScoutRegistrationForm';

const RoleRegistration = () => {
  const {
    selectedRole,
    setSelectedRole,
    isLoading,
    handleCoachSubmit,
    handleScoutSubmit
  } = useRoleRegistration();

  if (!selectedRole) {
    return <RoleSelector onSelectRole={setSelectedRole} />;
  }

  return (
    <div className="flex justify-center p-4">
      {selectedRole === 'coach' ? (
        <CoachRegistrationForm onSubmit={handleCoachSubmit} isLoading={isLoading} />
      ) : (
        <ScoutRegistrationForm onSubmit={handleScoutSubmit} isLoading={isLoading} />
      )}
    </div>
  );
};

export default RoleRegistration;
