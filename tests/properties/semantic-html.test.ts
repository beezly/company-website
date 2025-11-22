import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getAllHTMLFiles, getDocument } from '../utils/test-utils';
import { hasSemanticHTML } from '../utils/html-validators';

/**
 * Feature: smb-company-website, Property 2: Semantic HTML usage
 * Validates: Requirements 6.1
 * 
 * For any page in the website, the HTML should use semantic elements 
 * (header, nav, main, footer, article, section) appropriately
 */
describe('Property 2: Semantic HTML Usage', () => {
  it('should use semantic HTML elements (header, nav, main, footer) on all pages', async () => {
    const htmlFiles = getAllHTMLFiles();

    // Property-based test: for all pages, semantic elements should be present
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...htmlFiles),
        async (pageFile) => {
          const doc = getDocument(pageFile);
          return hasSemanticHTML(doc);
        }
      ),
      { numRuns: 100 }
    );
  });
});
