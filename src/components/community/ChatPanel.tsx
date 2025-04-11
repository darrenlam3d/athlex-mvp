
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { User } from './UserCard';

interface Message {
  from: string;
  to: string;
  timestamp: string;
  message: string;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: { id: string; name: string; profile_photo?: string };
  chatPartner: User | null;
  messages: Message[];
  onSendMessage: (to: string, message: string) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  isOpen,
  onClose,
  currentUser,
  chatPartner,
  messages,
  onSendMessage
}) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() && chatPartner) {
      onSendMessage(chatPartner.id, newMessage.trim());
      setNewMessage('');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md bg-athlex-gray-900 border-athlex-gray-800 text-white">
        {chatPartner && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={chatPartner.profile_photo} alt={chatPartner.name} />
                  <AvatarFallback className="bg-athlex-accent/20 text-athlex-accent">
                    {getInitials(chatPartner.name)}
                  </AvatarFallback>
                </Avatar>
                {chatPartner.name}
              </DialogTitle>
            </DialogHeader>
            
            <ScrollArea className="h-[300px] px-1">
              <div className="space-y-4 py-3">
                {messages
                  .filter(msg => 
                    (msg.from === currentUser.id && msg.to === chatPartner.id) || 
                    (msg.from === chatPartner.id && msg.to === currentUser.id)
                  )
                  .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                  .map((message, index) => {
                    const isFromMe = message.from === currentUser.id;
                    return (
                      <div 
                        key={index} 
                        className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${isFromMe ? 'bg-athlex-accent/20 text-white' : 'bg-athlex-gray-800 text-white'} rounded-lg px-4 py-2`}>
                          <p>{message.message}</p>
                          <span className="text-xs opacity-70 block mt-1">
                            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </ScrollArea>
            
            <DialogFooter className="flex-row items-center space-x-2">
              <Input 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 border-athlex-gray-700 bg-athlex-gray-800 text-white"
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon"
                disabled={!newMessage.trim()}
                className="bg-athlex-accent hover:bg-athlex-accent/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChatPanel;
