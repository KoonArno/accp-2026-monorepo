import { z } from 'zod';

export const abstractListSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    search: z.string().optional(),
    eventId: z.coerce.number().optional(),
    status: z.enum(['pending', 'accepted', 'rejected']).optional(),
    category: z.enum(['clinical', 'social', 'experimental', 'education', 'other']).optional(),
});

export const updateAbstractStatusSchema = z.object({
    status: z.enum(['pending', 'accepted', 'rejected']),
    comment: z.string().optional(), // For review comment
});
