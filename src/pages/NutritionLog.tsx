
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AlertTriangle, Search, Calendar, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUserRole } from '@/contexts/UserRoleContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import CoachLayout from '@/layouts/CoachLayout';
import NutritionSummary from '@/components/nutrition/NutritionSummary';
import { Navigate } from 'react-router-dom';

// Define types for our data
interface Athlete {
  id: string;
  name: string;
  sport: string;
}

interface MealLog {
  meal_id: string;
  date: string;
  meal_type: string;
  description: string;
  photo_url?: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
}

interface NutritionSummaryData {
  calories_7d: number;
  avg_protein: number;
  avg_carbs: number;
  avg_fats: number;
  daily_totals: {
    date: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  }[];
}

// Mock data for athletes in a coach's approved list
const mockAssignedAthletes: Athlete[] = [
  { id: 'athlete_001', name: 'Lena Koh', sport: 'Football' },
  { id: 'athlete_002', name: 'Marcus Johnson', sport: 'Basketball' },
  { id: 'athlete_003', name: 'Jamal Williams', sport: 'Track & Field' },
  { id: 'athlete_004', name: 'Sofia Chen', sport: 'Swimming' }
];

// Mock data for meal logs
const mockMealLogs: MealLog[] = [
  {
    meal_id: "meal_001",
    date: "2025-04-10",
    meal_type: "Lunch",
    description: "Grilled salmon with quinoa and spinach",
    photo_url: "https://example.com/uploads/meal1.jpg",
    calories: 600,
    protein_g: 45,
    carbs_g: 40,
    fats_g: 22
  },
  {
    meal_id: "meal_002",
    date: "2025-04-11",
    meal_type: "Breakfast",
    description: "Oatmeal with banana and almond butter",
    photo_url: "https://example.com/uploads/meal2.jpg",
    calories: 420,
    protein_g: 15,
    carbs_g: 50,
    fats_g: 12
  },
  {
    meal_id: "meal_003",
    date: "2025-04-11",
    meal_type: "Dinner",
    description: "Chicken stir-fry with brown rice and vegetables",
    photo_url: "https://example.com/uploads/meal3.jpg",
    calories: 550,
    protein_g: 40,
    carbs_g: 45,
    fats_g: 15
  },
  {
    meal_id: "meal_004",
    date: "2025-04-12",
    meal_type: "Snack",
    description: "Protein shake with berries",
    photo_url: "https://example.com/uploads/meal4.jpg",
    calories: 280,
    protein_g: 25,
    carbs_g: 20,
    fats_g: 8
  }
];

// Mock nutritional summary data
const mockNutritionSummary: NutritionSummaryData = {
  calories_7d: 4250,
  avg_protein: 35,
  avg_carbs: 45,
  avg_fats: 18,
  daily_totals: [
    { date: '2025-04-06', calories: 550, protein: 30, carbs: 42, fats: 16 },
    { date: '2025-04-07', calories: 620, protein: 35, carbs: 48, fats: 19 },
    { date: '2025-04-08', calories: 580, protein: 32, carbs: 45, fats: 17 },
    { date: '2025-04-09', calories: 600, protein: 34, carbs: 46, fats: 18 },
    { date: '2025-04-10', calories: 630, protein: 36, carbs: 49, fats: 20 },
    { date: '2025-04-11', calories: 590, protein: 33, carbs: 47, fats: 18 },
    { date: '2025-04-12', calories: 680, protein: 38, carbs: 52, fats: 22 }
  ]
};

const NutritionLog = () => {
  const { userRole } = useUserRole();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedAthleteId, setSelectedAthleteId] = useState('');
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [selectedMealDesc, setSelectedMealDesc] = useState('');
  const [hasPermission, setHasPermission] = useState(true);
  
  // Check URL params for pre-selected athlete
  useEffect(() => {
    const athleteId = searchParams.get('athlete');
    if (athleteId) {
      setSelectedAthleteId(athleteId);
    }
  }, [searchParams]);
  
  // For non-coach users - Instead of immediately redirecting, we'll first check and render conditionally
  if (userRole !== 'coach') {
    // Show a toast notification and return the Navigate component 
    // This fixes the immediate redirect issue
    toast.error("Only coaches can access nutrition logs");
    return <Navigate to="/dashboard" replace />;
  }
  
  // Check if Supabase is configured
  const isConfigured = isSupabaseConfigured();
  
  // Fetch assigned athletes
  const { 
    data: assignedAthletes, 
    isLoading: loadingAthletes
  } = useQuery({
    queryKey: ['assignedAthletes'],
    queryFn: async () => {
      // If Supabase is not configured, return mock data
      if (!isConfigured) {
        console.log('Using mock assigned athletes data');
        return mockAssignedAthletes;
      }
      
      // Otherwise, fetch from Supabase
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        throw new Error('User not authenticated');
      }
      
      const { data, error } = await supabase
        .from('coach_assignments')
        .select('athlete_id, athletes(*)')
        .eq('coach_id', user.user.id);
      
      if (error) throw error;
      
      // Format data to match our structure - this is where the error was happening
      // We need to ensure we're extracting values properly from each assignment item
      return data.map((assignment: any) => ({
        id: assignment.athlete_id,
        name: assignment.athletes?.name || 'Unknown Athlete',
        sport: assignment.athletes?.sport || 'Unknown Sport'
      }));
    },
  });
  
  // Fetch meal logs for selected athlete
  const { 
    data: mealLogs, 
    isLoading: loadingMealLogs,
    refetch: refetchMealLogs
  } = useQuery({
    queryKey: ['mealLogs', selectedAthleteId],
    queryFn: async () => {
      if (!selectedAthleteId) return [];
      
      // If Supabase is not configured, return mock data
      if (!isConfigured) {
        console.log('Using mock meal logs data');
        return mockMealLogs;
      }
      
      // Otherwise, fetch from Supabase
      const { data, error } = await supabase
        .from('meal_logs')
        .select('*')
        .eq('user_id', selectedAthleteId)
        .order('date', { ascending: false });
      
      if (error) {
        // Check if this is a permissions error
        if (error.code === 'PGRST116' || error.message.includes('permission')) {
          setHasPermission(false);
          return [];
        }
        throw error;
      }
      
      setHasPermission(true);
      return data || [];
    },
    enabled: !!selectedAthleteId,
  });
  
  // Handle athlete selection
  const handleAthleteChange = (athleteId: string) => {
    setSelectedAthleteId(athleteId);
    refetchMealLogs();
  };
  
  // Request access to athlete's nutrition data
  const requestAccess = () => {
    toast.success("Access request sent to athlete");
    // In a real implementation, this would send a notification to the athlete
  };
  
  // Image preview handler
  const openImagePreview = (url: string, description: string) => {
    setSelectedImageUrl(url);
    setSelectedMealDesc(description);
  };
  
  return (
    <CoachLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Athlete Nutrition Log</h1>
          
          {!isConfigured && (
            <div className="flex items-center px-4 py-2 bg-yellow-900/30 border border-yellow-600/30 rounded-md text-yellow-200 text-sm">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span>Demo Mode: Using mock data</span>
            </div>
          )}
        </div>
        
        {/* Athlete selector */}
        <Card className="mb-6 bg-athlex-gray-900 border-athlex-gray-800">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="text-sm font-medium mb-2 block text-gray-300">
                  Select Athlete
                </label>
                <Select onValueChange={handleAthleteChange} value={selectedAthleteId}>
                  <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                    <SelectValue placeholder="Select an athlete" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingAthletes ? (
                      <div className="flex items-center justify-center py-2">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span>Loading athletes...</span>
                      </div>
                    ) : (
                      assignedAthletes?.map((athlete) => (
                        <SelectItem key={athlete.id} value={athlete.id}>
                          {athlete.name} - {athlete.sport}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-1/2">
                <label className="text-sm font-medium mb-2 block text-gray-300">
                  Date Range
                </label>
                <Button variant="outline" className="w-full justify-start bg-athlex-gray-800 border-athlex-gray-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Last 7 days</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {selectedAthleteId ? (
          hasPermission ? (
            <>
              {/* Nutrition Summary */}
              <div className="mb-6">
                <NutritionSummary 
                  mealLogs={mealLogs || []} 
                  customSummary={mockNutritionSummary} 
                />
              </div>
              
              {/* Meal Logs Table */}
              <Card className="mb-6 bg-athlex-gray-900 border-athlex-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle>Meal History</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingMealLogs ? (
                    <div className="flex justify-center items-center h-48">
                      <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
                    </div>
                  ) : mealLogs && mealLogs.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Meal Type</TableHead>
                            <TableHead className="hidden md:table-cell">Description</TableHead>
                            <TableHead>Calories</TableHead>
                            <TableHead className="hidden md:table-cell">Protein</TableHead>
                            <TableHead className="hidden md:table-cell">Carbs</TableHead>
                            <TableHead className="hidden md:table-cell">Fats</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mealLogs.map((meal) => (
                            <TableRow key={meal.meal_id}>
                              <TableCell className="font-medium">
                                {new Date(meal.date).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-athlex-gray-800">
                                  {meal.meal_type}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell max-w-xs truncate">
                                {meal.description}
                              </TableCell>
                              <TableCell>{meal.calories} kcal</TableCell>
                              <TableCell className="hidden md:table-cell">{meal.protein_g}g</TableCell>
                              <TableCell className="hidden md:table-cell">{meal.carbs_g}g</TableCell>
                              <TableCell className="hidden md:table-cell">{meal.fats_g}g</TableCell>
                              <TableCell>
                                {meal.photo_url && (
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => openImagePreview(meal.photo_url || '', meal.description)}
                                      >
                                        View
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                      <DialogHeader>
                                        <DialogTitle>{meal.meal_type} - {new Date(meal.date).toLocaleDateString()}</DialogTitle>
                                      </DialogHeader>
                                      <div className="mt-4">
                                        <img 
                                          src={meal.photo_url} 
                                          alt={meal.description} 
                                          className="w-full rounded-md object-cover"
                                        />
                                        <p className="mt-4 text-sm text-gray-300">{meal.description}</p>
                                        <div className="mt-4 grid grid-cols-4 gap-4 text-center">
                                          <div>
                                            <p className="font-bold">{meal.calories}</p>
                                            <p className="text-xs text-gray-400">kcal</p>
                                          </div>
                                          <div>
                                            <p className="font-bold">{meal.protein_g}g</p>
                                            <p className="text-xs text-gray-400">Protein</p>
                                          </div>
                                          <div>
                                            <p className="font-bold">{meal.carbs_g}g</p>
                                            <p className="text-xs text-gray-400">Carbs</p>
                                          </div>
                                          <div>
                                            <p className="font-bold">{meal.fats_g}g</p>
                                            <p className="text-xs text-gray-400">Fats</p>
                                          </div>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-lg text-gray-400">No meal logs found for this athlete.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="bg-athlex-gray-900 border-athlex-gray-800">
              <CardContent className="py-12 text-center">
                <AlertTriangle className="h-12 w-12 mx-auto text-yellow-400 mb-4" />
                <h3 className="text-xl font-medium mb-2">Access Required</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  You don't have permission to view this athlete's nutrition logs. Request access to view their meal history.
                </p>
                <Button onClick={requestAccess} className="bg-athlex-accent hover:bg-athlex-accent/90">
                  Request Access
                </Button>
              </CardContent>
            </Card>
          )
        ) : (
          <Card className="bg-athlex-gray-900 border-athlex-gray-800">
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 mx-auto text-gray-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">Select an Athlete</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Choose an athlete from the dropdown above to view their nutrition logs and meal history.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </CoachLayout>
  );
};

export default NutritionLog;
