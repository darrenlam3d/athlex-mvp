
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/components/community/UserCard';
import { isDemoMode } from '@/lib/supabase';

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
  if (!isDemoMode()) {
    try {
      // This is wrapped in a try/catch since we're in demo mode
      // and Supabase is not configured with proper tables yet
      console.log('Would fetch users from Supabase');
      return mockUsers;
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
  if (!isDemoMode()) {
    try {
      console.log('Would fetch connections from Supabase', { userId });
      return [];
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
  if (!isDemoMode()) {
    try {
      console.log('Would create connection request in Supabase', { fromUserId, toUserId });
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
  if (!isDemoMode()) {
    try {
      console.log('Would fetch messages from Supabase', { userId, partnerId });
      return mockMessages;
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
  if (!isDemoMode()) {
    try {
      console.log('Would send message to Supabase', { fromUserId, toUserId, message });
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

export {
  getCurrentUser,
  getUsers,
  getConnections,
  createConnectionRequest,
  getMessages,
  sendMessage
};
