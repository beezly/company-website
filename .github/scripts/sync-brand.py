#!/usr/bin/env python3
"""
Brand synchronization script for GitHub Actions workflow.
Syncs brand standards from company-branding repository.
"""

import json
import re
import sys
from datetime import date
from pathlib import Path

def main():
    if len(sys.argv) < 2:
        print("Usage: sync-brand.py <version>")
        sys.exit(1)
    
    version = sys.argv[1]
    today = date.today().strftime('%Y-%m-%d')
    
    # Load brand JSON
    brand_json_path = Path('brand-repo/brand-standards/brand.json')
    with open(brand_json_path, 'r') as f:
        brand = json.load(f)
    
    company_name = brand['metadata']['companyName']
    colors = brand['colors']
    
    print(f"Syncing to version {version}...")
    
    # Update src/config.ts
    config_path = Path('src/config.ts')
    with open(config_path, 'r') as f:
        config = f.read()
    
    config = re.sub(r'version: "[^"]*"', f'version: "{version}"', config)
    config = re.sub(r'companyName: "[^"]*"', f'companyName: "{company_name}"', config)
    config = re.sub(r'Brand Standards Version: [0-9.]+', f'Brand Standards Version: {version}', config)
    config = re.sub(r'Last Synced: [0-9-]+', f'Last Synced: {today}', config)
    
    with open(config_path, 'w') as f:
        f.write(config)
    
    # Generate brand-colors.ts
    colors_template = '''/**
 * Brand Colors
 * 
 * Synchronized with Project Rhubarb brand standards
 * Source: https://github.com/beezly/company-branding
 * Brand Version: {version}
 * 
 * DO NOT modify these values directly. All brand colors should be updated
 * in the company-branding repository and synced here.
 */

export const brandColors = {{
  primary: {{
    name: "{primary_name}",
    hex: "{primary_hex}",
    rgb: [{primary_r}, {primary_g}, {primary_b}] as const,
    usage: "{primary_usage}"
  }},
  secondary: {{
    name: "{secondary_name}",
    hex: "{secondary_hex}",
    rgb: [{secondary_r}, {secondary_g}, {secondary_b}] as const,
    usage: "{secondary_usage}"
  }},
  neutralDark: {{
    name: "{neutral_dark_name}",
    hex: "{neutral_dark_hex}",
    rgb: [{neutral_dark_r}, {neutral_dark_g}, {neutral_dark_b}] as const,
    usage: "{neutral_dark_usage}"
  }},
  neutralMedium: {{
    name: "{neutral_medium_name}",
    hex: "{neutral_medium_hex}",
    rgb: [{neutral_medium_r}, {neutral_medium_g}, {neutral_medium_b}] as const,
    usage: "{neutral_medium_usage}"
  }},
  neutralLight: {{
    name: "{neutral_light_name}",
    hex: "{neutral_light_hex}",
    rgb: [{neutral_light_r}, {neutral_light_g}, {neutral_light_b}] as const,
    usage: "{neutral_light_usage}"
  }},
  success: {{
    name: "{success_name}",
    hex: "{success_hex}",
    rgb: [{success_r}, {success_g}, {success_b}] as const,
    usage: "{success_usage}"
  }},
  warning: {{
    name: "{warning_name}",
    hex: "{warning_hex}",
    rgb: [{warning_r}, {warning_g}, {warning_b}] as const,
    usage: "{warning_usage}"
  }},
  error: {{
    name: "{error_name}",
    hex: "{error_hex}",
    rgb: [{error_r}, {error_g}, {error_b}] as const,
    usage: "{error_usage}"
  }},
  white: {{
    name: "{white_name}",
    hex: "{white_hex}",
    rgb: [{white_r}, {white_g}, {white_b}] as const,
    usage: "{white_usage}"
  }}
}} as const;

export type BrandColor = keyof typeof brandColors;
'''
    
    colors_content = colors_template.format(
        version=version,
        primary_name=colors['primary']['name'],
        primary_hex=colors['primary']['hex'],
        primary_r=colors['primary']['rgb'][0],
        primary_g=colors['primary']['rgb'][1],
        primary_b=colors['primary']['rgb'][2],
        primary_usage=colors['primary']['usage'],
        secondary_name=colors['secondary']['name'],
        secondary_hex=colors['secondary']['hex'],
        secondary_r=colors['secondary']['rgb'][0],
        secondary_g=colors['secondary']['rgb'][1],
        secondary_b=colors['secondary']['rgb'][2],
        secondary_usage=colors['secondary']['usage'],
        neutral_dark_name=colors['neutral_dark']['name'],
        neutral_dark_hex=colors['neutral_dark']['hex'],
        neutral_dark_r=colors['neutral_dark']['rgb'][0],
        neutral_dark_g=colors['neutral_dark']['rgb'][1],
        neutral_dark_b=colors['neutral_dark']['rgb'][2],
        neutral_dark_usage=colors['neutral_dark']['usage'],
        neutral_medium_name=colors['neutral_medium']['name'],
        neutral_medium_hex=colors['neutral_medium']['hex'],
        neutral_medium_r=colors['neutral_medium']['rgb'][0],
        neutral_medium_g=colors['neutral_medium']['rgb'][1],
        neutral_medium_b=colors['neutral_medium']['rgb'][2],
        neutral_medium_usage=colors['neutral_medium']['usage'],
        neutral_light_name=colors['neutral_light']['name'],
        neutral_light_hex=colors['neutral_light']['hex'],
        neutral_light_r=colors['neutral_light']['rgb'][0],
        neutral_light_g=colors['neutral_light']['rgb'][1],
        neutral_light_b=colors['neutral_light']['rgb'][2],
        neutral_light_usage=colors['neutral_light']['usage'],
        success_name=colors['success']['name'],
        success_hex=colors['success']['hex'],
        success_r=colors['success']['rgb'][0],
        success_g=colors['success']['rgb'][1],
        success_b=colors['success']['rgb'][2],
        success_usage=colors['success']['usage'],
        warning_name=colors['warning']['name'],
        warning_hex=colors['warning']['hex'],
        warning_r=colors['warning']['rgb'][0],
        warning_g=colors['warning']['rgb'][1],
        warning_b=colors['warning']['rgb'][2],
        warning_usage=colors['warning']['usage'],
        error_name=colors['error']['name'],
        error_hex=colors['error']['hex'],
        error_r=colors['error']['rgb'][0],
        error_g=colors['error']['rgb'][1],
        error_b=colors['error']['rgb'][2],
        error_usage=colors['error']['usage'],
        white_name=colors['white']['name'],
        white_hex=colors['white']['hex'],
        white_r=colors['white']['rgb'][0],
        white_g=colors['white']['rgb'][1],
        white_b=colors['white']['rgb'][2],
        white_usage=colors['white']['usage']
    )
    
    brand_colors_path = Path('src/brand-colors.ts')
    with open(brand_colors_path, 'w') as f:
        f.write(colors_content)
    
    # Update CSS variables in global.css
    css_path = Path('src/styles/global.css')
    with open(css_path, 'r') as f:
        css = f.read()
    
    css = re.sub(r'--color-brand-primary: #[0-9A-Fa-f]{6}', f'--color-brand-primary: {colors["primary"]["hex"]}', css)
    css = re.sub(r'--color-brand-secondary: #[0-9A-Fa-f]{6}', f'--color-brand-secondary: {colors["secondary"]["hex"]}', css)
    css = re.sub(r'--color-neutral-dark: #[0-9A-Fa-f]{6}', f'--color-neutral-dark: {colors["neutral_dark"]["hex"]}', css)
    css = re.sub(r'--color-neutral-medium: #[0-9A-Fa-f]{6}', f'--color-neutral-medium: {colors["neutral_medium"]["hex"]}', css)
    css = re.sub(r'--color-neutral-light: #[0-9A-Fa-f]{6}', f'--color-neutral-light: {colors["neutral_light"]["hex"]}', css)
    css = re.sub(r'--color-success: #[0-9A-Fa-f]{6}', f'--color-success: {colors["success"]["hex"]}', css)
    css = re.sub(r'--color-warning: #[0-9A-Fa-f]{6}', f'--color-warning: {colors["warning"]["hex"]}', css)
    css = re.sub(r'--color-error: #[0-9A-Fa-f]{6}', f'--color-error: {colors["error"]["hex"]}', css)
    css = re.sub(r'--color-white: #[0-9A-Fa-f]{6}', f'--color-white: {colors["white"]["hex"]}', css)
    css = re.sub(r'Version: [0-9.]+', f'Version: {version}', css)
    css = re.sub(r'Last Synced: [0-9-]+', f'Last Synced: {today}', css)
    
    with open(css_path, 'w') as f:
        f.write(css)
    
    # Update BRANDING.md
    branding_path = Path('BRANDING.md')
    with open(branding_path, 'r') as f:
        branding = f.read()
    
    branding = re.sub(r'\*\*Current Version\*\*: [0-9.]+', f'**Current Version**: {version}', branding)
    branding = re.sub(r'\*\*Last Synced\*\*: [0-9-]+', f'**Last Synced**: {today}', branding)
    
    with open(branding_path, 'w') as f:
        f.write(branding)
    
    print(f"✅ Brand standards synced to version {version}")

if __name__ == '__main__':
    main()
