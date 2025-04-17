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
import MvpAthleteDetail from '@/components/mvp/MvpAthleteDetail';
import ScoutLayout from '@/layouts/ScoutLayout';
import { useUserRole } from '@/contexts/UserRoleContext';
import { 
  shortlistedAthletesMock, 
  recommendedAthletesMock, 
  allAthletesMock, 
  messagesMock,
  addToShortlist,
  removeFromShortlist,
  sendMessage
} from '@/utils/athleteUtils';

// Add interface for MvpAthlete that extends AthleteWithConnectionStatus
interface MvpAthlete extends AthleteWithConnectionStatus {
  age: number;
  tacticalRole: string;
  image: string;
  stats: {
    [key: string]: number;
  };
  positionAverage: number;
}

// Add interface for Message
interface Message {
  from: string;
  to: string;
  message: string;
}

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
  const [activeTab, setActiveTab] = useState('shortlisted');
  
  // Updated the state type to AthleteWithConnectionStatus which requires connection_status
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteWithConnectionStatus | null>(null);

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

  // Transform athletes to MvpAthlete type when setting selected athlete
  const handleOpenAthleteDetail = (athlete: AthleteWithConnectionStatus) => {
    const mvpAthlete: MvpAthlete = {
      ...athlete,
      age: 23, // Default value
      tacticalRole: athlete.position || 'Unknown',
      image: athlete.profile_photo || '',
      stats: {
        pace: 85,
        shooting: 80,
        passing: 82,
        dribbling: 78,
        defending: 75,
        physical: 83
      },
      positionAverage: 80
    };
    setSelectedAthlete(mvpAthlete);
  };

  // Transform messages to correct Message type
  const transformedMessages: Message[] = messagesMock.map(msg => ({
    from: msg.senderId,
    to: msg.recipientId,
    message: msg.text
  }));

  return (
    <ScoutLayout>
      <div className="max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Athletes List */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Welcome, {currentUser.name}</h1>
                <p className="text-athlex-gray-400">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
              <TabsList className="bg-athlex-gray-800 w-full md:w-auto mb-4">
                <TabsTrigger value="shortlisted">Shortlisted Athletes</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="all">All Athletes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="shortlisted" className="space-y-6">
                <ShortlistedAthletesSection
                  athletes={shortlistedAthletes}
                  isLoading={isLoadingShortlisted}
                  onRemoveFromShortlist={handleRemoveFromShortlist}
                  onOpenChat={handleOpenChat}
                  onSelectAthlete={handleOpenAthleteDetail}
                />
              </TabsContent>
              
              <TabsContent value="recommended" className="space-y-6">
                <RecommendedAthletesSection
                  athletes={recommendedAthletes}
                  isLoading={isLoadingRecommended}
                  onAddToShortlist={handleAddToShortlist}
                  onSelectAthlete={handleOpenAthleteDetail}
                />
              </TabsContent>
              
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
                  onSelectAthlete={handleOpenAthleteDetail}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Athlete Detail */}
          <div className="lg:border-l lg:border-athlex-gray-800 lg:pl-6">
            {selectedAthlete ? (
              <MvpAthleteDetail athlete={selectedAthlete} />
            ) : (
              <div className="flex items-center justify-center h-full min-h-[400px] text-gray-400">
                Select an athlete to view details
              </div>
            )}
          </div>
        </div>
      </div>
      
      {isChatOpen && (
        <ChatPanel
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          currentUser={currentUser}
          chatPartner={selectedAthlete}
          messages={transformedMessages}
          onSendMessage={handleSendMessage}
        />
      )}
    </ScoutLayout>
  );
};

export default ScoutDashboard;
