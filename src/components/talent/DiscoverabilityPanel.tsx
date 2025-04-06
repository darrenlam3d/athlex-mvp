
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Eye, Search, User, Video, Trophy } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const DiscoverabilityPanel = () => {
  return (
    <Card className="border-gray-700 bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">My Discoverability</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Profile Score */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">Profile Score</h3>
              <p className="text-sm text-gray-400">How discoverable you are to scouts and coaches</p>
            </div>
            <div className="bg-purple-900/50 text-purple-300 text-xl font-semibold rounded-lg px-3 py-1.5">
              72/100
            </div>
          </div>
          
          <div className="mt-4">
            <Progress value={72} className="h-2" />
            <div className="grid grid-cols-3 text-xs mt-1 text-gray-400">
              <div>Basic</div>
              <div className="text-center text-athlex-accent">Enhanced</div>
              <div className="text-right">Elite</div>
            </div>
          </div>
          
          <div className="mt-5 grid gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-900/30 p-1.5 rounded-full mr-3">
                  <User className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-sm">Profile Completeness</span>
              </div>
              <span className="text-green-400">85%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-900/30 p-1.5 rounded-full mr-3">
                  <Video className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-sm">Verified Metrics</span>
              </div>
              <span className="text-blue-400">70%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-orange-900/30 p-1.5 rounded-full mr-3">
                  <Trophy className="h-4 w-4 text-orange-400" />
                </div>
                <span className="text-sm">Endorsements</span>
              </div>
              <span className="text-orange-400">60%</span>
            </div>
          </div>
        </div>
        
        {/* Player Tags */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-medium mb-3">Your Athlete Tags</h3>
          <p className="text-xs text-gray-400 mb-3">These AI-generated tags help scouts find players like you</p>
          
          <div className="flex flex-wrap gap-2">
            <span className="bg-athlex-accent/20 text-athlex-accent border border-athlex-accent/30 px-3 py-1 rounded-full text-sm">
              High Work Rate CM
            </span>
            <span className="bg-athlex-accent/20 text-athlex-accent border border-athlex-accent/30 px-3 py-1 rounded-full text-sm">
              Ball Winner
            </span>
            <span className="bg-athlex-accent/20 text-athlex-accent border border-athlex-accent/30 px-3 py-1 rounded-full text-sm">
              Box-to-Box
            </span>
            <span className="bg-athlex-accent/20 text-athlex-accent border border-athlex-accent/30 px-3 py-1 rounded-full text-sm">
              Great Stamina
            </span>
            <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
              + Add Custom Tag
            </span>
          </div>
        </div>
        
        {/* Scout Views */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-900/50 p-2 rounded-full">
              <Eye className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium">Scout Views</h3>
              <p className="text-xs text-gray-400">Your profile was viewed by 5 scouts this month</p>
            </div>
          </div>
          
          <div className="space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" />
                  <AvatarFallback>JT</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">James Thomas</p>
                  <p className="text-xs text-gray-400">City FC Academy</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">2 days ago</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Michael Roberts</p>
                  <p className="text-xs text-gray-400">United College</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">5 days ago</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>+3</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">3 more scouts</p>
                  <p className="text-xs text-gray-400">View all profile activity</p>
                </div>
              </div>
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscoverabilityPanel;
