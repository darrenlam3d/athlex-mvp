
import React from 'react';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AthleteHeader from '../AthleteHeader';
import AthletePassport from '../AthletePassport';
import RecentTraining from '../RecentTraining';
import PerformanceMetrics from '../PerformanceMetrics';
import GoalOverview from '../GoalOverview';
import ScoutingActions from '../ScoutingActions';
import NutritionOverview from '../NutritionOverview';
import ScoutingNotes from '../ScoutingNotes';

interface AthleteDetailContentProps {
  athlete: any;
  id: string;
  isShortlisted: boolean;
  isConnected: boolean;
  onAddToShortlist: () => void;
}

const AthleteDetailContent: React.FC<AthleteDetailContentProps> = ({ 
  athlete, 
  id, 
  isShortlisted, 
  isConnected, 
  onAddToShortlist 
}) => {
  const { userRole } = useUserRole();
  const navigate = useNavigate();
  
  const handleAssignTraining = () => {
    navigate(`/assign-training?athlete_id=${id}`);
  };

  const showPerformanceMetrics = userRole === 'scout' || (userRole === 'coach' && isConnected);
  const showGoals = userRole === 'scout' || (userRole === 'coach' && isConnected);
  const showTrainingSessions = userRole === 'scout' || (userRole === 'coach' && isConnected);
  const showNutrition = userRole === 'coach' && isConnected;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <AthleteHeader 
            athlete={athlete} 
            onAddToShortlist={onAddToShortlist} 
          />
        </div>
        
        {userRole === 'coach' && isConnected && (
          <div className="md:self-start md:mt-4">
            <Button 
              className="w-full md:w-auto bg-athlex-accent hover:bg-athlex-accent/90"
              onClick={handleAssignTraining}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Assign Training to {athlete.name.split(' ')[0]}
            </Button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <AthletePassport athlete={athlete} />
          
          {showTrainingSessions && (
            <RecentTraining sessions={athlete?.training_sessions || []} />
          )}
          
          <div className="md:hidden">
            <ScoutingActions 
              athleteId={id} 
              isShortlisted={isShortlisted} 
              isConnected={isConnected} 
            />
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          {showPerformanceMetrics && (
            <PerformanceMetrics performanceData={athlete?.performance_metrics} />
          )}
          
          {showGoals && (
            <GoalOverview goals={athlete?.goals || []} />
          )}
          
          {showNutrition && (
            <NutritionOverview athleteId={id} />
          )}
          
          <ScoutingNotes 
            athleteId={id} 
            isConnected={isConnected} 
          />
        </div>

        <div className="hidden md:block md:col-span-1">
          <ScoutingActions 
            athleteId={id} 
            isShortlisted={isShortlisted}
            isConnected={isConnected}
          />
        </div>
      </div>
    </div>
  );
};

export default AthleteDetailContent;
