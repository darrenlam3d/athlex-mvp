
import { 
  UserProfile, 
  ScoutNote, 
  ScoutReport, 
  ShortlistedAthlete,
  AthleteProfile
} from './types';
import { mockAthleteProfiles } from './athleteData';

// Mock scout profiles
export const mockScoutProfiles: UserProfile[] = [
  {
    id: 'scout_001',
    first_name: 'David',
    last_name: 'Williams',
    full_name: 'David Williams',
    role: 'scout',
    bio: 'Senior talent scout with 15 years of experience in identifying promising young athletes.',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    created_at: '2024-10-15T09:00:00Z'
  },
  {
    id: 'scout_002',
    first_name: 'Emma',
    last_name: 'Taylor',
    full_name: 'Emma Taylor',
    role: 'scout',
    bio: 'Specializing in identifying technical midfielders and creative playmakers.',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    created_at: '2024-11-20T14:30:00Z'
  }
];

// Mock scout notes
export const mockScoutNotes: ScoutNote[] = [
  {
    id: 'note_001',
    scout_id: 'scout_001',
    athlete_id: 'athlete_001',
    title: 'Initial Assessment',
    content: 'Shows excellent acceleration and ball control. Needs to work on left foot.',
    created_at: '2025-03-15T10:30:00Z',
    updated_at: '2025-03-15T10:30:00Z'
  },
  {
    id: 'note_002',
    scout_id: 'scout_001',
    athlete_id: 'athlete_001',
    title: 'Match Observation',
    content: 'Decision making has improved since last observation. Good positioning.',
    created_at: '2025-04-01T15:45:00Z',
    updated_at: '2025-04-01T15:45:00Z'
  },
  {
    id: 'note_003',
    scout_id: 'scout_001',
    athlete_id: 'athlete_002',
    title: 'First Impression',
    content: 'Excellent court vision and passing ability. Creates opportunities for teammates.',
    created_at: '2025-03-20T11:15:00Z',
    updated_at: '2025-03-20T11:15:00Z'
  },
  {
    id: 'note_004',
    scout_id: 'scout_002',
    athlete_id: 'athlete_003',
    title: 'Technical Assessment',
    content: 'Powerful striker with good movement. Needs to improve first touch under pressure.',
    created_at: '2025-03-25T09:20:00Z',
    updated_at: '2025-03-25T09:20:00Z'
  }
];

// Mock scouting reports
export const mockScoutReports: ScoutReport[] = [
  {
    id: 'report_001',
    scout_id: 'scout_001',
    athlete_id: 'athlete_001',
    title: 'Quarterly Performance Report',
    content: `
      # Alex Johnson - Midfielder Assessment
      
      ## Technical Skills
      - Excellent ball control in tight spaces
      - Good range of passing, both short and long
      - Needs improvement on weak foot (left)
      
      ## Physical Attributes
      - Good acceleration and top speed
      - Above average endurance
      - Could improve upper body strength
      
      ## Tactical Understanding
      - Excellent positioning and awareness
      - Good decision making under pressure
      - Needs to improve defensive positioning when team loses possession
      
      ## Psychological Aspects
      - Strong leadership qualities
      - Maintains composure under pressure
      - Good communication with teammates
      
      ## Development Recommendations
      - Focus on left foot development
      - Increase upper body strength training
      - Work on defensive positioning and awareness
    `,
    status: 'approved',
    created_at: '2025-04-05T14:30:00Z',
    updated_at: '2025-04-07T09:15:00Z'
  },
  {
    id: 'report_002',
    scout_id: 'scout_002',
    athlete_id: 'athlete_003',
    title: 'Initial Talent Assessment',
    content: `
      # Miguel Rodriguez - Forward Assessment
      
      ## Technical Skills
      - Powerful shot with both feet
      - Good heading ability
      - Needs improvement on first touch under pressure
      
      ## Physical Attributes
      - Excellent strength and power
      - Good acceleration over short distances
      - Above average aerial ability
      
      ## Tactical Understanding
      - Good movement in the final third
      - Understands when to hold up play
      - Needs to improve defensive contribution
      
      ## Psychological Aspects
      - Strong desire to score goals
      - Sometimes frustrated when service is poor
      - Good work rate
      
      ## Development Recommendations
      - Work on first touch technique
      - Improve defensive awareness and contribution
      - Practice link-up play with midfielders
    `,
    status: 'draft',
    created_at: '2025-03-28T11:45:00Z',
    updated_at: '2025-03-28T11:45:00Z'
  }
];

// Mock shortlisted athletes
export const mockShortlistedAthletes: ShortlistedAthlete[] = [
  {
    id: 'shortlist_001',
    scout_id: 'scout_001',
    athlete_id: 'athlete_001',
    rating: 8,
    notes: 'High potential, monitor development closely',
    created_at: '2025-03-10T09:30:00Z'
  },
  {
    id: 'shortlist_002',
    scout_id: 'scout_001',
    athlete_id: 'athlete_004',
    rating: 7,
    notes: 'Excellent pace, could develop into a top striker',
    created_at: '2025-03-15T14:20:00Z'
  },
  {
    id: 'shortlist_003',
    scout_id: 'scout_002',
    athlete_id: 'athlete_003',
    rating: 8,
    notes: 'Powerful forward with good finishing ability',
    created_at: '2025-03-20T10:45:00Z'
  }
];

// Function to get complete athlete profile with performance data
export const getAthleteWithPerformanceData = (athleteId: string) => {
  const athlete = mockAthleteProfiles.find(a => a.id === athleteId);
  
  if (!athlete) {
    return null;
  }
  
  return {
    ...athlete,
    performance_metrics: {
      speed: [
        { date: '2025-01', value: 31.2 },
        { date: '2025-02', value: 31.5 },
        { date: '2025-03', value: 32.1 },
        { date: '2025-04', value: 32.4 }
      ],
      endurance: [
        { date: '2025-01', value: 42.5 },
        { date: '2025-02', value: 43.8 },
        { date: '2025-03', value: 44.2 },
        { date: '2025-04', value: 45.9 }
      ],
      agility: [
        { date: '2025-01', value: 8.7 },
        { date: '2025-02', value: 8.5 },
        { date: '2025-03', value: 8.3 },
        { date: '2025-04', value: 8.2 }
      ]
    },
    training_sessions: [
      {
        id: 'session1',
        date: '2025-04-08',
        type: 'Sprint Training',
        duration: '90 min',
        coach: 'Coach Thompson',
        highlights: 'Achieved new personal best in 40m sprint'
      },
      {
        id: 'session2',
        date: '2025-04-03',
        type: 'Tactical Session',
        duration: '120 min',
        coach: 'Coach Williams',
        highlights: 'Focused on positioning and space creation'
      },
      {
        id: 'session3',
        date: '2025-03-28',
        type: 'Match Simulation',
        duration: '100 min',
        coach: 'Coach Thompson',
        highlights: 'Led team in assists and distance covered'
      }
    ],
    goals: [
      {
        id: 'goal1',
        metric: 'Top Speed',
        current: 32.4,
        target: 34.0,
        unit: 'km/h',
        end_date: '2025-06-30',
        progress: 80
      },
      {
        id: 'goal2',
        metric: 'Pass Completion',
        current: 85,
        target: 90,
        unit: '%',
        end_date: '2025-05-15',
        progress: 70
      },
      {
        id: 'goal3',
        metric: 'Defensive Duels Won',
        current: 65,
        target: 75,
        unit: '%',
        end_date: '2025-07-01',
        progress: 50
      }
    ]
  };
};
