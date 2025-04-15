
import React from 'react';
import CreatePost from './CreatePost';
import PostCard from './PostCard';

const HomeFeed = () => {
  return (
    <div className="col-span-12 md:col-span-6 space-y-5">
      <CreatePost />
      
      {/* Regular Post */}
      <PostCard 
        author={{
          name: "Jordan Davis",
          role: "Basketball · Shooting Guard · Central High",
          avatar: "https://images.unsplash.com/photo-1487952252041-106e5677091f",
          fallback: "JD"
        }}
        content="Just hit a new personal record in our speed drills today! 🏆 All those extra hours are finally paying off!"
        image="https://images.unsplash.com/photo-1546519638-68e109498ffc"
        timeAgo="2h ago"
        stats={{
          likes: 42,
          comments: 8,
          shares: 12
        }}
      />
      
      {/* AI Training Post */}
      <PostCard 
        author={{
          name: "ATHLEX Training AI",
          role: "Personalized Insight",
          avatar: "",
          fallback: "AI"
        }}
        content={`Training Insight for Central Midfielders: Improving your passing accuracy and vision can increase your effective control of the game by up to 20%.

Set up with two teammates forming a triangle, 10 yards apart. Practice one-touch passes while moving. Focus on weight of pass and first touch direction. 3 sets of 60 seconds.

Based on your recent performance metrics, this will help address your current development areas.`}
        timeAgo="Today"
        stats={{
          likes: 35,
          comments: 5,
          shares: 8
        }}
      />
      
      {/* Coach Post */}
      <PostCard 
        author={{
          name: "Coach Taylor",
          role: "Football Coach · Central City FC",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          fallback: "CT"
        }}
        content="Proud of our team's progress this month! Special shoutout to @alexthompson for the impressive improvement in passing accuracy and vision. Keep up the great work team!"
        timeAgo="Yesterday"
        stats={{
          likes: 78,
          comments: 15,
          shares: 5
        }}
      />
    </div>
  );
};

export default HomeFeed;
