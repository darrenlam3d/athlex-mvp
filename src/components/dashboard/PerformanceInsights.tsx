import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Loader2, ArrowRight } from 'lucide-react';
import { mockInsights } from '@/lib/mockData';

const PerformanceInsights = () => {
  // Check if Supabase is configured
  const isConfigured = isSupabaseConfigured();
  
  // Fetch performance insights
  const { data: insights, isLoading } = useQuery({
    queryKey: ['performanceInsights'],
    queryFn: async () => {
      // If Supabase is not configured, return mock data
      if (!isConfigured) {
        console.log('Using mock insight data');
        return mockInsights;
      }
      
      // Otherwise, fetch from Supabase (not implemented in demo mode)
      console.log('Would fetch insights from Supabase if configured');
      return mockInsights;
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
