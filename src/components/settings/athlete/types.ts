
import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  displayName: z.string().min(1, 'Display name is required'),
  age: z.string(),
  sport: z.string().min(1, 'Sport is required'),
  position: z.string(),
  tacticalRole: z.string(),
  bio: z.string().max(250, 'Bio must be less than 250 characters'),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
