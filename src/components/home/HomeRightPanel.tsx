
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronUp, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';

const HomeRightPanel = () => {
  return (
    <div className="hidden lg:block lg:col-span-3">
      <div className="space-y-5">
        <Card className="bg-card text-card-foreground border-gray-700">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Trending Drills</h3>
            <div className="space-y-3">
              <TrendingDrill title="Possession Circle" athletes={1230} />
              <TrendingDrill title="Killer Through Balls" athletes={842} />
              <TrendingDrill title="Long Range Shooting" athletes={615} />
            </div>
          </CardContent>
        </Card>
        
        <UpcomingEvents />
        <SuggestedAthletes />
        <FeaturedChallenge />
      </div>
    </div>
  );
};

const TrendingDrill = ({ title, athletes }: { title: string; athletes: number }) => (
  <div className="flex items-start gap-3">
    <ChevronUp className="h-5 w-5 text-green-500 mt-0.5" />
    <div>
      <h4 className="font-medium text-sm">{title}</h4>
      <p className="text-xs text-gray-400">{athletes} athletes trying this</p>
    </div>
  </div>
);

const UpcomingEvents = () => (
  <Card className="bg-card text-card-foreground border-gray-700">
    <CardContent className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Upcoming Events</h3>
        <button className="text-xs text-blue-400 hover:text-blue-300">View All</button>
      </div>
      <div className="space-y-3">
        <EventCard 
          month="APR"
          day="15"
          title="Regional Tournament"
          location="Central Stadium"
          time="5:30 PM"
          color="purple"
        />
        <EventCard 
          month="MAY"
          day="5"
          title="Training Camp"
          location="State University"
          time="All day"
          color="blue"
        />
      </div>
    </CardContent>
  </Card>
);

const EventCard = ({ month, day, title, location, time, color }: { 
  month: string; 
  day: string; 
  title: string; 
  location: string; 
  time: string; 
  color: "purple" | "blue"; 
}) => (
  <div className="flex gap-3">
    <div className={`bg-${color}-900/30 h-12 w-12 flex flex-col items-center justify-center rounded-md`}>
      <span className={`text-xs text-${color}-300`}>{month}</span>
      <span className={`font-bold text-${color}-300`}>{day}</span>
    </div>
    <div>
      <h4 className="font-medium text-sm">{title}</h4>
      <p className="text-xs text-gray-400">{location} • {time}</p>
    </div>
  </div>
);

const SuggestedAthletes = () => (
  <Card className="bg-card text-card-foreground border-gray-700">
    <CardContent className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Athletes You May Like</h3>
        <button className="text-xs text-blue-400 hover:text-blue-300">View All</button>
      </div>
      <div className="space-y-3">
        <AthleteCard 
          name="Maya Johnson"
          role="Football • Winger"
          avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
        />
        <AthleteCard 
          name="Tyler Reed"
          role="Football • Striker"
          avatar="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6"
        />
      </div>
    </CardContent>
  </Card>
);

const AthleteCard = ({ name, role, avatar }: { name: string; role: string; avatar: string }) => (
  <div className="flex justify-between items-center">
    <div className="flex gap-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-medium text-sm">{name}</h4>
        <p className="text-xs text-gray-400">{role}</p>
      </div>
    </div>
    <Button variant="outline" size="sm" className="h-8">
      <Plus className="h-4 w-4 mr-1" />
      Follow
    </Button>
  </div>
);

const FeaturedChallenge = () => (
  <Card className="bg-card text-card-foreground border-gray-700 overflow-hidden">
    <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 px-4 py-3">
      <div className="flex items-center gap-2">
        <Award className="h-5 w-5 text-yellow-400" />
        <h3 className="font-semibold">Featured Challenge</h3>
      </div>
    </div>
    <CardContent className="p-4">
      <h4 className="font-medium text-lg mb-1">Spring Speed Challenge</h4>
      <p className="text-sm text-gray-300 mb-3">
        Improve your baseline-to-baseline speed time by 5% in 14 days
      </p>
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-4 w-4 text-gray-400" />
        <span className="text-xs text-gray-400">254 athletes participating</span>
      </div>
      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
        Join Challenge
      </Button>
    </CardContent>
  </Card>
);

export default HomeRightPanel;
