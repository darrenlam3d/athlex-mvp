
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight, Save, Plus, X } from 'lucide-react';
import { useProfile } from '@/contexts/ProfileContext';
import { useToast } from '@/hooks/use-toast';

const FootballProfile = () => {
  const { profileData, updateProfile } = useProfile();
  const { toast } = useToast();

  const [preferredFoot, setPreferredFoot] = useState(profileData.preferredFoot || 'right');
  const [primaryPosition, setPrimaryPosition] = useState(profileData.position || 'CM');
  const [secondaryPositions, setSecondaryPositions] = useState(['CAM', 'CDM']);
  const [tacticalRoles, setTacticalRoles] = useState([profileData.tacticalRole || 'Roaming Playmaker', 'Deep-Lying Playmaker']);
  const [jerseyNumber, setJerseyNumber] = useState(profileData.jerseyNumber || '8');
  const [playerStrengths, setPlayerStrengths] = useState(profileData.strengths?.join(', ') || 'Strong passing range, good vision, high work rate, comfortable in possession, tactical discipline, and leadership qualities.');
  const [developmentGoals, setDevelopmentGoals] = useState(profileData.developmentGoals?.join(', ') || 'Improving aerial ability, increasing shooting accuracy from outside the box, and developing better defensive positioning when out of possession.');

  const positionOptions = [
    { value: 'GK', label: 'Goalkeeper' },
    { value: 'RB', label: 'Right Back' },
    { value: 'CB', label: 'Center Back' },
    { value: 'LB', label: 'Left Back' },
    { value: 'RWB', label: 'Right Wing Back' },
    { value: 'LWB', label: 'Left Wing Back' },
    { value: 'CDM', label: 'Defensive Midfielder' },
    { value: 'CM', label: 'Central Midfielder' },
    { value: 'CAM', label: 'Attacking Midfielder' },
    { value: 'RM', label: 'Right Midfielder' },
    { value: 'LM', label: 'Left Midfielder' },
    { value: 'RW', label: 'Right Winger' },
    { value: 'LW', label: 'Left Winger' },
    { value: 'CF', label: 'Center Forward' },
    { value: 'ST', label: 'Striker' },
  ];
  
  const roleOptions = [
    "Ball-Winning Midfielder",
    "Box-to-Box Midfielder",
    "Deep-Lying Playmaker",
    "Advanced Playmaker",
    "Anchor Man",
    "Regista",
    "Mezzala",
    "Carrilero",
    "Segundo Volante",
    "Roaming Playmaker",
  ];
  
  const removeSecondaryPosition = (pos: string) => {
    setSecondaryPositions(secondaryPositions.filter(p => p !== pos));
  };
  
  const removeTacticalRole = (role: string) => {
    setTacticalRoles(tacticalRoles.filter(r => r !== role));
  };

  const handleSaveProfile = () => {
    // Parse strengths and development goals from comma-separated strings
    const strengthsArray = playerStrengths.split(',').map(s => s.trim()).filter(Boolean);
    const goalsArray = developmentGoals.split(',').map(g => g.trim()).filter(Boolean);

    // Update profile context
    updateProfile({
      preferredFoot,
      position: primaryPosition,
      jerseyNumber,
      tacticalRole: tacticalRoles[0], // Primary tactical role
      strengths: strengthsArray,
      developmentGoals: goalsArray,
    });

    // Show success toast
    toast({
      title: "Football Profile Updated",
      description: "Your football profile has been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-gray-700 bg-card">
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>Primary Sport</Label>
            <div className="flex items-center gap-3">
              <Badge className="bg-athlex-accent hover:bg-athlex-accent/80 py-1.5 px-3 text-base">
                Football (Soccer)
              </Badge>
              <Button variant="ghost" size="sm" className="gap-1 h-7">
                <ChevronRight className="h-4 w-4" />
                <span className="text-xs">Change Sport</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="preferredFoot">Preferred Foot</Label>
              <Select value={preferredFoot} onValueChange={setPreferredFoot}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select foot" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="both">Both (Equal)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jerseyNumber">Jersey Number</Label>
              <Input 
                id="jerseyNumber" 
                type="number" 
                min="1" 
                max="99" 
                value={jerseyNumber}
                onChange={(e) => setJerseyNumber(e.target.value)}
                className="bg-gray-800 border-gray-700" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select defaultValue="intermediate">
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (3-5 years)</SelectItem>
                  <SelectItem value="advanced">Advanced (6-10 years)</SelectItem>
                  <SelectItem value="elite">Elite (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Current Team</Label>
              <Input defaultValue="Central City FC" className="bg-gray-800 border-gray-700" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-gray-700 bg-card">
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-3">
            <Label>Primary Position</Label>
            <Select value={primaryPosition} onValueChange={setPrimaryPosition}>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {positionOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.value} - {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="pt-2">
              <Badge className="bg-athlex-accent hover:bg-athlex-accent/80 py-2 px-4 text-base">
                {primaryPosition} - {positionOptions.find(p => p.value === primaryPosition)?.label}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Secondary Positions</Label>
              <span className="text-xs text-gray-400">{secondaryPositions.length}/3 selected</span>
            </div>
            
            <Select>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Add position" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {positionOptions
                  .filter(option => option.value !== primaryPosition && !secondaryPositions.includes(option.value))
                  .map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.value} - {option.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {secondaryPositions.map(pos => (
                <Badge key={pos} variant="outline" className="py-1.5 pl-3 pr-2 flex items-center gap-1">
                  {pos} - {positionOptions.find(p => p.value === pos)?.label}
                  <button 
                    onClick={() => removeSecondaryPosition(pos)} 
                    className="rounded-full hover:bg-gray-700 p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {secondaryPositions.length < 3 && (
                <Badge variant="outline" className="bg-gray-800/50 hover:bg-gray-800 cursor-pointer">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Position
                </Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Tactical Roles</Label>
              <span className="text-xs text-gray-400">{tacticalRoles.length}/3 selected</span>
            </div>
            
            <Select>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Add tactical role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {roleOptions
                  .filter(role => !tacticalRoles.includes(role))
                  .map(role => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {tacticalRoles.map(role => (
                <Badge key={role} variant="outline" className="py-1.5 pl-3 pr-2 flex items-center gap-1">
                  {role}
                  <button 
                    onClick={() => removeTacticalRole(role)} 
                    className="rounded-full hover:bg-gray-700 p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {tacticalRoles.length < 3 && (
                <Badge variant="outline" className="bg-gray-800/50 hover:bg-gray-800 cursor-pointer">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Role
                </Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="playerStrengths">Player Strengths & Attributes</Label>
            <Textarea 
              id="playerStrengths" 
              rows={3}
              value={playerStrengths}
              onChange={(e) => setPlayerStrengths(e.target.value)}
              placeholder="Describe your key strengths as a player..." 
              className="bg-gray-800 border-gray-700 resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="developmentGoals">Development Goals</Label>
            <Textarea 
              id="developmentGoals" 
              rows={3}
              value={developmentGoals}
              onChange={(e) => setDevelopmentGoals(e.target.value)}
              placeholder="What areas are you focusing on improving?" 
              className="bg-gray-800 border-gray-700 resize-none"
            />
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button onClick={handleSaveProfile}>
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FootballProfile;
