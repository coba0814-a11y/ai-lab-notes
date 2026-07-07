// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// TODO: 実際に取得したドメインに変更してください
const SITE_URL = 'https://ai-lab-notes.example.com';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap(), mdx()],
});
