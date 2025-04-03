
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, Medal, Award, Flag } from 'lucide-react';

const CommunityUpdates = () => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Community & Updates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium flex items-center mb-2">
            <Medal className="h-5 w-5 mr-2 text-yellow-500" />
            Personal Achievements
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-purple-900/50 h-10 w-10 rounded-full flex items-center justify-center">
                <Award className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="font-medium">New Personal Record!</p>
                <p className="text-sm text-gray-400">You improved your free throw accuracy to 87%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-blue-900/50 h-10 w-10 rounded-full flex items-center justify-center">
                <Award className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="font-medium">Skills Improvement</p>
                <p className="text-sm text-gray-400">Your defensive rating increased by 15 points</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium flex items-center mb-2">
            <Calendar className="h-5 w-5 mr-2 text-blue-400" />
            Upcoming Events
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Regional Tournament</p>
                <p className="text-xs text-gray-400">Apr 15, 2025 · Central Stadium</p>
              </div>
              <Badge variant="secondary">2 weeks</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Training Camp</p>
                <p className="text-xs text-gray-400">May 5-12, 2025 · State University</p>
              </div>
              <Badge variant="secondary">4 weeks</Badge>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium flex items-center mb-2">
            <Flag className="h-5 w-5 mr-2 text-green-400" />
            Community Leaders
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-amber-500">1</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="font-medium">Jordan Davis</span>
              </div>
              <span className="font-bold">98.2</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-400">2</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" />
                  <AvatarFallback>RW</AvatarFallback>
                </Avatar>
                <span className="font-medium">Riley Wong</span>
              </div>
              <span className="font-bold">96.5</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-amber-700">3</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843" />
                  <AvatarFallback>TJ</AvatarFallback>
                </Avatar>
                <span className="font-medium">Taylor Jones</span>
              </div>
              <span className="font-bold">95.8</span>
            </div>
            
            <div className="flex justify-between items-center bg-blue-900/20 p-1 px-2 rounded">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-blue-400">24</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21" />
                  <AvatarFallback>YOU</AvatarFallback>
                </Avatar>
                <span className="font-medium">You</span>
              </div>
              <span className="font-bold">86.5</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityUpdates;
