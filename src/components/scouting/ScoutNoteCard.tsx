
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Pencil, Trash2, Eye, Save, X } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  ScoutNote, 
  saveScoutNote, 
  deleteScoutNote 
} from '@/utils/scoutNotesUtils';

interface ScoutNoteCardProps {
  note: ScoutNote;
  scoutId: string;
  onNoteUpdated: () => void;
}

const ScoutNoteCard: React.FC<ScoutNoteCardProps> = ({ note, scoutId, onNoteUpdated }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note.note);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const handleEditNote = () => {
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    setEditedNote(note.note);
    setIsEditing(false);
  };
  
  const handleSaveNote = async () => {
    const success = await saveScoutNote({
      note_id: note.note_id,
      note: editedNote
    }, scoutId);
    
    if (success) {
      setIsEditing(false);
      onNoteUpdated();
    }
  };
  
  const handleDeleteNote = async () => {
    const success = await deleteScoutNote(note.note_id, scoutId);
    
    if (success) {
      setIsDeleteDialogOpen(false);
      onNoteUpdated();
    }
  };
  
  const handleViewAthlete = () => {
    navigate(`/athlete/${note.athlete_id}`);
  };
  
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800 mb-4 overflow-hidden">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 border border-athlex-gray-700">
            {note.profile_photo ? (
              <AvatarImage src={note.profile_photo} alt={note.athlete_name} />
            ) : (
              <AvatarFallback className="bg-athlex-gray-800 text-athlex-accent">
                {getInitials(note.athlete_name)}
              </AvatarFallback>
            )}
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-white truncate">{note.athlete_name}</h3>
                <p className="text-sm text-athlex-gray-400">
                  {note.sport} • {note.position} • {note.club}
                </p>
              </div>
              <span className="text-sm text-athlex-gray-400">
                {formatDate(note.date)}
              </span>
            </div>
            
            <div className="mt-3">
              {isEditing ? (
                <Textarea
                  value={editedNote}
                  onChange={(e) => setEditedNote(e.target.value)}
                  className="bg-athlex-gray-800 border-athlex-gray-700 text-white min-h-24"
                />
              ) : (
                <p className="text-white/90 whitespace-pre-line">{note.note}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end space-x-2 py-4 bg-athlex-gray-800/50">
        {isEditing ? (
          <>
            <Button variant="outline" size="sm" onClick={handleCancelEdit}>
              <X size={16} className="mr-1" /> Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleSaveNote}>
              <Save size={16} className="mr-1" /> Save
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="sm" onClick={handleEditNote}>
              <Pencil size={16} className="mr-1" /> Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash2 size={16} className="mr-1" /> Delete
            </Button>
            <Button variant="default" size="sm" onClick={handleViewAthlete}>
              <Eye size={16} className="mr-1" /> View Athlete
            </Button>
          </>
        )}
      </CardFooter>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-athlex-gray-900 border-athlex-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogDescription className="text-athlex-gray-400">
              Are you sure you want to delete this scouting note? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-athlex-gray-700"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteNote}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ScoutNoteCard;
