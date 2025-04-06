
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, Camera, Save } from 'lucide-react';
import { useProfile } from '@/contexts/ProfileContext';
import { useToast } from '@/hooks/use-toast';

const BasicInfo = () => {
  const { profileData, updateProfile } = useProfile();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    email: 'alex.thompson@example.com',
    birthdate: '2001-05-15',
    height: profileData.height?.toString() || '',
    weight: profileData.weight?.toString() || '',
    bio: profileData.bio || '',
    location: 'London, United Kingdom',
    phone: '+44 20 1234 5678',
    nationality: 'British',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    // Update profile context
    updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      height: parseInt(formData.height),
      weight: parseInt(formData.weight),
      bio: formData.bio,
    });

    // Show success toast
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const getInitials = () => {
    return `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`;
  };

  return (
    <div className="space-y-6">
      <Card className="border-gray-700 bg-card">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="text-center">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-2 border-athlex-accent">
                  <AvatarImage src={profileData.profileImage} alt={`${formData.firstName} ${formData.lastName}`} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-athlex-accent rounded-full p-1.5 border-2 border-gray-800">
                  <Camera className="h-4 w-4" />
                </button>
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-xs text-white">Change</span>
                </div>
              </div>
              <p className="text-sm mt-2">Profile Image</p>
              
              <div className="mt-4">
                <Badge className="bg-green-600 hover:bg-green-700">
                  <Check className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
              </div>
            </div>
            
            <div className="flex-1 w-full space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-700" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Birth Date</Label>
                  <Input 
                    id="birthdate" 
                    type="date" 
                    value={formData.birthdate} 
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height" 
                    type="number" 
                    value={formData.height} 
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    value={formData.weight} 
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700" 
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-gray-700 bg-card">
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              rows={4}
              value={formData.bio} 
              onChange={handleChange}
              placeholder="Write a short bio..." 
              className="bg-gray-800 border-gray-700 resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              value={formData.location} 
              onChange={handleChange}
              className="bg-gray-800 border-gray-700" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={formData.phone} 
                onChange={handleChange}
                className="bg-gray-800 border-gray-700" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input 
                id="nationality" 
                value={formData.nationality} 
                onChange={handleChange}
                className="bg-gray-800 border-gray-700" 
              />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button onClick={handleSubmit}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInfo;
