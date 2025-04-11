
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, UserPlus, Clock } from "lucide-react";
import { toast } from "sonner";

export interface User {
  id: string;
  name: string;
  sport: string;
  position?: string;
  school?: string;
  club?: string;
  profile_photo?: string;
  connection_status: "not_connected" | "pending" | "connected";
}

interface UserCardProps {
  user: User;
  onConnect: (userId: string) => void;
  onOpenChat: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onConnect, onOpenChat }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const handleConnect = () => {
    if (user.connection_status === "not_connected") {
      onConnect(user.id);
      toast.success(`Connection request sent to ${user.name}`);
    }
  };

  const handleOpenChat = () => {
    if (user.connection_status === "connected") {
      onOpenChat(user.id);
    }
  };

  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800 overflow-hidden hover:border-athlex-accent/50 transition-colors">
      <CardContent className="p-5">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="w-20 h-20 mb-3">
            <AvatarImage src={user.profile_photo} alt={user.name} />
            <AvatarFallback className="bg-athlex-accent/20 text-athlex-accent">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <div className="text-sm text-athlex-gray-400 mt-1">
            {user.sport}{user.position ? ` • ${user.position}` : ''}
          </div>
          {(user.school || user.club) && (
            <div className="text-sm text-athlex-gray-500 mt-1">
              {user.school || user.club}
            </div>
          )}
        </div>
        
        <div className="mt-4">
          {user.connection_status === "not_connected" && (
            <Button 
              onClick={handleConnect} 
              variant="outline" 
              className="w-full border-athlex-accent text-athlex-accent hover:bg-athlex-accent/10"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Connect
            </Button>
          )}
          
          {user.connection_status === "pending" && (
            <Button 
              disabled 
              variant="outline" 
              className="w-full border-yellow-500 text-yellow-500"
            >
              <Clock className="mr-2 h-4 w-4" />
              Pending
            </Button>
          )}
          
          {user.connection_status === "connected" && (
            <Button 
              onClick={handleOpenChat} 
              variant="outline" 
              className="w-full border-athlex-accent text-athlex-accent hover:bg-athlex-accent/10"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
