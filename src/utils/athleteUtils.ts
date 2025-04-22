
import { toast } from 'sonner';
import { AthleteWithConnectionStatus } from '@/types/athleteTypes';

// Mock data for shortlisted athletes with connection_status
export const shortlistedAthletesMock: AthleteWithConnectionStatus[] = [
  {
    id: "athlete_001",
    name: "Michael Wong",
    sport: "Football",
    position: "Striker",
    club: "Singapore United FC",
    recent_speed_kmh: 32.5,
    profile_photo: "https://randomuser.me/api/portraits/men/32.jpg",
    connection_status: 'connected'
  },
  {
    id: "athlete_002",
    name: "Sarah Chen",
    sport: "Basketball",
    position: "Point Guard",
    club: "Eastern Phoenix",
    performance_score: 87,
    profile_photo: "https://randomuser.me/api/portraits/women/44.jpg",
    connection_status: 'connected'
  },
  {
    id: "athlete_003",
    name: "Raj Singh",
    sport: "Football",
    position: "Center Back",
    club: "Marina Bay FC",
    recent_speed_kmh: 28.9,
    profile_photo: "https://randomuser.me/api/portraits/men/68.jpg",
    connection_status: 'connected'
  }
];

// Mock data for recommended athletes with connection_status
export const recommendedAthletesMock: AthleteWithConnectionStatus[] = [
  {
    id: "athlete_004",
    name: "Arif Rahman",
    sport: "Football",
    position: "Striker",
    club: "Tampines Elite",
    recent_speed_kmh: 33.7,
    profile_photo: "https://randomuser.me/api/portraits/men/75.jpg",
    connection_status: 'not_connected'
  },
  {
    id: "athlete_005",
    name: "Lena Koh",
    sport: "Netball",
    position: "Wing Attack",
    club: "Civic Blaze",
    performance_score: 91,
    profile_photo: "https://randomuser.me/api/portraits/women/22.jpg",
    connection_status: 'not_connected'
  },
  {
    id: "athlete_006",
    name: "Marcus Chen",
    sport: "Basketball",
    position: "Point Guard",
    club: "Skyline Ballers",
    performance_score: 84,
    profile_photo: "https://randomuser.me/api/portraits/men/8.jpg",
    connection_status: 'not_connected'
  }
];

// Mock data for all athletes with connection_status
export const allAthletesMock: AthleteWithConnectionStatus[] = [
  ...shortlistedAthletesMock,
  ...recommendedAthletesMock,
  {
    id: "athlete_007",
    name: "Sarah Wong",
    sport: "Football",
    position: "Midfielder",
    club: "Northern Stars FC",
    recent_speed_kmh: 30.2,
    profile_photo: "https://randomuser.me/api/portraits/women/17.jpg",
    connection_status: 'not_connected'
  },
  {
    id: "athlete_008",
    name: "Taufiq Ismail",
    sport: "Swimming",
    position: "Freestyle",
    club: "Aquatic Performance",
    performance_score: 88,
    profile_photo: "https://randomuser.me/api/portraits/men/45.jpg",
    connection_status: 'not_connected'
  }
];

// Mock messages data for chat
export const messagesMock = [
  {
    id: "msg_001",
    senderId: "scout_001",
    recipientId: "athlete_001",
    text: "Hi Michael, I was impressed with your performance in the last match. Would you be interested in a trial?",
    timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: "msg_002",
    senderId: "athlete_001",
    recipientId: "scout_001",
    text: "Thank you for reaching out! I would definitely be interested in a trial. When would this be?",
    timestamp: new Date(Date.now() - 82800000).toISOString() // 23 hours ago
  },
  {
    id: "msg_003",
    senderId: "scout_001",
    recipientId: "athlete_001",
    text: "Great! We're looking at next Tuesday. Would that work for you?",
    timestamp: new Date(Date.now() - 79200000).toISOString() // 22 hours ago
  },
  {
    id: "msg_004",
    senderId: "athlete_001",
    recipientId: "scout_001",
    text: "Tuesday works perfectly. What time and where?",
    timestamp: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
  }
];

// Mock function to add athlete to shortlist
export const addToShortlist = async (athleteId: string, scoutId: string): Promise<boolean> => {
  console.log(`Adding athlete ${athleteId} to shortlist for scout ${scoutId}`);
  // In a real app, this would make a Supabase call
  // For demo, just return success
  return true;
};

// Mock function to remove athlete from shortlist
export const removeFromShortlist = async (athleteId: string, scoutId: string): Promise<boolean> => {
  console.log(`Removing athlete ${athleteId} from shortlist for scout ${scoutId}`);
  // In a real app, this would make a Supabase call
  // For demo, just return success
  return true;
};

// Mock function to send a message
export const sendMessage = async (senderId: string, recipientId: string, text: string): Promise<boolean> => {
  console.log(`Sending message from ${senderId} to ${recipientId}: ${text}`);
  // In a real app, this would make a Supabase call
  // For demo, just return success
  return true;
};
