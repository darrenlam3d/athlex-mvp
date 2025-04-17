
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatPanel from '@/components/community/ChatPanel';
import ScoutLayout from '@/layouts/ScoutLayout';
import { useUserRole } from '@/contexts/UserRoleContext';
import ScoutWelcomeHeader from '@/components/scout-dashboard/ScoutWelcomeHeader';
import ScoutAthleteTabs from '@/components/scout-dashboard/ScoutAthleteTabs';
import { useScoutData } from '@/hooks/useScoutData';
import { useScoutActions } from '@/hooks/useScoutActions';
import MvpAthleteDetail from '@/components/mvp/MvpAthleteDetail';
import { messagesMock } from '@/utils/athleteUtils';

const ScoutDashboard = () => {
  const { userRole, setUserRole } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [selectedAgeRange, setSelectedAgeRange] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [activeTab, setActiveTab] = useState('shortlisted');

  // Current user mock (would come from Supabase auth in a real app)
  const currentUser = {
    id: "scout_001",
    name: "Alex Taylor",
    profile_photo: null
  };

  // Load data using custom hook
  const {
    shortlistedAthletes,
    isLoadingShortlisted,
    recommendedAthletes,
    isLoadingRecommended,
    allAthletes,
    isLoadingAll
  } = useScoutData();

  // Load actions using custom hook
  const {
    selectedAthlete,
    isChatOpen,
    setIsChatOpen,
    handleAddToShortlist,
    handleRemoveFromShortlist,
    handleOpenChat,
    handleSendMessage,
    handleOpenAthleteDetail
  } = useScoutActions(currentUser);

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
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const hash = value === 'shortlisted' ? 'shortlist' : value;
    navigate(`/scout-dashboard#${hash}`, { replace: true });
  };

  // Transform messages for the chat panel
  const transformedMessages = messagesMock.map(msg => ({
    from: msg.senderId,
    to: msg.recipientId,
    message: msg.text,
    timestamp: msg.timestamp || new Date().toISOString()
  }));

  return (
    <ScoutLayout>
      <div className="max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Athletes List */}
          <div>
            <ScoutWelcomeHeader userName={currentUser.name} />
            
            <ScoutAthleteTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              shortlistedAthletes={shortlistedAthletes}
              recommendedAthletes={recommendedAthletes}
              allAthletes={allAthletes}
              isLoadingShortlisted={isLoadingShortlisted}
              isLoadingRecommended={isLoadingRecommended}
              isLoadingAll={isLoadingAll}
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
              onRemoveFromShortlist={handleRemoveFromShortlist}
              onOpenChat={handleOpenChat}
              onSelectAthlete={handleOpenAthleteDetail}
            />
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
      
      {isChatOpen && selectedAthlete && (
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
