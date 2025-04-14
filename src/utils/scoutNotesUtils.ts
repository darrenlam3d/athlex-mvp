
import { useState } from 'react';
import { isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

// Types
export interface Note {
  id: string;
  scout_id: string;
  athlete_id: string;
  note: string;
  date: string;
}

// Extended type for Scout Note with athlete details
export interface ScoutNote {
  note_id: string;
  scout_id: string;
  scout_name: string;
  athlete_id: string;
  athlete_name: string;
  sport: string;
  position: string;
  club: string;
  note: string;
  date: string;
  profile_photo?: string;
}

// Mock notes with athlete information
const mockScoutNotes: ScoutNote[] = [
  {
    note_id: 'note_001',
    scout_id: 'scout_001',
    scout_name: 'Alex Taylor',
    athlete_id: 'athlete_004',
    athlete_name: 'David Rodriguez',
    sport: 'Football',
    position: 'Midfielder',
    club: 'FC Barcelona Academy',
    note: 'Shows excellent acceleration and ball control. Needs to work on left foot.',
    date: '2025-03-15',
    profile_photo: null
  },
  {
    note_id: 'note_002',
    scout_id: 'scout_001',
    scout_name: 'Alex Taylor',
    athlete_id: 'athlete_004',
    athlete_name: 'David Rodriguez',
    sport: 'Football',
    position: 'Midfielder',
    club: 'FC Barcelona Academy',
    note: 'Decision making has improved since last observation. Good positioning.',
    date: '2025-04-01',
    profile_photo: null
  },
  {
    note_id: 'note_003',
    scout_id: 'scout_001',
    scout_name: 'Alex Taylor',
    athlete_id: 'athlete_005',
    athlete_name: 'Emma Chen',
    sport: 'Basketball',
    position: 'Point Guard',
    club: 'Chicago Elite Academy',
    note: 'Excellent court vision and passing ability. Creates opportunities for teammates.',
    date: '2025-03-20',
    profile_photo: null
  }
];

// Convert ScoutNote to Note format for internal use
const convertToNote = (scoutNote: ScoutNote): Note => ({
  id: scoutNote.note_id,
  scout_id: scoutNote.scout_id,
  athlete_id: scoutNote.athlete_id,
  note: scoutNote.note,
  date: scoutNote.date
});

// Hook for managing scout notes
export const useScoutNotes = (athleteId: string, scoutId: string) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  
  // Fetch notes
  const fetchNotes = async () => {
    setIsLoading(true);
    
    try {
      if (isSupabaseConfigured()) {
        // This would use Supabase in a real implementation
        console.log('Would fetch notes from Supabase if configured', { athleteId, scoutId });
      }
      
      // Demo mode: Return mock notes filtered by athlete ID
      const filteredScoutNotes = mockScoutNotes.filter(note => note.athlete_id === athleteId);
      // Convert ScoutNote to Note format
      const filteredNotes = filteredScoutNotes.map(convertToNote);
      setNotes(filteredNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast({
        title: 'Error',
        description: 'Failed to load notes. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update note
  const updateNote = async (noteId: string, noteText: string) => {
    try {
      if (isSupabaseConfigured()) {
        // This would use Supabase in a real implementation
        console.log('Would update note in Supabase if configured', { noteId, noteText });
      }
      
      // Demo mode: Update note in the local state
      setNotes(prev => prev.map(note => 
        note.id === noteId ? { ...note, note: noteText } : note
      ));
      
      toast({
        title: 'Note updated',
        description: 'Your note has been updated successfully.',
      });
      
      return true;
    } catch (error) {
      console.error('Error updating note:', error);
      toast({
        title: 'Error',
        description: 'Failed to update note. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };
  
  // Add note
  const addNote = async (noteText: string) => {
    try {
      if (isSupabaseConfigured()) {
        // This would use Supabase in a real implementation
        console.log('Would add note to Supabase if configured', { scoutId, athleteId, noteText });
      }
      
      // Demo mode: Add note to the local state
      const newNote: Note = {
        id: `note_${Date.now()}`,
        scout_id: scoutId,
        athlete_id: athleteId,
        note: noteText,
        date: new Date().toISOString().split('T')[0]
      };
      
      setNotes(prev => [...prev, newNote]);
      
      toast({
        title: 'Note added',
        description: 'Your note has been added successfully.',
      });
      
      return true;
    } catch (error) {
      console.error('Error adding note:', error);
      toast({
        title: 'Error',
        description: 'Failed to add note. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };
  
  // Delete note
  const deleteNote = async (noteId: string) => {
    try {
      if (isSupabaseConfigured()) {
        // This would use Supabase in a real implementation
        console.log('Would delete note from Supabase if configured', { noteId });
      }
      
      // Demo mode: Remove note from the local state
      setNotes(prev => prev.filter(note => note.id !== noteId));
      
      toast({
        title: 'Note deleted',
        description: 'Your note has been deleted successfully.',
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete note. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };
  
  return {
    notes,
    isLoading,
    fetchNotes,
    addNote,
    updateNote,
    deleteNote
  };
};

// Fetch all scout notes for a scout
export const fetchScoutNotes = async (scoutId: string): Promise<ScoutNote[]> => {
  if (isSupabaseConfigured()) {
    // This would use Supabase in a real implementation
    console.log('Would fetch scout notes from Supabase if configured', { scoutId });
  }
  
  // Filter notes by scout ID for demo mode
  return mockScoutNotes.filter(note => note.scout_id === scoutId);
};

// Save note function for ScoutNoteCard
export const saveScoutNote = async (
  noteData: { note_id: string; note: string },
  scoutId: string
): Promise<boolean> => {
  try {
    if (isSupabaseConfigured()) {
      // This would use Supabase in a real implementation
      console.log('Would update note in Supabase if configured', { noteData, scoutId });
    }
    
    // In demo mode, we'll just return success
    console.log('Note updated in demo mode:', noteData);
    return true;
  } catch (error) {
    console.error('Error updating note:', error);
    return false;
  }
};

// Delete note function for ScoutNoteCard
export const deleteScoutNote = async (
  noteId: string,
  scoutId: string
): Promise<boolean> => {
  try {
    if (isSupabaseConfigured()) {
      // This would use Supabase in a real implementation
      console.log('Would delete note from Supabase if configured', { noteId, scoutId });
    }
    
    // In demo mode, we'll just return success
    console.log('Note deleted in demo mode:', noteId);
    return true;
  } catch (error) {
    console.error('Error deleting note:', error);
    return false;
  }
};

// Add note function (standalone version)
export const addScoutNote = async (
  data: { 
    scout_id: string; 
    athlete_id: string; 
    note: string;
  }
): Promise<boolean> => {
  try {
    if (isSupabaseConfigured()) {
      // This would use Supabase in a real implementation
      console.log('Would add note to Supabase if configured', data);
    }
    
    // In demo mode, we'll just return success
    console.log('Note added in demo mode:', data);
    return true;
  } catch (error) {
    console.error('Error adding note:', error);
    return false;
  }
};
