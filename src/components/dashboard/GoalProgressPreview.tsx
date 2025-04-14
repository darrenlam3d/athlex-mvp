
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Loader2, ArrowUpRight } from 'lucide-react';
import { mockGoals } from '@/lib/mockData';

const GoalProgressPreview = () => {
  // Check if Supabase is configured
  const isConfigured = isSupabaseConfigured();
  
  // Fetch active goals
  const { data: goals, isLoading } = useQuery({
    queryKey: ['performanceGoals'],
    queryFn: async () => {
      // If Supabase is not configured, return mock data
      if (!isConfigured) {
        console.log('Using mock goals data');
        return mockGoals;
      }
      
      // Otherwise, fetch from Supabase (not implemented in demo mode)
      console.log('Would fetch goals from Supabase if configured');
      return mockGoals;
    },
  });

  // Calculate progress percentage
  const calculateProgress = (current, target) => {
    if (current >= target) return 100;
    if (current <= 0 || target <= 0) return 0;
    return Math.round((current / target) * 100);
  };
  
  // Format the remaining time - fixed type issue with Date objects
  const formatRemainingTime = (targetDate) => {
    const now = new Date();
    const target = new Date(targetDate);
    const diffTime = Math.abs(target.getTime() - now.getTime()); // Use getTime() to get numeric value
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-medium text-white flex items-center">
          <Target className="h-5 w-5 mr-2 text-athlex-accent" />
          Goal Progress
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="h-32 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-athlex-accent" />
          </div>
        ) : !goals || goals.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-white/70 mb-2">No active goals found</p>
            <p className="text-sm text-white/50">Set performance goals to track your progress</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal) => {
              const progress = calculateProgress(goal.current_value, goal.target_value);
              
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{goal.title}</h3>
                      <p className="text-sm text-white/60">{goal.metric}</p>
                    </div>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  
                  <Progress value={progress} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">
                      Current: {goal.current_value}
                    </span>
                    <span className="text-white/70">
                      Target: {goal.target_value}
                    </span>
                  </div>
                  
                  <div className="text-xs text-athlex-accent text-right">
                    {formatRemainingTime(goal.end_date)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Link to="/performance-goals" className="w-full">
          <Button variant="outline" className="w-full border-athlex-gray-700">
            Manage Goals
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GoalProgressPreview;
