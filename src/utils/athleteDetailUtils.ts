
import { SupabaseClient } from '@supabase/supabase-js';
import { getAthleteProfileById, getAthleteGoals, getAthleteTrainingSessions, getAthletePerformanceMetrics } from '@/lib/mock/mockDataProvider';
import { PerformanceData } from '@/types/athleteTypes';

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
    
    // Transform performance metrics to match expected PerformanceData format
    const transformedPerformanceData: PerformanceData = {
      speed: performanceMetrics.find(m => m.metric_type === 'speed')?.value || 0,
      strength: performanceMetrics.find(m => m.metric_type === 'strength')?.value || 0,
      endurance: performanceMetrics.find(m => m.metric_type === 'endurance')?.value || 0,
      agility: performanceMetrics.find(m => m.metric_type === 'agility')?.value || 0,
      power: performanceMetrics.find(m => m.metric_type === 'power')?.value || 0,
      overall: performanceMetrics.find(m => m.metric_type === 'overall')?.value || 0,
      timestamp: new Date().toISOString()
    };
    
    // Transform goals to match expected format
    const transformedGoals = goals.map(goal => ({
      id: goal.id,
      title: goal.title,
      description: goal.description || '',
      metric: goal.metric,
      current: goal.current_value,
      target: goal.target_value,
      progress: Math.min(100, Math.round((goal.current_value / goal.target_value) * 100)),
      start_date: goal.start_date,
      end_date: goal.end_date || '',
      status: goal.status
    }));
    
    // Transform training sessions to match expected format
    const transformedTrainingSessions = trainingSessions.map(session => ({
      id: session.id,
      title: session.title,
      type: session.type,
      description: session.description || '',
      duration: session.duration,
      intensity: session.intensity || 'medium',
      date: session.date,
      coach: session.coach_id ? 'Coach' : undefined,
      coach_name: session.coach_id ? 'Coach Name' : undefined,
      highlights: ['Completed all drills', 'Good form']
    }));
    
    // Combine all data into a single athlete object with name property
    return {
      id: profile.id,
      name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
      sport: profile.sport,
      position: profile.position,
      tacticalRole: profile.position,
      school: profile.club || 'Unknown School',
      club: profile.club || '',
      image: profile.avatar_url,
      height: profile.height ? String(profile.height) : undefined,
      weight: profile.weight ? String(profile.weight) : undefined,
      dominant_foot: profile.dominant_foot,
      date_of_birth: profile.age ? `${new Date().getFullYear() - profile.age}-01-01` : undefined,
      nationality: profile.nationality,
      bio: profile.bio,
      goals: transformedGoals,
      training_sessions: transformedTrainingSessions,
      performance_metrics: transformedPerformanceData
    };
  } catch (error) {
    console.error('Error fetching athlete details:', error);
    throw error;
  }
};
