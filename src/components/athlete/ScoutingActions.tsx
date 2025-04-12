
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Share, 
  Download, 
  User, 
  Star, 
  StarOff 
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '@/contexts/UserRoleContext';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

interface ScoutingActionsProps {
  athleteId: string;
  isShortlisted?: boolean;
  isConnected?: boolean;
}

const ScoutingActions: React.FC<ScoutingActionsProps> = ({ 
  athleteId, 
  isShortlisted = false,
  isConnected = true
}) => {
  const navigate = useNavigate();
  const { userRole } = useUserRole();
  const [shortlisted, setShortlisted] = useState(isShortlisted);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Mock users for share functionality
  const mockUsers = [
    { id: 'user1', name: 'Coach Thompson', role: 'Head Coach', profile_photo: null },
    { id: 'user2', name: 'Emma Lee', role: 'Assistant Coach', profile_photo: null },
    { id: 'user3', name: 'Marcus Chen', role: 'Scout', profile_photo: null },
    { id: 'user4', name: 'Sarah Wong', role: 'Performance Analyst', profile_photo: null }
  ];

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Only scouts or connected coaches can use these actions
  const canUseActions = userRole === 'scout' || (userRole === 'coach' && isConnected);

  const handleCreateScoutingNote = () => {
    // In a real app, this would open a modal or navigate to a note creation page
    toast.success('Scouting note created successfully');
  };

  const handleGenerateReport = () => {
    // In a real app, this would generate a PDF report
    toast.success('Report generated successfully');
  };

  const handleShareReport = () => {
    if (selectedUsers.length === 0) {
      toast.error('Please select at least one recipient');
      return;
    }

    const recipients = selectedUsers.map(id => 
      mockUsers.find(user => user.id === id)?.name
    ).join(', ');

    toast.success(`Report shared successfully with ${recipients}`);
    setIsShareDialogOpen(false);
    setSelectedUsers([]);
  };

  const handleViewProfile = () => {
    // We're already on this page, so just log and do nothing
    console.log('Already on profile page for athlete ID:', athleteId);
  };

  const handleToggleShortlist = () => {
    setShortlisted(!shortlisted);
    
    if (!shortlisted) {
      toast.success('Athlete added to shortlist');
    } else {
      toast.success('Athlete removed from shortlist');
    }
  };

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // If not a scout or connected coach, show limited actions
  if (!canUseActions) {
    return (
      <div className="space-y-3">
        <Button variant="default" className="w-full" onClick={handleViewProfile}>
          <User className="mr-2 h-4 w-4" />
          View Full Profile
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button variant="default" className="w-full" onClick={handleViewProfile}>
        <User className="mr-2 h-4 w-4" />
        View Full Profile
      </Button>
      
      <Button 
        variant={shortlisted ? "secondary" : "outline"} 
        className="w-full" 
        onClick={handleToggleShortlist}
      >
        {shortlisted ? (
          <>
            <StarOff className="mr-2 h-4 w-4" />
            Remove from Shortlist
          </>
        ) : (
          <>
            <Star className="mr-2 h-4 w-4" />
            Add to Shortlist
          </>
        )}
      </Button>
      
      <Button variant="outline" className="w-full" onClick={handleCreateScoutingNote}>
        <FileText className="mr-2 h-4 w-4" />
        Create Scouting Note
      </Button>
      
      <Button variant="outline" className="w-full" onClick={handleGenerateReport}>
        <Download className="mr-2 h-4 w-4" />
        Generate Report
      </Button>
      
      <Button variant="outline" className="w-full" onClick={() => setIsShareDialogOpen(true)}>
        <Share className="mr-2 h-4 w-4" />
        Share Report
      </Button>

      {/* Share Report Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="bg-athlex-gray-900 border-athlex-gray-800">
          <DialogHeader>
            <DialogTitle>Share Report</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <Input
              placeholder="Search coaches and scouts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-athlex-gray-800 border-athlex-gray-700"
            />
            
            <div className="max-h-60 overflow-y-auto">
              {filteredUsers.length > 0 ? (
                <div className="space-y-2">
                  {filteredUsers.map(user => (
                    <div 
                      key={user.id}
                      className="flex items-center p-2 rounded-md hover:bg-athlex-gray-800 cursor-pointer"
                      onClick={() => toggleUserSelection(user.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => {}}
                        className="mr-3"
                      />
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage src={user.profile_photo || undefined} />
                        <AvatarFallback className="bg-athlex-gray-700 text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">No users found</p>
              )}
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleShareReport}>
                Share Report ({selectedUsers.length})
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScoutingActions;
