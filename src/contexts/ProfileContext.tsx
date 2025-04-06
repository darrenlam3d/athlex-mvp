
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the profile data structure
export interface ProfileData {
  firstName: string;
  lastName: string;
  sport: string;
  position: string;
  preferredFoot?: string;
  jerseyNumber?: string;
  tacticalRole?: string;
  playerRating?: string;
  bio?: string;
  strengths?: string[];
  developmentGoals?: string[];
  height?: number;
  weight?: number;
  age?: number;
  verified?: boolean;
  profileImage?: string;
}

interface ProfileContextType {
  profileData: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
}

const defaultProfileData: ProfileData = {
  firstName: 'Alex',
  lastName: 'Thompson',
  sport: 'Football',
  position: 'CM',
  preferredFoot: 'Right',
  jerseyNumber: '8',
  tacticalRole: 'Roaming Playmaker',
  playerRating: '8.7',
  bio: 'Central midfielder with 8 years of experience. Strong in possession with good vision and passing range. Looking to improve defensive positioning and aerial ability.',
  strengths: ['Strong passing range', 'Exceptional vision', 'High work rate'],
  developmentGoals: ['Aerial ability', 'Shooting from distance', 'Defensive positioning'],
  height: 183,
  weight: 76,
  age: 23,
  verified: true,
  profileImage: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21'
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData);

  const updateProfile = (data: Partial<ProfileData>) => {
    setProfileData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
