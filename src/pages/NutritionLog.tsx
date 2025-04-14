
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useQuery } from '@tanstack/react-query';
import { isDemoMode } from '@/lib/supabase';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { CalendarIcon, UtensilsCrossed, Apple, Beef } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Types
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

interface DailyNutrition {
  date: string;
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fats: number;
  meals: MealLog[];
}

// Mock data
const mockMealLogs: MealLog[] = [
  {
    meal_id: "meal_001",
    date: "2025-04-11",
    meal_type: "Lunch",
    description: "Grilled chicken breast with brown rice and steamed broccoli",
    photo_url: "https://example.com/uploads/meal1.jpg",
    calories: 520,
    protein_g: 40,
    carbs_g: 45,
    fats_g: 15
  },
  {
    meal_id: "meal_002",
    date: "2025-04-10",
    meal_type: "Breakfast",
    description: "Oatmeal with banana slices and almond butter",
    photo_url: "https://example.com/uploads/meal2.jpg",
    calories: 410,
    protein_g: 12,
    carbs_g: 50,
    fats_g: 12
  },
  {
    meal_id: "meal_003",
    date: "2025-04-09",
    meal_type: "Dinner",
    description: "Salmon with quinoa and asparagus",
    photo_url: "https://example.com/uploads/meal3.jpg",
    calories: 600,
    protein_g: 45,
    carbs_g: 30,
    fats_g: 22
  }
];

const mockNutritionGoals = {
  daily_calories: 2500,
  daily_protein: 150,
  daily_carbs: 250,
  daily_fats: 80
};

const NutritionLog = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [view, setView] = React.useState<"daily" | "monthly" | "summary">("daily");
  
  // Get the selected date as string
  const selectedDateStr = format(date, 'yyyy-MM-dd');
  
  // Fetch meal logs for the selected month
  const { data: allMealLogs, isLoading } = useQuery({
    queryKey: ['nutrition-logs', format(date, 'yyyy-MM')],
    queryFn: async () => {
      // In a real implementation, this would fetch data from Supabase
      if (!isDemoMode()) {
        console.log('Would fetch nutrition logs from Supabase');
      }
      return mockMealLogs;
    }
  });
  
  // Group meals by date to calculate daily totals
  const getDailyNutrition = (): DailyNutrition[] => {
    if (!allMealLogs) return [];
    
    const mealsByDate: Record<string, MealLog[]> = {};
    
    // Group meals by date
    allMealLogs.forEach(meal => {
      if (!mealsByDate[meal.date]) {
        mealsByDate[meal.date] = [];
      }
      mealsByDate[meal.date].push(meal);
    });
    
    // Calculate daily totals
    return Object.entries(mealsByDate).map(([date, meals]) => {
      const dailyTotals = meals.reduce((acc, meal) => {
        return {
          date,
          total_calories: acc.total_calories + meal.calories,
          total_protein: acc.total_protein + meal.protein_g,
          total_carbs: acc.total_carbs + meal.carbs_g,
          total_fats: acc.total_fats + meal.fats_g,
          meals
        };
      }, { 
        date, 
        total_calories: 0, 
        total_protein: 0, 
        total_carbs: 0, 
        total_fats: 0,
        meals: [] as MealLog[]
      });
      
      return dailyTotals;
    });
  };
  
  // Get nutrition for the selected date
  const selectedDayNutrition = getDailyNutrition().find(day => day.date === selectedDateStr) || {
    date: selectedDateStr,
    total_calories: 0,
    total_protein: 0,
    total_carbs: 0,
    total_fats: 0,
    meals: []
  };
  
  // Get all days in the current month for the calendar
  const daysInMonth = React.useMemo(() => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  }, [date]);
  
  // Map nutrition data to days for the calendar
  const nutritionByDay = React.useMemo(() => {
    const dailyNutrition = getDailyNutrition();
    return daysInMonth.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      return dailyNutrition.find(n => n.date === dayStr);
    });
  }, [daysInMonth, allMealLogs]);
  
  // Fetch nutrition goals
  const { data: nutritionGoals } = useQuery({
    queryKey: ['nutrition-goals'],
    queryFn: async () => {
      // In a real implementation, this would fetch data from Supabase
      if (!isDemoMode()) {
        console.log('Would fetch nutrition goals from Supabase');
      }
      return mockNutritionGoals;
    }
  });
  
  // Calculate percentages for progress bars
  const caloriePercentage = nutritionGoals 
    ? Math.min(100, (selectedDayNutrition.total_calories / nutritionGoals.daily_calories) * 100) 
    : 0;
    
  const proteinPercentage = nutritionGoals 
    ? Math.min(100, (selectedDayNutrition.total_protein / nutritionGoals.daily_protein) * 100) 
    : 0;
    
  const carbsPercentage = nutritionGoals 
    ? Math.min(100, (selectedDayNutrition.total_carbs / nutritionGoals.daily_carbs) * 100) 
    : 0;
    
  const fatsPercentage = nutritionGoals 
    ? Math.min(100, (selectedDayNutrition.total_fats / nutritionGoals.daily_fats) * 100) 
    : 0;
  
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold mb-6">Nutrition Log</h1>
              
              <Tabs defaultValue="daily" value={view} onValueChange={(v) => setView(v as any)} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="daily">Daily View</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly View</TabsTrigger>
                  <TabsTrigger value="summary">Nutrition Summary</TabsTrigger>
                </TabsList>
                
                <TabsContent value="daily" className="space-y-6">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    disabled={(date) => date > new Date()}
                    className="bg-athlex-gray-900 border border-athlex-gray-800 rounded-lg p-4"
                  />
                  
                  <div className="mt-6">
                    <h2 className="text-xl font-medium mb-4">Nutrition for {format(date, 'MMMM d, yyyy')}</h2>
                    
                    {/* Nutrition metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <Card className="bg-athlex-gray-900 border-athlex-gray-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <CalendarIcon className="h-5 w-5 mr-2 text-orange-500" />
                            Calories
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between mb-2">
                            <span>{selectedDayNutrition.total_calories} kcal</span>
                            <span className="text-athlex-gray-400">Goal: {nutritionGoals?.daily_calories || 0} kcal</span>
                          </div>
                          <div className="w-full bg-athlex-gray-800 rounded-full h-2.5">
                            <div 
                              className="bg-orange-500 h-2.5 rounded-full" 
                              style={{ width: `${caloriePercentage}%` }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-athlex-gray-900 border-athlex-gray-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <Beef className="h-5 w-5 mr-2 text-red-500" />
                            Protein
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between mb-2">
                            <span>{selectedDayNutrition.total_protein}g</span>
                            <span className="text-athlex-gray-400">Goal: {nutritionGoals?.daily_protein || 0}g</span>
                          </div>
                          <div className="w-full bg-athlex-gray-800 rounded-full h-2.5">
                            <div 
                              className="bg-red-500 h-2.5 rounded-full" 
                              style={{ width: `${proteinPercentage}%` }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-athlex-gray-900 border-athlex-gray-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <Apple className="h-5 w-5 mr-2 text-green-500" />
                            Carbs
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between mb-2">
                            <span>{selectedDayNutrition.total_carbs}g</span>
                            <span className="text-athlex-gray-400">Goal: {nutritionGoals?.daily_carbs || 0}g</span>
                          </div>
                          <div className="w-full bg-athlex-gray-800 rounded-full h-2.5">
                            <div 
                              className="bg-green-500 h-2.5 rounded-full" 
                              style={{ width: `${carbsPercentage}%` }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-athlex-gray-900 border-athlex-gray-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <UtensilsCrossed className="h-5 w-5 mr-2 text-yellow-500" />
                            Fats
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between mb-2">
                            <span>{selectedDayNutrition.total_fats}g</span>
                            <span className="text-athlex-gray-400">Goal: {nutritionGoals?.daily_fats || 0}g</span>
                          </div>
                          <div className="w-full bg-athlex-gray-800 rounded-full h-2.5">
                            <div 
                              className="bg-yellow-500 h-2.5 rounded-full" 
                              style={{ width: `${fatsPercentage}%` }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Meal list */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Meals</h3>
                      
                      {selectedDayNutrition.meals.length > 0 ? (
                        <div className="space-y-4">
                          {selectedDayNutrition.meals.map((meal) => (
                            <Card key={meal.meal_id} className="bg-athlex-gray-900 border-athlex-gray-800">
                              <CardContent className="pt-4">
                                <div className="flex justify-between items-start mb-1">
                                  <h4 className="font-medium">{meal.meal_type}</h4>
                                  <span className="text-athlex-gray-400">{meal.calories} kcal</span>
                                </div>
                                <p className="text-sm text-athlex-gray-400 mb-2">{meal.description}</p>
                                <div className="flex space-x-4 text-xs text-athlex-gray-400">
                                  <span>Protein: {meal.protein_g}g</span>
                                  <span>Carbs: {meal.carbs_g}g</span>
                                  <span>Fats: {meal.fats_g}g</span>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
                          <CardContent className="py-6 text-center">
                            <p className="text-athlex-gray-400">No meals logged for this day</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="monthly" className="space-y-6">
                  {/* Monthly calendar view - Using simplified view since we don't have the extended Calendar components */}
                  <h2 className="text-xl font-medium mb-4">Monthly Nutrition Overview</h2>
                  
                  <Card className="bg-athlex-gray-900 border-athlex-gray-800">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <Button variant="outline" size="sm">
                          Previous Month
                        </Button>
                        <h3 className="text-lg font-medium">{format(date, 'MMMM yyyy')}</h3>
                        <Button variant="outline" size="sm">
                          Next Month
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-7 gap-2 mb-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                          <div key={day} className="text-center text-sm text-gray-400">
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-7 gap-2">
                        {daysInMonth.map((day, i) => {
                          const dayStr = format(day, 'yyyy-MM-dd');
                          const hasData = nutritionByDay.find(n => n?.date === dayStr);
                          
                          return (
                            <Button 
                              key={i} 
                              variant="ghost" 
                              className={`h-12 ${hasData ? 'bg-athlex-accent/20' : ''}`}
                              onClick={() => setDate(day)}
                            >
                              {format(day, 'd')}
                            </Button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="summary" className="space-y-6">
                  {/* Nutrition summary view */}
                  <h2 className="text-xl font-medium mb-4">Nutrition Summary</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-athlex-gray-900 border-athlex-gray-800 col-span-full md:col-span-2">
                      <CardHeader>
                        <CardTitle>Calorie Intake</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                          <p className="text-athlex-gray-400">Calorie chart would display here</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-athlex-gray-900 border-athlex-gray-800 row-span-2">
                      <CardHeader>
                        <CardTitle>Macronutrient Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                          <p className="text-athlex-gray-400">Pie chart would display here</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-athlex-gray-900 border-athlex-gray-800 col-span-full md:col-span-2">
                      <CardHeader>
                        <CardTitle>Protein Intake</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                          <p className="text-athlex-gray-400">Protein chart would display here</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default NutritionLog;
