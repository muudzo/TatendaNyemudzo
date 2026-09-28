// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Set SITE_URL to the production origin so canonical, OG and sitemap URLs are absolute.
const SITE_URL = process.env.SITE_URL ?? 'http://localhost:4321';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/v1/') })],
  security: { csp: true },
  // External stylesheets only: covered by 'self' in the CSP (inlined MDX component styles can miss
  // the hash list) and cached by the service worker for offline reading.
  build: { inlineStylesheets: 'never' },
  prefetch: false,
  // No code blocks in the content, and Shiki's inline styles would break the strict CSP.
  markdown: { syntaxHighlight: false },
});
