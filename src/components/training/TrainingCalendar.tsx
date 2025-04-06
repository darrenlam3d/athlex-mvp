
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TrainingCalendar = () => {
  // Sample training data for the month
  const trainingSessions = [
    { date: '2025-04-01', type: 'Technical', completed: true },
    { date: '2025-04-03', type: 'Sprint Work', completed: true },
    { date: '2025-04-05', type: 'Tactical', completed: true },
    { date: '2025-04-08', type: 'Team Training', completed: false },
    { date: '2025-04-10', type: 'Ball Control', completed: false },
    { date: '2025-04-12', type: 'Match', completed: false },
    { date: '2025-04-15', type: 'Recovery', completed: false },
  ];

  // Generate calendar days for April 2025
  const renderCalendarDays = () => {
    // This is a simplified calendar view for demonstration
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Day name headers
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`header-${i}`} className="text-center text-xs text-gray-400 font-medium py-2">
          {dayNames[i]}
        </div>
      );
    }
    
    // First week may have empty days
    for (let i = 0; i < 2; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-2 border border-transparent"></div>
      );
    }
    
    // Days of the month (April 2025 starts on a Tuesday)
    for (let day = 1; day <= 30; day++) {
      const date = `2025-04-${day.toString().padStart(2, '0')}`;
      const session = trainingSessions.find(s => s.date === date);
      
      days.push(
        <div 
          key={day} 
          className={`p-2 border ${session ? 'border-athlex-accent/30' : 'border-gray-700/30'} rounded-md text-center relative`}
        >
          <div className="text-sm">{day}</div>
          {session && (
            <div className={`mt-1 text-xs px-1 py-0.5 rounded ${
              session.completed 
                ? 'bg-green-900/30 text-green-400' 
                : 'bg-athlex-accent/20 text-athlex-accent'
            }`}>
              {session.type}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <Card className="border-gray-700 bg-card text-card-foreground">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-medium">Training Calendar</CardTitle>
            <CardDescription className="text-gray-400 mt-1">
              Your logged and upcoming sessions
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">April 2025</span>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {renderCalendarDays()}
        </div>
        
        <div className="mt-4 flex items-center justify-between bg-gray-800/30 p-3 rounded-lg">
          <div>
            <h4 className="font-medium">Training Consistency</h4>
            <p className="text-sm text-gray-400">April: 3 out of 7 planned sessions completed</p>
          </div>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            Add Session
          </Button>
        </div>
        
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="text-athlex-accent text-xl font-bold">43%</div>
            <div className="text-xs text-gray-400 mt-1">Completion Rate</div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="text-xl font-bold">3</div>
            <div className="text-xs text-gray-400 mt-1">Days This Week</div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="text-xl font-bold">12</div>
            <div className="text-xs text-gray-400 mt-1">Days This Month</div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="text-xl font-bold">4hr</div>
            <div className="text-xs text-gray-400 mt-1">Avg. Weekly Time</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingCalendar;
