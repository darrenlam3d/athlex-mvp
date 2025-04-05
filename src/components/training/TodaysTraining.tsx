
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Calendar, Dumbbell } from 'lucide-react';

const TodaysTraining = () => {
  return (
    <Card className="border-gray-700 bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-medium">Today's Training Recommendation</CardTitle>
            <CardDescription className="text-gray-400 mt-1">
              Based on your goals and recent performance
            </CardDescription>
          </div>
          <span className="bg-athlex-accent bg-opacity-20 text-athlex-accent text-xs px-3 py-1 rounded-full">
            Personalized
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-800 rounded-full p-2">
              <Dumbbell className="h-5 w-5 text-athlex-accent" />
            </div>
            <div>
              <h3 className="font-medium">Explosive Ball Handling Circuit</h3>
              <p className="text-sm text-gray-400">Focus: Speed, control, and decision-making</p>
            </div>
          </div>
          
          <div className="relative aspect-video rounded-lg overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1546519638-68e109498ffc" 
              alt="Basketball training drill" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <button className="bg-white/20 hover:bg-white/30 rounded-full p-4 transition-all group-hover:scale-110">
                <Play className="h-8 w-8 text-white" fill="white" />
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Drill Breakdown</h4>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="h-2 w-2 bg-athlex-accent rounded-full mt-2"></span>
                <span className="text-sm flex-1">5 minutes: Warm-up with dynamic stretching</span>
              </li>
              <li className="flex gap-2">
                <span className="h-2 w-2 bg-athlex-accent rounded-full mt-2"></span>
                <span className="text-sm flex-1">10 minutes: Figure-8 dribbling around cones</span>
              </li>
              <li className="flex gap-2">
                <span className="h-2 w-2 bg-athlex-accent rounded-full mt-2"></span>
                <span className="text-sm flex-1">15 minutes: Full-court speed dribbling with pressure</span>
              </li>
              <li className="flex gap-2">
                <span className="h-2 w-2 bg-athlex-accent rounded-full mt-2"></span>
                <span className="text-sm flex-1">10 minutes: Decision-making drills with defenders</span>
              </li>
              <li className="flex gap-2">
                <span className="h-2 w-2 bg-athlex-accent rounded-full mt-2"></span>
                <span className="text-sm flex-1">5 minutes: Cool-down and stretching</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-800/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Why This Matters</h4>
            <p className="text-sm text-gray-300">
              Based on your recent game performances, improved ball-handling under pressure will boost your assists and reduce turnovers. This directly supports your goal of becoming a more effective point guard.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button className="flex-1">
          <Dumbbell className="mr-2 h-4 w-4" />
          Log Training
        </Button>
        <Button variant="outline" className="flex-1">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Later
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TodaysTraining;
