
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

interface ProfilePhotoProps {
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
}

const ProfilePhoto = ({ avatarUrl, firstName, lastName }: ProfilePhotoProps) => {
  return (
    <div className="mb-6 flex items-center gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={avatarUrl} alt={firstName} />
        <AvatarFallback className="bg-athlex-gray-800 text-white">
          {firstName?.[0]}
          {lastName?.[0]}
        </AvatarFallback>
      </Avatar>
      <Button className="bg-athlex-accent hover:bg-athlex-accent-alt">
        <Camera className="mr-2 h-4 w-4" />
        Change Photo
      </Button>
    </div>
  );
};

export default ProfilePhoto;
