
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TrainingRecommendations = () => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-medium">AI Training Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="training" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/60">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="training">Training & Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-4">
            <p className="text-gray-300">
              Your daily AI-driven training recommendations will appear here based on your performance data.
            </p>
          </TabsContent>
          
          <TabsContent value="training" className="pt-4">
            <h3 className="text-lg font-medium mb-1">Today's Focus: Ball Handling</h3>
            <p className="text-gray-400 text-sm mb-4">
              Based on your recent performance data, we recommend focusing on improving your ball control and dribbling skills.
            </p>
            
            <div className="relative aspect-video rounded-lg overflow-hidden mb-4 group">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
                alt="Training drill" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <button className="bg-white/20 hover:bg-white/30 rounded-full p-4 transition-all group-hover:scale-110">
                  <Play className="h-8 w-8 text-white" fill="white" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-sm">
                Advanced Ball Handling Drill - 12 min
              </div>
            </div>
            
            <ul className="space-y-2 mb-2">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-sm">3 sets of crossover drills</span>
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-sm">Figure-8 dribbling practice</span>
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-sm">Speed dribbling with cones</span>
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Log Training</Button>
      </CardFooter>
    </Card>
  );
};

export default TrainingRecommendations;
