import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  ChevronUp, 
  Calendar,
  Heart,
  MessageSquare as Comment,
  Share2,
  Bookmark,
  Plus,
  Image,
  Video,
  Flag,
  Users,
  Award
} from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 overflow-y-auto">
            {/* Top Navigation Bar */}
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
            
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-12 gap-6">
                {/* Left Sidebar */}
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
                          <button className="w-full text-left text-sm text-gray-300 hover:text-white px-2 py-1.5 rounded-md hover:bg-gray-800">
                            Track Training
                          </button>
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
                
                {/* Main Feed */}
                <div className="col-span-12 md:col-span-6 space-y-5">
                  {/* Create Post */}
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
                  
                  {/* Feed Posts */}
                  <Card className="bg-card text-card-foreground border-gray-700">
                    <CardContent className="p-0">
                      {/* Post Header */}
                      <div className="p-4 flex justify-between items-start">
                        <div className="flex gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="https://images.unsplash.com/photo-1487952252041-106e5677091f" alt="Jordan Davis" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">Jordan Davis</h4>
                            <p className="text-xs text-gray-400">Basketball · Shooting Guard · Central High</p>
                            <p className="text-xs text-gray-400">2h ago</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Post Content */}
                      <div className="px-4 pb-3">
                        <p className="text-gray-200">Just hit a new personal record in our speed drills today! 🏆 All those extra hours are finally paying off!</p>
                      </div>
                      
                      {/* Post Media */}
                      <div className="border-y border-gray-700">
                        <img 
                          src="https://images.unsplash.com/photo-1546519638-68e109498ffc" 
                          alt="Basketball training" 
                          className="w-full object-cover max-h-96" 
                        />
                      </div>
                      
                      {/* Engagement Stats */}
                      <div className="px-4 py-2 flex justify-between text-xs text-gray-400">
                        <div>42 likes • 8 comments</div>
                        <div>12 shares</div>
                      </div>
                      
                      {/* Action Buttons */}
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
                  
                  {/* AI Training Post */}
                  <Card className="bg-card text-card-foreground border-gray-700">
                    <CardContent className="p-0">
                      {/* Post Header */}
                      <div className="p-4 flex justify-between items-start">
                        <div className="flex gap-3">
                          <Avatar className="h-12 w-12 bg-blue-900">
                            <AvatarFallback className="bg-blue-900 text-blue-200">AI</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">ATHLEX Training AI</h4>
                            <p className="text-xs text-gray-400">Personalized Insight</p>
                            <p className="text-xs text-gray-400">Today</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Post Content */}
                      <div className="px-4 pb-3">
                        <p className="text-gray-200 mb-3">
                          <span className="font-semibold">Training Insight for Central Midfielders:</span> Improving your passing accuracy and vision can increase your effective control of the game by up to 20%.
                        </p>
                        
                        <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-3 mb-3">
                          <h5 className="font-medium text-blue-300 mb-1">Drill of the Day: Triangle Passing</h5>
                          <p className="text-sm text-gray-300">
                            Set up with two teammates forming a triangle, 10 yards apart. Practice one-touch passes while moving. Focus on weight of pass and first touch direction. 3 sets of 60 seconds.
                          </p>
                        </div>
                        
                        <p className="text-sm text-gray-400">
                          Based on your recent performance metrics, this will help address your current development areas.
                        </p>
                      </div>
                      
                      {/* Action Buttons */}
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

                  {/* Coach Post */}
                  <Card className="bg-card text-card-foreground border-gray-700">
                    <CardContent className="p-0">
                      {/* Post Header */}
                      <div className="p-4 flex justify-between items-start">
                        <div className="flex gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" alt="Coach Taylor" />
                            <AvatarFallback>CT</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">Coach Taylor</h4>
                            <p className="text-xs text-gray-400">Football Coach · Central City FC</p>
                            <p className="text-xs text-gray-400">Yesterday</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Post Content */}
                      <div className="px-4 pb-3">
                        <p className="text-gray-200 mb-3">
                          Proud of our team's progress this month! Special shoutout to @alexthompson for the impressive improvement in passing accuracy and vision. Keep up the great work team!
                        </p>
                      </div>
                      
                      {/* Engagement Stats */}
                      <div className="px-4 py-2 flex justify-between text-xs text-gray-400">
                        <div>78 likes • 15 comments</div>
                        <div>5 shares</div>
                      </div>
                      
                      {/* Action Buttons */}
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
                </div>
                
                {/* Right Sidebar */}
                <div className="hidden lg:block lg:col-span-3">
                  <div className="space-y-5">
                    {/* Trending Drills */}
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-3">Trending Drills</h3>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <ChevronUp className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-sm">Possession Circle</h4>
                              <p className="text-xs text-gray-400">1,230 athletes trying this</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <ChevronUp className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-sm">Killer Through Balls</h4>
                              <p className="text-xs text-gray-400">842 athletes trying this</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <ChevronUp className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-sm">Long Range Shooting</h4>
                              <p className="text-xs text-gray-400">615 athletes trying this</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Upcoming Events */}
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-semibold">Upcoming Events</h3>
                          <button className="text-xs text-blue-400 hover:text-blue-300">View All</button>
                        </div>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <div className="bg-purple-900/30 h-12 w-12 flex flex-col items-center justify-center rounded-md">
                              <span className="text-xs text-purple-300">APR</span>
                              <span className="font-bold text-purple-300">15</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Regional Tournament</h4>
                              <p className="text-xs text-gray-400">Central Stadium • 5:30 PM</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="bg-blue-900/30 h-12 w-12 flex flex-col items-center justify-center rounded-md">
                              <span className="text-xs text-blue-300">MAY</span>
                              <span className="font-bold text-blue-300">5</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Training Camp</h4>
                              <p className="text-xs text-gray-400">State University • All day</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Athletes You May Like */}
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-semibold">Athletes You May Like</h3>
                          <button className="text-xs text-blue-400 hover:text-blue-300">View All</button>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="flex gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" alt="Maya Johnson" />
                                <AvatarFallback>MJ</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium text-sm">Maya Johnson</h4>
                                <p className="text-xs text-gray-400">Football • Winger</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="h-8">
                              <Plus className="h-4 w-4 mr-1" />
                              Follow
                            </Button>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6" alt="Tyler Reed" />
                                <AvatarFallback>TR</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium text-sm">Tyler Reed</h4>
                                <p className="text-xs text-gray-400">Football • Striker</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="h-8">
                              <Plus className="h-4 w-4 mr-1" />
                              Follow
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* ATHLEX Challenges */}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Home;
