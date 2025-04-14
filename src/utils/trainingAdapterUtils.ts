
import { TrainingSession, AssignedTraining } from '@/lib/mock/types';

// Define the expected component interface types
export interface TrainingLog {
  id: string;
  date: string;
  type: string;
  activity: string;
  duration_minutes: number;
  distance_km: number | null;
  intensity_level: string;
  notes?: string;
}

export interface TrainingScheduleItem {
  id: string;
  date: string;
  title: string;
  duration_minutes: number;
  coach: string;
  location?: string;
  description: string; // Added the missing description property
}

// Adapter function to convert TrainingSession to TrainingLog
export const adaptTrainingSessionToLog = (session: TrainingSession): TrainingLog => {
  return {
    id: session.id,
    date: session.date,
    type: session.type,
    activity: session.title,
    duration_minutes: session.duration,
    distance_km: null, // Default value
    intensity_level: session.intensity || 'medium',
    notes: session.notes
  };
};

// Adapter function for collections
export const adaptTrainingSessions = (sessions: TrainingSession[]): TrainingLog[] => {
  return sessions.map(adaptTrainingSessionToLog);
};

// Adapter function to convert AssignedTraining to TrainingScheduleItem
export const adaptAssignedTrainingToScheduleItem = (training: AssignedTraining): TrainingScheduleItem => {
  return {
    id: training.id,
    date: training.scheduled_date,
    title: training.title,
    description: training.description || "", // Use description from source or empty string
    duration_minutes: 60, // Default value
    coach: "Coach", // Default value
    location: "Training Ground" // Default value
  };
};

// Adapter function for collections
export const adaptAssignedTrainings = (trainings: AssignedTraining[]): TrainingScheduleItem[] => {
  return trainings.map(adaptAssignedTrainingToScheduleItem);
};
