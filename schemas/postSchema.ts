import { z } from 'zod';

// Schema for platform-specific data
const platformSpecificSchema = z.object({
  instagram: z.object({
    hashtags: z.array(z.string()).optional(),
    location: z.string().optional(),
  }).optional(),
  twitter: z.object({
    hashtags: z.array(z.string()).optional(),
    replyToTweetId: z.string().optional(),
  }).optional(),
  linkedin: z.object({
    hashtags: z.array(z.string()).optional(),
    visibility: z.enum(['public', 'connections']).optional(),
  }).optional(),
}).optional();

// Main post schema
export const postSchema = z.object({
  caption: z.string().min(1, 'Caption is required'),
  media: z.string().url('Please enter a valid URL').optional().nullable(),
  platforms: z.array(z.enum(['instagram', 'twitter', 'linkedin'])).min(1, 'Select at least one platform'),
  scheduledAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Please enter a valid date and time',
  }),
  platformSpecific: platformSpecificSchema,
});

// Type for the post data
export type PostFormData = z.infer<typeof postSchema>;
