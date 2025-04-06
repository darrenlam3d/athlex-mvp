
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, Video, Medal, Award } from 'lucide-react';

const ActivityFeed = () => {
  const posts = [
    {
      id: 1,
      user: {
        name: 'Jordan Smith',
        avatar: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9',
        initials: 'JS',
      },
      type: 'milestone',
      content: 'Just completed my 50th training session this season! 💪',
      time: '2 hours ago',
      likes: 24,
      comments: 8,
      media: null,
    },
    {
      id: 2,
      user: {
        name: 'Maria Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
        initials: 'MR',
      },
      type: 'video',
      content: 'Check out this passing drill our team has been working on. Making real progress!',
      time: '5 hours ago',
      likes: 42,
      comments: 12,
      media: {
        type: 'video',
        thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55',
      },
    },
    {
      id: 3,
      user: {
        name: 'Coach Taylor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        initials: 'CT',
      },
      type: 'achievement',
      content: 'Congratulations to our U17 squad for winning the regional tournament! What a team effort!',
      time: '1 day ago',
      likes: 86,
      comments: 24,
      media: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018',
      },
    },
  ];

  return (
    <Card className="border-gray-700 bg-card">
      <CardHeader className="border-b border-gray-700 pb-3">
        <CardTitle className="text-xl font-medium">Activity Feed</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 px-4">
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="pb-6 border-b border-gray-700 last:border-0">
              {/* Post header with avatar and name */}
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback>{post.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{post.user.name}</p>
                      <p className="text-xs text-gray-400">{post.time}</p>
                    </div>
                    {post.type === 'milestone' && (
                      <span className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full text-xs">Milestone</span>
                    )}
                    {post.type === 'achievement' && (
                      <span className="bg-yellow-900/30 text-yellow-300 px-2 py-1 rounded-full text-xs">Achievement</span>
                    )}
                    {post.type === 'video' && (
                      <span className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded-full text-xs">Training Clip</span>
                    )}
                  </div>
                  
                  {/* Post content */}
                  <p className="mt-2">{post.content}</p>
                  
                  {/* Media content if available */}
                  {post.media && (
                    <div className="mt-3 rounded-lg overflow-hidden relative">
                      <img 
                        src={post.media.type === 'video' ? post.media.thumbnail : post.media.url} 
                        alt="Post media" 
                        className="w-full h-48 object-cover"
                      />
                      {post.media.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/50 rounded-full p-3">
                            <Video className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Like and comment buttons */}
                  <div className="flex items-center gap-6 mt-4">
                    <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm">Load More</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
