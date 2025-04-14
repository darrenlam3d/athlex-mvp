import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatPanel from '@/components/community/ChatPanel';
import { Athlete, AthleteWithConnectionStatus } from '@/components/scouting/AthleteCard';
import ShortlistedAthletesSection from '@/components/scouting/ShortlistedAthletesSection';
import RecommendedAthletesSection from '@/components/scouting/RecommendedAthletesSection';
import AllAthletesSection from '@/components/scouting/AllAthletesSection';
import { 
  shortlistedAthletesMock, 
  recommendedAthletesMock, 
  allAthletesMock, 
  messagesMock,
  addToShortlist,
  removeFromShortlist,
  sendMessage
} from '@/utils/athleteUtils';
import ScoutLayout from '@/layouts/ScoutLayout';
import { useUserRole } from '@/contexts/UserRoleContext';

const ScoutDashboard = () => {
  const { toast: uiToast } = useToast();
  const { userRole, setUserRole } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [selectedAgeRange, setSelectedAgeRange] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('shortlisted'); // Default tab
  
  // Force user role to be scout for this page
  useEffect(() => {
    if (userRole !== 'scout') {
      setUserRole('scout');
    }
  }, [userRole, setUserRole]);
  
  // Handle URL hash changes
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'shortlist' || hash === 'recommended' || hash === 'all') {
      setActiveTab(hash === 'shortlist' ? 'shortlisted' : hash);
    }
  }, [location.hash]);
  
  // Handle tab changes
  const handleTabChange = (value) => {
    setActiveTab(value);
    const hash = value === 'shortlisted' ? 'shortlist' : value;
    navigate(`/scout-dashboard#${hash}`, { replace: true });
  };
  
  // Updated the state type to AthleteWithConnectionStatus which requires connection_status
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteWithConnectionStatus | null>(null);
  
  // Current user mock (would come from Supabase auth in a real app)
  const currentUser = {
    id: "scout_001",
    name: "Alex Taylor",
    profile_photo: null
  };
  
  // Fetch shortlisted athletes
  const { data: shortlistedAthletes, isLoading: isLoadingShortlisted } = useQuery({
    queryKey: ['shortlistedAthletes'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return shortlistedAthletesMock;
      }
      
      // For real Supabase implementation (not implemented in demo mode)
      console.log('Would fetch shortlisted athletes from Supabase if configured');
      return shortlistedAthletesMock;
    }
  });
  
  // Fetch recommended athletes
  const { data: recommendedAthletes, isLoading: isLoadingRecommended } = useQuery({
    queryKey: ['recommendedAthletes'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return recommendedAthletesMock;
      }
      
      // For real Supabase implementation (not implemented in demo mode)
      console.log('Would fetch recommended athletes from Supabase if configured');
      return recommendedAthletesMock;
    }
  });
  
  // Fetch all athletes
  const { data: allAthletes, isLoading: isLoadingAll } = useQuery({
    queryKey: ['allAthletes', selectedSport, selectedPosition, selectedAgeRange, selectedGender],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return allAthletesMock;
      }
      
      // For real Supabase implementation (not implemented in demo mode)
      console.log('Would fetch all athletes from Supabase if configured');
      return allAthletesMock;
    }
  });
  
  // Handle adding an athlete to shortlist
  const handleAddToShortlist = async (athleteId: string) => {
    const success = await addToShortlist(athleteId, currentUser.id);
    if (!success) {
      uiToast({
        title: 'Error',
        description: 'Could not add athlete to shortlist',
        variant: 'destructive'
      });
    }
  };
  
  // Handle removing an athlete from shortlist
  const handleRemoveFromShortlist = async (athleteId: string) => {
    const success = await removeFromShortlist(athleteId, currentUser.id);
    if (!success) {
      uiToast({
        title: 'Error',
        description: 'Could not remove athlete from shortlist',
        variant: 'destructive'
      });
    }
  };
  
  // Handle opening chat with an athlete
  const handleOpenChat = (athleteId: string) => {
    const athlete = shortlistedAthletes?.find(a => a.id === athleteId) || null;
    if (athlete) {
      // Create a new object with required connection_status
      const athleteWithConnectionStatus: AthleteWithConnectionStatus = {
        ...athlete,
        connection_status: 'connected' 
      };
      setSelectedAthlete(athleteWithConnectionStatus);
      setIsChatOpen(true);
    }
  };
  
  // Handle sending a message
  const handleSendMessage = async (to: string, message: string) => {
    const success = await sendMessage(currentUser.id, to, message);
    if (!success) {
      uiToast({
        title: 'Error',
        description: 'Could not send message',
        variant: 'destructive'
      });
    }
  };

  return (
    <ScoutLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Welcome, {currentUser.name}</h1>
          
          <div className="mt-2 md:mt-0 flex items-center gap-2">
            <span className="text-sm text-athlex-gray-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>
        
        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
          <TabsList className="bg-athlex-gray-800 w-full md:w-auto mb-4">
            <TabsTrigger value="shortlisted" className="flex-1">Shortlisted Athletes</TabsTrigger>
            <TabsTrigger value="recommended" className="flex-1">Recommended</TabsTrigger>
            <TabsTrigger value="all" className="flex-1">All Athletes</TabsTrigger>
          </TabsList>
          
          {/* Shortlisted Athletes Tab */}
          <TabsContent value="shortlisted" className="space-y-6">
            <ShortlistedAthletesSection
              athletes={shortlistedAthletes}
              isLoading={isLoadingShortlisted}
              onRemoveFromShortlist={handleRemoveFromShortlist}
              onOpenChat={handleOpenChat}
            />
          </TabsContent>
          
          {/* Recommended Athletes Tab */}
          <TabsContent value="recommended" className="space-y-6">
            <RecommendedAthletesSection
              athletes={recommendedAthletes}
              isLoading={isLoadingRecommended}
              onAddToShortlist={handleAddToShortlist}
            />
          </TabsContent>
          
          {/* All Athletes Tab */}
          <TabsContent value="all" className="space-y-6">
            <AllAthletesSection
              athletes={allAthletes || []}
              isLoading={isLoadingAll}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedSport={selectedSport}
              onSportChange={setSelectedSport}
              selectedPosition={selectedPosition}
              onPositionChange={setSelectedPosition}
              selectedAgeRange={selectedAgeRange}
              onAgeRangeChange={setSelectedAgeRange}
              selectedGender={selectedGender}
              onGenderChange={setSelectedGender}
              onAddToShortlist={handleAddToShortlist}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Chat Panel */}
      <ChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentUser={currentUser}
        chatPartner={selectedAthlete}
        messages={messagesMock}
        onSendMessage={handleSendMessage}
      />
    </ScoutLayout>
  );
};

export default ScoutDashboard;
