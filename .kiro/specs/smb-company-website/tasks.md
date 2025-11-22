# Implementation Plan

- [x] 1. Initialize project with Astro and Tailwind CSS
  - Create new Astro project with TypeScript support
  - Install and configure Tailwind CSS
  - Set up project structure (components, pages, config directories)
  - Configure build output directory
  - _Requirements: 3.1, 3.2, 3.5_

- [x] 2. Create configuration module
  - Create `src/config.ts` with SiteConfig interface and default values
  - Export siteConfig object with company name and contact information
  - Add TypeScript types for configuration structure
  - _Requirements: 2.1_

- [x] 3. Build base layout and shared components
  - [x] 3.1 Create Layout component with HTML structure and meta tags
    - Implement Layout.astro with props for title and description
    - Add viewport meta tag and semantic HTML structure
    - Import and apply global styles
    - _Requirements: 1.5, 5.1, 5.2, 5.3, 6.1, 6.2_
  
  - [x] 3.2 Create Header component with navigation
    - Import company name from config
    - Add navigation links for all pages
    - Implement responsive mobile menu
    - _Requirements: 2.3_
  
  - [x] 3.3 Create Footer component
    - Import company name and contact info from config
    - Display copyright with current year
    - Add contact information and social links
    - _Requirements: 2.5_

- [x] 4. Implement page components
  - [x] 4.1 Create home page (index.astro)
    - Use Layout component with company name in title
    - Add hero section with company tagline
    - Add services overview section
    - Add call-to-action section
    - _Requirements: 1.1, 2.2, 2.4_
  
  - [x] 4.2 Create services page
    - Use Layout component with company name in title
    - Add detailed services descriptions
    - List managed services offerings
    - _Requirements: 1.2, 2.2, 2.4_
  
  - [x] 4.3 Create about page
    - Use Layout component with company name in title
    - Add company background information
    - Add mission and values sections
    - _Requirements: 1.3, 2.2, 2.4_
  
  - [x] 4.4 Create contact page
    - Use Layout component with company name in title
    - Display contact information from config
    - Add contact details (email, phone, address)
    - _Requirements: 1.4, 2.2, 2.4_

- [x] 5. Implement responsive styling
  - Add Tailwind responsive classes for mobile (< 768px)
  - Add Tailwind responsive classes for tablet (768-1024px)
  - Add Tailwind responsive classes for desktop (> 1024px)
  - Configure responsive image styling
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 6. Add SEO and accessibility features
  - [x] 6.1 Ensure semantic HTML in all components
    - Use header, nav, main, footer, article, section elements
    - Verify proper heading hierarchy (h1, h2, h3)
    - _Requirements: 6.1, 6.4_
  
  - [x] 6.2 Add meta tags to all pages
    - Ensure each page has unique title with company name
    - Add description meta tags to each page
    - _Requirements: 6.2_
  
  - [x] 6.3 Configure sitemap generation
    - Install and configure Astro sitemap integration
    - Verify sitemap.xml is generated in build output
    - _Requirements: 6.3_
  
  - [x] 6.4 Add alt text to all images
    - Ensure all img tags have descriptive alt attributes
    - _Requirements: 6.5_

- [x] 7. Create documentation
  - [x] 7.1 Write README.md
    - Add project overview and technology stack
    - Document setup instructions (npm install)
    - Document how to update company name in config.ts
    - Document how to run build process (npm run build, npm run dev)
    - Document deployment instructions for static hosting
    - Document project structure and key files
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 8. Set up testing infrastructure
  - [x] 8.1 Install testing dependencies
    - Install Vitest for unit testing
    - Install fast-check for property-based testing
    - Install jsdom or cheerio for HTML parsing
    - Configure test scripts in package.json
    - _Requirements: All testing requirements_
  
  - [x] 8.2 Create test utilities
    - Create helper functions for parsing built HTML files
    - Create utilities for loading and validating config
    - Create utilities for checking file existence in dist/
    - _Requirements: All testing requirements_

- [x] 9. Write unit tests
  - [x] 9.1 Write configuration tests
    - Test that config.ts exports valid SiteConfig object
    - Test that required fields are present
    - _Requirements: 2.1_
  
  - [x] 9.2 Write build output tests
    - Test that all required pages exist in dist/ (index.html, services.html, about.html, contact.html)
    - Test that only static files are generated (HTML, CSS, JS, images)
    - Test that sitemap.xml exists in dist/
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 3.2, 4.1, 4.3, 4.5, 6.3_
  
  - [x] 9.3 Write performance tests
    - Test that total bundle size (HTML + CSS + JS) is under 500KB
    - _Requirements: 3.4_
  
  - [x] 9.4 Write documentation tests
    - Test that README.md exists
    - Test that README contains required sections (setup, company name update, build, deployment, structure)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 10. Write property-based tests
  - [x] 10.1 Write property test for company name consistency
    - **Property 1: Company name configuration consistency**
    - **Validates: Requirements 2.2, 2.3, 2.4, 2.5**
    - For all pages, verify company name from config appears in header, title tag, and footer
    - Configure to run 100+ iterations
  
  - [x] 10.2 Write property test for semantic HTML
    - **Property 2: Semantic HTML usage**
    - **Validates: Requirements 6.1**
    - For all pages, verify semantic elements (header, nav, main, footer) are present
    - Configure to run 100+ iterations
  
  - [x] 10.3 Write property test for meta tags
    - **Property 3: Meta tag completeness**
    - **Validates: Requirements 6.2**
    - For all pages, verify title and description meta tags exist and are non-empty
    - Configure to run 100+ iterations
  
  - [x] 10.4 Write property test for heading hierarchy
    - **Property 4: Heading hierarchy correctness**
    - **Validates: Requirements 6.4**
    - For all pages, verify exactly one h1 and proper heading hierarchy
    - Configure to run 100+ iterations
  
  - [x] 10.5 Write property test for image accessibility
    - **Property 5: Image accessibility**
    - **Validates: Requirements 6.5**
    - For all pages, verify all img tags have non-empty alt attributes
    - Configure to run 100+ iterations
  
  - [x] 10.6 Write property test for responsive images
    - **Property 6: Responsive image styling**
    - **Validates: Requirements 5.4**
    - For all pages, verify all images have responsive CSS classes or attributes
    - Configure to run 100+ iterations

- [x] 11. Verify build and deployment readiness
  - Run full build process and verify output
  - Test that dist/ directory can be served statically
  - Verify all pages load correctly from dist/
  - Ensure all tests pass, ask the user if questions arise
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 12. Set up secret detection and security
  - [x] 12.1 Install and configure Gitleaks
    - Install Gitleaks as dev dependency
    - Create `.gitleaks.toml` configuration file
    - Configure detection rules for common secret patterns (API keys, tokens, private keys)
    - Add allowlist for false positives and documentation files
    - _Requirements: 8.1, 8.2_
  
  - [x] 12.2 Set up pre-commit hooks
    - Install Husky for Git hook management
    - Create pre-commit hook that runs Gitleaks
    - Configure hook to block commits containing secrets
    - Add helpful error messages for developers
    - _Requirements: 8.3_
  
  - [x] 12.3 Create environment variable template
    - Create `.env.example` file documenting required variables
    - Add site URL and placeholder for future API keys
    - Document PUBLIC_ prefix convention for client-side variables
    - Ensure `.env` is in `.gitignore`
    - _Requirements: 8.5_
  
  - [x] 12.4 Write security documentation
    - Create `SECURITY.md` with comprehensive security guide
    - Document all protection layers (pre-commit, CI/CD, manual)
    - Provide examples of what gets detected
    - Include best practices for using environment variables
    - Document remediation steps if secrets are detected
    - Add troubleshooting section
    - _Requirements: 8.5_

- [x] 13. Set up automated deployment
  - [x] 13.1 Create GitHub Actions workflow
    - Create `.github/workflows/deploy.yml`
    - Configure build job (checkout, setup Node, install, build)
    - Configure deploy job (deploy to GitHub Pages)
    - Set up proper permissions (contents, pages, id-token)
    - Add concurrency control to prevent simultaneous deployments
    - _Requirements: 9.1, 9.2, 9.4_
  
  - [x] 13.2 Configure Astro for GitHub Pages
    - Update `astro.config.mjs` with site and base configuration
    - Ensure build output is compatible with GitHub Pages
    - Test that all links work with base path
    - _Requirements: 9.1, 9.2_
  
  - [x] 13.3 Write deployment documentation
    - Create `DEPLOYMENT.md` with step-by-step GitHub Pages guide
    - Document repository setup and configuration
    - Document how to enable GitHub Pages
    - Include custom domain setup instructions
    - Add troubleshooting section
    - Document update process for future changes
    - _Requirements: 9.5_
  
  - [x] 13.4 Update README with deployment info
    - Add GitHub Pages deployment section to README
    - Document automated deployment workflow
    - Add security features to README
    - Update available npm scripts
    - _Requirements: 9.5_

- [x] 14. Add security and deployment tests
  - [x] 14.1 Write unit tests for security configuration
    - Test that `.gitleaks.toml` exists and is valid
    - Test that `.env.example` exists and documents required variables
    - Test that pre-commit hook is executable
    - Test that `SECURITY.md` exists and contains required sections
    - _Requirements: 8.1, 8.2, 8.3, 8.5_
  
  - [x] 14.2 Write unit tests for CI/CD configuration
    - Test that `.github/workflows/deploy.yml` exists
    - Test that workflow file is valid YAML
    - Test that workflow contains required jobs (build, deploy)
    - Test that `DEPLOYMENT.md` exists and contains required sections
    - _Requirements: 9.1, 9.2, 9.4, 9.5_

- [x] 15. Final verification
  - Test pre-commit hook by attempting to commit a test secret
  - Verify GitHub Actions workflow runs successfully
  - Verify site deploys correctly to GitHub Pages
  - Run all tests including new security and deployment tests
  - Ensure all documentation is complete and accurate
  - _Requirements: 8.1, 8.2, 8.3, 9.1, 9.2_
