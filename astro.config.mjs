// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

/**
 * Site Configuration
 * 
 * To switch between GitHub Pages and custom domain:
 * 
 * GitHub Pages (subdirectory):
 *   site: 'https://beezly.github.io'
 *   base: '/company-website'
 * 
 * Custom Domain (root):
 *   site: 'https://yourdomain.com'
 *   base: '/'
 */

// https://astro.build/config
export default defineConfig({
  site: 'https://beezly.github.io',
  base: '/company-website',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});