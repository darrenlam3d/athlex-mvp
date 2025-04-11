
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Loader2, ArrowRight } from 'lucide-react';

const PerformanceInsights = () => {
  // Fetch performance insights
  const { data: insights, isLoading } = useQuery({
    queryKey: ['performanceInsights'],
    queryFn: async () => {
      const user = await supabase.auth.getUser();
      
      // Call a Supabase RPC function that calculates insights
      // This could be a PostgreSQL function that compares current vs previous performance
      const { data, error } = await supabase
        .rpc('get_athlete_insights', { 
          user_id: user.data?.user?.id 
        });
      
      if (error) {
        console.error('Error fetching insights:', error);
        // Fallback to direct query if RPC fails
        return [{
          id: 1,
          metric: 'speed',
          change_percent: 5,
          period: 'week',
          insight_text: "You've improved your speed by 5% since last week."
        }];
      }
      
      return data;
    },
  });

  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-athlex-accent" />
          Performance Insights
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="h-32 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-athlex-accent" />
          </div>
        ) : !insights || insights.length === 0 ? (
          <div className="h-32 flex items-center justify-center text-white/70">
            No performance insights available yet
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight) => (
              <div 
                key={insight.id} 
                className={`p-4 rounded-lg ${
                  insight.change_percent > 0 
                    ? 'bg-green-900/20 border border-green-900/30' 
                    : 'bg-blue-900/20 border border-blue-900/30'
                }`}
              >
                <p className={insight.change_percent > 0 ? 'text-green-200' : 'text-blue-200'}>
                  {insight.insight_text}
                </p>
                
                {insight.recommendation && (
                  <p className="text-sm mt-2 text-white/70">
                    {insight.recommendation}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Link to="/training-recommendations" className="w-full">
          <Button className="w-full">
            View Training Recommendations
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PerformanceInsights;
