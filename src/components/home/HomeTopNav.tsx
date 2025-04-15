
import React from 'react';
import { Search, Bell, MessageSquare } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

const HomeTopNav = () => {
  return (
    <div className="sticky top-0 z-10 bg-card/90 backdrop-blur-sm border-b border-gray-700 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search ATHLEX..." 
              className="h-9 w-64 rounded-full bg-gray-800 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="rounded-full p-2 hover:bg-gray-800">
            <Bell className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-800">
            <MessageSquare className="h-5 w-5" />
          </button>
          <Link to="/profile">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21" alt="Alex Thompson" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeTopNav;
