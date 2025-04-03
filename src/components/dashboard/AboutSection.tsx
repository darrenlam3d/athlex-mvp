
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-medium">About Me</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-4">
          I'm a point guard with 5+ years of competitive experience, specializing in ball handling and court vision. 
          Currently playing for the Downtown Eagles, I'm focused on improving my three-point shooting and defensive skills 
          to advance to the collegiate level.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <h4 className="font-medium mb-1">Strengths</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Quick first step and acceleration</li>
              <li>• Exceptional court vision</li>
              <li>• Strong leadership abilities</li>
            </ul>
          </div>
          
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <h4 className="font-medium mb-1">Working On</h4>
            <ul className="text-sm text-gray-400 space-y-1">
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
