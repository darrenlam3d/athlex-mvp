
// Re-export the mock data from our new organized mock data system
import { 
  mockTrainingSessions as mockTrainingLogs,
  mockGoals,
  mockPerformanceMetrics as mockPerformanceData,
  mockNutritionLogs,
  mockAthleteProfiles
} from '@/lib/mock/athleteData';

import {
  mockAssignedTrainings as mockTrainingSchedule
} from '@/lib/mock/coachData';

// Legacy exports for backward compatibility
export { mockTrainingLogs, mockGoals, mockPerformanceData };

// Training schedule data
export { mockTrainingSchedule };

// Mock today's training
export const mockTodaysTraining = {
  id: "session_today",
  title: "Technical Skills Session",
  type: "Skill Development",
  duration: 60,
  start_time: "2025-04-14T16:00:00Z",
  assigned_by: "Coach Williams"
};

// Form fields for training log
export const mockTrainingLogFormFields = [
  { label: "Training Type", type: "select", options: ["Conditioning", "Skill", "Strength", "Recovery", "Team Training", "Match"] },
  { label: "Activity", type: "text" },
  { label: "Duration (minutes)", type: "number" },
  { label: "Distance (km)", type: "number", optional: true },
  { label: "Intensity Level", type: "select", options: ["Low", "Medium", "High", "Very High"] },
  { label: "Notes", type: "textarea", optional: true }
];

// Mock insights
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

// Sample athlete data
export const mockAthlete = mockAthleteProfiles[0] || {
  id: "athlete_001",
  first_name: "Alex",
  last_name: "Johnson",
  age: 21,
  sport: "Football",
  position: "Midfielder",
  club: "Lakeside FC",
  avatar_url: "https://example.com/uploads/alex.jpg",
  height: 182,
  weight: 76,
  created_at: "2024-12-01"
};
