
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Welcome to ATHLEX</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-medium mb-2">By Athletes, For Athletes.</h3>
        <p className="text-gray-400 mb-4">
          ATHLEX is your all-in-one platform designed to help you track your athletic performance, 
          connect with coaches and scouts, and showcase your talent on a global stage.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium">Performance Tracking</h4>
              <p className="text-sm text-gray-400">Track your progress with advanced analytics</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium">Custom Training Plans</h4>
              <p className="text-sm text-gray-400">AI-powered workouts tailored to your goals</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium">Talent Discovery</h4>
              <p className="text-sm text-gray-400">Get noticed by coaches and scouts worldwide</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium">Athlete Community</h4>
              <p className="text-sm text-gray-400">Connect and compete with peers globally</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutSection;
