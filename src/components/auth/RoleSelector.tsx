
import { Button } from '@/components/ui/button';

interface RoleSelectorProps {
  onSelectRole: (role: 'coach' | 'scout') => void;
}

const RoleSelector = ({ onSelectRole }: RoleSelectorProps) => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Choose Your Role</h2>
      <div className="flex gap-4">
        <Button
          onClick={() => onSelectRole('coach')}
          size="lg"
          variant="outline"
        >
          Register as Coach
        </Button>
        <Button
          onClick={() => onSelectRole('scout')}
          size="lg"
          variant="outline"
        >
          Register as Scout
        </Button>
      </div>
    </div>
  );
};

export default RoleSelector;
