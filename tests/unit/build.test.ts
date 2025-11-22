import { describe, it, expect } from 'vitest';
import { fileExistsInDist } from '../utils/test-utils';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

describe('Build Output Tests', () => {
  describe('Required pages exist', () => {
    it('should have index.html in dist/', () => {
      expect(fileExistsInDist('index.html')).toBe(true);
    });

    it('should have services page in dist/', () => {
      expect(fileExistsInDist('services/index.html')).toBe(true);
    });

    it('should have about page in dist/', () => {
      expect(fileExistsInDist('about/index.html')).toBe(true);
    });

    it('should have contact page in dist/', () => {
      expect(fileExistsInDist('contact/index.html')).toBe(true);
    });
  });

  describe('Static files only', () => {
    it('should only generate static files (HTML, CSS, JS, images)', () => {
      const distPath = join(process.cwd(), 'dist');
      const allowedExtensions = [
        '.html', '.css', '.js', '.mjs', 
        '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico',
        '.woff', '.woff2', '.ttf', '.eot', // fonts
        '.xml', '.txt', '.json' // metadata files
      ];

      function checkDirectory(dir: string): void {
        const entries = readdirSync(dir);

        for (const entry of entries) {
          const fullPath = join(dir, entry);
          const stat = statSync(fullPath);

          if (stat.isDirectory()) {
            // Recursively check subdirectories
            checkDirectory(fullPath);
          } else {
            // Check if file has an allowed extension
            const hasAllowedExtension = allowedExtensions.some(ext => 
              entry.toLowerCase().endsWith(ext)
            );
            expect(hasAllowedExtension).toBe(true);
          }
        }
      }

      checkDirectory(distPath);
    });
  });

  describe('Sitemap generation', () => {
    it('should have sitemap files in dist/', () => {
      // Astro generates sitemap-index.xml and sitemap-0.xml
      const hasSitemapIndex = fileExistsInDist('sitemap-index.xml');
      const hasSitemap = fileExistsInDist('sitemap-0.xml');
      
      expect(hasSitemapIndex || hasSitemap).toBe(true);
    });
  });
});
