
// Mock data for testing and development when Supabase is not configured

// Athlete user data
export const mockAthlete = {
  id: "athlete_001",
  name: "Jordan Lee",
  sport: "Football",
  position: "Left Midfielder",
  height_cm: 175,
  weight_kg: 68,
  handedness: "Right",
  footedness: "Left",
  school: "Springfield High",
  club: "Eastside United"
};

// Performance chart data (training logs)
export const mockPerformanceData = [
  { date: "2025-04-01", speed: 21.5, endurance: 78, stamina: 72, strength: 65 },
  { date: "2025-04-03", speed: 22.0, endurance: 81, stamina: 75, strength: 67 },
  { date: "2025-04-05", speed: 22.7, endurance: 84, stamina: 77, strength: 68 },
  { date: "2025-04-07", speed: 23.1, endurance: 86, stamina: 79, strength: 70 },
  { date: "2025-04-10", speed: 23.5, endurance: 88, stamina: 82, strength: 73 }
];

// Today's training session
export const mockTodaysTraining = {
  id: "session_001",
  title: "Speed & Agility Drills",
  type: "High Intensity",
  duration: 45,
  start_time: new Date().setHours(16, 30, 0, 0),
  date: "2025-04-12",
  status: "scheduled"
};

// Performance insights
export const mockInsights = [
  {
    id: 1,
    metric: "speed",
    change_percent: 5,
    period: "week",
    insight_text: "Your sprint speed improved by 5% over the past week. Great consistency!"
  }
];

// Goal progress preview
export const mockGoals = [
  {
    id: "goal_001",
    title: "Increase Top Speed",
    metric: "Speed (km/h)",
    target_value: 25.0,
    current_value: 23.5,
    start_date: "2025-03-15",
    target_date: "2025-05-15",
    status: "active"
  },
  {
    id: "goal_002",
    title: "Improve Endurance",
    metric: "Endurance Score",
    target_value: 90,
    current_value: 88,
    start_date: "2025-03-01",
    target_date: "2025-04-30",
    status: "active"
  }
];
