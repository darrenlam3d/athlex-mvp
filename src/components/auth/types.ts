
import { z } from 'zod';

export const coachProfileSchema = z.object({
  teamName: z.string().optional(),
  sport: z.string().min(1, 'Sport is required'),
  country: z.string().min(1, 'Country is required'),
  coachingLevel: z.enum(['beginner', 'club', 'academy', 'pro']),
  ageGroups: z.array(z.string())
});

export const scoutProfileSchema = z.object({
  organization: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  scoutingRegion: z.string().min(1, 'Scouting region is required'),
  scoutingLevel: z.enum(['youth', 'semi_pro', 'pro', 'national']),
  preferredPositions: z.array(z.string())
});

export type CoachProfileFormValues = z.infer<typeof coachProfileSchema>;
export type ScoutProfileFormValues = z.infer<typeof scoutProfileSchema>;
