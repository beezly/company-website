#!/usr/bin/env node
/**
 * Brand synchronization script for GitHub Actions workflow.
 * Syncs brand standards from company-branding repository.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface BrandColor {
  name: string;
  hex: string;
  rgb: [number, number, number];
  usage: string;
}

interface BrandData {
  metadata: {
    companyName: string;
    version: string;
  };
  colors: {
    primary: BrandColor;
    secondary: BrandColor;
    neutral_dark: BrandColor;
    neutral_medium: BrandColor;
    neutral_light: BrandColor;
    success: BrandColor;
    warning: BrandColor;
    error: BrandColor;
    white: BrandColor;
  };
}

function main() {
  const version = process.argv[2];
  if (!version) {
    console.error('Usage: sync-brand.ts <version>');
    process.exit(1);
  }

  const today = new Date().toISOString().split('T')[0];

  console.log(`Syncing to version ${version}...`);

  // Load brand JSON
  const brandJsonPath = join('brand-repo', 'brand-standards', 'brand.json');
  const brand: BrandData = JSON.parse(readFileSync(brandJsonPath, 'utf-8'));
  const { companyName } = brand.metadata;
  const { colors } = brand;

  // Update src/config.ts
  let config = readFileSync('src/config.ts', 'utf-8');
  config = config.replace(/version: "[^"]*"/, `version: "${version}"`);
  config = config.replace(/companyName: "[^"]*"/, `companyName: "${companyName}"`);
  config = config.replace(/Brand Standards Version: [0-9.]+/, `Brand Standards Version: ${version}`);
  config = config.replace(/Last Synced: [0-9-]+/, `Last Synced: ${today}`);
  writeFileSync('src/config.ts', config);

  // Generate brand-colors.ts
  const brandColorsContent = `/**
 * Brand Colors
 * 
 * Synchronized with Project Rhubarb brand standards
 * Source: https://github.com/beezly/company-branding
 * Brand Version: ${version}
 * 
 * DO NOT modify these values directly. All brand colors should be updated
 * in the company-branding repository and synced here.
 */

export const brandColors = {
  primary: {
    name: "${colors.primary.name}",
    hex: "${colors.primary.hex}",
    rgb: [${colors.primary.rgb.join(', ')}] as const,
    usage: "${colors.primary.usage}"
  },
  secondary: {
    name: "${colors.secondary.name}",
    hex: "${colors.secondary.hex}",
    rgb: [${colors.secondary.rgb.join(', ')}] as const,
    usage: "${colors.secondary.usage}"
  },
  neutralDark: {
    name: "${colors.neutral_dark.name}",
    hex: "${colors.neutral_dark.hex}",
    rgb: [${colors.neutral_dark.rgb.join(', ')}] as const,
    usage: "${colors.neutral_dark.usage}"
  },
  neutralMedium: {
    name: "${colors.neutral_medium.name}",
    hex: "${colors.neutral_medium.hex}",
    rgb: [${colors.neutral_medium.rgb.join(', ')}] as const,
    usage: "${colors.neutral_medium.usage}"
  },
  neutralLight: {
    name: "${colors.neutral_light.name}",
    hex: "${colors.neutral_light.hex}",
    rgb: [${colors.neutral_light.rgb.join(', ')}] as const,
    usage: "${colors.neutral_light.usage}"
  },
  success: {
    name: "${colors.success.name}",
    hex: "${colors.success.hex}",
    rgb: [${colors.success.rgb.join(', ')}] as const,
    usage: "${colors.success.usage}"
  },
  warning: {
    name: "${colors.warning.name}",
    hex: "${colors.warning.hex}",
    rgb: [${colors.warning.rgb.join(', ')}] as const,
    usage: "${colors.warning.usage}"
  },
  error: {
    name: "${colors.error.name}",
    hex: "${colors.error.hex}",
    rgb: [${colors.error.rgb.join(', ')}] as const,
    usage: "${colors.error.usage}"
  },
  white: {
    name: "${colors.white.name}",
    hex: "${colors.white.hex}",
    rgb: [${colors.white.rgb.join(', ')}] as const,
    usage: "${colors.white.usage}"
  }
} as const;

export type BrandColor = keyof typeof brandColors;
`;

  writeFileSync('src/brand-colors.ts', brandColorsContent);

  // Update CSS variables in global.css
  let css = readFileSync('src/styles/global.css', 'utf-8');
  css = css.replace(/--color-brand-primary: #[0-9A-Fa-f]{6}/, `--color-brand-primary: ${colors.primary.hex}`);
  css = css.replace(/--color-brand-secondary: #[0-9A-Fa-f]{6}/, `--color-brand-secondary: ${colors.secondary.hex}`);
  css = css.replace(/--color-neutral-dark: #[0-9A-Fa-f]{6}/, `--color-neutral-dark: ${colors.neutral_dark.hex}`);
  css = css.replace(/--color-neutral-medium: #[0-9A-Fa-f]{6}/, `--color-neutral-medium: ${colors.neutral_medium.hex}`);
  css = css.replace(/--color-neutral-light: #[0-9A-Fa-f]{6}/, `--color-neutral-light: ${colors.neutral_light.hex}`);
  css = css.replace(/--color-success: #[0-9A-Fa-f]{6}/, `--color-success: ${colors.success.hex}`);
  css = css.replace(/--color-warning: #[0-9A-Fa-f]{6}/, `--color-warning: ${colors.warning.hex}`);
  css = css.replace(/--color-error: #[0-9A-Fa-f]{6}/, `--color-error: ${colors.error.hex}`);
  css = css.replace(/--color-white: #[0-9A-Fa-f]{6}/, `--color-white: ${colors.white.hex}`);
  css = css.replace(/Version: [0-9.]+/, `Version: ${version}`);
  css = css.replace(/Last Synced: [0-9-]+/, `Last Synced: ${today}`);
  writeFileSync('src/styles/global.css', css);

  // Update BRANDING.md
  let branding = readFileSync('BRANDING.md', 'utf-8');
  branding = branding.replace(/\*\*Current Version\*\*: [0-9.]+/, `**Current Version**: ${version}`);
  branding = branding.replace(/\*\*Last Synced\*\*: [0-9-]+/, `**Last Synced**: ${today}`);
  writeFileSync('BRANDING.md', branding);

  console.log(`✅ Brand standards synced to version ${version}`);
}

main();
