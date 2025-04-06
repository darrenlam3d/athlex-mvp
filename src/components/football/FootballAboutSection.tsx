
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User, CalendarDays, Ruler, Weight } from 'lucide-react';

const FootballAboutSection = () => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">About</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4">
          Central midfielder with strong technical abilities and vision. Looking to develop into an elite playmaker with improved physical attributes. Passionate about tactical development and game intelligence.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-400 block">Age</span>
              <span className="font-medium">23</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-400 block">Height</span>
              <span className="font-medium">180 cm</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Weight className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-400 block">Weight</span>
              <span className="font-medium">74 kg</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-400 block">Position</span>
              <span className="font-medium">CM (Central Midfielder)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FootballAboutSection;
