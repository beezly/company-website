import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getAllHTMLFiles, getDocument } from '../utils/test-utils';
import { checkImageAltText, checkResponsiveImages } from '../utils/html-validators';

/**
 * Feature: smb-company-website, Property 5: Image accessibility
 * Validates: Requirements 6.5
 * 
 * For any image in the website, the img tag should have a non-empty alt attribute
 */
describe('Property 5: Image Accessibility', () => {
  it('should have non-empty alt attributes on all images across all pages', async () => {
    const htmlFiles = getAllHTMLFiles();

    // Property-based test: for all pages, all images should have alt text
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...htmlFiles),
        async (pageFile) => {
          const doc = getDocument(pageFile);
          const altTextCheck = checkImageAltText(doc);
          
          // All images must have alt text (or no images present)
          return altTextCheck.allHaveAlt;
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Feature: smb-company-website, Property 6: Responsive image styling
 * Validates: Requirements 5.4
 * 
 * For any image in the website, the image should have responsive CSS 
 * properties or attributes
 */
describe('Property 6: Responsive Image Styling', () => {
  it('should have responsive CSS classes or attributes on all images across all pages', async () => {
    const htmlFiles = getAllHTMLFiles();

    // Property-based test: for all pages, all images should be responsive
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...htmlFiles),
        async (pageFile) => {
          const doc = getDocument(pageFile);
          const responsiveCheck = checkResponsiveImages(doc);
          
          // All images must be responsive (or no images present)
          return responsiveCheck.allResponsive;
        }
      ),
      { numRuns: 100 }
    );
  });
});
