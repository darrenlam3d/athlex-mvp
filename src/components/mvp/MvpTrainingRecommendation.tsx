
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const MvpTrainingRecommendation = () => {
  return (
    <Card className="bg-gray-900/60 border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>AI Training Recommendation</CardTitle>
          <Badge className="bg-athlex-accent/80">New</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Improve Ball Control & First Touch</h3>
          <p className="text-sm text-gray-400">
            Based on your recent performance metrics, we recommend focusing on improving your ball control and first touch skills
            to enhance your passing accuracy and possession retention.
          </p>
          
          <div className="relative aspect-video rounded-lg overflow-hidden my-4 group">
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
              Advanced Ball Control Drill - 15 min
            </div>
          </div>
          
          <div className="bg-athlex-accent/10 border border-athlex-accent/20 rounded-lg p-4">
            <h4 className="font-medium mb-2">Recommended Training Focus</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-athlex-accent rounded-full mr-2"></span>
                <span className="text-sm">30 minutes of first-touch practice drills</span>
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-athlex-accent rounded-full mr-2"></span>
                <span className="text-sm">Cone work for close control improvement</span>
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-athlex-accent rounded-full mr-2"></span>
                <span className="text-sm">Wall-pass repetitions for accuracy development</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MvpTrainingRecommendation;
