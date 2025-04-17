
import { useQuery } from '@tanstack/react-query';
import { isSupabaseConfigured } from '@/lib/supabase';
import { AthleteWithConnectionStatus } from '@/components/scouting/AthleteCard';
import { 
  shortlistedAthletesMock, 
  recommendedAthletesMock, 
  allAthletesMock 
} from '@/utils/athleteUtils';

export const useScoutData = () => {
  // Fetch shortlisted athletes
  const { data: shortlistedAthletes, isLoading: isLoadingShortlisted } = useQuery({
    queryKey: ['shortlistedAthletes'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return shortlistedAthletesMock;
      }
      console.log('Would fetch shortlisted athletes from Supabase if configured');
      return shortlistedAthletesMock;
    }
  });
  
  // Fetch recommended athletes
  const { data: recommendedAthletes, isLoading: isLoadingRecommended } = useQuery({
    queryKey: ['recommendedAthletes'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return recommendedAthletesMock;
      }
      console.log('Would fetch recommended athletes from Supabase if configured');
      return recommendedAthletesMock;
    }
  });
  
  // Fetch all athletes
  const { data: allAthletes, isLoading: isLoadingAll } = useQuery({
    queryKey: ['allAthletes'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return allAthletesMock;
      }
      console.log('Would fetch all athletes from Supabase if configured');
      return allAthletesMock;
    }
  });

  return {
    shortlistedAthletes,
    isLoadingShortlisted,
    recommendedAthletes,
    isLoadingRecommended,
    allAthletes,
    isLoadingAll
  };
};
