
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
