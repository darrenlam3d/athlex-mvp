
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Send, Paperclip, Video, Image } from 'lucide-react';

const DirectMessages = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  
  const conversations = [
    {
      id: 1,
      user: {
        name: 'Coach Taylor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        initials: 'CT',
        status: 'online',
      },
      lastMessage: 'Great job at practice today. Let\'s work on those passing drills.',
      time: '10:23 AM',
      unread: 0,
    },
    {
      id: 2,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        initials: 'SJ',
        status: 'offline',
      },
      lastMessage: 'Are you coming to the team meeting tomorrow?',
      time: 'Yesterday',
      unread: 2,
    },
    {
      id: 3,
      user: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004',
        initials: 'MC',
        status: 'online',
      },
      lastMessage: 'I saw your last game highlights. Amazing goal!',
      time: '2 days ago',
      unread: 0,
    },
  ];
  
  // Messages for the first conversation
  const messages = [
    { id: 1, sent: false, text: 'Great job at practice today.', time: '10:20 AM' },
    { id: 2, sent: false, text: 'Let\'s work on those passing drills.', time: '10:23 AM' },
    { id: 3, sent: true, text: 'Thanks, Coach! I\'ve been working on my technique.', time: '10:25 AM' },
    { id: 4, sent: true, text: 'When is our next training session?', time: '10:26 AM' },
    { id: 5, sent: false, text: 'Tomorrow at 4pm. Don\'t forget to bring your new cleats.', time: '10:30 AM' },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Conversations list */}
      <div className="md:col-span-1 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 bg-gray-800 border-gray-700"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Messages</h3>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <Card className="border-gray-700 bg-card divide-y divide-gray-700">
          {conversations.map((convo) => (
            <div 
              key={convo.id}
              className={`p-3 cursor-pointer hover:bg-gray-800 transition-colors ${
                selectedChat === convo.id ? 'bg-gray-800' : ''
              }`}
              onClick={() => setSelectedChat(convo.id)}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 mt-1">
                    <AvatarImage src={convo.user.avatar} alt={convo.user.name} />
                    <AvatarFallback>{convo.user.initials}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card ${
                    convo.user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-medium truncate">{convo.user.name}</h4>
                    <span className="text-xs text-gray-400 flex-shrink-0">{convo.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{convo.lastMessage}</p>
                </div>
                {convo.unread > 0 && (
                  <Badge className="bg-athlex-accent hover:bg-athlex-accent/90 ml-2">
                    {convo.unread}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </Card>
      </div>
      
      {/* Chat area */}
      <div className="md:col-span-2">
        {selectedChat ? (
          <Card className="border-gray-700 bg-card h-full flex flex-col">
            {/* Chat header */}
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={conversations.find(c => c.id === selectedChat)?.user.avatar}
                    alt={conversations.find(c => c.id === selectedChat)?.user.name} 
                  />
                  <AvatarFallback>
                    {conversations.find(c => c.id === selectedChat)?.user.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">
                    {conversations.find(c => c.id === selectedChat)?.user.name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {conversations.find(c => c.id === selectedChat)?.user.status === 'online' 
                      ? 'Online' 
                      : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.sent 
                      ? 'bg-athlex-accent/20 border border-athlex-accent/30 text-white' 
                      : 'bg-gray-800 text-white'
                  }`}>
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 text-right ${
                      message.sent ? 'text-gray-300' : 'text-gray-400'
                    }`}>{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Image className="h-5 w-5" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    className="pr-12 bg-gray-800 border-gray-700 h-10"
                  />
                  <Button 
                    size="icon" 
                    className="h-8 w-8 absolute right-1 top-1"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="border-gray-700 bg-card h-full flex items-center justify-center">
            <div className="text-center p-6">
              <div className="bg-gray-800 p-4 rounded-full inline-block mb-4">
                <Send className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No Conversation Selected</h3>
              <p className="text-gray-400">
                Choose a conversation from the list or start a new one.
              </p>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DirectMessages;
