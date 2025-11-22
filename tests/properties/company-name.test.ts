import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getAllHTMLFiles, getDocument, loadConfig } from '../utils/test-utils';

/**
 * Feature: smb-company-website, Property 1: Company name configuration consistency
 * Validates: Requirements 2.2, 2.3, 2.4, 2.5
 * 
 * For any page in the website, the company name displayed should match 
 * the company name defined in the configuration file
 */
describe('Property 1: Company Name Consistency', () => {
  it('should display company name from config in header, title, and footer across all pages', async () => {
    const config = await loadConfig();
    const companyName = config.companyName;
    const htmlFiles = getAllHTMLFiles();

    // Property-based test: for all pages, company name should appear consistently
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...htmlFiles),
        async (pageFile) => {
          const doc = getDocument(pageFile);
          
          // Check header contains company name
          const header = doc.querySelector('header');
          const headerText = header?.textContent || '';
          const headerContainsName = headerText.includes(companyName);
          
          // Check title tag contains company name
          const title = doc.querySelector('title');
          const titleText = title?.textContent || '';
          const titleContainsName = titleText.includes(companyName);
          
          // Check footer contains company name
          const footer = doc.querySelector('footer');
          const footerText = footer?.textContent || '';
          const footerContainsName = footerText.includes(companyName);
          
          // All three locations should contain the company name
          return headerContainsName && titleContainsName && footerContainsName;
        }
      ),
      { numRuns: 100 }
    );
  });
});
