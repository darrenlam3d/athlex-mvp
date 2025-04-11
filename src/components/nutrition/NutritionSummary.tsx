
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Utensils, Apple, Beef, Wheat } from 'lucide-react';

interface MealLog {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
  date: string;
}

interface NutritionSummaryProps {
  mealLogs: MealLog[];
}

const NutritionSummary: React.FC<NutritionSummaryProps> = ({ mealLogs }) => {
  // Filter meals for today only
  const today = new Date().toISOString().split('T')[0];
  const todayMeals = mealLogs.filter(meal => meal.date === today);
  
  // Calculate totals
  const totalCalories = todayMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = todayMeals.reduce((sum, meal) => sum + meal.protein_g, 0);
  const totalCarbs = todayMeals.reduce((sum, meal) => sum + meal.carbs_g, 0);
  const totalFats = todayMeals.reduce((sum, meal) => sum + meal.fats_g, 0);
  
  // Daily targets (example values)
  const calorieTarget = 2500;
  const proteinTarget = 150;
  const carbsTarget = 300;
  const fatsTarget = 80;
  
  // Calculate percentages
  const caloriePercentage = Math.min(Math.round((totalCalories / calorieTarget) * 100), 100);
  const proteinPercentage = Math.min(Math.round((totalProtein / proteinTarget) * 100), 100);
  const carbsPercentage = Math.min(Math.round((totalCarbs / carbsTarget) * 100), 100);
  const fatsPercentage = Math.min(Math.round((totalFats / fatsTarget) * 100), 100);
  
  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">Today's Nutrition</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-athlex-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-athlex-accent/20 flex items-center justify-center text-athlex-accent">
                <Utensils size={16} />
              </div>
              <div>
                <p className="text-sm text-athlex-gray-400">Calories</p>
                <p className="text-lg font-semibold">{totalCalories} / {calorieTarget}</p>
              </div>
            </div>
            <Progress value={caloriePercentage} className="h-2 mt-2" />
          </div>
          
          <div className="bg-athlex-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Beef size={16} />
              </div>
              <div>
                <p className="text-sm text-athlex-gray-400">Protein</p>
                <p className="text-lg font-semibold">{totalProtein}g / {proteinTarget}g</p>
              </div>
            </div>
            <Progress value={proteinPercentage} className="h-2 mt-2 bg-athlex-gray-700" indicatorClassName="bg-blue-500" />
          </div>
          
          <div className="bg-athlex-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                <Wheat size={16} />
              </div>
              <div>
                <p className="text-sm text-athlex-gray-400">Carbs</p>
                <p className="text-lg font-semibold">{totalCarbs}g / {carbsTarget}g</p>
              </div>
            </div>
            <Progress value={carbsPercentage} className="h-2 mt-2 bg-athlex-gray-700" indicatorClassName="bg-green-500" />
          </div>
          
          <div className="bg-athlex-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                <Apple size={16} />
              </div>
              <div>
                <p className="text-sm text-athlex-gray-400">Fats</p>
                <p className="text-lg font-semibold">{totalFats}g / {fatsTarget}g</p>
              </div>
            </div>
            <Progress value={fatsPercentage} className="h-2 mt-2 bg-athlex-gray-700" indicatorClassName="bg-yellow-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionSummary;
