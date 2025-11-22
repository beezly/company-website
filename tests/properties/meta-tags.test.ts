import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getAllHTMLFiles, getDocument } from '../utils/test-utils';
import { hasMetaTags } from '../utils/html-validators';

/**
 * Feature: smb-company-website, Property 3: Meta tag completeness
 * Validates: Requirements 6.2
 * 
 * For any page in the website, the page should include title and 
 * description meta tags
 */
describe('Property 3: Meta Tag Completeness', () => {
  it('should have title and description meta tags on all pages', async () => {
    const htmlFiles = getAllHTMLFiles();

    // Property-based test: for all pages, meta tags should be present and non-empty
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...htmlFiles),
        async (pageFile) => {
          const doc = getDocument(pageFile);
          const metaTags = hasMetaTags(doc);
          return metaTags.hasTitle && metaTags.hasDescription;
        }
      ),
      { numRuns: 100 }
    );
  });
});
