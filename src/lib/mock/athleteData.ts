
import { 
  AthleteProfile, 
  Goal, 
  PerformanceMetric, 
  TrainingSession, 
  NutritionLog 
} from './types';

// Mock athlete profiles
export const mockAthleteProfiles: AthleteProfile[] = [
  {
    id: 'athlete_001',
    first_name: 'Alex',
    last_name: 'Johnson',
    full_name: 'Alex Johnson',
    role: 'athlete',
    sport: 'Football',
    position: 'Midfielder',
    height: 182,
    weight: 76,
    age: 21,
    club: 'Lakeside FC',
    nationality: 'England',
    dominant_foot: 'Right',
    bio: 'Attacking midfielder with excellent vision and passing ability.',
    avatar_url: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f',
    created_at: '2024-12-01T10:00:00Z',
    experience_years: 12
  },
  {
    id: 'athlete_002',
    first_name: 'Sarah',
    last_name: 'Chen',
    full_name: 'Sarah Chen',
    role: 'athlete',
    sport: 'Basketball',
    position: 'Point Guard',
    height: 175,
    weight: 68,
    age: 22,
    club: 'Metro Ballers',
    nationality: 'Canada',
    bio: 'Quick, agile point guard with excellent court vision.',
    created_at: '2024-11-15T09:30:00Z',
    experience_years: 10
  },
  {
    id: 'athlete_003',
    first_name: 'Miguel',
    last_name: 'Rodriguez',
    full_name: 'Miguel Rodriguez',
    role: 'athlete',
    sport: 'Football',
    position: 'Forward',
    height: 188,
    weight: 82,
    age: 19,
    club: 'Riverside United',
    nationality: 'Spain',
    dominant_foot: 'Left',
    bio: 'Powerful striker with excellent finishing ability.',
    created_at: '2025-01-10T14:20:00Z',
    experience_years: 8
  },
  {
    id: 'athlete_004',
    first_name: 'Arif',
    last_name: 'Rahman',
    full_name: 'Arif Rahman',
    role: 'athlete',
    sport: 'Football',
    position: 'Striker',
    height: 186,
    weight: 80,
    age: 23,
    club: 'Tampines Elite',
    nationality: 'Malaysia',
    dominant_foot: 'Right',
    bio: 'Pacey striker with excellent movement off the ball.',
    created_at: '2024-10-05T08:45:00Z',
    experience_years: 14
  },
  {
    id: 'athlete_005',
    first_name: 'Lena',
    last_name: 'Koh',
    full_name: 'Lena Koh',
    role: 'athlete',
    sport: 'Netball',
    position: 'Wing Attack',
    height: 173,
    weight: 65,
    age: 24,
    club: 'Civic Blaze',
    nationality: 'Singapore',
    bio: 'Agile wing attack with excellent spatial awareness.',
    created_at: '2024-09-20T11:15:00Z',
    experience_years: 9
  }
];

// Mock goals for athletes
export const mockGoals: Goal[] = [
  {
    id: 'goal_001',
    athlete_id: 'athlete_001',
    title: 'Improve Sprint Speed',
    description: 'Increase top sprint speed from 28 to 32 km/h',
    metric: 'Sprint Speed',
    current_value: 28,
    target_value: 32,
    unit: 'km/h',
    start_date: '2025-03-15',
    end_date: '2025-06-15',
    progress_percent: 70,
    status: 'in_progress'
  },
  {
    id: 'goal_002',
    athlete_id: 'athlete_001',
    title: 'Increase Vertical Jump',
    description: 'Reach 30 inch vertical jump',
    metric: 'Vertical Jump',
    current_value: 26,
    target_value: 30,
    unit: 'inches',
    start_date: '2025-03-01',
    end_date: '2025-07-01',
    progress_percent: 40,
    status: 'in_progress'
  },
  {
    id: 'goal_003',
    athlete_id: 'athlete_001',
    title: 'Improve Pass Completion',
    description: 'Increase passing accuracy to 85%',
    metric: 'Pass Completion',
    current_value: 85,
    target_value: 85,
    unit: '%',
    start_date: '2025-01-15',
    end_date: '2025-03-15',
    progress_percent: 100,
    status: 'completed'
  },
  {
    id: 'goal_004',
    athlete_id: 'athlete_002',
    title: 'Increase Free Throw Percentage',
    description: 'Improve free throw accuracy to 90%',
    metric: 'Free Throw',
    current_value: 82,
    target_value: 90,
    unit: '%',
    start_date: '2025-02-01',
    end_date: '2025-05-01',
    progress_percent: 65,
    status: 'in_progress'
  }
];

// Mock performance metrics for athletes
export const mockPerformanceMetrics: PerformanceMetric[] = [
  // Speed metrics for athlete_001
  { id: 'metric_001', athlete_id: 'athlete_001', metric_type: 'speed', value: 25, unit: 'km/h', recorded_at: '2025-04-01T10:30:00Z' },
  { id: 'metric_002', athlete_id: 'athlete_001', metric_type: 'speed', value: 26, unit: 'km/h', recorded_at: '2025-04-03T10:30:00Z' },
  { id: 'metric_003', athlete_id: 'athlete_001', metric_type: 'speed', value: 26.5, unit: 'km/h', recorded_at: '2025-04-05T10:30:00Z' },
  { id: 'metric_004', athlete_id: 'athlete_001', metric_type: 'speed', value: 27, unit: 'km/h', recorded_at: '2025-04-07T10:30:00Z' },
  { id: 'metric_005', athlete_id: 'athlete_001', metric_type: 'speed', value: 27.5, unit: 'km/h', recorded_at: '2025-04-09T10:30:00Z' },
  { id: 'metric_006', athlete_id: 'athlete_001', metric_type: 'speed', value: 28, unit: 'km/h', recorded_at: '2025-04-11T10:30:00Z' },
  
  // Endurance metrics for athlete_001
  { id: 'metric_007', athlete_id: 'athlete_001', metric_type: 'endurance', value: 70, unit: 'score', recorded_at: '2025-04-01T10:30:00Z' },
  { id: 'metric_008', athlete_id: 'athlete_001', metric_type: 'endurance', value: 72, unit: 'score', recorded_at: '2025-04-03T10:30:00Z' },
  { id: 'metric_009', athlete_id: 'athlete_001', metric_type: 'endurance', value: 73, unit: 'score', recorded_at: '2025-04-05T10:30:00Z' },
  { id: 'metric_010', athlete_id: 'athlete_001', metric_type: 'endurance', value: 75, unit: 'score', recorded_at: '2025-04-07T10:30:00Z' },
  { id: 'metric_011', athlete_id: 'athlete_001', metric_type: 'endurance', value: 76, unit: 'score', recorded_at: '2025-04-09T10:30:00Z' },
  { id: 'metric_012', athlete_id: 'athlete_001', metric_type: 'endurance', value: 77, unit: 'score', recorded_at: '2025-04-11T10:30:00Z' },
  
  // Distance metrics for athlete_001
  { id: 'metric_013', athlete_id: 'athlete_001', metric_type: 'distance', value: 4.2, unit: 'km', recorded_at: '2025-04-01T10:30:00Z' },
  { id: 'metric_014', athlete_id: 'athlete_001', metric_type: 'distance', value: 4.5, unit: 'km', recorded_at: '2025-04-03T10:30:00Z' },
  { id: 'metric_015', athlete_id: 'athlete_001', metric_type: 'distance', value: 4.8, unit: 'km', recorded_at: '2025-04-05T10:30:00Z' },
  { id: 'metric_016', athlete_id: 'athlete_001', metric_type: 'distance', value: 5.0, unit: 'km', recorded_at: '2025-04-07T10:30:00Z' },
  { id: 'metric_017', athlete_id: 'athlete_001', metric_type: 'distance', value: 5.3, unit: 'km', recorded_at: '2025-04-09T10:30:00Z' },
  { id: 'metric_018', athlete_id: 'athlete_001', metric_type: 'distance', value: 5.5, unit: 'km', recorded_at: '2025-04-11T10:30:00Z' },
  
  // Strength metrics for athlete_001
  { id: 'metric_019', athlete_id: 'athlete_001', metric_type: 'strength', value: 65, unit: 'score', recorded_at: '2025-04-01T10:30:00Z' },
  { id: 'metric_020', athlete_id: 'athlete_001', metric_type: 'strength', value: 66, unit: 'score', recorded_at: '2025-04-03T10:30:00Z' },
  { id: 'metric_021', athlete_id: 'athlete_001', metric_type: 'strength', value: 68, unit: 'score', recorded_at: '2025-04-05T10:30:00Z' },
  { id: 'metric_022', athlete_id: 'athlete_001', metric_type: 'strength', value: 70, unit: 'score', recorded_at: '2025-04-07T10:30:00Z' },
  { id: 'metric_023', athlete_id: 'athlete_001', metric_type: 'strength', value: 72, unit: 'score', recorded_at: '2025-04-09T10:30:00Z' },
  { id: 'metric_024', athlete_id: 'athlete_001', metric_type: 'strength', value: 74, unit: 'score', recorded_at: '2025-04-11T10:30:00Z' }
];

// Mock training sessions
export const mockTrainingSessions: TrainingSession[] = [
  {
    id: 'session_001',
    athlete_id: 'athlete_001',
    title: 'Technical Skills Session',
    type: 'Skill',
    description: 'Focus on ball control and first touch',
    duration: 60,
    intensity: 'medium',
    date: '2025-04-14',
    notes: 'Made good progress on first touch drills'
  },
  {
    id: 'session_002',
    athlete_id: 'athlete_001',
    title: 'Team Training',
    type: 'Team',
    description: 'Focus on tactical positioning and set pieces',
    duration: 90,
    intensity: 'high',
    date: '2025-04-12',
    notes: 'Worked on corner kick routines'
  },
  {
    id: 'session_003',
    athlete_id: 'athlete_001',
    title: 'Strength & Conditioning',
    type: 'Strength',
    description: 'Lower body strength and power',
    duration: 45,
    intensity: 'very_high',
    date: '2025-04-10',
    notes: 'Increased squat weight by 5kg'
  },
  {
    id: 'session_004',
    athlete_id: 'athlete_001',
    title: 'Recovery Session',
    type: 'Recovery',
    description: 'Light jog, stretching, and mobility work',
    duration: 30,
    intensity: 'low',
    date: '2025-04-08',
    notes: 'Focus on hamstring flexibility'
  }
];

// Mock nutrition logs
export const mockNutritionLogs: NutritionLog[] = [
  {
    id: 'nutrition_001',
    athlete_id: 'athlete_001',
    description: 'Scrambled eggs with spinach and whole grain toast',
    meal_type: 'breakfast',
    calories: 450,
    protein: 25,
    carbs: 30,
    fat: 20,
    consumed_at: '2025-04-14T07:30:00Z',
    notes: 'Added avocado for healthy fats'
  },
  {
    id: 'nutrition_002',
    athlete_id: 'athlete_001',
    description: 'Grilled chicken salad with mixed vegetables',
    meal_type: 'lunch',
    calories: 550,
    protein: 35,
    carbs: 25,
    fat: 18,
    consumed_at: '2025-04-14T12:30:00Z'
  },
  {
    id: 'nutrition_003',
    athlete_id: 'athlete_001',
    description: 'Protein shake with banana and almond milk',
    meal_type: 'snack',
    calories: 250,
    protein: 20,
    carbs: 30,
    fat: 5,
    consumed_at: '2025-04-14T16:00:00Z',
    notes: 'Post-training recovery'
  },
  {
    id: 'nutrition_004',
    athlete_id: 'athlete_001',
    description: 'Salmon with sweet potato and broccoli',
    meal_type: 'dinner',
    calories: 650,
    protein: 40,
    carbs: 45,
    fat: 25,
    consumed_at: '2025-04-14T19:30:00Z'
  }
];
