
import { isSupabaseConfigured } from '@/lib/supabase';
import { mockAthleteProfiles } from '@/lib/mock/athleteData';
import { mockShortlistedAthletes } from '@/lib/mock/scoutData';
import { toast } from 'sonner';

// Export the mockShortlistedAthletes for backward compatibility
export const shortlistedAthletesMock = mockShortlistedAthletes.map(item => {
  const athlete = mockAthleteProfiles.find(a => a.id === item.athlete_id);
  if (!athlete) return null;
  
  return {
    id: athlete.id,
    name: `${athlete.first_name} ${athlete.last_name}`,
    sport: athlete.sport,
    position: athlete.position,
    club: athlete.club || '',
    recent_speed_kmh: 25.4, // Sample data
    profile_photo: athlete.avatar_url
  };
}).filter(Boolean);

// Export recommended athletes mock data
export const recommendedAthletesMock = mockAthleteProfiles
  .filter(athlete => !shortlistedAthletesMock.some(sa => sa?.id === athlete.id))
  .slice(0, 2)
  .map(athlete => ({
    id: athlete.id,
    name: `${athlete.first_name} ${athlete.last_name}`,
    sport: athlete.sport,
    position: athlete.position,
    club: athlete.club || '',
    performance_score: Math.floor(Math.random() * 11) + 80, // Random score between 80-90
    profile_photo: athlete.avatar_url
  }));

// All athletes (combination and more)
export const allAthletesMock = [
  ...shortlistedAthletesMock,
  ...recommendedAthletesMock,
  ...mockAthleteProfiles
    .filter(athlete => 
      !shortlistedAthletesMock.some(sa => sa?.id === athlete.id) && 
      !recommendedAthletesMock.some(ra => ra.id === athlete.id)
    )
    .slice(0, 2)
    .map(athlete => ({
      id: athlete.id,
      name: `${athlete.first_name} ${athlete.last_name}`,
      sport: athlete.sport,
      position: athlete.position,
      club: athlete.club || '',
      performance_score: Math.floor(Math.random() * 11) + 80,
      profile_photo: athlete.avatar_url
    }))
];

// Mock messages for the chat panel
export const messagesMock = [
  {
    from: "scout_001",
    to: "athlete_004",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    message: "Hi Arif, I saw your last match. Impressive performance!"
  },
  {
    from: "athlete_004",
    to: "scout_001",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    message: "Thank you! I've been working on my finishing technique."
  }
];

// Add an athlete to shortlist
export const addToShortlist = async (athleteId: string, currentUserId: string) => {
  try {
    if (isSupabaseConfigured()) {
      console.log('Would add athlete to shortlist in Supabase if configured', { athleteId, currentUserId });
    }
    
    toast.success('Athlete added to shortlist');
    return true;
  } catch (error) {
    console.error('Error adding to shortlist:', error);
    return false;
  }
};

// Remove an athlete from shortlist
export const removeFromShortlist = async (athleteId: string, currentUserId: string) => {
  try {
    if (isSupabaseConfigured()) {
      console.log('Would remove athlete from shortlist in Supabase if configured', { athleteId, currentUserId });
    }
    
    toast.success('Athlete removed from shortlist');
    return true;
  } catch (error) {
    console.error('Error removing from shortlist:', error);
    return false;
  }
};

// Send a message to an athlete
export const sendMessage = async (fromUserId: string, toUserId: string, message: string) => {
  try {
    const newMessage = {
      from: fromUserId,
      to: toUserId,
      message,
      timestamp: new Date().toISOString()
    };
    
    if (isSupabaseConfigured()) {
      console.log('Would send message in Supabase if configured', newMessage);
    }
    
    return true;
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
};
