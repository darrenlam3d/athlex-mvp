
// Mock data for development and demo mode

// Athlete Profile
export const mockAthlete = {
  id: "athlete_001",
  user_id: "user_001",
  name: "Alex Johnson",
  sport: "Football",
  position: "Forward",
  age: 22,
  school: "Northridge University",
  club: "Northridge FC",
  stats: {
    height: 183, // cm
    weight: 78, // kg
    speed: 32, // km/h
    endurance: 85, // out of 100
  }
};

// Performance Data
export const mockPerformanceData = [
  { date: "2025-04-05", speed: 30.2, endurance: 82, distance: 8.4, strength: 75 },
  { date: "2025-04-06", speed: 30.5, endurance: 83, distance: 8.6, strength: 76 },
  { date: "2025-04-07", speed: 30.7, endurance: 83, distance: 8.5, strength: 76 },
  { date: "2025-04-08", speed: 31.0, endurance: 84, distance: 8.7, strength: 77 },
  { date: "2025-04-09", speed: 31.3, endurance: 84, distance: 8.8, strength: 77 },
  { date: "2025-04-10", speed: 31.5, endurance: 85, distance: 9.0, strength: 78 },
  { date: "2025-04-11", speed: 31.8, endurance: 85, distance: 9.2, strength: 79 }
];

// Today's Training
export const mockTodaysTraining = {
  id: "training_001",
  title: "High-Intensity Interval Training",
  type: "Cardio",
  duration: 45,
  start_time: "2025-04-14T15:30:00",
  assigned_by: "Coach Mike"
};

// Performance Insights
export const mockInsights = [
  {
    id: 1,
    metric: "speed",
    change_percent: 5.2,
    period: "week",
    insight_text: "Your sprint speed has improved by 5.2% in the last 7 days.",
    recommendation: "Keep focusing on your acceleration technique."
  },
  {
    id: 2,
    metric: "endurance",
    change_percent: 3.6,
    period: "month",
    insight_text: "Your endurance is up 3.6% compared to last month.",
    recommendation: "Try increasing your long-distance runs to 10km."
  }
];

// Performance Goals
export const mockGoals = [
  {
    id: "goal_001",
    title: "Increase Sprint Speed",
    metric: "Top Speed",
    current_value: 31.8,
    target_value: 33.5,
    start_date: "2025-04-01",
    target_date: "2025-05-15"
  },
  {
    id: "goal_002",
    title: "Improve Stamina",
    metric: "Distance Run",
    current_value: 9.2,
    target_value: 12,
    start_date: "2025-04-01",
    target_date: "2025-06-01"
  }
];

// Scout Dashboard - Athletes
export const shortlistedAthletesMock = [
  {
    id: "athlete_001",
    name: "Alex Johnson",
    sport: "Football",
    position: "Forward",
    school: "Northridge University",
    club: "Northridge FC",
    performance_score: 87,
    age: 22,
    profile_photo: null
  },
  {
    id: "athlete_002",
    name: "Samantha Tan",
    sport: "Basketball",
    position: "Point Guard",
    school: "Westlake College",
    club: "Downtown Dribblers",
    performance_score: 91,
    age: 20,
    profile_photo: null
  }
];

export const recommendedAthletesMock = [
  {
    id: "athlete_003",
    name: "Diego Hernandez",
    sport: "Football",
    position: "Midfielder",
    school: "Southbay Institute",
    club: "Bayside FC",
    performance_score: 93,
    age: 19,
    profile_photo: null
  },
  {
    id: "athlete_004",
    name: "Olivia Chen",
    sport: "Tennis",
    position: null,
    school: "Eastridge Academy",
    club: "Highland Tennis Club",
    performance_score: 92,
    age: 18,
    profile_photo: null
  },
  {
    id: "athlete_005",
    name: "Jamal Wilson",
    sport: "Track",
    position: "Sprinter",
    school: "Central University",
    club: "Mercury Track Club",
    performance_score: 90,
    age: 21,
    profile_photo: null
  }
];

export const allAthletesMock = [
  ...shortlistedAthletesMock,
  ...recommendedAthletesMock,
  {
    id: "athlete_006",
    name: "Emma Roberts",
    sport: "Swimming",
    position: "Freestyle",
    school: "Lake College",
    club: "Aquatic Champions",
    performance_score: 85,
    age: 22,
    profile_photo: null
  },
  {
    id: "athlete_007",
    name: "Michael Zhang",
    sport: "Basketball",
    position: "Shooting Guard",
    school: "Northern State",
    club: "Metro Ballers",
    performance_score: 88,
    age: 23,
    profile_photo: null
  }
];

// Messages
export const messagesMock = [
  {
    id: "msg_001",
    from: "scout_001",
    to: "athlete_001",
    timestamp: "2025-04-11T14:30:00Z",
    message: "Hi Alex, I was impressed with your performance in last week's game."
  },
  {
    id: "msg_002",
    from: "athlete_001",
    to: "scout_001",
    timestamp: "2025-04-11T14:35:00Z",
    message: "Thank you! I've been working on my finishing skills."
  },
  {
    id: "msg_003",
    from: "scout_001",
    to: "athlete_001",
    timestamp: "2025-04-11T14:40:00Z",
    message: "It shows. I'd like to discuss your future plans if you're interested."
  }
];
