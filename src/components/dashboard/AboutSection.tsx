
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
          Hi, I'm Alex. I've been playing basketball for 8 years and specialize as a fast-paced point guard. 
          I'm known for my quick first step and exceptional court vision. Currently playing for the Downtown 
          Eagles, I'm focused on improving my three-point shooting and defensive skills to advance to the 
          collegiate level. Off the court, I enjoy strategy games and sports analytics.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <h4 className="font-medium mb-1">Strengths</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Quick first step and acceleration</li>
              <li>• Exceptional court vision</li>
              <li>• Strong leadership abilities</li>
            </ul>
          </div>
          
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <h4 className="font-medium mb-1">Working On</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Three-point shooting consistency</li>
              <li>• On-ball defensive pressure</li>
              <li>• Left-hand finishing at the rim</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutSection;
