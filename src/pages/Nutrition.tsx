
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useQuery } from '@tanstack/react-query';
import { supabase, isDemoMode } from '@/lib/supabase';
import { AlertTriangle, Loader2 } from 'lucide-react';
import MealLogList from '@/components/nutrition/MealLogList';
import MealLogForm from '@/components/nutrition/MealLogForm';
import NutritionChatbot from '@/components/nutrition/NutritionChatbot';
import NutritionSummary from '@/components/nutrition/NutritionSummary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Navigate } from 'react-router-dom';

// Mock data for meal logs
const mockMealLogs = [
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

// Mock form fields for creating a new meal log
const mockFormFields = {
  fields: [
    { label: "Meal Type", type: "select", options: ["Breakfast", "Lunch", "Dinner", "Snack"] },
    { label: "Description", type: "text" },
    { label: "Photo Upload", type: "file" },
    { label: "Calories", type: "number" },
    { label: "Protein (g)", type: "number" },
    { label: "Carbohydrates (g)", type: "number" },
    { label: "Fats (g)", type: "number" }
  ]
};

// Mock chatbot interactions
const mockChatbotInteractions = [
  {
    user_input: "I had a protein shake with oats and banana",
    chatbot_response: "Logged: Protein shake with oats and banana (Est. 350 kcal, 25g protein)"
  },
  {
    user_input: "I ate chicken rice for lunch",
    chatbot_response: "Logged: Chicken rice (Est. 650 kcal, 35g protein)"
  }
];

const Nutrition = () => {
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const { userRole } = useUserRole();
  
  // Redirect non-athlete, non-coach users to their dashboard
  if (userRole !== 'athlete' && userRole !== 'coach') {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Fetch meal logs
  const { data: mealLogs, isLoading, error, refetch } = useQuery({
    queryKey: ['mealLogs'],
    queryFn: async () => {
      // If in demo mode, return mock data
      if (isDemoMode()) {
        console.log('Using mock meal logs data');
        return mockMealLogs;
      }
      
      // Otherwise, would fetch from Supabase
      try {
        console.log('Would fetch meal logs from Supabase');
        // In real implementation, this would fetch from Supabase
        return mockMealLogs;
      } catch (err) {
        console.error('Error fetching meal logs:', err);
        throw err;
      }
    },
  });

  const handleMealAdded = () => {
    setIsAddingMeal(false);
    refetch();
    toast.success('Meal logged successfully!');
  };

  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Nutrition Tracker</h1>
                
                {isDemoMode() && (
                  <div className="flex items-center px-4 py-2 bg-yellow-900/30 border border-yellow-600/30 rounded-md text-yellow-200 text-sm">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <span>Demo Mode: Using mock data</span>
                  </div>
                )}
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
                </div>
              ) : error ? (
                <div className="p-4 border border-red-800 bg-red-950/20 rounded-md">
                  <h3 className="text-red-400 text-lg font-medium">Error Loading Meal Logs</h3>
                  <p className="text-red-300 mt-1">
                    {error instanceof Error ? error.message : "There was an error loading your meal logs."}
                  </p>
                </div>
              ) : (
                <>
                  {/* Nutrition Summary */}
                  <div className="mb-8">
                    <NutritionSummary mealLogs={mealLogs || []} />
                  </div>
                  
                  <Tabs defaultValue="logs" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="logs">Meal Logs</TabsTrigger>
                      <TabsTrigger value="chatbot">Quick Log</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="logs" className="space-y-4">
                      {/* Meal Logs List */}
                      <div className="mb-8">
                        <MealLogList 
                          mealLogs={mealLogs || []} 
                          onAddMeal={() => setIsAddingMeal(true)} 
                        />
                      </div>
                      
                      {/* New Meal Log Form */}
                      {isAddingMeal && (
                        <div className="mb-8">
                          <MealLogForm 
                            formFields={mockFormFields.fields} 
                            onSuccess={handleMealAdded} 
                            onCancel={() => setIsAddingMeal(false)} 
                          />
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="chatbot">
                      {/* Nutrition Chatbot */}
                      <div className="mb-8">
                        <NutritionChatbot initialInteractions={mockChatbotInteractions} />
                      </div>
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Nutrition;
