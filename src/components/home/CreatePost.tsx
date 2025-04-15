
import React from 'react';
import { Image, Video, Calendar, Flag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const CreatePost = () => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21" alt="Alex Thompson" />
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <button className="text-left w-full rounded-full bg-gray-800 px-4 py-2.5 text-gray-400 hover:bg-gray-700">
              Share something with your community...
            </button>
            
            <div className="flex justify-between mt-3">
              <button className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm">
                <Image className="h-4 w-4" />
                <span>Photo</span>
              </button>
              <button className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm">
                <Video className="h-4 w-4" />
                <span>Video</span>
              </button>
              <button className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm">
                <Calendar className="h-4 w-4" />
                <span>Event</span>
              </button>
              <button className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm">
                <Flag className="h-4 w-4" />
                <span>Goal</span>
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
