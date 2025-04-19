
import React, { useState, useEffect } from 'react';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Save, Filter, User, UserCheck, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface ScoutNote {
  note_id: string;
  coach_id: string;
  coach_name: string;
  coach_role?: string;
  note: string;
  date: string;
  profile_photo?: string;
}

interface ScoutingNotesProps {
  athleteId: string;
  notes?: ScoutNote[];
  isConnected?: boolean; // New prop to determine if coach is connected to athlete
}

const ScoutingNotes: React.FC<ScoutingNotesProps> = ({ 
  athleteId, 
  notes = [],
  isConnected = true // Default to true for backward compatibility
}) => {
  const { userRole } = useUserRole();
  const [newNote, setNewNote] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'recent'>('all');
  
  // Check if user can add notes (connected coaches)
  const canAddNotes = userRole === 'coach' && isConnected;
  
  // Create mock data for preview if no real notes provided
  const mockNotes: ScoutNote[] = [
    {
      note_id: "note1",
      coach_id: "coach123",
      coach_name: "Coach Thompson",
      coach_role: "Head Coach",
      note: "Excellent agility and game sense. Shows natural leadership on the field and communicates well with teammates. Needs to work on defensive positioning when out of possession.",
      date: "2025-04-10T15:30:00",
      profile_photo: undefined
    },
    {
      note_id: "note2",
      coach_id: "coach456",
      coach_name: "Amanda Lee",
      coach_role: "Performance Analyst",
      note: "Great first touch and technical ability. Decision-making under pressure is a standout quality. Should focus on increasing upper body strength for better protection of the ball.",
      date: "2025-04-05T11:15:00",
      profile_photo: undefined
    }
  ];
  
  // Use mock data if no real notes provided
  const displayNotes = notes.length > 0 ? notes : mockNotes;
  
  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real implementation, this would call an API to save the note
      toast.success("Coaching note saved successfully");
      setNewNote('');
    } else {
      toast.error("Please enter a note");
    }
  };
  
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  const formatNoteDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
  };

  // If coach is not connected, show access required message
  if (userRole === 'coach' && !isConnected) {
    return (
      <Card className="bg-gray-900/60 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Coaching Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <Lock className="h-12 w-12 mx-auto text-gray-500 mb-3" />
            <p className="text-lg font-medium text-gray-300 mb-1">Access Required</p>
            <p className="text-gray-400">You need to connect with this athlete to view and add coaching notes.</p>
            <Button variant="outline" className="mt-4">
              <UserCheck className="mr-2 h-4 w-4" />
              Request Connection
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900/60 border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl">Coaching Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="notes">All Notes</TabsTrigger>
            {canAddNotes && <TabsTrigger value="add">Add Note</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="notes" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-400">
                {displayNotes.length} {displayNotes.length === 1 ? 'note' : 'notes'} available
              </div>
              <Button variant="outline" size="sm" className="text-sm">
                <Filter className="h-3.5 w-3.5 mr-1.5" /> Filter Notes
              </Button>
            </div>
            
            {displayNotes.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-gray-500 mb-3" />
                <p className="text-gray-400">No coaching notes available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {displayNotes.map((note) => (
                  <div 
                    key={note.note_id}
                    className="p-4 rounded-lg bg-gray-800/70 border border-gray-700"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={note.profile_photo} />
                        <AvatarFallback className="bg-athlex-accent/20 text-athlex-accent">
                          {getInitials(note.coach_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{note.coach_name}</h4>
                            {note.coach_role && (
                              <p className="text-xs text-gray-400">{note.coach_role}</p>
                            )}
                          </div>
                          <span className="text-sm text-gray-400">
                            {formatNoteDate(note.date)}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-200 whitespace-pre-line">{note.note}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          {canAddNotes && (
            <TabsContent value="add">
              <div className="space-y-4">
                <Textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Enter your coaching observations here..."
                  className="min-h-[150px] bg-gray-800/50 border-gray-700"
                />
                <Button onClick={handleAddNote} className="bg-athlex-accent hover:bg-athlex-accent/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Note
                </Button>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ScoutingNotes;
