
export interface AthleteProfile {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  email?: string;
  sport: string;
  position: string;
  height?: number;
  weight?: number;
  age?: number;
  nationality?: string;
  experience_years?: number;
  dominant_foot?: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at?: string;
}

export interface TrainingSession {
  id: string;
  title: string;
  type: string;
  description?: string;
  duration: number;
  intensity?: 'low' | 'medium' | 'high' | 'very_high';
  date: string;
  coach_name?: string;
  coach_id?: string;
  highlights?: string[];
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  metric: string;
  current: number;
  target: number;
  progress: number;
  start_date: string;
  end_date?: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'cancelled';
}

export interface PerformanceData {
  speed: number;
  strength: number;
  endurance: number;
  agility: number;
  power: number;
  overall: number;
  timestamp: string;
}
