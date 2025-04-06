
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Lightbulb, Video, ArrowRight, ThumbsUp, Bookmark, MessageSquare } from 'lucide-react';

const InsightsFeed = () => {
  const insights = [
    {
      id: 1,
      type: 'tip',
      title: 'Improving Your Weak Foot Control',
      content: 'Based on your recent performance metrics, focusing on strengthening your left-foot passing could improve your overall ball control by up to 15%. Try the "Mirror Drill" with emphasis on your weaker foot.',
      source: 'AI Coach',
      likes: 24,
      comments: 3,
      saved: true
    },
    {
      id: 2,
      type: 'video',
      title: 'First-Time Passing Technique',
      content: 'This drill focuses on improving your one-touch passing, which our analysis shows could create 2-3 more attacking opportunities per game.',
      source: 'Coach Williams',
      thumbnail: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4',
      duration: '3:42',
      likes: 56,
      comments: 7,
      saved: false
    },
    {
      id: 3,
      type: 'article',
      title: 'Recovery Nutrition for Central Midfielders',
      content: "Your training intensity has increased by 20% this month. Here's how to adjust your nutrition to support recovery and performance.",
      source: 'Sports Nutritionist',
      readTime: '4 min read',
      likes: 32,
      comments: 5,
      saved: false
    }
  ];

  return (
    <Card className="border-gray-700 bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Insights Feed</CardTitle>
        <CardDescription className="text-gray-400 mt-1">
          Personalized training tips and resources based on your performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map(insight => (
            <div key={insight.id} className="bg-gray-800/30 rounded-lg overflow-hidden">
              {insight.type === 'video' && (
                <div className="relative aspect-video">
                  <img 
                    src={insight.thumbnail} 
                    alt={insight.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button className="bg-athlex-accent rounded-full p-3">
                      <Video className="h-6 w-6 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {insight.duration}
                  </div>
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {insight.type === 'tip' && (
                    <Lightbulb className="h-4 w-4 text-yellow-400" />
                  )}
                  <span className="text-xs text-gray-400">{insight.source}</span>
                </div>
                
                <h3 className="font-medium mb-2">{insight.title}</h3>
                <p className="text-sm text-gray-300 mb-3">{insight.content}</p>
                
                {insight.type === 'article' && (
                  <div className="text-xs text-gray-400 mb-3">{insight.readTime}</div>
                )}
                
                <div className="flex items-center justify-between">
                  <button className="text-sm text-athlex-accent flex items-center">
                    Read More <ArrowRight className="ml-1 h-3 w-3" />
                  </button>
                  
                  <div className="flex items-center gap-3">
                    <button className="text-gray-400 hover:text-white">
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-white">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button className={insight.saved ? "text-athlex-accent" : "text-gray-400 hover:text-white"}>
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsFeed;
