
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import AthleteLayout from '@/layouts/AthleteLayout';
import { mockGoals } from '@/lib/mockData';
import ActiveGoalsList from '@/components/goals/ActiveGoalsList';
import GoalCreationForm from '@/components/goals/GoalCreationForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// --- Goal types for UI layer (matches what ActiveGoalsList expects)
export interface UIGoal {
  goal_id: string;
  metric: string;
  target_value: number;
  current_value: number;
  unit: string;
  start_date: string;
  end_date: string;
  progress_percent: number;
  status: string;
}

// Transform mock (backend) goals into the UI format
const transformGoals = (goals: typeof mockGoals): UIGoal[] => {
  return goals.map(goal => ({
    goal_id: goal.id,                      // Map mock's id to UI's goal_id
    metric: goal.metric,
    target_value: goal.target_value,
    current_value: goal.current_value || 0,
    unit: goal.unit || '',
    start_date: goal.start_date,
    end_date: goal.end_date,
    progress_percent: goal.progress_percent || 0,
    status: 
      goal.status === 'not_started'
        ? 'Not Started'
        : goal.status === 'in_progress'
        ? 'In Progress'
        : goal.status === 'completed'
        ? 'Completed'
        : goal.status === 'cancelled'
        ? 'Cancelled'
        : goal.status || 'In Progress',
  }));
};

const GoalsPage: React.FC = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<UIGoal[]>(transformGoals(mockGoals));
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Open goal creation dialog
  const handleCreateGoal = () => {
    setIsDialogOpen(true);
  };

  // Handler when a new goal is created through the form (expects UIGoal)
  const handleGoalCreated = (newGoal: UIGoal) => {
    setGoals(prev => [...prev, newGoal]);
    setIsDialogOpen(false);
    toast.success("New goal created successfully!");
  };

  return (
    <AthleteLayout>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate('/athlex-mvp')} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold gradient-text">Performance Goals</h1>
        </div>
        <ActiveGoalsList goals={goals} onCreateGoal={handleCreateGoal} />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-athlex-gray-900 border-athlex-gray-800">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
            </DialogHeader>
            <GoalCreationForm onSubmit={handleGoalCreated} onCancel={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </AthleteLayout>
  );
};

export default GoalsPage;

