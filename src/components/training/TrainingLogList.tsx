
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Map, Activity, ClipboardList } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export interface TrainingLog {
  id: string;
  date: string;
  type: string;
  activity: string;
  duration_minutes: number;
  distance_km: number | null;
  intensity_level: string;
  notes?: string;
}

export interface TrainingLogListProps {
  trainingLogs: TrainingLog[];
  isLoading: boolean;
}

const TrainingLogList: React.FC<TrainingLogListProps> = ({ trainingLogs, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-athlex-gray-900 border-athlex-gray-800">
            <CardContent className="p-6">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-5 w-40" />
                <div className="flex gap-4 mt-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!trainingLogs || trainingLogs.length === 0) {
    return (
      <div className="bg-athlex-gray-900 border border-athlex-gray-800 rounded-lg p-10 text-center">
        <ClipboardList className="h-12 w-12 mx-auto text-gray-500 mb-3" />
        <h3 className="text-xl font-medium mb-2">No training logs yet</h3>
        <p className="text-gray-400 mb-5">
          Start tracking your training sessions to see your progress
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {trainingLogs.map((log) => (
        <Card key={log.id} className="bg-athlex-gray-900 border-athlex-gray-800 hover:border-athlex-gray-700 transition-colors">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">
                    {new Date(log.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                
                <h3 className="text-lg font-medium">{log.activity}</h3>
                
                <Badge
                  variant={log.type === 'Physical' ? 'default' : 'secondary'}
                  className="mr-2"
                >
                  {log.type}
                </Badge>
                
                <Badge
                  variant={
                    log.intensity_level === 'High'
                      ? 'destructive'
                      : log.intensity_level === 'Medium'
                      ? 'default'
                      : 'outline'
                  }
                >
                  {log.intensity_level} Intensity
                </Badge>
              </div>
              
              <div className="flex flex-row sm:flex-col gap-3 sm:text-right">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">
                    <span className="font-medium">{log.duration_minutes}</span> minutes
                  </span>
                </div>
                
                {log.distance_km && (
                  <div className="flex items-center gap-1.5">
                    <Map className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      <span className="font-medium">{log.distance_km.toFixed(1)}</span> km
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TrainingLogList;
