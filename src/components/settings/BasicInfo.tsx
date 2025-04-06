
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, Camera, Save } from 'lucide-react';

const BasicInfo = () => {
  return (
    <div className="space-y-6">
      <Card className="border-gray-700 bg-card">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="text-center">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-2 border-athlex-accent">
                  <AvatarImage src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21" alt="Alex Thompson" />
                  <AvatarFallback>AT</AvatarFallback>
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
                  <Input id="firstName" defaultValue="Alex" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Thompson" className="bg-gray-800 border-gray-700" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="alex.thompson@example.com" className="bg-gray-800 border-gray-700" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Birth Date</Label>
                  <Input 
                    id="birthdate" 
                    type="date" 
                    defaultValue="2001-05-15" 
                    className="bg-gray-800 border-gray-700" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" type="number" defaultValue="183" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" type="number" defaultValue="76" className="bg-gray-800 border-gray-700" />
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
              placeholder="Write a short bio..." 
              defaultValue="Central midfielder with 8 years of experience. Strong in possession with good vision and passing range. Looking to improve defensive positioning and aerial ability."
              className="bg-gray-800 border-gray-700 resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" defaultValue="London, United Kingdom" className="bg-gray-800 border-gray-700" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+44 20 1234 5678" className="bg-gray-800 border-gray-700" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input id="nationality" defaultValue="British" className="bg-gray-800 border-gray-700" />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button>
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
