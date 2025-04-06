
export const positionOptions = [
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

export const tacticalRolesByPosition: Record<string, string[]> = {
  // Fullbacks & Wingbacks
  LB: [
    'Inverted Fullback',
    'Overlapping Fullback',
    'Underlapping Fullback',
    'Wingback Creator',
    'Wide Ball-Progressor',
    'Third CB in Back 3',
    'High-Press Trigger',
    'Defensive Wingback',
    'Attacking Wingback',
    'False Fullback',
    'Build-Up Inverter',
    'Tactical Split Back'
  ],
  RB: [
    'Inverted Fullback',
    'Overlapping Fullback',
    'Underlapping Fullback',
    'Wingback Creator',
    'Wide Ball-Progressor',
    'Third CB in Back 3',
    'High-Press Trigger',
    'Defensive Wingback',
    'Attacking Wingback',
    'False Fullback',
    'Build-Up Inverter',
    'Tactical Split Back'
  ],
  LWB: [
    'Inverted Fullback',
    'Overlapping Fullback',
    'Underlapping Fullback',
    'Wingback Creator',
    'Wide Ball-Progressor',
    'Third CB in Back 3',
    'High-Press Trigger',
    'Defensive Wingback',
    'Attacking Wingback',
    'False Fullback',
    'Build-Up Inverter',
    'Tactical Split Back'
  ],
  RWB: [
    'Inverted Fullback',
    'Overlapping Fullback',
    'Underlapping Fullback',
    'Wingback Creator',
    'Wide Ball-Progressor',
    'Third CB in Back 3',
    'High-Press Trigger',
    'Defensive Wingback',
    'Attacking Wingback',
    'False Fullback',
    'Build-Up Inverter',
    'Tactical Split Back'
  ],
  
  // Defensive Midfielder
  CDM: [
    'Anchor Man',
    'Deep-Lying Playmaker (Regista)',
    'Destroyer',
    'Half-Back',
    'Single Pivot Distributor',
    'Shield + Cover Hybrid',
    'Volante',
    'Carrilero',
    'Pivot Controller',
    'Hybrid Center-Back'
  ],
  
  // Central Midfielder
  CM: [
    'Box-to-Box Midfielder',
    'Roaming Playmaker',
    'Mezzala',
    'Ball-Winning Midfielder',
    'Shuttler (Carrilero)',
    'Late Arriving Runner',
    'Deep-Lying Playmaker',
    'Advanced Playmaker',
    'Segundo Volante',
    'Tempo Setter',
    'Transition Link',
    'Midfield Quarterback',
    'Half-Space Specialist',
    'Blindside Runner'
  ],
  
  // Wingers
  LW: [
    'Inverted Winger',
    'Traditional Winger',
    'Wide Forward',
    'Touchline Playmaker',
    'Inside Forward',
    'Wide Press Trigger',
    'False Winger',
    'Out-to-In Runner',
    'Defensive Winger',
    'Wide Target Man',
    'Half-Space Specialist',
    'Blindside Runner'
  ],
  RW: [
    'Inverted Winger',
    'Traditional Winger',
    'Wide Forward',
    'Touchline Playmaker',
    'Inside Forward',
    'Wide Press Trigger',
    'False Winger',
    'Out-to-In Runner',
    'Defensive Winger',
    'Wide Target Man',
    'Half-Space Specialist',
    'Blindside Runner'
  ],
  RM: [
    'Inverted Winger',
    'Traditional Winger',
    'Wide Forward',
    'Touchline Playmaker',
    'Inside Forward',
    'Wide Press Trigger',
    'False Winger',
    'Out-to-In Runner',
    'Defensive Winger',
    'Wide Target Man',
    'Half-Space Specialist',
    'Blindside Runner'
  ],
  LM: [
    'Inverted Winger',
    'Traditional Winger',
    'Wide Forward',
    'Touchline Playmaker',
    'Inside Forward',
    'Wide Press Trigger',
    'False Winger',
    'Out-to-In Runner',
    'Defensive Winger',
    'Wide Target Man',
    'Half-Space Specialist',
    'Blindside Runner'
  ],
  
  // Attacking Midfielder
  CAM: [
    'Classic #10',
    'Advanced Playmaker',
    'Shadow Striker',
    'Free Roaming Playmaker',
    'Inverted #10',
    'False 10 / Central Mezzala',
    'High Press Trigger',
    'Vertical Dribbler',
    'Inter-zone Connector',
    'Connector 10',
    'Second Pivot Creator'
  ],
  
  // Striker
  ST: [
    'Poacher',
    'Advanced Forward',
    'Target Man',
    'Pressing Forward',
    'False 9',
    'Channel Runner',
    'Link-Play Forward',
    'Wide-Drifting 9',
    'Decoy Striker',
    'Second-Ball Hunter',
    'False Target Man',
    'Rotation Anchor'
  ],
  
  // Center Forward
  CF: [
    'Second Striker',
    'Deep-Lying Forward',
    'Mobile 9',
    'Floating Forward',
    'Wide-Cutting CF',
    'Vertical Threat',
    'All-Round Forward',
    'Pivot CF',
    'Trequartista-style CF',
    'Shadow 9',
    'Creative Forward'
  ],
  
  // For other positions, provide some generic roles
  GK: ['Sweeper Keeper', 'Traditional Goalkeeper', 'Goalkeeper-Playmaker'],
  CB: ['Ball-Playing Defender', 'Stopper', 'Cover', 'Libero']
};

// Get tactical roles based on position
export const getTacticalRolesForPosition = (position: string): string[] => {
  return tacticalRolesByPosition[position] || [];
};
