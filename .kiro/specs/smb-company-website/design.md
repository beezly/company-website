# Design Document

## Overview

This document describes the design for a statically-hosted company website for an SMB managed services provider. The website will be built using Astro, a modern static site generator optimized for content-focused websites. Astro was chosen for its excellent performance (ships zero JavaScript by default), component-based architecture, and flexibility to use any UI framework or none at all.

The website will consist of four main pages (Home, Services, About, Contact) with a shared layout including navigation and footer. All company branding, particularly the company name, will be centralized in a configuration file to enable easy updates.

## Architecture

### Technology Stack

- **Framework**: Astro 4.x - Modern static site generator with excellent performance
- **Styling**: Tailwind CSS - Utility-first CSS framework for responsive design
- **Build Tool**: Vite (included with Astro) - Fast build tooling
- **Deployment Target**: Static file hosting (Netlify, Vercel, GitHub Pages)
- **Secret Detection**: Gitleaks - Automated secret scanning tool
- **CI/CD**: GitHub Actions - Automated build, test, and deployment pipeline
- **Git Hooks**: Husky - Pre-commit hook management
- **Brand Standards**: Project Rhubarb Brand Standards (v1.2.0) - Centralized brand guidelines repository

### Project Structure

```
smb-company-website/
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions deployment workflow
├── .husky/
│   └── pre-commit             # Pre-commit hook for secret scanning
├── src/
│   ├── components/
│   │   ├── Header.astro       # Navigation header
│   │   ├── Footer.astro       # Site footer
│   │   └── Layout.astro       # Base page layout
│   ├── pages/
│   │   ├── index.astro        # Home page
│   │   ├── services.astro     # Services page
│   │   ├── about.astro        # About page
│   │   └── contact.astro      # Contact page
│   └── config.ts              # Configuration file with company info
├── public/
│   └── images/                # Static images
├── tests/                     # Test files
├── .env.example               # Environment variable template
├── .gitleaks.toml             # Gitleaks configuration
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # Tailwind configuration
├── package.json
├── README.md
├── SECURITY.md                # Security documentation
└── DEPLOYMENT.md              # Deployment guide
```

## Components and Interfaces

### Configuration Module

**File**: `src/config.ts`

```typescript
export interface SiteConfig {
  companyName: string;
  tagline: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    linkedin?: string;
    twitter?: string;
  };
  branding: {
    repositoryUrl: string;
    version: string;
  };
}

export const siteConfig: SiteConfig = {
  companyName: "Project Rhubarb",
  tagline: "Reliable Managed IT Services",
  description: "Professional managed services for small and medium businesses",
  contact: {
    email: "contact@projectrhubarb.com",
    phone: "(555) 123-4567",
    address: "123 Business St, City, ST 12345"
  },
  social: {
    linkedin: "",
    twitter: ""
  },
  branding: {
    repositoryUrl: "https://github.com/beezly/company-branding",
    version: "1.2.0"
  }
};
```

### Brand Standards Integration

**Repository**: https://github.com/beezly/company-branding
**Version**: 1.2.0

The website integrates with the Project Rhubarb brand standards repository to ensure consistent branding across all projects. Brand elements are synchronized from the central repository:

**Brand Colors** (`src/brand-colors.ts`):
- Primary: Rhubarb Pink (#D64161)
- Secondary: Rhubarb Green (#5A8F5A)
- Neutral colors for text and backgrounds
- Status colors for success, warning, and error states

**Typography**:
- Primary font: Inter (Google Fonts)
- Weights: 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold), 800 (Extra-Bold), 900 (Black)
- Applied via CSS custom properties in `src/styles/global.css`

**Logo Assets**:
- Available from: `https://raw.githubusercontent.com/beezly/company-branding/main/brand-standards/assets/logos/`
- Variants: primary, light, dark, icon, wordmark, stacked

**Synchronization Process**:
1. Brand standards are maintained in the company-branding repository
2. Website references specific version of brand standards
3. When brand standards are updated, website can be synchronized by:
   - Updating brand colors in `src/brand-colors.ts`
   - Updating CSS custom properties in `src/styles/global.css`
   - Updating version number in `src/config.ts`
   - Committing changes with reference to brand standards version

### Layout Component

**File**: `src/components/Layout.astro`

The base layout component wraps all pages and provides:
- HTML document structure
- Meta tags (title, description, viewport)
- Header and Footer components
- Consistent styling and structure

**Props Interface**:
```typescript
interface Props {
  title: string;
  description?: string;
}
```

### Header Component

**File**: `src/components/Header.astro`

Displays:
- Company name from configuration
- Navigation links (Home, Services, About, Contact)
- Responsive mobile menu

### Footer Component

**File**: `src/components/Footer.astro`

Displays:
- Company name from configuration
- Copyright notice with current year
- Contact information
- Social media links (if configured)

### Page Components

Each page (Home, Services, About, Contact) will:
- Use the Layout component
- Import and display the company name from config
- Provide page-specific content
- Use Tailwind CSS for styling

## Data Models

### SiteConfig Interface

```typescript
interface SiteConfig {
  companyName: string;        // The company name displayed throughout site
  tagline: string;            // Short company tagline
  description: string;        // Company description for meta tags
  contact: ContactInfo;       // Contact information
  social: SocialLinks;        // Social media links
}

interface ContactInfo {
  email: string;              // Contact email address
  phone: string;              // Contact phone number
  address: string;            // Physical address
}

interface SocialLinks {
  linkedin?: string;          // LinkedIn profile URL (optional)
  twitter?: string;           // Twitter profile URL (optional)
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, several properties were identified as redundant or combinable:

- Properties 2.3, 2.4, and 2.5 (company name in header, title, footer) are all validated by Property 2.2 (company name consistency across pages)
- Properties 5.1, 5.2, 5.3 (responsive layouts at different breakpoints) can be combined into a single property about responsive CSS
- Properties 7.1-7.5 (README documentation) are all examples of specific documentation requirements rather than universal properties

The following properties represent the unique, non-redundant correctness requirements:

### Property 1: Company name configuration consistency
*For any* page in the website, the company name displayed should match the company name defined in the configuration file
**Validates: Requirements 2.2, 2.3, 2.4, 2.5**

### Property 2: Semantic HTML usage
*For any* page in the website, the HTML should use semantic elements (header, nav, main, footer, article, section) appropriately
**Validates: Requirements 6.1**

### Property 3: Meta tag completeness
*For any* page in the website, the page should include title and description meta tags
**Validates: Requirements 6.2**

### Property 4: Heading hierarchy correctness
*For any* page in the website, heading tags should follow proper hierarchical order (exactly one h1, h2s nested under h1, h3s nested under h2)
**Validates: Requirements 6.4**

### Property 5: Image accessibility
*For any* image in the website, the img tag should have a non-empty alt attribute
**Validates: Requirements 6.5**

### Property 6: Responsive image styling
*For any* image in the website, the image should have responsive CSS properties or attributes
**Validates: Requirements 5.4**

### Property 7: Secret detection in pre-commit hook
*For any* commit attempt containing common secret patterns, the pre-commit hook should block the commit and display a warning
**Validates: Requirements 8.1, 8.2, 8.3**

### Property 8: GitHub Actions workflow validity
*For any* push to the main branch, the GitHub Actions workflow should execute successfully and deploy the site
**Validates: Requirements 9.1, 9.2, 9.4**

## Security Architecture

### Secret Detection System

The website implements a multi-layered approach to prevent accidental exposure of sensitive information:

**Layer 1: Pre-commit Hook**
- Husky manages Git hooks
- Gitleaks scans staged files before each commit
- Blocks commits containing detected secrets
- Provides helpful error messages with remediation steps

**Layer 2: CI/CD Scanning**
- GitHub Actions runs Gitleaks on every push and pull request
- Catches secrets that bypass local checks
- Scans entire repository history
- Fails the build if secrets are detected

**Layer 3: Manual Scanning**
- `npm run security:scan` - Scan entire repository
- `npm run security:protect` - Scan staged files on demand

### Secret Detection Patterns

Gitleaks is configured to detect:
- Generic API keys (20+ character alphanumeric strings with key/secret keywords)
- AWS access keys (AKIA...)
- Stripe API keys (sk_live_..., pk_test_...)
- GitHub tokens (ghp_...)
- Google API keys (AIza...)
- Slack tokens (xoxb-...)
- Private keys (-----BEGIN ... PRIVATE KEY-----)
- Database connection strings

### Environment Variable Management

**Configuration:**
- `.env` file stores actual secrets (gitignored)
- `.env.example` documents required variables (committed)
- Astro's `import.meta.env` provides access to environment variables
- Variables prefixed with `PUBLIC_` are exposed to client-side code

**Best Practices:**
- Never hardcode secrets in source code
- Use environment variables for all sensitive data
- Document all required variables in `.env.example`
- Rotate secrets immediately if accidentally committed

## CI/CD Pipeline

### GitHub Actions Workflow

**Trigger Events:**
- Push to main branch
- Manual workflow dispatch

**Build Job:**
1. Checkout code
2. Setup Node.js 20
3. Install dependencies (`npm ci`)
4. Run build (`npm run build`)
5. Upload build artifacts

**Deploy Job:**
1. Deploy to GitHub Pages
2. Set deployment URL
3. Requires build job to complete successfully

**Permissions:**
- `contents: read` - Read repository contents
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - OIDC token for deployment

### Deployment Process

1. Developer pushes code to main branch
2. GitHub Actions triggers automatically
3. Build job runs tests and builds site
4. If successful, deploy job publishes to GitHub Pages
5. Site is live at configured URL within 1-2 minutes

## Error Handling

### Build-Time Errors

1. **Missing Configuration**: If the configuration file is missing or malformed, the build process should fail with a clear error message indicating the issue
2. **Invalid Configuration Values**: If required configuration fields are empty or invalid, the build should fail with validation errors
3. **Missing Assets**: If referenced images or assets are missing, the build should warn or fail depending on severity
4. **Invalid HTML**: If generated HTML is malformed, the build should fail with validation errors
5. **Secret Detection**: If secrets are detected during commit or CI/CD, the process should fail with detailed information about the detected secret

### Runtime Errors

Since this is a static website with minimal JavaScript:

1. **Navigation Errors**: If a navigation link points to a non-existent page, users should see a 404 page (provided by hosting service)
2. **Asset Loading Errors**: If images fail to load, alt text should be displayed
3. **Form Submission**: Contact form should handle submission errors gracefully (if implemented with a form service)

### Security Errors

1. **Commit Blocked**: If pre-commit hook detects secrets, provide clear instructions on how to use environment variables
2. **CI/CD Failure**: If GitHub Actions detects secrets, fail the build and notify developers
3. **False Positives**: Allow developers to configure allowlist in `.gitleaks.toml` for legitimate patterns

## Testing Strategy

### Unit Testing

Unit tests will verify specific functionality and edge cases:

1. **Configuration Loading**: Test that the configuration file can be imported and contains required fields
2. **Component Rendering**: Test that components render with expected props
3. **Build Output**: Test that the build process generates expected files in the output directory
4. **File Existence**: Test that all required pages (index, services, about, contact) exist in build output
5. **Static File Validation**: Test that build output contains only static files (HTML, CSS, JS, images)
6. **Performance**: Test that total bundle size (excluding images) is under 500KB
7. **Documentation**: Test that README.md, SECURITY.md, and DEPLOYMENT.md exist and contain required sections
8. **Security Configuration**: Test that `.gitleaks.toml` exists and contains required secret detection rules
9. **CI/CD Configuration**: Test that `.github/workflows/deploy.yml` exists and is valid YAML
10. **Environment Variables**: Test that `.env.example` exists and documents required variables

### Property-Based Testing

Property-based tests will verify universal properties across all pages and components. We will use **fast-check** (for JavaScript/TypeScript) as our property-based testing library.

Each property-based test will:
- Run a minimum of 100 iterations to ensure thorough coverage
- Be tagged with a comment explicitly referencing the correctness property from this design document
- Use the format: `**Feature: smb-company-website, Property {number}: {property_text}**`

Property-based tests will verify:

1. **Property 1 - Company Name Consistency**: For any generated page, parse the HTML and verify the company name from config appears in header, title, and footer
2. **Property 2 - Semantic HTML**: For any generated page, verify semantic HTML elements are present and properly used
3. **Property 3 - Meta Tags**: For any generated page, verify title and description meta tags exist and are non-empty
4. **Property 4 - Heading Hierarchy**: For any generated page, verify heading structure follows proper hierarchy
5. **Property 5 - Image Alt Text**: For any generated page, verify all img tags have non-empty alt attributes
6. **Property 6 - Responsive Images**: For any generated page, verify all images have responsive styling
7. **Property 7 - Secret Detection**: For any common secret pattern, verify the pre-commit hook blocks commits containing that pattern
8. **Property 8 - Workflow Validity**: For any valid push event, verify the GitHub Actions workflow configuration is syntactically correct and contains required jobs

### Testing Approach

1. **Build First**: Implement the website functionality completely before writing tests
2. **Test Generated Output**: Tests will run against the built static files in the output directory
3. **HTML Parsing**: Use a library like `jsdom` or `cheerio` to parse and validate HTML structure
4. **Automated Validation**: Tests should run as part of the build process to catch issues early

### Test Organization

```
tests/
├── unit/
│   ├── config.test.ts         # Configuration loading tests
│   ├── build.test.ts          # Build output tests
│   ├── performance.test.ts    # Bundle size tests
│   ├── security.test.ts       # Security configuration tests
│   └── documentation.test.ts  # Documentation completeness tests
├── properties/
│   ├── company-name.test.ts   # Property 1: Company name consistency
│   ├── semantic-html.test.ts  # Property 2: Semantic HTML
│   ├── meta-tags.test.ts      # Property 3: Meta tag completeness
│   ├── headings.test.ts       # Property 4: Heading hierarchy
│   ├── images.test.ts         # Properties 5 & 6: Image accessibility and responsiveness
│   └── security.test.ts       # Properties 7 & 8: Secret detection and workflow validity
└── utils/
    └── html-validators.ts     # Shared utilities for parsing HTML
```

## Deployment

### Build Process

1. Run `npm run build` to generate static files
2. Output will be in the `dist/` directory
3. All pages, assets, and configuration will be compiled into static files

### Automated Deployment (GitHub Pages)

**Primary deployment method using GitHub Actions:**

1. **Configuration**:
   - Update `astro.config.mjs` with site URL and base path
   - Enable GitHub Pages in repository settings
   - Select "GitHub Actions" as deployment source

2. **Workflow**:
   - Defined in `.github/workflows/deploy.yml`
   - Triggers on push to main branch
   - Runs build and test suite
   - Deploys to GitHub Pages automatically

3. **Access**:
   - Site available at `https://USERNAME.github.io/REPO-NAME/`
   - Custom domain support via CNAME file in `public/` directory

### Manual Deployment Options

The website can also be deployed to other static hosting services:

1. **Netlify**: Connect repository and configure build command (`npm run build`) and publish directory (`dist`)
2. **Vercel**: Similar to Netlify, auto-detects Astro projects
3. **AWS S3 + CloudFront**: Upload `dist/` contents to S3 bucket configured for static hosting

### Configuration for Deployment

- Ensure `astro.config.mjs` has correct `site` and `base` settings for the deployment URL
- Update `siteConfig` in `src/config.ts` with production values before deployment
- Verify all links are relative or use the configured base path
- Set environment variables in hosting platform (GitHub Secrets, Netlify environment variables, etc.)

## Performance Considerations

1. **Zero JavaScript by Default**: Astro ships zero JavaScript by default, only hydrating interactive components
2. **Optimized Images**: Use Astro's built-in image optimization for responsive images
3. **CSS Optimization**: Tailwind CSS will be purged of unused styles during build
4. **Minimal Bundle Size**: Target under 500KB for initial page load (excluding images)
5. **Static Generation**: All pages pre-rendered at build time for instant loading

## Accessibility

1. **Semantic HTML**: Use proper HTML5 semantic elements throughout
2. **Alt Text**: All images must have descriptive alt text
3. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
4. **Color Contrast**: Use sufficient color contrast for text readability
5. **Responsive Design**: Ensure usability across all device sizes

## Brand Standards Maintenance

### Synchronization Workflow

When brand standards are updated in the company-branding repository:

1. **Review Changes**: Check the brand.json file for updates to colors, typography, or other elements
2. **Update Brand Colors**: Modify `src/brand-colors.ts` with new color values
3. **Update CSS Variables**: Update CSS custom properties in `src/styles/global.css`
4. **Update Configuration**: Update brand version in `src/config.ts`
5. **Test Changes**: Run tests to ensure no visual regressions
6. **Document Changes**: Update CHANGELOG or commit message with brand version reference
7. **Deploy**: Push changes to trigger automated deployment

### Brand Consistency Checks

To maintain brand consistency:

- All colors must come from `src/brand-colors.ts` or CSS custom properties
- Typography must use Inter font family as specified in brand standards
- Logo assets must be referenced from the brand standards repository
- Spacing should follow the 8px base unit system
- Comments in code should reference brand standards version

### Automated Brand Validation

Future enhancement: Create automated tests to validate:
- Colors used in components match brand standards
- Typography specifications are correctly applied
- Logo assets are properly referenced
- Spacing follows brand guidelines

## Future Enhancements

Potential future improvements not included in initial scope:

1. **Blog Section**: Add a blog with markdown-based posts
2. **Case Studies**: Showcase client success stories
3. **Contact Form Integration**: Integrate with a form service (Formspree, Netlify Forms)
4. **Analytics**: Add privacy-friendly analytics (Plausible, Fathom)
5. **CMS Integration**: Connect to a headless CMS for non-technical content updates
6. **Multi-language Support**: Add internationalization for multiple languages
7. **Automated Brand Sync**: Create a script to automatically sync brand standards from the repository
