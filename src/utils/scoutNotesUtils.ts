
import { supabase } from '@/lib/supabase';
import { isSupabaseConfigured } from '@/lib/supabase';
import { toast } from 'sonner';

export interface ScoutNote {
  note_id: string;
  athlete_id: string;
  athlete_name: string;
  profile_photo: string | null;
  sport: string;
  position: string;
  club: string;
  date: string;
  note: string;
}

// Mock data for scout notes
export const scoutNotesMock: ScoutNote[] = [
  {
    note_id: "note_001",
    athlete_id: "athlete_004",
    athlete_name: "Arif Rahman",
    profile_photo: null,
    sport: "Football",
    position: "Striker",
    club: "Tampines Elite",
    date: "2025-04-10",
    note: "Quick on the turn. Strong in 1v1s. Needs work on aerial control and hold-up play."
  },
  {
    note_id: "note_002",
    athlete_id: "athlete_005",
    athlete_name: "Lena Koh",
    profile_photo: null,
    sport: "Netball",
    position: "Wing Attack",
    club: "Civic Blaze",
    date: "2025-04-08",
    note: "High stamina and good vision. Makes sharp cuts. Could improve shooting under pressure."
  },
  {
    note_id: "note_003",
    athlete_id: "athlete_006",
    athlete_name: "Javier Chua",
    profile_photo: null,
    sport: "Football",
    position: "Right Back",
    club: "Harbour FC",
    date: "2025-04-05",
    note: "Good positional awareness. Reads the game well. Could improve his crossing accuracy."
  },
  {
    note_id: "note_004",
    athlete_id: "athlete_004",
    athlete_name: "Arif Rahman",
    profile_photo: null,
    sport: "Football",
    position: "Striker",
    club: "Tampines Elite",
    date: "2025-04-02",
    note: "Impressive performance in the match against Eastern FC. Scored two goals and provided an assist."
  }
];

// Fetch scout notes from Supabase or return mock data
export const fetchScoutNotes = async (scoutId: string): Promise<ScoutNote[]> => {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('scout_notes')
        .select('*')
        .eq('scout_id', scoutId)
        .order('date', { ascending: false });
        
      if (error) throw error;
      return data || [];
    }
    
    // Return mock data if Supabase is not configured
    return scoutNotesMock;
  } catch (error) {
    console.error('Error fetching scout notes:', error);
    return scoutNotesMock;
  }
};

// Save a note (create or update)
export const saveScoutNote = async (note: Partial<ScoutNote>, scoutId: string): Promise<boolean> => {
  try {
    if (isSupabaseConfigured()) {
      if (note.note_id) {
        // Update existing note
        const { error } = await supabase
          .from('scout_notes')
          .update({
            note: note.note,
            date: new Date().toISOString().split('T')[0]
          })
          .eq('note_id', note.note_id)
          .eq('scout_id', scoutId);
          
        if (error) throw error;
      } else {
        // Create new note
        const { error } = await supabase
          .from('scout_notes')
          .insert({
            scout_id: scoutId,
            athlete_id: note.athlete_id,
            note: note.note,
            date: new Date().toISOString().split('T')[0]
          });
          
        if (error) throw error;
      }
    }
    
    toast.success(note.note_id ? 'Note updated successfully' : 'Note created successfully');
    return true;
  } catch (error) {
    console.error('Error saving scout note:', error);
    toast.error('Failed to save note');
    return false;
  }
};

// Delete a note
export const deleteScoutNote = async (noteId: string, scoutId: string): Promise<boolean> => {
  try {
    if (isSupabaseConfigured()) {
      const { error } = await supabase
        .from('scout_notes')
        .delete()
        .eq('note_id', noteId)
        .eq('scout_id', scoutId);
        
      if (error) throw error;
    }
    
    toast.success('Note deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting scout note:', error);
    toast.error('Failed to delete note');
    return false;
  }
};
