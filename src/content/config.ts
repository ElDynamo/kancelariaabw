import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.coerce.date(),
        category: z.enum(['Prawo rodzinne', 'Prawo cywilne', 'Prawo karne', 'Porady ogólne']),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        author: z.string().default('Anna Jarczyńska'),
    }),
});

export const collections = { blog };
