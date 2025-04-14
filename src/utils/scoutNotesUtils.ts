
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

// Mock notes
const mockNotes: Note[] = [
  {
    id: 'note_001',
    scout_id: 'scout_001',
    athlete_id: 'athlete_004',
    note: 'Shows excellent acceleration and ball control. Needs to work on left foot.',
    date: '2025-03-15'
  },
  {
    id: 'note_002',
    scout_id: 'scout_001',
    athlete_id: 'athlete_004',
    note: 'Decision making has improved since last observation. Good positioning.',
    date: '2025-04-01'
  }
];

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
      const filtered = mockNotes.filter(note => note.athlete_id === athleteId);
      setNotes(filtered);
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
