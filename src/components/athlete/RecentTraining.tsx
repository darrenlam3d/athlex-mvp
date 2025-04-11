
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export interface TrainingSession {
  id: string;
  date: string;
  type: string;
  duration: string;
  coach: string;
  highlights: string;
}

export interface RecentTrainingProps {
  sessions: TrainingSession[];
}

const RecentTraining: React.FC<RecentTrainingProps> = ({ sessions }) => {
  return (
    <Card className="bg-gray-900/60 border-gray-800 mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Recent Training</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.map(session => (
          <div key={session.id} className="border-b border-gray-800 pb-3 last:border-0 last:pb-0">
            <div className="flex justify-between">
              <h4 className="font-medium">{session.type}</h4>
              <span className="text-sm text-gray-400">{new Date(session.date).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-gray-400">Duration: {session.duration} • Coach: {session.coach}</p>
            <p className="text-sm text-athlex-accent mt-1">{session.highlights}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentTraining;
