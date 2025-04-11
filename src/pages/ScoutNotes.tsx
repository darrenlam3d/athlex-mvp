
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ScoutLayout from '@/layouts/ScoutLayout';
import { useUserRole } from '@/contexts/UserRoleContext';
import ScoutNotesFilter from '@/components/scouting/ScoutNotesFilter';
import ScoutNotesList from '@/components/scouting/ScoutNotesList';
import { fetchScoutNotes } from '@/utils/scoutNotesUtils';
import { FilePen } from 'lucide-react';

const ScoutNotes = () => {
  const { setUserRole } = useUserRole();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');
  
  // Force user role to be scout for this page
  useEffect(() => {
    setUserRole('scout');
  }, [setUserRole]);
  
  // Current user mock (would come from Supabase auth in a real app)
  const currentUser = {
    id: "scout_001",
    name: "Alex Taylor"
  };
  
  // Fetch scout notes
  const { data: scoutNotes, isLoading, refetch } = useQuery({
    queryKey: ['scoutNotes'],
    queryFn: async () => {
      return await fetchScoutNotes(currentUser.id);
    }
  });
  
  // Filter notes based on search and filter criteria
  const filteredNotes = scoutNotes?.filter(note => {
    const matchesSearch = searchTerm === '' || 
      note.athlete_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSport = selectedSport === 'all' || 
      note.sport.toLowerCase() === selectedSport;
    
    const matchesPosition = selectedPosition === 'all' || 
      note.position.toLowerCase() === selectedPosition;
    
    return matchesSearch && matchesSport && matchesPosition;
  }) || [];
  
  return (
    <ScoutLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-athlex-accent/20 p-2 rounded-lg">
              <FilePen size={24} className="text-athlex-accent" />
            </div>
            <h1 className="text-2xl font-bold">My Scouting Notes</h1>
          </div>
        </div>
        
        <ScoutNotesFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedSport={selectedSport}
          onSportChange={setSelectedSport}
          selectedPosition={selectedPosition}
          onPositionChange={setSelectedPosition}
        />
        
        {isLoading ? (
          <div className="text-center py-12 bg-athlex-gray-900 rounded-lg border border-athlex-gray-800">
            <p className="text-athlex-gray-400">Loading scout notes...</p>
          </div>
        ) : (
          <ScoutNotesList 
            notes={filteredNotes} 
            scoutId={currentUser.id}
            onNoteUpdated={refetch}
          />
        )}
      </div>
    </ScoutLayout>
  );
};

export default ScoutNotes;
