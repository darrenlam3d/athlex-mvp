
import { 
  UserProfile, 
  TrainingPlan, 
  AssignedTraining, 
  CoachAthlete 
} from './types';
import { mockAthleteProfiles } from './athleteData';

// Mock coach profiles
export const mockCoachProfiles: UserProfile[] = [
  {
    id: 'coach_001',
    first_name: 'Michael',
    last_name: 'Thompson',
    full_name: 'Michael Thompson',
    role: 'coach',
    bio: 'UEFA Pro licensed coach with experience developing youth talent at both club and international level.',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    created_at: '2024-09-10T08:30:00Z'
  },
  {
    id: 'coach_002',
    first_name: 'Jessica',
    last_name: 'Martinez',
    full_name: 'Jessica Martinez',
    role: 'coach',
    bio: 'Specializing in physical and mental conditioning for high-performance athletes.',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    created_at: '2024-10-05T11:45:00Z'
  }
];

// Mock training plans
export const mockTrainingPlans: TrainingPlan[] = [
  {
    id: 'plan_001',
    coach_id: 'coach_001',
    title: 'Pre-Season Conditioning',
    description: 'Comprehensive plan to build baseline fitness, strength, and endurance before competitive season.',
    created_at: '2025-02-15T09:30:00Z',
    updated_at: '2025-02-15T09:30:00Z'
  },
  {
    id: 'plan_002',
    coach_id: 'coach_001',
    title: 'Technical Skills Development',
    description: 'Focus on fundamental technical skills with progressive drills and exercises.',
    created_at: '2025-02-20T14:15:00Z',
    updated_at: '2025-03-05T10:30:00Z'
  },
  {
    id: 'plan_003',
    coach_id: 'coach_001',
    title: 'Match Preparation',
    description: 'Tactical preparation and specific drills focused on upcoming match situations.',
    created_at: '2025-03-10T11:45:00Z',
    updated_at: '2025-03-10T11:45:00Z'
  },
  {
    id: 'plan_004',
    coach_id: 'coach_002',
    title: 'Mental Resilience Program',
    description: 'Structured program to build mental toughness and psychological resilience.',
    created_at: '2025-03-01T15:30:00Z',
    updated_at: '2025-03-01T15:30:00Z'
  }
];

// Mock assigned training sessions
export const mockAssignedTrainings: AssignedTraining[] = [
  {
    id: 'assigned_001',
    title: 'Speed and Agility Drills',
    description: 'Focus on explosive acceleration and directional changes.',
    coach_id: 'coach_001',
    athlete_id: 'athlete_001',
    scheduled_date: '2025-04-16',
    completion_status: 'not_started',
    training_plan_id: 'plan_001'
  },
  {
    id: 'assigned_002',
    title: 'Ball Control Session',
    description: 'Technical drills focusing on first touch and close control.',
    coach_id: 'coach_001',
    athlete_id: 'athlete_001',
    scheduled_date: '2025-04-18',
    completion_status: 'not_started',
    training_plan_id: 'plan_002'
  },
  {
    id: 'assigned_003',
    title: 'Match Simulation',
    description: 'Game situations with specific focus on positional awareness.',
    coach_id: 'coach_001',
    athlete_id: 'athlete_003',
    scheduled_date: '2025-04-17',
    completion_status: 'not_started',
    training_plan_id: 'plan_003'
  },
  {
    id: 'assigned_004',
    title: 'Recovery Session',
    description: 'Low intensity mobility work and stretching for recovery.',
    coach_id: 'coach_002',
    athlete_id: 'athlete_004',
    scheduled_date: '2025-04-15',
    completion_status: 'completed'
  }
];

// Mock coach-athlete relationships
export const mockCoachAthletes: CoachAthlete[] = [
  {
    id: 'coach_athlete_001',
    coach_id: 'coach_001',
    athlete_id: 'athlete_001',
    status: 'active',
    created_at: '2025-01-10T09:15:00Z'
  },
  {
    id: 'coach_athlete_002',
    coach_id: 'coach_001',
    athlete_id: 'athlete_003',
    status: 'active',
    created_at: '2025-01-15T14:30:00Z'
  },
  {
    id: 'coach_athlete_003',
    coach_id: 'coach_002',
    athlete_id: 'athlete_004',
    status: 'active',
    created_at: '2025-01-20T10:45:00Z'
  },
  {
    id: 'coach_athlete_004',
    coach_id: 'coach_001',
    athlete_id: 'athlete_002',
    status: 'pending',
    created_at: '2025-04-05T11:30:00Z'
  }
];

// Helper function to get coach's athletes with full profile data
export const getCoachAthletesWithProfiles = (coachId: string) => {
  const coachAthleteRelationships = mockCoachAthletes.filter(ca => ca.coach_id === coachId);
  
  return coachAthleteRelationships.map(relationship => {
    const athleteProfile = mockAthleteProfiles.find(a => a.id === relationship.athlete_id);
    return {
      ...relationship,
      athlete: athleteProfile
    };
  });
};
