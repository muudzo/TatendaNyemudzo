import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { PRIMITIVE_IDS } from './data/primitives';

const link = z.object({ label: z.string(), href: z.url() });

const work = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    tier: z.enum(['flagship', 'supporting']),
    order: z.number().int(),
    /** One sentence: what this is. */
    summary: z.string(),
    /** The editorial claim shown large on the homepage. */
    claim: z.string(),
    role: z.string(),
    period: z.string(),
    year: z.number().int(),
    context: z.string(),
    status: z.enum(['live', 'prototype', 'architecture', 'mvp']),
    stack: z.array(z.string()).min(1),
    primitives: z.array(z.enum(PRIMITIVE_IDS)).min(1),
    /** Evidence shown in the record header. Real numbers only. */
    facts: z.array(z.object({ value: z.string(), label: z.string() })).max(4),
    links: z.array(link).default([]),
  }),
});

export const collections = { work };
