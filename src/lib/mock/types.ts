// Common data types for mock data

// Users
export interface UserProfile {
  id: string;
  email?: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  role: 'athlete' | 'coach';
  avatar_url?: string;
  bio?: string;
  created_at: string;
}

// Athlete-specific data
export interface AthleteProfile extends UserProfile {
  sport: string;
  position: string;
  height?: number;
  weight?: number;
  age?: number;
  club?: string;
  nationality?: string;
  experience_years?: number;
  dominant_foot?: string;
  highlights?: string[];
}

// Performance related types
export interface PerformanceMetric {
  id: string;
  athlete_id: string;
  metric_type: string;
  value: number;
  unit: string;
  recorded_at: string;
  notes?: string;
}

export interface Goal {
  id: string;
  athlete_id: string;
  title: string;
  description?: string;
  metric: string;
  current_value: number;
  target_value: number;
  unit: string;
  start_date: string;
  end_date: string;
  progress_percent: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'cancelled';
}

// Training related types
export interface TrainingSession {
  id: string;
  athlete_id: string;
  title: string;
  type: string;
  description?: string;
  duration: number;
  intensity?: 'low' | 'medium' | 'high' | 'very_high';
  date: string;
  notes?: string;
  coach_id?: string;
}

export interface AssignedTraining {
  id: string;
  title: string;
  description?: string;
  coach_id: string;
  athlete_id: string;
  scheduled_date: string;
  completion_status: 'not_started' | 'in_progress' | 'completed';
  training_plan_id?: string;
}

// Nutrition related types
export interface NutritionLog {
  id: string;
  athlete_id: string;
  description: string;
  meal_type?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  consumed_at: string;
  notes?: string;
}

// Scouting related types
export interface ScoutNote {
  id: string;
  scout_id: string;
  athlete_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ScoutReport {
  id: string;
  scout_id: string;
  athlete_id: string;
  title: string;
  content: string;
  status: 'draft' | 'submitted' | 'approved';
  created_at: string;
  updated_at: string;
}

export interface ShortlistedAthlete {
  id: string;
  scout_id: string;
  athlete_id: string;
  rating?: number;
  notes?: string;
  created_at: string;
}

// Coach related types
export interface TrainingPlan {
  id: string;
  coach_id: string;
  title: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CoachAthlete {
  id: string;
  coach_id: string;
  athlete_id: string;
  status: 'pending' | 'active' | 'inactive';
  created_at: string;
}
