
import { 
  PerformanceMetric,
  Goal as ApiGoal,
  TrainingSession as ApiTrainingSession 
} from '@/lib/mock/types';

import { 
  Goal as UIGoal
} from '@/components/athlete/GoalOverview';

import {
  TrainingSession as UITrainingSession
} from '@/components/athlete/RecentTraining';

import {
  PerformanceData
} from '@/components/athlete/PerformanceMetrics';

// Transform performance metrics into the format required by PerformanceMetrics component
export const transformPerformanceMetrics = (metrics: PerformanceMetric[]): PerformanceData => {
  // Group metrics by type
  const speedMetrics = metrics.filter(metric => metric.metric_type === 'speed');
  const enduranceMetrics = metrics.filter(metric => metric.metric_type === 'endurance');
  const agilityMetrics = metrics.filter(metric => metric.metric_type === 'agility');

  // Transform metrics to required format
  return {
    speed: speedMetrics.map(metric => ({
      date: new Date(metric.recorded_at).toLocaleDateString(),
      value: metric.value
    })),
    endurance: enduranceMetrics.map(metric => ({
      date: new Date(metric.recorded_at).toLocaleDateString(),
      value: metric.value
    })),
    agility: agilityMetrics.map(metric => ({
      date: new Date(metric.recorded_at).toLocaleDateString(),
      value: metric.value
    }))
  };
};

// Transform goals into the format required by GoalOverview component
export const transformGoals = (goals: ApiGoal[]): UIGoal[] => {
  return goals.map(goal => ({
    id: goal.id,
    metric: goal.metric,
    current: goal.current_value,
    target: goal.target_value,
    unit: goal.unit || '',
    end_date: goal.end_date || '',
    progress: calculateProgress(goal.current_value, goal.target_value)
  }));
};

// Transform training sessions into the format required by RecentTraining component
export const transformTrainingSessions = (sessions: ApiTrainingSession[]): UITrainingSession[] => {
  return sessions.map(session => ({
    id: session.id,
    title: session.title,
    type: session.type,
    description: session.description || '',
    duration: session.duration,
    intensity: session.intensity || 'medium',
    date: session.date,
    coach: session.coach_id ? 'Coach' : 'Self',
    coach_name: session.coach_id ? 'Coach' : undefined,
    highlights: ['Completed all drills', 'Good form']
  }));
};

// Helper function to calculate progress percentage
const calculateProgress = (current: number, target: number): number => {
  if (target <= 0) return 0;
  if (current >= target) return 100;
  return Math.round((current / target) * 100);
};

// Transform athlete profile data for display
export const transformAthleteProfile = (profile: any) => {
  return {
    id: profile.id,
    name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
    sport: profile.sport || '',
    position: profile.position || '',
    tacticalRole: profile.position || '',
    school: profile.club || 'Unknown School',
    club: profile.club || '',
    image: profile.avatar_url || '',
    height: profile.height ? String(profile.height) : undefined,
    weight: profile.weight ? String(profile.weight) : undefined,
    dominant_foot: profile.dominant_foot,
    date_of_birth: profile.age ? `${new Date().getFullYear() - profile.age}-01-01` : undefined,
    nationality: profile.nationality,
    bio: profile.bio
  };
};
