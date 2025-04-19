
import { SupabaseClient } from '@supabase/supabase-js';
import { getAthleteProfileById, getAthleteGoals, getAthleteTrainingSessions, getAthletePerformanceMetrics } from '@/lib/mock/mockDataProvider';

export const getAthleteById = async (athleteId: string, isSupabaseConfigured: boolean, supabase: SupabaseClient) => {
  try {
    // In a real app, we would fetch from Supabase
    if (isSupabaseConfigured) {
      // This would be implemented with real queries to Supabase
      console.log('Would fetch athlete from Supabase with ID:', athleteId);
    }
    
    // For demo purposes, use mock data
    const profile = await getAthleteProfileById(athleteId);
    
    if (!profile) {
      throw new Error('Athlete not found');
    }
    
    // Get related data
    const goals = await getAthleteGoals(athleteId);
    const trainingSessions = await getAthleteTrainingSessions(athleteId);
    const performanceMetrics = await getAthletePerformanceMetrics(athleteId);
    
    // Combine all data into a single athlete object
    return {
      ...profile,
      goals,
      training_sessions: trainingSessions,
      performance_metrics: performanceMetrics
    };
  } catch (error) {
    console.error('Error fetching athlete details:', error);
    throw error;
  }
};
