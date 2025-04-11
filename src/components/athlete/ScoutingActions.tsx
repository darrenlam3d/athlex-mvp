
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Share, Download, User } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface ScoutingActionsProps {
  athleteId: string;
}

const ScoutingActions: React.FC<ScoutingActionsProps> = ({ athleteId }) => {
  const navigate = useNavigate();

  const handleCreateScoutingNote = () => {
    // In a real app, this would open a modal or navigate to a note creation page
    toast.success('Scouting note created successfully');
  };

  const handleGenerateReport = () => {
    // In a real app, this would generate a PDF report
    toast.success('Report generated successfully');
  };

  const handleShareReport = () => {
    // In a real app, this would open a sharing modal
    toast.success('Report shared successfully');
  };

  const handleViewProfile = () => {
    // We're already on this page, so just log and do nothing
    console.log('Already on profile page for athlete ID:', athleteId);
  };

  return (
    <div className="space-y-3">
      <Button variant="default" className="w-full" onClick={handleViewProfile}>
        <User className="mr-2 h-4 w-4" />
        View Full Profile
      </Button>
      <Button variant="outline" className="w-full" onClick={handleCreateScoutingNote}>
        <FileText className="mr-2 h-4 w-4" />
        Create Scouting Note
      </Button>
      <Button variant="outline" className="w-full" onClick={handleGenerateReport}>
        <Download className="mr-2 h-4 w-4" />
        Generate Report
      </Button>
      <Button variant="outline" className="w-full" onClick={handleShareReport}>
        <Share className="mr-2 h-4 w-4" />
        Share Report
      </Button>
    </div>
  );
};

export default ScoutingActions;
