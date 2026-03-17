import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.coerce.date(),
        category: z.enum(['Prawo rodzinne', 'Prawo cywilne', 'Prawo karne', 'Prawo nieruchomości', 'Prawo upadłościowe', 'Odszkodowania', 'Prawo gospodarcze', 'Porady ogólne']),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        author: z.string().default('Anna Jarczyńska'), // klucz (slug) referencyjny zamiast imienia
        relatedService: z.string().optional().nullable(),
        ogImage: z.string().optional().nullable(),
    }),
});

const authors = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
        role: z.string(),
        bio: z.string(),
        linkedin: z.string().optional().nullable(),
        photo: z.string().optional().nullable()
    })
});

const uslugi = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        seo: z.object({
            description: z.string(),
            ogImage: z.string().optional().nullable()
        }).optional(),
        hero: z.object({
            title: z.string().optional().nullable(),
            subtitle: z.string().optional().nullable(),
            description: z.string().optional().nullable(),
        }).optional(),
        features: z.array(z.object({
            icon: z.string().optional(),
            title: z.string(),
            desc: z.string(),
        })).optional().default([]),
        faq: z.array(z.object({
            question: z.string(),
            answer: z.string()
        })).optional().default([]),
        steps: z.array(z.object({
            title: z.string(),
            desc: z.string()
        })).optional().default([]),
    }),
});

const toolsInfo = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        desc: z.string(),
        fraza: z.string(),
        icon: z.string(),
        image: z.string().optional().nullable()
    })
});

const legal = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        lastUpdated: z.string(),
    })
});

const singletons = defineCollection({
    type: 'data',
    schema: z.object({
        hero: z.object({
            title: z.string().optional().nullable(),
            subtitle: z.string().optional().nullable(),
            description: z.string().optional().nullable(),
        }).optional(),
        about: z.object({
            description1: z.string().optional(),
            description2: z.string().optional(),
        }).optional(),
        faq: z.array(z.object({
            question: z.string(),
            answer: z.string()
        })).optional(),
        aboutParagraphs: z.string().optional(),
        quote: z.object({
            text: z.string().optional(),
            author: z.string().optional()
        }).optional(),
        pricingList: z.array(z.object({
            service: z.string(),
            price: z.string(),
            note: z.string().optional()
        })).optional(),
        importantInfo: z.array(z.string()).optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        hours: z.string().optional(),
        locations: z.string().optional(),
        headerNav: z.array(z.object({
            label: z.string(),
            href: z.string()
        })).optional(),
        footerNav: z.array(z.object({
            label: z.string(),
            href: z.string()
        })).optional()
    })
});

export const collections = { blog, uslugi, toolsInfo, legal, singletons, authors };
