# SMB Company Website

A modern, statically-hosted company website for small-to-medium business managed services providers. Built with Astro and Tailwind CSS for optimal performance and easy customization.

## Technology Stack

- **Framework**: [Astro 5.x](https://astro.build) - Modern static site generator
- **Styling**: [Tailwind CSS 4.x](https://tailwindcss.com) - Utility-first CSS framework
- **Build Tool**: Vite (included with Astro)
- **Deployment**: Static file hosting (Netlify, Vercel, GitHub Pages, etc.)

## Features

- 🚀 Fast, static site generation with zero JavaScript by default
- 📱 Fully responsive design (mobile, tablet, desktop)
- ♿ Accessible with semantic HTML and proper ARIA attributes
- 🔍 SEO-optimized with meta tags and sitemap generation
- ⚙️ Centralized configuration for easy branding updates
- 📝 Four main pages: Home, Services, About, Contact

## Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd smb-company-website
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

The site will be available at `http://localhost:4321`

## Updating Company Information

All company branding and contact information is centralized in a single configuration file for easy updates.

### How to Update the Company Name

1. Open `src/config.ts`
2. Locate the `siteConfig` object
3. Update the `companyName` field:

```typescript
export const siteConfig: SiteConfig = {
  companyName: "Your Company Name", // ← Change this
  tagline: "Reliable Managed IT Services",
  // ... rest of config
};
```

4. Save the file
5. Rebuild the site (see Build Process below)

The company name will automatically update across:
- Navigation header on all pages
- Page titles in browser tabs
- Footer on all pages
- Meta tags for SEO

### Updating Other Information

You can also update other fields in `src/config.ts`:

- `tagline` - Company tagline displayed on the home page
- `description` - Company description used in meta tags
- `contact.email` - Contact email address
- `contact.phone` - Contact phone number
- `contact.address` - Physical business address
- `social.linkedin` - LinkedIn profile URL (optional)
- `social.twitter` - Twitter profile URL (optional)

## Build Process

### Development

Run the development server with hot-reload:

```sh
npm run dev
```

This starts a local server at `http://localhost:4321` with automatic page refresh on file changes.

### Production Build

Build the site for production:

```sh
npm run build
```

This generates optimized static files in the `dist/` directory:
- Minified HTML, CSS, and JavaScript
- Optimized images
- Generated sitemap.xml
- All assets ready for deployment

### Preview Production Build

Preview the production build locally:

```sh
npm run preview
```

This serves the `dist/` directory to verify the production build works correctly.

## Deployment Instructions

The website generates static files that can be deployed to any static hosting service.

### Netlify

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Log in to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

Netlify will automatically rebuild and deploy on every push to your repository.

### Vercel

1. Push your code to a Git repository
2. Log in to [Vercel](https://vercel.com)
3. Click "Add New" → "Project"
4. Import your repository
5. Vercel auto-detects Astro projects and configures build settings
6. Click "Deploy"

### GitHub Pages (Recommended - Free)

**Automatic Deployment with GitHub Actions** (already configured):

1. Update `astro.config.mjs` with your GitHub username and repository name:
```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/your-repo-name',
  // ...
});
```

2. Push your code to GitHub:
```sh
git add .
git commit -m "Initial commit"
git push origin main
```

3. Enable GitHub Pages in your repository:
   - Go to Settings → Pages
   - Under "Build and deployment", select "GitHub Actions" as the source
   - The workflow will automatically build and deploy your site

4. Your site will be live at `https://yourusername.github.io/your-repo-name/`

**Using a Custom Domain:**

If you have your own domain:
1. Add a `CNAME` file to the `public/` directory with your domain name
2. Configure DNS settings with your domain provider
3. Update the `site` in `astro.config.mjs` to your custom domain
4. Remove or set `base: '/'` in the config

**Manual Deployment** (alternative):

```sh
npm run build
npm install -g gh-pages
gh-pages -d dist
```

### Other Static Hosts

The `dist/` directory can be uploaded to any static hosting service:
- **AWS S3 + CloudFront**: Upload `dist/` contents to S3 bucket
- **Azure Static Web Apps**: Deploy via Azure CLI or GitHub Actions
- **Cloudflare Pages**: Connect repository or upload `dist/` folder
- **DigitalOcean App Platform**: Deploy from Git repository

## Project Structure

```
smb-company-website/
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── Header.astro     # Navigation header with company name
│   │   ├── Footer.astro     # Site footer with contact info
│   │   └── Layout.astro     # Base page layout wrapper
│   ├── pages/               # Page routes (file-based routing)
│   │   ├── index.astro      # Home page (/)
│   │   ├── services.astro   # Services page (/services)
│   │   ├── about.astro      # About page (/about)
│   │   └── contact.astro    # Contact page (/contact)
│   ├── styles/              # Global styles
│   │   └── global.css       # Global CSS and Tailwind imports
│   └── config.ts            # ⭐ Site configuration (company info)
├── public/                  # Static assets (images, favicon, etc.)
│   └── favicon.svg
├── dist/                    # Build output (generated, not in Git)
├── astro.config.mjs         # Astro configuration
├── tailwind.config.mjs      # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

### Key Files

- **`src/config.ts`**: Central configuration file for company branding and contact information
- **`src/components/Layout.astro`**: Base layout used by all pages, includes meta tags and structure
- **`src/components/Header.astro`**: Navigation header component
- **`src/components/Footer.astro`**: Footer component with contact information
- **`src/pages/*.astro`**: Individual page components (one file per route)
- **`astro.config.mjs`**: Astro framework configuration, includes sitemap integration

## Customization

### Adding New Pages

1. Create a new `.astro` file in `src/pages/`
2. Use the Layout component:

```astro
---
import Layout from '../components/Layout.astro';
import { siteConfig } from '../config';
---

<Layout title={`New Page - ${siteConfig.companyName}`}>
  <h1>New Page Content</h1>
</Layout>
```

3. Add a navigation link in `src/components/Header.astro`

### Modifying Styles

This project uses Tailwind CSS. You can:
- Add utility classes directly in `.astro` files
- Customize Tailwind configuration in `tailwind.config.mjs`
- Add custom CSS in `src/styles/global.css`

### Adding Images

Place images in the `public/` directory and reference them with absolute paths:

```html
<img src="/images/logo.png" alt="Company Logo" />
```

## Commands Reference

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Initial page load: < 500KB (excluding images)
- Zero JavaScript by default
- Optimized CSS with unused styles purged
- Static generation for instant page loads

## License

[Your License Here]

## Support

For questions or issues, contact [contact@example.com](mailto:contact@example.com)
