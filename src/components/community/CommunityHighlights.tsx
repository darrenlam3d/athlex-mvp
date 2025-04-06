
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Award, Star, TrendingUp } from 'lucide-react';

const CommunityHighlights = () => {
  const highlights = [
    {
      id: 1,
      title: 'Top Performer of the Week',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        initials: 'SJ',
        position: 'Left Wing',
      },
      stats: '3 goals, 2 assists in training matches',
      icon: Award,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/20',
    },
    {
      id: 2,
      title: 'Most Consistent Defender',
      user: {
        name: 'David Park',
        avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6',
        initials: 'DP',
        position: 'Right Back',
      },
      stats: '92% successful tackles, 27 days streak',
      icon: Star,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
    },
    {
      id: 3,
      title: 'Most Improved Player',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453',
        initials: 'EW',
        position: 'Left Back',
      },
      stats: '+18% overall performance improvement',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
    },
  ];

  return (
    <Card className="border-gray-700 bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Community Highlights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {highlights.map((highlight) => {
          const Icon = highlight.icon;
          
          return (
            <div 
              key={highlight.id} 
              className={`p-4 rounded-lg ${highlight.bgColor} border border-${highlight.color.split('-')[1]}-800/30`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-full ${highlight.bgColor} border border-${highlight.color.split('-')[1]}-800/30`}>
                  <Icon className={`h-5 w-5 ${highlight.color}`} />
                </div>
                <div>
                  <h3 className="font-medium">{highlight.title}</h3>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={highlight.user.avatar} alt={highlight.user.name} />
                  <AvatarFallback>{highlight.user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{highlight.user.name}</p>
                  <p className="text-sm text-gray-400">{highlight.user.position}</p>
                </div>
              </div>
              
              <p className="text-sm mt-2">{highlight.stats}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default CommunityHighlights;
