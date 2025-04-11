
export const mockAthleteData = {
  id: '1',
  name: 'James Wilson',
  sport: 'Football',
  position: 'Midfielder',
  tacticalRole: 'Box-to-Box',
  school: 'Manchester Academy',
  club: 'Manchester City Youth',
  image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2076',
  height: '183 cm',
  weight: '76 kg',
  dominant_foot: 'Right',
  date_of_birth: '2001-05-15',
  nationality: 'England',
  bio: 'Highly technical midfielder with exceptional field vision and passing abilities. Works hard in both attack and defense phases.',
  connection_status: 'not_connected',
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

export const getAthleteById = async (id: string, supabaseConfigured: boolean, supabase: any) => {
  if (!supabaseConfigured) {
    // Return mock data in demo mode
    return mockAthleteData;
  }
  
  // In a real app, we would fetch the actual athlete data from Supabase
  const { data, error } = await supabase
    .from('athletes')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data || mockAthleteData;
};
