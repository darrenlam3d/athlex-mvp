
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import ScoutNoteCard from '@/components/scouting/ScoutNoteCard';
import { ScoutNote } from '@/utils/scoutNotesUtils';

interface ScoutNotesListProps {
  notes: ScoutNote[];
  scoutId: string;
  onNoteUpdated: () => void;
}

const ScoutNotesList: React.FC<ScoutNotesListProps> = ({ notes, scoutId, onNoteUpdated }) => {
  const groupNotesByAthlete = () => {
    const groupedNotes: Record<string, ScoutNote[]> = {};
    
    notes.forEach((note) => {
      if (!groupedNotes[note.athlete_id]) {
        groupedNotes[note.athlete_id] = [];
      }
      groupedNotes[note.athlete_id].push(note);
    });
    
    return Object.entries(groupedNotes).map(([athleteId, athleteNotes]) => ({
      athleteId,
      athleteName: athleteNotes[0].athlete_name,
      sport: athleteNotes[0].sport,
      position: athleteNotes[0].position,
      notes: athleteNotes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }));
  };
  
  const groupedNotes = groupNotesByAthlete();
  
  if (notes.length === 0) {
    return (
      <div className="text-center py-12 bg-athlex-gray-900 rounded-lg border border-athlex-gray-800">
        <p className="text-athlex-gray-400">No scouting notes found. Start adding notes on athlete profiles.</p>
      </div>
    );
  }

  return (
    <Accordion type="multiple" className="space-y-4">
      {groupedNotes.map((group) => (
        <AccordionItem 
          key={group.athleteId} 
          value={group.athleteId}
          className="border-athlex-gray-800 bg-athlex-gray-900 rounded-lg overflow-hidden"
        >
          <AccordionTrigger className="px-4 py-3 hover:bg-athlex-gray-800/50 hover:no-underline">
            <div className="flex items-center text-left">
              <div>
                <span className="font-medium">{group.athleteName}</span>
                <p className="text-sm text-athlex-gray-400">
                  {group.sport} • {group.position} • {group.notes.length} note{group.notes.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <div className="space-y-3">
              {group.notes.map((note) => (
                <ScoutNoteCard 
                  key={note.note_id} 
                  note={note} 
                  scoutId={scoutId}
                  onNoteUpdated={onNoteUpdated}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ScoutNotesList;
