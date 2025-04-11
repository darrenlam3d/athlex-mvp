
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Share, Download } from 'lucide-react';
import { toast } from 'sonner';

interface ScoutingActionsProps {
  athleteId: string;
}

const ScoutingActions: React.FC<ScoutingActionsProps> = ({ athleteId }) => {
  const handleCreateScoutingNote = () => {
    toast.success('Scouting note created successfully');
  };

  const handleGenerateReport = () => {
    toast.success('Report generated successfully');
  };

  const handleShareReport = () => {
    toast.success('Report shared successfully');
  };

  return (
    <div className="space-y-3">
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
