# GitHub Pages Deployment Guide

This guide will walk you through deploying your SMB company website to GitHub Pages for free.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Your website code ready to deploy

## Step-by-Step Instructions

### 1. Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the "+" icon in the top right → "New repository"
3. Name your repository (e.g., `company-website`)
4. Choose "Public" (required for free GitHub Pages)
5. Don't initialize with README (you already have one)
6. Click "Create repository"

### 2. Update Configuration

Before pushing to GitHub, update `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://YOUR-USERNAME.github.io',
  base: '/YOUR-REPO-NAME',
  // ...
});
```

Replace:
- `YOUR-USERNAME` with your GitHub username
- `YOUR-REPO-NAME` with your repository name (e.g., `company-website`)

**Example:**
If your username is `johnsmith` and repo is `company-website`:
```javascript
site: 'https://johnsmith.github.io',
base: '/company-website',
```

### 3. Push Your Code to GitHub

In your project directory, run:

```sh
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" (top menu)
3. Click "Pages" in the left sidebar
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. That's it! The workflow is already configured in `.github/workflows/deploy.yml`

### 5. Wait for Deployment

1. Go to the "Actions" tab in your repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 1-2 minutes)
4. Once complete, your site is live!

### 6. Access Your Website

Your website will be available at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

For example: `https://johnsmith.github.io/company-website/`

## Using a Custom Domain (Optional)

If you own a domain name (e.g., `yourcompany.com`):

### 1. Add CNAME File

Create a file named `CNAME` in the `public/` directory:

```
yourcompany.com
```

### 2. Update Astro Config

In `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://yourcompany.com',
  base: '/', // Change to root
  // ...
});
```

### 3. Configure DNS

In your domain registrar's DNS settings, add:

**For apex domain (yourcompany.com):**
- Type: A
- Name: @
- Value: 185.199.108.153
- Add 3 more A records with: 185.199.109.153, 185.199.110.153, 185.199.111.153

**For www subdomain:**
- Type: CNAME
- Name: www
- Value: YOUR-USERNAME.github.io

### 4. Configure in GitHub

1. Go to Settings → Pages
2. Under "Custom domain", enter your domain
3. Check "Enforce HTTPS" (after DNS propagates)

DNS changes can take 24-48 hours to propagate.

## Updating Your Site

After making changes to your website:

```sh
git add .
git commit -m "Update website content"
git push
```

GitHub Actions will automatically rebuild and deploy your site within 1-2 minutes.

## Troubleshooting

### Site shows 404 errors

- Check that `base` in `astro.config.mjs` matches your repository name
- Verify GitHub Pages is enabled in Settings → Pages
- Check the Actions tab for deployment errors

### CSS/Images not loading

- Ensure `base` is set correctly in `astro.config.mjs`
- All links should be relative or use the base path
- Check browser console for 404 errors

### Workflow fails

- Check the Actions tab for error messages
- Ensure `package.json` has all required dependencies
- Verify Node.js version in workflow matches your local version

## Cost

GitHub Pages is **completely free** for public repositories with:
- Unlimited bandwidth (soft limit ~100GB/month)
- Free SSL certificate
- Free custom domain support

## Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/github/)
- Check the Actions tab for deployment logs
