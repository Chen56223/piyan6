import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['AI 工具', '科技知識', '數位工具', '學習技巧']),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    updated: z.coerce.date(),
  }),
});

export const collections = { articles };
