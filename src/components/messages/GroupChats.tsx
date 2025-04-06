
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, MessageSquare, Plus, Lock, Info } from 'lucide-react';

const GroupChats = () => {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  
  const groups = [
    {
      id: 1,
      name: 'Team Announcements',
      avatar: null,
      memberCount: 22,
      lastMessage: 'Practice moved to 5pm tomorrow due to field maintenance.',
      lastMessageSender: 'Coach Taylor',
      time: '2 hours ago',
      unread: 2,
      locked: true,
    },
    {
      id: 2,
      name: 'Central Midfielders',
      avatar: null,
      memberCount: 5,
      lastMessage: 'Anyone want to do some extra drills after practice?',
      lastMessageSender: 'Michael',
      time: 'Yesterday',
      unread: 0,
      locked: false,
    },
    {
      id: 3,
      name: 'Fitness Challenge Group',
      avatar: null,
      memberCount: 12,
      lastMessage: 'Day 3 completed! 🏃‍♂️💪',
      lastMessageSender: 'Sarah',
      time: '3 days ago',
      unread: 0,
      locked: false,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Group list */}
        <div className="md:col-span-1">
          <Card className="border-gray-700 bg-card">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-medium">Team Groups</CardTitle>
                <Button size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  Join
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-700">
                {groups.map((group) => (
                  <div 
                    key={group.id} 
                    className={`p-4 cursor-pointer hover:bg-gray-800 transition-colors ${
                      selectedGroup === group.id ? 'bg-gray-800' : ''
                    }`}
                    onClick={() => setSelectedGroup(group.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center text-white">
                        {group.locked ? (
                          <Lock className="h-5 w-5" />
                        ) : (
                          <Users className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-medium truncate">{group.name}</h4>
                          <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{group.time}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {group.memberCount} members
                        </p>
                        <p className="text-sm text-gray-300 truncate mt-1">
                          <span className="font-medium">{group.lastMessageSender}:</span> {group.lastMessage}
                        </p>
                      </div>
                      {group.unread > 0 && (
                        <Badge className="bg-athlex-accent hover:bg-athlex-accent/90">
                          {group.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Group chat or empty state */}
        <div className="md:col-span-2">
          <Card className="border-gray-700 bg-card h-full">
            {selectedGroup ? (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center text-white">
                      {groups.find(g => g.id === selectedGroup)?.locked ? (
                        <Lock className="h-5 w-5" />
                      ) : (
                        <Users className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {groups.find(g => g.id === selectedGroup)?.name}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {groups.find(g => g.id === selectedGroup)?.memberCount} members
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 p-4 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Group Chat Coming Soon</h3>
                    <p className="text-gray-400 max-w-md mx-auto mt-2">
                      Group chat functionality will be available in the next update. Stay tuned for team communication features!
                    </p>
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-700">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      disabled
                      className="bg-gray-800 border-gray-700"
                    />
                    <Button disabled>Send</Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="bg-gray-800 p-4 rounded-full inline-block mb-4">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Group Selected</h3>
                  <p className="text-gray-400 mb-4">
                    Select a group from the list or join a new group chat.
                  </p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Explore Groups
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
      
      {/* Info Card */}
      <Card className="border-gray-700 bg-card">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-900/30 p-2 rounded-full">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium">Group Chats - MVP Preview</h3>
              <p className="text-sm text-gray-400 mt-1">
                In this MVP version, group chats are available for viewing. Full interaction including sending messages will be available in the next release. Groups based on positions, challenges, and team announcements help you stay connected with teammates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupChats;
