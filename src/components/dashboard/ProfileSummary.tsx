
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const ProfileSummary = () => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">Profile</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21" alt="Athlete" />
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>
          
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold">Alex Thompson</h3>
            <CheckCircle className="h-5 w-5 text-blue-400" />
          </div>
          
          <div className="flex items-center gap-1 mb-4">
            <Badge variant="secondary" className="text-xs">Verified Athlete</Badge>
          </div>
          
          <p className="text-gray-400 text-sm mb-4">Basketball · Point Guard</p>
          
          <div className="grid grid-cols-2 gap-4 w-full mb-4">
            <div className="flex flex-col items-center p-2 bg-gray-800 rounded-lg">
              <span className="text-gray-400 text-xs mb-1">Ranking</span>
              <span className="font-bold text-lg">#24</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-800 rounded-lg">
              <span className="text-gray-400 text-xs mb-1">Avg Score</span>
              <span className="font-bold text-lg">8.7</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Edit Profile</Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileSummary;
