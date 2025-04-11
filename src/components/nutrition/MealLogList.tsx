
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Utensils } from 'lucide-react';
import { formatDistance } from 'date-fns';

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

interface MealLogListProps {
  mealLogs: MealLog[];
  onAddMeal: () => void;
}

const MealLogList: React.FC<MealLogListProps> = ({ mealLogs, onAddMeal }) => {
  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Recent Meals</CardTitle>
          <Button onClick={onAddMeal} className="bg-athlex-accent hover:bg-athlex-accent/90">
            <Plus className="mr-2 h-4 w-4" />
            Log Meal
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {mealLogs.length === 0 ? (
          <div className="text-center py-8">
            <Utensils className="h-12 w-12 mx-auto text-athlex-gray-600 mb-3" />
            <h3 className="text-lg font-medium text-athlex-gray-400">No meal logs yet</h3>
            <p className="text-athlex-gray-500 mt-1 mb-4">Track your nutrition by logging your meals</p>
            <Button onClick={onAddMeal} variant="outline" className="border-athlex-accent text-athlex-accent hover:bg-athlex-accent/10">
              Add Your First Meal
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {mealLogs.map((meal) => (
              <div key={meal.meal_id} className="p-4 rounded-lg bg-athlex-gray-800 border border-athlex-gray-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-athlex-gray-700 mb-2">
                      {meal.meal_type}
                    </span>
                    <h3 className="font-medium">{meal.description}</h3>
                    <p className="text-sm text-athlex-gray-400">
                      {formatDistance(new Date(meal.date), new Date(), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="text-center">
                      <span className="block font-semibold text-athlex-accent">{meal.calories}</span>
                      <span className="text-xs text-athlex-gray-400">kcal</span>
                    </div>
                    <div className="text-center">
                      <span className="block font-semibold text-blue-400">{meal.protein_g}g</span>
                      <span className="text-xs text-athlex-gray-400">Protein</span>
                    </div>
                    <div className="text-center">
                      <span className="block font-semibold text-green-400">{meal.carbs_g}g</span>
                      <span className="text-xs text-athlex-gray-400">Carbs</span>
                    </div>
                    <div className="text-center">
                      <span className="block font-semibold text-yellow-400">{meal.fats_g}g</span>
                      <span className="text-xs text-athlex-gray-400">Fats</span>
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

export default MealLogList;
