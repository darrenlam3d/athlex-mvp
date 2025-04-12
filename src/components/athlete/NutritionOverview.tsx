
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Utensils, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface Meal {
  meal_id: string;
  athlete_id: string;
  date: string;
  meal_type: string;
  description: string;
  photo_url?: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
}

interface NutritionOverviewProps {
  athleteId: string;
  recentMeals?: Meal[];
}

const NutritionOverview: React.FC<NutritionOverviewProps> = ({ athleteId, recentMeals = [] }) => {
  const navigate = useNavigate();
  
  // Mock data for preview if no real data is available
  const mockMeals: Meal[] = [
    {
      meal_id: "meal1",
      athlete_id: athleteId,
      date: "2025-04-11T08:30:00",
      meal_type: "Breakfast",
      description: "Oatmeal with banana and protein shake",
      calories: 420,
      protein_g: 28,
      carbs_g: 64,
      fats_g: 9
    },
    {
      meal_id: "meal2",
      athlete_id: athleteId,
      date: "2025-04-11T13:00:00",
      meal_type: "Lunch",
      description: "Chicken salad with quinoa and vegetables",
      calories: 550,
      protein_g: 42,
      carbs_g: 48,
      fats_g: 18
    },
    {
      meal_id: "meal3",
      athlete_id: athleteId,
      date: "2025-04-10T19:00:00",
      meal_type: "Dinner",
      description: "Salmon with sweet potatoes and broccoli",
      calories: 620,
      protein_g: 38,
      carbs_g: 52,
      fats_g: 25
    }
  ];
  
  // Use mockMeals if no real meals are provided
  const meals = recentMeals.length > 0 ? recentMeals : mockMeals;
  const displayMeals = meals.slice(0, 3); // Show only 3 most recent meals
  
  const handleViewFullLog = () => {
    navigate(`/nutrition?athlete_id=${athleteId}`);
  };
  
  const formatMealDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM d, h:mm a');
  };

  return (
    <Card className="bg-gray-900/60 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Nutrition Overview</CardTitle>
        <Button variant="outline" onClick={handleViewFullLog}>
          View Full Log <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {displayMeals.length === 0 ? (
          <div className="text-center py-6">
            <Utensils className="h-12 w-12 mx-auto text-gray-500 mb-3" />
            <p className="text-gray-400">No meal logs found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayMeals.map((meal) => (
              <div key={meal.meal_id} className="p-4 rounded-lg bg-gray-800/70 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  {meal.photo_url && (
                    <div className="w-16 h-16 rounded-md bg-gray-700 overflow-hidden">
                      <img 
                        src={meal.photo_url} 
                        alt={meal.description} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-2 py-0.5 text-xs font-medium bg-athlex-accent/20 text-athlex-accent rounded">
                        {meal.meal_type}
                      </span>
                      <span className="text-sm text-gray-400">
                        {formatMealDate(meal.date)}
                      </span>
                    </div>
                    <p className="mt-1 font-medium">{meal.description}</p>
                    <div className="mt-2 flex gap-3 text-sm">
                      <div>
                        <span className="font-semibold text-athlex-accent">{meal.calories}</span>
                        <span className="text-xs text-gray-400 ml-1">kcal</span>
                      </div>
                      <div>
                        <span className="font-semibold text-blue-400">{meal.protein_g}g</span>
                        <span className="text-xs text-gray-400 ml-1">protein</span>
                      </div>
                      <div>
                        <span className="font-semibold text-green-400">{meal.carbs_g}g</span>
                        <span className="text-xs text-gray-400 ml-1">carbs</span>
                      </div>
                      <div>
                        <span className="font-semibold text-yellow-400">{meal.fats_g}g</span>
                        <span className="text-xs text-gray-400 ml-1">fats</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NutritionOverview;
