import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getAllHTMLFiles, getDocument } from '../utils/test-utils';
import { checkHeadingHierarchy } from '../utils/html-validators';

/**
 * Feature: smb-company-website, Property 4: Heading hierarchy correctness
 * Validates: Requirements 6.4
 * 
 * For any page in the website, heading tags should follow proper hierarchical 
 * order (exactly one h1, h2s nested under h1, h3s nested under h2)
 */
describe('Property 4: Heading Hierarchy Correctness', () => {
  it('should have exactly one h1 and proper heading hierarchy on all pages', async () => {
    const htmlFiles = getAllHTMLFiles();

    // Property-based test: for all pages, heading hierarchy should be correct
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...htmlFiles),
        async (pageFile) => {
          const doc = getDocument(pageFile);
          const hierarchy = checkHeadingHierarchy(doc);
          
          // Must have exactly one h1 and valid hierarchy
          return hierarchy.h1Count === 1 && hierarchy.isHierarchyValid;
        }
      ),
      { numRuns: 100 }
    );
  });
});
