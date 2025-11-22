/**
 * Property-Based Tests for Navigation Links
 * 
 * Feature: smb-company-website
 * 
 * These tests verify that all internal links on the site are correctly formatted
 * and work with the configured base path.
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getAllHTMLFiles, getDocument } from '../utils/test-utils';

describe('Link Properties', () => {
  const pages = getAllHTMLFiles();

  it('should have properly formatted internal links with base path', () => {
    /**
     * Property: All internal navigation links should be properly formatted
     * 
     * For any page on the site, all internal links (href attributes) should:
     * 1. Start with the base path (/company-website/)
     * 2. Not have malformed paths like /company-websiteservices (missing slash)
     * 3. Either end with / or be the base path itself
     * 
     * Validates: Requirements 4.2 (deployable to GitHub Pages)
     */
    fc.assert(
      fc.property(
        fc.constantFrom(...pages),
        (page) => {
          const doc = getDocument(page);
          const base = '/company-website';
          
          // Get all internal navigation links (in header/nav)
          const navLinks = Array.from(doc.querySelectorAll('header a[href], nav a[href]'))
            .map(el => (el as HTMLAnchorElement).getAttribute('href'))
            .filter((href): href is string => 
              href !== null && 
              href.startsWith('/') && 
              !href.startsWith('//') &&
              !href.startsWith('http')
            );

          // Check each link is properly formatted
          navLinks.forEach(href => {
            // Should start with base path
            expect(
              href.startsWith(base),
              `Link "${href}" on page "${page}" should start with base path "${base}"`
            ).toBe(true);

            // Should not have malformed paths (missing slash after base)
            if (href !== base && href !== `${base}/`) {
              const afterBase = href.substring(base.length);
              expect(
                afterBase.startsWith('/'),
                `Link "${href}" on page "${page}" has malformed path - missing slash after base. Should be "${base}/${afterBase}"`
              ).toBe(true);
            }

            // Should end with / (except for base itself)
            if (href !== base) {
              expect(
                href.endsWith('/'),
                `Link "${href}" on page "${page}" should end with trailing slash`
              ).toBe(true);
            }
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should not have any broken internal link patterns', () => {
    /**
     * Property: No malformed link patterns
     * 
     * For any page, there should be no links that match common error patterns:
     * - /company-websiteservices (missing slash)
     * - /company-websiteabout (missing slash)
     * - //company-website (double slash)
     * 
     * Validates: Requirements 4.2
     */
    fc.assert(
      fc.property(
        fc.constantFrom(...pages),
        (page) => {
          const doc = getDocument(page);
          const allLinks = Array.from(doc.querySelectorAll('a[href]'))
            .map(el => (el as HTMLAnchorElement).getAttribute('href'))
            .filter((href): href is string => href !== null);

          // Check for common malformed patterns
          const malformedPatterns = [
            { pattern: /\/company-website[a-z]/i, description: 'Missing slash after base' },
            { pattern: /\/\/company-website/, description: 'Double slash' },
            { pattern: /\/company-website\/\//, description: 'Double slash after base' }
          ];

          allLinks.forEach(href => {
            malformedPatterns.forEach(({ pattern, description }) => {
              expect(
                !pattern.test(href),
                `Link "${href}" on page "${page}" matches malformed pattern: ${description}`
              ).toBe(true);
            });
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have consistent link format across all pages', () => {
    /**
     * Property: Link consistency
     * 
     * For any two pages, links to the same destination should have identical format.
     * E.g., if one page links to /company-website/about/, all pages should use that exact format.
     * 
     * Validates: Requirements 4.2
     */
    const linksByDestination = new Map<string, Set<string>>();

    pages.forEach(page => {
      const doc = getDocument(page);
      const links = Array.from(doc.querySelectorAll('a[href]'));
      
      links.forEach(el => {
        const href = (el as HTMLAnchorElement).getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('//')) {
          // Extract the destination (e.g., "about" from "/company-website/about/")
          const match = href.match(/\/([^/]+)\/?$/);
          if (match) {
            const destination = match[1];
            if (!linksByDestination.has(destination)) {
              linksByDestination.set(destination, new Set());
            }
            linksByDestination.get(destination)!.add(href);
          }
        }
      });
    });

    // Check that each destination has only one format
    linksByDestination.forEach((formats, destination) => {
      expect(
        formats.size,
        `Links to "${destination}" have inconsistent formats: ${Array.from(formats).join(', ')}`
      ).toBeLessThanOrEqual(1);
    });
  });
});
