
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { toast } from 'sonner';
import AthleteCard, { Athlete } from '@/components/scouting/AthleteCard';
import ScoutingFilters from '@/components/scouting/ScoutingFilters';
import ChatPanel from '@/components/community/ChatPanel';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { isSupabaseConfigured } from '@/lib/supabase';

// Mock data for shortlisted athletes
const shortlistedAthletesMock: Athlete[] = [
  {
    id: "athlete_004",
    name: "Arif Rahman",
    sport: "Football",
    position: "Striker",
    club: "Tampines Elite",
    recent_speed_kmh: 25.4,
    profile_photo: "https://example.com/uploads/arif.jpg"
  },
  {
    id: "athlete_005",
    name: "Lena Koh",
    sport: "Netball",
    position: "Wing Attack",
    club: "Civic Blaze",
    recent_speed_kmh: 23.8,
    profile_photo: "https://example.com/uploads/lena.jpg"
  }
];

// Mock data for recommended athletes
const recommendedAthletesMock: Athlete[] = [
  {
    id: "athlete_006",
    name: "Javier Chua",
    sport: "Football",
    position: "Right Back",
    club: "Harbour FC",
    performance_score: 92,
    profile_photo: "https://example.com/uploads/javier.jpg"
  },
  {
    id: "athlete_007",
    name: "Meera Das",
    sport: "Badminton",
    position: "Singles",
    club: "Smashers Academy",
    performance_score: 89,
    profile_photo: "https://example.com/uploads/meera.jpg"
  }
];

// Mock data for all athletes (combination and more)
const allAthletesMock: Athlete[] = [
  ...shortlistedAthletesMock,
  ...recommendedAthletesMock,
  {
    id: "athlete_008",
    name: "Tai Wee Lin",
    sport: "Swimming",
    position: "Freestyle",
    club: "Aquatics Centre",
    performance_score: 85,
    profile_photo: null
  },
  {
    id: "athlete_009",
    name: "Marcus Tan",
    sport: "Basketball",
    position: "Point Guard",
    club: "Downtown Dribblers",
    performance_score: 88,
    profile_photo: null
  }
];

// Mock messages for the chat panel
const messagesMock = [
  {
    from: "scout_001",
    to: "athlete_004",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    message: "Hi Arif, I saw your last match. Impressive performance!"
  },
  {
    from: "athlete_004",
    to: "scout_001",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    message: "Thank you! I've been working on my finishing technique."
  }
];

const ScoutDashboard = () => {
  const { toast: uiToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [selectedAgeRange, setSelectedAgeRange] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  
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
      
      try {
        const { data, error } = await supabase
          .from('shortlists')
          .select('athlete_id')
          .eq('scout_id', currentUser.id);
          
        if (error) throw error;
        
        // Fetch the actual athlete data
        const athletePromises = data.map(async (item) => {
          const { data: athleteData, error: athleteError } = await supabase
            .from('users')
            .select('*')
            .eq('id', item.athlete_id)
            .single();
            
          if (athleteError) throw athleteError;
          return athleteData;
        });
        
        return await Promise.all(athletePromises);
      } catch (error) {
        console.error('Error fetching shortlisted athletes:', error);
        return shortlistedAthletesMock;
      }
    }
  });
  
  // Fetch recommended athletes
  const { data: recommendedAthletes, isLoading: isLoadingRecommended } = useQuery({
    queryKey: ['recommendedAthletes'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return recommendedAthletesMock;
      }
      
      try {
        // In a real app, this would be a more complex query based on performance metrics
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('role', 'athlete')
          .order('performance_score', { ascending: false })
          .limit(5);
          
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error fetching recommended athletes:', error);
        return recommendedAthletesMock;
      }
    }
  });
  
  // Fetch all athletes
  const { data: allAthletes, isLoading: isLoadingAll } = useQuery({
    queryKey: ['allAthletes', selectedSport, selectedPosition, selectedAgeRange, selectedGender],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return allAthletesMock;
      }
      
      try {
        let query = supabase
          .from('users')
          .select('*')
          .eq('role', 'athlete');
          
        // Apply filters
        if (selectedSport !== 'all') {
          query = query.eq('sport', selectedSport);
        }
        
        if (selectedPosition !== 'all') {
          query = query.eq('position', selectedPosition);
        }
        
        // Age range would require additional logic with birth dates
        
        if (selectedGender !== 'all') {
          query = query.eq('gender', selectedGender);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error fetching all athletes:', error);
        return allAthletesMock;
      }
    }
  });
  
  // Handle adding an athlete to shortlist
  const handleAddToShortlist = async (athleteId: string) => {
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase
          .from('shortlists')
          .insert({
            scout_id: currentUser.id,
            athlete_id: athleteId,
            created_at: new Date().toISOString()
          });
          
        if (error) throw error;
      }
      
      toast.success('Athlete added to shortlist');
    } catch (error) {
      console.error('Error adding to shortlist:', error);
      uiToast({
        title: 'Error',
        description: 'Could not add athlete to shortlist',
        variant: 'destructive'
      });
    }
  };
  
  // Handle removing an athlete from shortlist
  const handleRemoveFromShortlist = async (athleteId: string) => {
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase
          .from('shortlists')
          .delete()
          .eq('scout_id', currentUser.id)
          .eq('athlete_id', athleteId);
          
        if (error) throw error;
      }
      
      toast.success('Athlete removed from shortlist');
    } catch (error) {
      console.error('Error removing from shortlist:', error);
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
      // Set a default connection_status for the athlete when opening chat
      const athleteWithConnectionStatus = {
        ...athlete,
        connection_status: 'connected' as const
      };
      setSelectedAthlete(athleteWithConnectionStatus);
      setIsChatOpen(true);
    }
  };
  
  // Handle sending a message
  const handleSendMessage = async (to: string, message: string) => {
    try {
      const newMessage = {
        from: currentUser.id,
        to,
        message,
        timestamp: new Date().toISOString()
      };
      
      if (isSupabaseConfigured()) {
        const { error } = await supabase
          .from('messages')
          .insert(newMessage);
          
        if (error) throw error;
      }
      
      // For the mockup, we'd add it to our local state
      // A real app would use subscription or refetch
    } catch (error) {
      console.error('Error sending message:', error);
      uiToast({
        title: 'Error',
        description: 'Could not send message',
        variant: 'destructive'
      });
    }
  };
  
  // Filter athletes by search term
  const filteredAthletes = allAthletes?.filter(athlete => 
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (athlete.sport && athlete.sport.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (athlete.position && athlete.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (athlete.club && athlete.club.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
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
              <Tabs defaultValue="shortlisted" className="mb-6">
                <TabsList className="bg-athlex-gray-800 w-full md:w-auto mb-4">
                  <TabsTrigger value="shortlisted" className="flex-1">Shortlisted Athletes</TabsTrigger>
                  <TabsTrigger value="recommended" className="flex-1">Recommended</TabsTrigger>
                  <TabsTrigger value="all" className="flex-1">All Athletes</TabsTrigger>
                </TabsList>
                
                {/* Shortlisted Athletes Tab */}
                <TabsContent value="shortlisted" className="space-y-6">
                  <Card className="bg-athlex-gray-900 border-athlex-gray-800">
                    <CardHeader>
                      <CardTitle>Shortlisted Athletes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoadingShortlisted ? (
                        <div className="text-center py-8">Loading shortlisted athletes...</div>
                      ) : shortlistedAthletes && shortlistedAthletes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {shortlistedAthletes.map((athlete) => (
                            <AthleteCard
                              key={athlete.id}
                              athlete={athlete}
                              type="shortlisted"
                              onRemoveFromShortlist={handleRemoveFromShortlist}
                              onOpenChat={handleOpenChat}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-athlex-gray-400">
                          <p>You haven't shortlisted any athletes yet.</p>
                          <p className="mt-2">Browse the "Recommended" or "All Athletes" tabs to find talent.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Recommended Athletes Tab */}
                <TabsContent value="recommended" className="space-y-6">
                  <Card className="bg-athlex-gray-900 border-athlex-gray-800">
                    <CardHeader>
                      <CardTitle>Recommended Athletes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoadingRecommended ? (
                        <div className="text-center py-8">Loading recommended athletes...</div>
                      ) : recommendedAthletes && recommendedAthletes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {recommendedAthletes.map((athlete) => (
                            <AthleteCard
                              key={athlete.id}
                              athlete={athlete}
                              type="recommended"
                              onAddToShortlist={handleAddToShortlist}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-athlex-gray-400">
                          <p>No recommended athletes available at this time.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* All Athletes Tab */}
                <TabsContent value="all" className="space-y-6">
                  {/* Filters */}
                  <ScoutingFilters
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
                  />
                  
                  <Card className="bg-athlex-gray-900 border-athlex-gray-800">
                    <CardHeader>
                      <CardTitle>All Athletes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoadingAll ? (
                        <div className="text-center py-8">Loading athletes...</div>
                      ) : filteredAthletes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredAthletes.map((athlete) => (
                            <AthleteCard
                              key={athlete.id}
                              athlete={athlete}
                              type="all"
                              onAddToShortlist={handleAddToShortlist}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-athlex-gray-400">
                          <p>No athletes match your search criteria.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarProvider>
      
      {/* Chat Panel */}
      <ChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentUser={currentUser}
        chatPartner={selectedAthlete}
        messages={messagesMock}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ScoutDashboard;
