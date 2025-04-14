
import { 
  mockAthleteProfiles, 
  mockGoals, 
  mockPerformanceMetrics, 
  mockTrainingSessions, 
  mockNutritionLogs 
} from './athleteData';

import { 
  mockScoutProfiles, 
  mockScoutNotes, 
  mockScoutReports, 
  mockShortlistedAthletes,
  getAthleteWithPerformanceData
} from './scoutData';

import { 
  mockCoachProfiles, 
  mockTrainingPlans, 
  mockAssignedTrainings, 
  mockCoachAthletes,
  getCoachAthletesWithProfiles
} from './coachData';

// Utility function to simulate API calls with a small delay
const simulateApiCall = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 300); // 300ms delay to simulate network request
  });
};

// Filter function helpers
const filterByAthlete = <T extends { athlete_id: string }>(
  items: T[],
  athleteId: string
): T[] => {
  return items.filter(item => item.athlete_id === athleteId);
};

const filterByCoach = <T extends { coach_id: string }>(
  items: T[],
  coachId: string
): T[] => {
  return items.filter(item => item.coach_id === coachId);
};

const filterByScout = <T extends { scout_id: string }>(
  items: T[],
  scoutId: string
): T[] => {
  return items.filter(item => item.scout_id === scoutId);
};

// Current user functions
let currentUserId: string | null = null;
let currentUserRole: 'athlete' | 'scout' | 'coach' | null = null;

export const setCurrentUser = (
  userId: string, 
  role: 'athlete' | 'scout' | 'coach'
) => {
  currentUserId = userId;
  currentUserRole = role;
};

export const getCurrentUserId = () => currentUserId;
export const getCurrentUserRole = () => currentUserRole;

// Profile data functions
export const getProfileById = (userId: string) => {
  if (!userId) return null;
  
  const allProfiles = [
    ...mockAthleteProfiles,
    ...mockScoutProfiles,
    ...mockCoachProfiles
  ];
  
  return allProfiles.find(profile => profile.id === userId) || null;
};

export const getCurrentUserProfile = () => {
  return currentUserId ? getProfileById(currentUserId) : null;
};

// Athlete data functions
export const getAthleteProfiles = () => simulateApiCall(mockAthleteProfiles);
export const getAthleteProfileById = (athleteId: string) => {
  const profile = mockAthleteProfiles.find(a => a.id === athleteId);
  return simulateApiCall(profile || null);
};

export const getAthleteGoals = (athleteId: string) => {
  const goals = filterByAthlete(mockGoals, athleteId);
  return simulateApiCall(goals);
};

export const getAthletePerformanceMetrics = (
  athleteId: string,
  metricType?: string
) => {
  let metrics = filterByAthlete(mockPerformanceMetrics, athleteId);
  
  if (metricType) {
    metrics = metrics.filter(m => m.metric_type === metricType);
  }
  
  return simulateApiCall(metrics);
};

export const getAthleteTrainingSessions = (athleteId: string) => {
  const sessions = filterByAthlete(mockTrainingSessions, athleteId);
  return simulateApiCall(sessions);
};

export const getAthleteNutritionLogs = (athleteId: string) => {
  const logs = filterByAthlete(mockNutritionLogs, athleteId);
  return simulateApiCall(logs);
};

// Scout data functions
export const getScoutProfiles = () => simulateApiCall(mockScoutProfiles);
export const getScoutProfileById = (scoutId: string) => {
  const profile = mockScoutProfiles.find(s => s.id === scoutId);
  return simulateApiCall(profile || null);
};

export const getScoutNotes = (scoutId: string, athleteId?: string) => {
  let notes = filterByScout(mockScoutNotes, scoutId);
  
  if (athleteId) {
    notes = notes.filter(note => note.athlete_id === athleteId);
  }
  
  return simulateApiCall(notes);
};

export const getScoutReports = (scoutId: string, athleteId?: string) => {
  let reports = filterByScout(mockScoutReports, scoutId);
  
  if (athleteId) {
    reports = reports.filter(report => report.athlete_id === athleteId);
  }
  
  return simulateApiCall(reports);
};

export const getShortlistedAthletes = (scoutId: string) => {
  const shortlisted = filterByScout(mockShortlistedAthletes, scoutId);
  
  // Attach athlete profiles
  const shortlistedWithProfiles = shortlisted.map(item => {
    const athlete = mockAthleteProfiles.find(a => a.id === item.athlete_id);
    return { ...item, athlete };
  });
  
  return simulateApiCall(shortlistedWithProfiles);
};

export const getAthleteWithPerformance = (athleteId: string) => {
  const athleteData = getAthleteWithPerformanceData(athleteId);
  return simulateApiCall(athleteData);
};

// Coach data functions
export const getCoachProfiles = () => simulateApiCall(mockCoachProfiles);
export const getCoachProfileById = (coachId: string) => {
  const profile = mockCoachProfiles.find(c => c.id === coachId);
  return simulateApiCall(profile || null);
};

export const getCoachTrainingPlans = (coachId: string) => {
  const plans = filterByCoach(mockTrainingPlans, coachId);
  return simulateApiCall(plans);
};

export const getAssignedTrainings = (
  coachId?: string,
  athleteId?: string
) => {
  let trainings = mockAssignedTrainings;
  
  if (coachId) {
    trainings = filterByCoach(trainings, coachId);
  }
  
  if (athleteId) {
    trainings = filterByAthlete(trainings, athleteId);
  }
  
  return simulateApiCall(trainings);
};

export const getCoachAthletes = (coachId: string) => {
  const coachAthletes = getCoachAthletesWithProfiles(coachId);
  return simulateApiCall(coachAthletes);
};

// Default export all functions
export default {
  // User management
  setCurrentUser,
  getCurrentUserId,
  getCurrentUserRole,
  getProfileById,
  getCurrentUserProfile,
  
  // Athlete data
  getAthleteProfiles,
  getAthleteProfileById,
  getAthleteGoals,
  getAthletePerformanceMetrics,
  getAthleteTrainingSessions,
  getAthleteNutritionLogs,
  
  // Scout data
  getScoutProfiles,
  getScoutProfileById,
  getScoutNotes,
  getScoutReports,
  getShortlistedAthletes,
  getAthleteWithPerformance,
  
  // Coach data
  getCoachProfiles,
  getCoachProfileById,
  getCoachTrainingPlans,
  getAssignedTrainings,
  getCoachAthletes
};
