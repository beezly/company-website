# Brand Standards Integration

This website is integrated with the **Project Rhubarb** official brand standards maintained in a centralized repository.

## Brand Standards Repository

**Repository**: [github.com/beezly/company-branding](https://github.com/beezly/company-branding)  
**Current Version**: 1.2.0  
**Last Synced**: 2025-11-22

## Brand Elements

### Company Information
- **Company Name**: Project Rhubarb
- **Tagline**: Reliable Managed IT Services

### Colors

All brand colors are defined in `src/brand-colors.ts` and `src/styles/global.css`:

| Color | Name | Hex | Usage |
|-------|------|-----|-------|
| Primary | Rhubarb Pink | `#D64161` | Headers, CTAs, key interactive elements |
| Secondary | Rhubarb Green | `#5A8F5A` | Accents, highlights, notifications |
| Neutral Dark | Charcoal | `#2C3E50` | Primary text color |
| Neutral Medium | Slate Gray | `#7F8C8D` | Secondary text, captions |
| Neutral Light | Light Gray | `#ECF0F1` | Backgrounds, sections |
| Success | Success Green | `#27AE60` | Success states, confirmations |
| Warning | Warning Yellow | `#F39C12` | Warnings, cautions |
| Error | Error Red | `#E74C3C` | Errors, critical states |

### Typography

**Primary Font**: [Inter](https://fonts.google.com/specimen/Inter)  
**License**: SIL Open Font License 1.1 (Free for commercial use)  
**CDN**: Google Fonts

**Weights Available**:
- 400 (Regular) - Body text
- 500 (Medium) - Emphasis
- 600 (Semi-Bold) - Subheadings
- 700 (Bold) - Headings
- 800 (Extra-Bold) - Display text
- 900 (Black) - Hero sections

**Implementation**:
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Logo Assets

Logos are available from the brand standards repository:

**Base URL**: `https://raw.githubusercontent.com/beezly/company-branding/main/brand-standards/assets/logos/`

**Available Variants**:
- `rhubarb-logo-primary.svg` - Main logo (light backgrounds)
- `rhubarb-logo-light.svg` - For dark backgrounds
- `rhubarb-logo-dark.svg` - For light backgrounds
- `rhubarb-icon.svg` - Compact icon (32x32+)
- `rhubarb-wordmark.svg` - Text only
- `rhubarb-logo-stacked.svg` - Vertical layout

### Spacing

Based on 8px base unit system:
- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- 2XL: 48px
- 3XL: 64px

## Synchronizing Brand Updates

When the brand standards repository is updated:

### 1. Check for Updates

```bash
# Clone or pull the latest brand standards
gh repo clone beezly/company-branding /tmp/company-branding
cd /tmp/company-branding
git pull
```

### 2. Review Changes

Check `brand-standards/brand.json` for:
- Color changes
- Typography updates
- New logo variants
- Spacing modifications

### 3. Update Website Files

**Update Colors** (`src/brand-colors.ts`):
```typescript
export const brandColors = {
  primary: {
    name: "Rhubarb Pink",
    hex: "#D64161",
    // ... update values from brand.json
  },
  // ...
};
```

**Update CSS Variables** (`src/styles/global.css`):
```css
@theme {
  --color-brand-primary: #D64161;
  --color-brand-secondary: #5A8F5A;
  /* ... update values from brand.json */
}
```

**Update Configuration** (`src/config.ts`):
```typescript
branding: {
  repositoryUrl: "https://github.com/beezly/company-branding",
  version: "1.3.0"  // Update to new version
}
```

### 4. Test Changes

```bash
# Run tests to ensure no regressions
npm test

# Build and preview locally
npm run build
npm run preview
```

### 5. Commit and Deploy

```bash
git add src/brand-colors.ts src/styles/global.css src/config.ts
git commit -m "Sync brand standards to v1.3.0"
git push origin main
```

The CI/CD pipeline will automatically deploy the updated branding.

## Brand Consistency Guidelines

### DO:
✅ Use colors from `src/brand-colors.ts` or CSS custom properties  
✅ Use Inter font family for all text  
✅ Reference logos from the brand standards repository  
✅ Follow the 8px spacing system  
✅ Document brand version in code comments  

### DON'T:
❌ Hardcode color values directly in components  
❌ Use fonts other than Inter  
❌ Create custom logo variations  
❌ Use arbitrary spacing values  
❌ Modify brand elements without updating brand standards first  

## Accessing Brand Standards Programmatically

The brand standards repository includes a TypeScript library for programmatic access:

```typescript
import { BrandReader } from 'brand-standards';

const reader = new BrandReader();
const brand = reader.load('./brand-standards/brand.json');

// Get specific elements
const primaryColor = reader.getColor('primary');
console.log(primaryColor.hex); // "#D64161"

const headingFont = reader.getTypography('heading');
console.log(headingFont.fontFamily); // "Inter, sans-serif"
```

## Questions or Issues?

For questions about brand standards:
- Review the [brand standards repository](https://github.com/beezly/company-branding)
- Check the brand standards README for detailed guidelines
- Contact the brand management team

For technical integration issues:
- Check this BRANDING.md file
- Review the design document in `.kiro/specs/smb-company-website/design.md`
- Open an issue in this repository
