import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Plus, Send, Paperclip, Video, ArrowRight, Image, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'react-router-dom';

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    user: {
      id: 'coach_001',
      name: 'Coach Taylor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      initials: 'CT',
      status: 'online',
      role: 'Coach',
      sport: 'Football',
    },
    lastMessage: 'Great job at practice today. Let\'s work on those passing drills.',
    time: '10:23 AM',
    timestamp: '2025-04-11T10:23:00Z',
    unread: 0,
  },
  {
    id: 2,
    user: {
      id: 'athlete_002',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      initials: 'SJ',
      status: 'offline',
      role: 'Athlete',
      sport: 'Basketball',
    },
    lastMessage: 'Are you coming to the team meeting tomorrow?',
    time: 'Yesterday',
    timestamp: '2025-04-10T15:30:00Z',
    unread: 2,
  },
  {
    id: 3,
    user: {
      id: 'athlete_003',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004',
      initials: 'MC',
      status: 'online',
      role: 'Athlete',
      sport: 'Track',
    },
    lastMessage: 'I saw your last game highlights. Amazing goal!',
    time: '2 days ago',
    timestamp: '2025-04-09T11:45:00Z',
    unread: 0,
  },
  {
    id: 4,
    user: {
      id: 'scout_001',
      name: 'David Thompson',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5',
      initials: 'DT',
      status: 'online',
      role: 'Scout',
      sport: 'Basketball',
    },
    lastMessage: 'I\'d like to discuss your potential for the upcoming season.',
    time: '3 days ago',
    timestamp: '2025-04-08T09:15:00Z',
    unread: 1,
  },
];

// Messages for each conversation
const mockMessages = {
  1: [
    { id: 1, sent: false, text: 'Great job at practice today.', time: '10:20 AM', timestamp: '2025-04-11T10:20:00Z' },
    { id: 2, sent: false, text: 'Let\'s work on those passing drills.', time: '10:23 AM', timestamp: '2025-04-11T10:23:00Z' },
    { id: 3, sent: true, text: 'Thanks, Coach! I\'ve been working on my technique.', time: '10:25 AM', timestamp: '2025-04-11T10:25:00Z' },
    { id: 4, sent: true, text: 'When is our next training session?', time: '10:26 AM', timestamp: '2025-04-11T10:26:00Z' },
    { id: 5, sent: false, text: 'Tomorrow at 4pm. Don\'t forget to bring your new cleats.', time: '10:30 AM', timestamp: '2025-04-11T10:30:00Z' },
  ],
  2: [
    { id: 1, sent: false, text: 'Hey, how was your weekend?', time: '3:15 PM', timestamp: '2025-04-10T15:15:00Z' },
    { id: 2, sent: true, text: 'It was great! I practiced those drills you suggested.', time: '3:20 PM', timestamp: '2025-04-10T15:20:00Z' },
    { id: 3, sent: false, text: 'Awesome! Are you coming to the team meeting tomorrow?', time: '3:30 PM', timestamp: '2025-04-10T15:30:00Z' },
  ],
  3: [
    { id: 1, sent: false, text: 'I saw your last game highlights. Amazing goal!', time: '11:45 AM', timestamp: '2025-04-09T11:45:00Z' },
  ],
  4: [
    { id: 1, sent: false, text: 'Hello! I\'ve been watching your performance this season.', time: '9:10 AM', timestamp: '2025-04-08T09:10:00Z' },
    { id: 2, sent: false, text: 'I\'d like to discuss your potential for the upcoming season.', time: '9:15 AM', timestamp: '2025-04-08T09:15:00Z' },
  ],
};

const DirectMessages = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState<{[key: number]: any[]}>({});
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  // Initialize data
  useEffect(() => {
    // In a real app, this would be an API call to fetch conversations
    setConversations(mockConversations);
    setMessages(mockMessages);
    
    // Check if there's an athlete parameter in the URL
    const athleteId = searchParams.get('athlete');
    if (athleteId) {
      const conversation = mockConversations.find(c => c.user.id === athleteId);
      if (conversation) {
        setSelectedChat(conversation.id);
      } else {
        // If athlete not found in conversations, would normally create a new one
        toast({
          title: "Athlete not found",
          description: "This athlete is not in your message list yet",
          variant: "destructive",
        });
      }
    } else if (mockConversations.length > 0) {
      // If no athlete in URL, select the first conversation by default
      setSelectedChat(mockConversations[0].id);
    }
  }, [searchParams, toast]);
  
  // Scroll to bottom whenever messages change or a chat is selected
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat, messages]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    // Create new message
    const newMsg = {
      id: Date.now(),
      sent: true,
      text: newMessage,
      time: format(new Date(), 'h:mm a'),
      timestamp: new Date().toISOString(),
    };
    
    // Add message to current chat
    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg]
    }));
    
    // Update last message in conversation list
    setConversations(prev => 
      prev.map(convo => 
        convo.id === selectedChat
          ? { 
              ...convo, 
              lastMessage: newMessage,
              time: 'Just now',
              timestamp: new Date().toISOString(),
              unread: 0
            }
          : convo
      )
    );
    
    // Clear input
    setNewMessage('');
    
    // In a real app, we would save the message to the database here
    console.log('Sending message:', newMessage, 'to chat:', selectedChat);
  };

  // Handle selecting a chat and marking as read
  const handleSelectChat = (chatId: number) => {
    setSelectedChat(chatId);
    
    // Mark as read
    setConversations(prev => 
      prev.map(convo => 
        convo.id === chatId
          ? { ...convo, unread: 0 }
          : convo
      )
    );
  };
  
  // View profile of current chat partner
  const handleViewProfile = () => {
    const selectedConversation = conversations.find(c => c.id === selectedChat);
    if (selectedConversation && selectedConversation.user.id.startsWith('athlete_')) {
      const athleteId = selectedConversation.user.id;
      navigate(`/athlete/${athleteId}`);
    } else {
      toast({
        title: "Profile not available",
        description: "User profile cannot be viewed at this time",
      });
    }
  };
  
  // Start a new conversation
  const handleNewConversation = () => {
    // In a real app, this would open a user search/select dialog
    toast({
      title: "Feature coming soon",
      description: "New conversation functionality will be available soon",
    });
  };
  
  // Filter conversations based on search term
  const filteredConversations = conversations.filter(convo => 
    convo.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Helper function to format message time
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // If it's today, show time only
    if (date.toDateString() === now.toDateString()) {
      return format(date, 'h:mm a');
    }
    
    // If it's within the last week, show day name
    if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return format(date, 'EEE, h:mm a');
    }
    
    // Otherwise show full date
    return format(date, 'MMM d, h:mm a');
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-[calc(100vh-12rem)]">
      {/* Conversations list */}
      <div className="md:col-span-1 space-y-4 flex flex-col">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 bg-gray-800 border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Messages</h3>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handleNewConversation}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <Card className="border-gray-700 bg-card divide-y divide-gray-700 flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(100vh-16rem)]">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((convo) => (
                <div 
                  key={convo.id}
                  className={`p-3 cursor-pointer hover:bg-gray-800 transition-colors ${
                    selectedChat === convo.id ? 'bg-gray-800' : ''
                  }`}
                  onClick={() => handleSelectChat(convo.id)}
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
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2 text-xs">
                          {convo.user.role}
                        </Badge>
                        <p className="text-sm text-gray-400 truncate">{convo.lastMessage}</p>
                      </div>
                    </div>
                    {convo.unread > 0 && (
                      <Badge className="bg-athlex-accent hover:bg-athlex-accent/90 ml-2">
                        {convo.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-400">
                <User className="mx-auto h-8 w-8 mb-2 text-gray-500" />
                <p>No conversations match your search</p>
              </div>
            )}
          </ScrollArea>
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
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {conversations.find(c => c.id === selectedChat)?.user.role}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {conversations.find(c => c.id === selectedChat)?.user.sport}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" onClick={handleViewProfile}>
                  View Profile <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Messages area */}
            <ScrollArea className="flex-1 p-4">
              {(messages[selectedChat] || []).length > 0 ? (
                <div className="space-y-4">
                  {(messages[selectedChat] || []).map((message) => (
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
                        }`}>{formatMessageTime(message.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <p>No messages yet</p>
                    <p className="text-sm mt-1">Start the conversation!</p>
                  </div>
                </div>
              )}
            </ScrollArea>
            
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
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button 
                    size="icon" 
                    className="h-8 w-8 absolute right-1 top-1 bg-athlex-accent hover:bg-athlex-accent/90"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
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
              <Button className="mt-4" onClick={handleNewConversation}>
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
