
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CalendarClock, ClipboardList } from 'lucide-react';
import { mockTodaysTraining } from '@/lib/mockData';

const TodaysTraining = () => {
  // Get today's date in ISO format
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split('T')[0];
  
  // Check if Supabase is configured
  const isConfigured = isSupabaseConfigured();
  
  // Fetch today's training session
  const { data: session, isLoading } = useQuery({
    queryKey: ['todaysTraining'],
    queryFn: async () => {
      // If Supabase is not configured, return mock data
      if (!isConfigured) {
        console.log('Using mock training session data');
        return mockTodaysTraining;
      }
      
      // Otherwise, fetch from Supabase
      const user = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('training_sessions')
        .select('id, title, type, duration, start_time, assigned_by')
        .eq('user_id', user.data?.user?.id)
        .eq('date', todayStr)
        .order('start_time', { ascending: true })
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex items-center">
          <CalendarClock className="h-5 w-5 mr-2 text-athlex-accent" />
          Today's Training
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="h-32 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-athlex-accent" />
          </div>
        ) : session ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{session.title}</h3>
              <div className="flex justify-between mt-1 text-sm text-gray-400">
                <span>{session.type}</span>
                <span>{session.duration} min</span>
              </div>
              
              {session.start_time && (
                <div className="mt-2 p-2 bg-athlex-gray-800 rounded-md text-center">
                  <span className="text-sm">
                    Scheduled for {new Date(session.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              )}
              
              {session.assigned_by && (
                <div className="mt-2 text-xs text-athlex-accent">
                  Assigned by: {session.assigned_by}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-32 flex flex-col items-center justify-center">
            <p className="text-white/70 mb-2">No training scheduled for today</p>
            <p className="text-sm text-white/50">Use your free time to focus on recovery</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Link to="/training-log" className="w-full">
          <Button variant="outline" className="w-full border-athlex-gray-700">
            <ClipboardList className="h-4 w-4 mr-2" />
            {session ? "View Details" : "Log New Session"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TodaysTraining;
