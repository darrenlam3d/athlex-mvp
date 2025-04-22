
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, FileText, Plus } from 'lucide-react';

interface ScoutingActionsProps {
  athleteId: string;
  isShortlisted?: boolean;
}

const ScoutingActions: React.FC<ScoutingActionsProps> = ({ athleteId, isShortlisted = false }) => {
  const handleShortlist = () => {
    console.log(`Shortlisting athlete: ${athleteId}`);
    // This would call an API to add/remove the athlete from the shortlist
  };
  
  const handleCreateReport = () => {
    console.log(`Creating report for athlete: ${athleteId}`);
    // This would navigate to a report creation form
  };
  
  const handleAddNote = () => {
    console.log(`Adding note for athlete: ${athleteId}`);
    // This would open a modal for adding notes
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Scout Actions</h3>
      <div className="grid grid-cols-1 gap-3">
        <Button
          variant={isShortlisted ? "default" : "outline"}
          className={isShortlisted ? "bg-yellow-600 hover:bg-yellow-700" : "border-gray-700"}
          onClick={handleShortlist}
        >
          <Star className="h-4 w-4 mr-2" />
          {isShortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
        </Button>
        
        <Button variant="outline" className="border-gray-700" onClick={handleCreateReport}>
          <FileText className="h-4 w-4 mr-2" />
          Create Scouting Report
        </Button>
        
        <Button variant="outline" className="border-gray-700" onClick={handleAddNote}>
          <Plus className="h-4 w-4 mr-2" />
          Add Note
        </Button>
      </div>
    </div>
  );
};

export default ScoutingActions;
