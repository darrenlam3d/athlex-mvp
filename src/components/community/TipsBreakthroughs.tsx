
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, Lightbulb, Medal, ArrowRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TipsBreakthroughs = () => {
  const breakthroughs = [
    {
      id: 1,
      user: {
        name: 'Jordan Smith',
        avatar: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9',
        initials: 'JS',
        position: 'Center Midfielder',
      },
      title: 'How I Overcame My Fear of Heading',
      preview: 'After struggling with heading for months, I finally found a training routine that worked for me. My confidence has improved and...',
      tags: ['Mental Strength', 'Heading', 'Confidence'],
      likes: 46,
      comments: 12,
      timeAgo: '2 days ago',
    },
    {
      id: 2,
      user: {
        name: 'Maria Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
        initials: 'MR',
        position: 'Striker',
      },
      title: 'From Bench to Starting XI - My Recovery Story',
      preview: 'After a devastating ACL injury, I thought my season was over. Here\'s how I approached my rehabilitation and made it back stronger than before...',
      tags: ['Injury Recovery', 'Rehabilitation', 'Mental Toughness'],
      likes: 78,
      comments: 23,
      timeAgo: '5 days ago',
    },
  ];
  
  const tips = [
    {
      id: 1,
      user: {
        name: 'Coach Taylor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        initials: 'CT',
        position: 'Head Coach',
      },
      title: '3 Simple Drills to Improve Your First Touch',
      preview: 'A good first touch can make all the difference in match situations. These three drills have helped my players significantly improve...',
      tags: ['Technical', 'Ball Control', 'First Touch'],
      likes: 92,
      comments: 31,
      timeAgo: '3 days ago',
    },
    {
      id: 2,
      user: {
        name: 'Sam Wilson',
        avatar: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f',
        initials: 'SW',
        position: 'Performance Coach',
      },
      title: 'Quick Recovery Techniques Between Games',
      preview: 'Playing multiple games in a week? Here are my proven techniques to speed up recovery and maintain peak performance...',
      tags: ['Recovery', 'Performance', 'Nutrition'],
      likes: 64,
      comments: 18,
      timeAgo: '1 week ago',
    },
  ];

  return (
    <Card className="border-gray-700 bg-card">
      <CardHeader className="pb-2 border-b border-gray-700">
        <div className="flex justify-between items-center mb-3">
          <CardTitle className="text-xl font-medium">Tips & Breakthroughs</CardTitle>
          <Button variant="link" className="text-athlex-accent p-0 h-auto text-sm" size="sm">
            View All
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
        <Tabs defaultValue="breakthroughs" className="w-full">
          <TabsList className="grid grid-cols-2 bg-gray-800">
            <TabsTrigger value="breakthroughs">
              <Medal className="mr-2 h-4 w-4" />
              Breakthroughs
            </TabsTrigger>
            <TabsTrigger value="tips">
              <Lightbulb className="mr-2 h-4 w-4" />
              Tips
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        {/* Breakthroughs */}
        {breakthroughs.map((item) => (
          <div key={item.id} className="pb-6 border-b border-gray-700 last:border-0">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={item.user.avatar} alt={item.user.name} />
                <AvatarFallback>{item.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <p className="font-medium">{item.user.name}</p>
                    <p className="text-xs text-gray-400">{item.user.position} • {item.timeAgo}</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    <Medal className="mr-1.5 h-3 w-3" />
                    Breakthrough
                  </Button>
                </div>
                
                <h3 className="font-semibold mt-3">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-300">{item.preview}</p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-800 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-6 mt-4">
                  <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{item.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm">{item.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center">
          <Button variant="outline" size="sm">Load More</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TipsBreakthroughs;
