
import { isSupabaseConfigured } from '@/lib/supabase';
import { Athlete } from '@/components/scouting/AthleteCard';
import { toast } from 'sonner';

// Mock data for shortlisted athletes
export const shortlistedAthletesMock: Athlete[] = [
  {
    id: "athlete_004",
    name: "Arif Rahman",
    sport: "Football",
    position: "Striker",
    club: "Tampines Elite",
    recent_speed_kmh: 25.4,
    profile_photo: "https://example.com/uploads/arif.jpg"
  },
  {
    id: "athlete_005",
    name: "Lena Koh",
    sport: "Netball",
    position: "Wing Attack",
    club: "Civic Blaze",
    recent_speed_kmh: 23.8,
    profile_photo: "https://example.com/uploads/lena.jpg"
  }
];

// Mock data for recommended athletes
export const recommendedAthletesMock: Athlete[] = [
  {
    id: "athlete_006",
    name: "Javier Chua",
    sport: "Football",
    position: "Right Back",
    club: "Harbour FC",
    performance_score: 92,
    profile_photo: "https://example.com/uploads/javier.jpg"
  },
  {
    id: "athlete_007",
    name: "Meera Das",
    sport: "Badminton",
    position: "Singles",
    club: "Smashers Academy",
    performance_score: 89,
    profile_photo: "https://example.com/uploads/meera.jpg"
  }
];

// Mock data for all athletes (combination and more)
export const allAthletesMock: Athlete[] = [
  ...shortlistedAthletesMock,
  ...recommendedAthletesMock,
  {
    id: "athlete_008",
    name: "Tai Wee Lin",
    sport: "Swimming",
    position: "Freestyle",
    club: "Aquatics Centre",
    performance_score: 85,
    profile_photo: null
  },
  {
    id: "athlete_009",
    name: "Marcus Tan",
    sport: "Basketball",
    position: "Point Guard",
    club: "Downtown Dribblers",
    performance_score: 88,
    profile_photo: null
  }
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
