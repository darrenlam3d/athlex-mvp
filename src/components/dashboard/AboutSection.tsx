
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useProfile } from '@/contexts/ProfileContext';

const AboutSection = () => {
  const { profileData } = useProfile();

  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">About Me</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-200">
          {profileData.bio}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <h4 className="font-medium mb-1">Strengths</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              {profileData.strengths?.map((strength, index) => (
                <li key={index}>• {strength}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <h4 className="font-medium mb-1">Working On</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              {profileData.developmentGoals?.map((goal, index) => (
                <li key={index}>• {goal}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutSection;
