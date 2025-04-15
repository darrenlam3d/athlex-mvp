
import React from 'react';
import { Heart, MessageSquare as Comment, Share2, Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface PostCardProps {
  author: {
    name: string;
    role: string;
    avatar: string;
    fallback: string;
  };
  content: string;
  image?: string;
  timeAgo: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
}

const PostCard = ({ author, content, image, timeAgo, stats }: PostCardProps) => {
  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardContent className="p-0">
        <div className="p-4 flex justify-between items-start">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.fallback}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{author.name}</h4>
              <p className="text-xs text-gray-400">{author.role}</p>
              <p className="text-xs text-gray-400">{timeAgo}</p>
            </div>
          </div>
        </div>
        
        <div className="px-4 pb-3">
          <p className="text-gray-200">{content}</p>
        </div>
        
        {image && (
          <div className="border-y border-gray-700">
            <img 
              src={image} 
              alt="Post content" 
              className="w-full object-cover max-h-96" 
            />
          </div>
        )}
        
        <div className="px-4 py-2 flex justify-between text-xs text-gray-400">
          <div>{stats.likes} likes • {stats.comments} comments</div>
          <div>{stats.shares} shares</div>
        </div>
        
        <div className="px-4 py-1 border-t border-gray-700 grid grid-cols-4">
          <button className="flex items-center justify-center gap-1 py-2 hover:bg-gray-800 rounded-md">
            <Heart className="h-5 w-5" />
            <span>Like</span>
          </button>
          <button className="flex items-center justify-center gap-1 py-2 hover:bg-gray-800 rounded-md">
            <Comment className="h-5 w-5" />
            <span>Comment</span>
          </button>
          <button className="flex items-center justify-center gap-1 py-2 hover:bg-gray-800 rounded-md">
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>
          <button className="flex items-center justify-center gap-1 py-2 hover:bg-gray-800 rounded-md">
            <Bookmark className="h-5 w-5" />
            <span>Save</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
