
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">About Me</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-200">
          Hi, I'm Alex. I've been playing football for 8 years and specialize as a central midfielder. 
          I'm known for my passing range and exceptional vision. Currently playing for Central City FC, 
          I'm focused on improving my aerial ability and shooting from distance to advance to the 
          professional level. Off the pitch, I enjoy strategy games and sports analytics.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <h4 className="font-medium mb-1">Strengths</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Strong passing range</li>
              <li>• Exceptional vision</li>
              <li>• High work rate</li>
            </ul>
          </div>
          
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <h4 className="font-medium mb-1">Working On</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Aerial ability</li>
              <li>• Shooting from distance</li>
              <li>• Defensive positioning</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutSection;
