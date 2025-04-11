
import { supabase } from '@/lib/supabase';
import { User } from '@/components/community/UserCard';

// Mock data for development
const mockUsers: User[] = [
  {
    id: "athlete_002",
    name: "Samantha Tan",
    sport: "Basketball",
    position: "Point Guard",
    school: "Northbridge Academy",
    club: "Downtown Dribblers",
    profile_photo: "https://example.com/uploads/samantha.jpg",
    connection_status: "not_connected"
  },
  {
    id: "athlete_003",
    name: "Marcus Ng",
    sport: "Football",
    position: "Center Back",
    school: "Lakeside Secondary",
    club: "Harbour FC",
    profile_photo: "https://example.com/uploads/marcus.jpg",
    connection_status: "pending"
  },
  {
    id: "coach_001",
    name: "Coach Amanda",
    sport: "Football",
    club: "Eastside United",
    profile_photo: "https://example.com/uploads/coach_amanda.jpg",
    connection_status: "connected"
  },
  {
    id: "athlete_004",
    name: "Jamal Wilson",
    sport: "Track",
    position: "Sprinter",
    school: "Central High",
    profile_photo: "https://example.com/uploads/jamal.jpg",
    connection_status: "not_connected"
  },
  {
    id: "scout_001",
    name: "David Thompson",
    sport: "Basketball",
    club: "NBA West Scouts",
    profile_photo: "https://example.com/uploads/david.jpg",
    connection_status: "not_connected"
  },
  {
    id: "athlete_005",
    name: "Emma Chen",
    sport: "Swimming",
    position: "Freestyle",
    school: "Riverside Academy",
    club: "Aquatic Champions",
    profile_photo: "https://example.com/uploads/emma.jpg",
    connection_status: "not_connected"
  }
];

// Mock messages
const mockMessages = [
  {
    from: "athlete_001",
    to: "coach_001",
    timestamp: "2025-04-11T14:30:00Z",
    message: "Hi Coach, I've updated my sprint times!"
  },
  {
    from: "coach_001",
    to: "athlete_001",
    timestamp: "2025-04-11T14:35:00Z",
    message: "Great job, I'll check it now."
  },
  {
    from: "athlete_001",
    to: "coach_001",
    timestamp: "2025-04-11T14:40:00Z",
    message: "Thanks! I've been working on my technique."
  }
];

// Get current user (for development, we'll use a mock)
const getCurrentUser = async () => {
  // In a real implementation, this would use supabase.auth.getUser()
  return {
    id: 'athlete_001',
    name: 'Alex Johnson',
    profile_photo: 'https://example.com/uploads/alex.jpg'
  };
};

// Get users from Supabase or mock
const getUsers = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', 'athlete_001'); // Exclude current user
        
      if (error) throw error;
      
      // Transform to match our User interface
      return data.map(profile => ({
        id: profile.id,
        name: `${profile.first_name} ${profile.last_name}`,
        sport: profile.sport,
        position: profile.position,
        school: profile.school,
        club: profile.club,
        profile_photo: profile.avatar_url,
        // In a real app, you'd get this from a connections table
        connection_status: "not_connected" as const
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      return mockUsers;
    }
  } else {
    return mockUsers;
  }
};

// Get connection status from Supabase or mock
const getConnections = async (userId: string) => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('connections')
        .select('*')
        .or(`from_user.eq.${userId},to_user.eq.${userId}`);
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching connections:', error);
      return [];
    }
  } else {
    return [];
  }
};

// Create a connection request
const createConnectionRequest = async (fromUserId: string, toUserId: string) => {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('connections')
        .insert({
          from_user: fromUserId,
          to_user: toUserId,
          status: 'pending'
        });
        
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error creating connection request:', error);
      return false;
    }
  } else {
    console.log('Creating mock connection request');
    return true;
  }
};

// Get messages between users
const getMessages = async (userId: string, partnerId: string) => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(from.eq.${userId},to.eq.${partnerId}),and(from.eq.${partnerId},to.eq.${userId})`)
        .order('timestamp', { ascending: true });
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return mockMessages;
    }
  } else {
    return mockMessages;
  }
};

// Send a message
const sendMessage = async (fromUserId: string, toUserId: string, message: string) => {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          from: fromUserId,
          to: toUserId,
          message,
          timestamp: new Date().toISOString()
        });
        
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  } else {
    console.log('Sending mock message:', message);
    return true;
  }
};

// Helper function to check if Supabase is configured
const isSupabaseConfigured = () => {
  return import.meta.env.VITE_SUPABASE_URL && 
         import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder-url.supabase.co' && 
         import.meta.env.VITE_SUPABASE_ANON_KEY && 
         import.meta.env.VITE_SUPABASE_ANON_KEY !== 'placeholder-key';
};

export {
  getCurrentUser,
  getUsers,
  getConnections,
  createConnectionRequest,
  getMessages,
  sendMessage
};
