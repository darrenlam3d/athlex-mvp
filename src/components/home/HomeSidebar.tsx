
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const HomeSidebar = () => {
  return (
    <div className="col-span-12 md:col-span-3">
      <Card className="sticky top-20 bg-card text-card-foreground border-gray-700">
        <CardContent className="p-5">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-16 w-16 mb-3">
              <AvatarImage src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21" alt="Alex Thompson" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold">Alex Thompson</h3>
            <p className="text-sm text-gray-400">Football · CM</p>
            
            <div className="w-full border-t border-gray-700 my-3"></div>
            
            <div className="flex justify-between w-full text-sm mb-2">
              <span className="text-gray-400">Profile views</span>
              <span className="font-medium text-blue-400">47</span>
            </div>
            
            <div className="flex justify-between w-full text-sm">
              <span className="text-gray-400">Post impressions</span>
              <span className="font-medium text-blue-400">238</span>
            </div>
            
            <div className="w-full border-t border-gray-700 my-3"></div>
            
            <div className="w-full space-y-2">
              <Link to="/profile" className="block text-sm text-gray-300 hover:text-white px-2 py-1.5 rounded-md hover:bg-gray-800">
                View Full Profile
              </Link>
              <button className="w-full text-left text-sm text-gray-300 hover:text-white px-2 py-1.5 rounded-md hover:bg-gray-800">
                Post Update
              </button>
              <Link to="/athlete-training-log" className="block text-sm text-gray-300 hover:text-white px-2 py-1.5 rounded-md hover:bg-gray-800">
                Track Training
              </Link>
            </div>
            
            <div className="w-full border-t border-gray-700 my-3"></div>
            
            <div className="flex flex-wrap gap-2 w-full">
              <span className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-xs text-gray-300 cursor-pointer">
                #sprint
              </span>
              <span className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-xs text-gray-300 cursor-pointer">
                #agility
              </span>
              <span className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-xs text-gray-300 cursor-pointer">
                #football
              </span>
              <span className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-xs text-gray-300 cursor-pointer">
                #midfielder
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeSidebar;
