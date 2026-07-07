import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // 実験ノートっぽく、記事を通し番号で管理する
    entryNumber: z.number(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // 扱っているツール(タグではなく「使用器具」のような位置づけ)
    tools: z.array(z.string()).default([]),
    // 記事の状態。draftはビルドに含めるが目立たせる/除外する運用を想定
    status: z.enum(['published', 'draft']).default('draft'),
    heroNote: z.string().optional(),
  }),
});

export const collections = { posts };
