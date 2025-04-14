
// Training-related mock data
export const mockTrainingLogs = [
  {
    id: "training_001",
    date: "2025-04-10",
    type: "Skill",
    activity: "Ball Control Drills",
    duration_minutes: 45,
    distance_km: null,
    intensity_level: "Medium",
    notes: "Focused on first touch and tight control"
  },
  {
    id: "training_002",
    date: "2025-04-08",
    type: "Strength",
    activity: "Weight Training",
    duration_minutes: 60,
    distance_km: null,
    intensity_level: "High",
    notes: "Lower body focus, increased squat weight by 5kg"
  },
  {
    id: "training_003",
    date: "2025-04-06",
    type: "Conditioning",
    activity: "Interval Running",
    duration_minutes: 30,
    distance_km: 5.2,
    intensity_level: "Very High",
    notes: "10 sets of 30s sprint, 90s recovery"
  }
];

export const mockTrainingSchedule = [
  {
    id: "schedule_001",
    date: "2025-04-15",
    title: "Team Training",
    description: "Focus on tactical positioning and set pieces",
    duration_minutes: 90,
    coach: "Coach Williams",
    location: "Main Field"
  },
  {
    id: "schedule_002",
    date: "2025-04-17",
    title: "Recovery Session",
    description: "Light jog, stretching, and mobility work",
    duration_minutes: 45,
    coach: "Coach Taylor",
    location: "Training Room"
  },
  {
    id: "schedule_003",
    date: "2025-04-19",
    title: "Match Preparation",
    description: "Game simulation and final tactical preparation",
    duration_minutes: 75,
    coach: "Coach Williams",
    location: "Main Field"
  }
];

export const mockTrainingLogFormFields = [
  { label: "Training Type", type: "select", options: ["Conditioning", "Skill", "Strength", "Recovery", "Team Training", "Match"] },
  { label: "Activity", type: "text" },
  { label: "Duration (minutes)", type: "number" },
  { label: "Distance (km)", type: "number", optional: true },
  { label: "Intensity Level", type: "select", options: ["Low", "Medium", "High", "Very High"] },
  { label: "Notes", type: "textarea", optional: true }
];

// Add missing mock data
export const mockGoals = [
  {
    id: "goal_001",
    title: "Improve Sprint Speed",
    metric: "Sprint Speed",
    current_value: 28,
    target_value: 32,
    unit: "km/h",
    target_date: "2025-06-15",
    progress: 70
  },
  {
    id: "goal_002",
    title: "Increase Vertical Jump",
    metric: "Vertical Jump",
    current_value: 26,
    target_value: 30,
    unit: "inches",
    target_date: "2025-07-01",
    progress: 40
  }
];

export const mockPerformanceData = [
  { date: "2025-04-01", speed: 25, endurance: 70, distance: 4.2, strength: 65 },
  { date: "2025-04-03", speed: 26, endurance: 72, distance: 4.5, strength: 66 },
  { date: "2025-04-05", speed: 26.5, endurance: 73, distance: 4.8, strength: 68 },
  { date: "2025-04-07", speed: 27, endurance: 75, distance: 5.0, strength: 70 },
  { date: "2025-04-09", speed: 27.5, endurance: 76, distance: 5.3, strength: 72 },
  { date: "2025-04-11", speed: 28, endurance: 77, distance: 5.5, strength: 74 }
];

export const mockInsights = [
  {
    id: "insight_001",
    insight_text: "Your sprint speed has improved by 10% over the last 30 days.",
    change_percent: 10,
    recommendation: "Try incorporating more plyometric exercises to further improve explosiveness."
  },
  {
    id: "insight_002",
    insight_text: "Your training consistency is excellent, with 85% of planned sessions completed.",
    change_percent: 85,
    recommendation: "Consider adding one more recovery session per week to optimize muscle repair."
  }
];

export const mockTodaysTraining = {
  id: "session_today",
  title: "Technical Skills Session",
  type: "Skill Development",
  duration: 60,
  start_time: "2025-04-14T16:00:00Z",
  assigned_by: "Coach Williams"
};

export const mockAthlete = {
  id: "athlete_001",
  name: "Alex Johnson",
  age: 21,
  sport: "Football",
  position: "Midfielder",
  team: "Lakeside FC",
  profile_photo: "https://example.com/uploads/alex.jpg",
  height: 182,
  weight: 76,
  joined_date: "2024-12-01"
};

