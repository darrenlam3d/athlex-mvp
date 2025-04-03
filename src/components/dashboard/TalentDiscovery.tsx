
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Eye, UserPlus, ThumbsUp } from 'lucide-react';

const TalentDiscovery = () => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Talent Discovery</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-start gap-4 bg-gray-800 p-4 rounded-lg">
          <div className="bg-blue-900/50 p-3 rounded-full">
            <Eye className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium">Profile Views</h3>
            <p className="text-sm text-gray-400 mb-1">Your profile was viewed by 3 scouts this week</p>
            <div className="flex -space-x-2">
              <Avatar className="h-8 w-8 border-2 border-gray-800">
                <AvatarImage src="https://images.unsplash.com/photo-1487958449943-2429e8be8625" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-gray-800">
                <AvatarImage src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" />
                <AvatarFallback>KL</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-gray-800">
                <AvatarImage src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1" />
                <AvatarFallback>TW</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-gray-800 p-4 rounded-lg">
          <div className="bg-green-900/50 p-3 rounded-full">
            <UserPlus className="h-6 w-6 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">Suggested Connections</h3>
            <p className="text-sm text-gray-400 mb-3">People in your area you might want to connect with</p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://images.unsplash.com/photo-1487252665478-49b61b47f302" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium leading-none">Mike Chen</p>
                    <p className="text-xs text-gray-400">Head Coach, Central High</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://images.unsplash.com/photo-1498936178812-4b2e558d2937" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium leading-none">Sarah Johnson</p>
                    <p className="text-xs text-gray-400">College Scout, State University</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-4 bg-gray-800 p-4 rounded-lg">
          <div className="bg-orange-900/50 p-3 rounded-full">
            <ThumbsUp className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <h3 className="font-medium">Recent Endorsements</h3>
            <p className="text-sm text-gray-400 mb-2">Coach Taylor endorsed you for "Ball Handling"</p>
            <span className="text-xs bg-orange-900/30 text-orange-300 px-2 py-1 rounded-full">
              +3 Skills Endorsed
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentDiscovery;
