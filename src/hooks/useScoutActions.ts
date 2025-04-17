
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { addToShortlist, removeFromShortlist, sendMessage } from '@/utils/athleteUtils';
import { AthleteWithConnectionStatus } from '@/components/scouting/AthleteCard';
import { MvpAthlete } from '@/components/mvp/MvpScoutView';

export const useScoutActions = (currentUser: { id: string; name: string; profile_photo: string | null }) => {
  const { toast } = useToast();
  const [selectedAthlete, setSelectedAthlete] = useState<MvpAthlete | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleAddToShortlist = async (athleteId: string) => {
    const success = await addToShortlist(athleteId, currentUser.id);
    if (!success) {
      toast({
        title: 'Error',
        description: 'Could not add athlete to shortlist',
        variant: 'destructive'
      });
    }
  };

  const handleRemoveFromShortlist = async (athleteId: string) => {
    const success = await removeFromShortlist(athleteId, currentUser.id);
    if (!success) {
      toast({
        title: 'Error',
        description: 'Could not remove athlete from shortlist',
        variant: 'destructive'
      });
    }
  };

  const handleOpenChat = (athleteId: string) => {
    setIsChatOpen(true);
  };

  const handleSendMessage = async (to: string, message: string) => {
    const success = await sendMessage(currentUser.id, to, message);
    if (!success) {
      toast({
        title: 'Error',
        description: 'Could not send message',
        variant: 'destructive'
      });
    }
  };

  const handleOpenAthleteDetail = (athlete: AthleteWithConnectionStatus) => {
    const mvpAthlete: MvpAthlete = {
      id: athlete.id,
      name: athlete.name,
      age: 23,
      position: athlete.position || "Unknown",
      tacticalRole: athlete.position || 'Unknown',
      image: athlete.profile_photo || '',
      team: athlete.club,
      nationality: "Unknown",
      sport: athlete.sport,
      connection_status: athlete.connection_status,
      stats: {
        xG: 0.34,
        passCompletion: 87.2,
        tackles: 6.4,
        aerialDuelsWon: 4,
        shotsOnTarget: 1.8,
        distanceCovered: 12.3
      },
      positionAverage: {
        xG: 0.22,
        passCompletion: 79.5,
        tackles: 4.8,
        aerialDuelsWon: 3.2,
        shotsOnTarget: 1.2,
        distanceCovered: 10.8
      }
    };
    
    setSelectedAthlete(mvpAthlete);
  };

  return {
    selectedAthlete,
    isChatOpen,
    setIsChatOpen,
    handleAddToShortlist,
    handleRemoveFromShortlist,
    handleOpenChat,
    handleSendMessage,
    handleOpenAthleteDetail
  };
};
