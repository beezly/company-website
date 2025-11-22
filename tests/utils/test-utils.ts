import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { JSDOM } from 'jsdom';

/**
 * Parse an HTML file from the dist directory
 * @param filename - The filename relative to dist/ (e.g., 'index.html')
 * @returns JSDOM instance for querying the HTML
 */
export function parseHTMLFile(filename: string): JSDOM {
  const filePath = join(process.cwd(), 'dist', filename);
  
  if (!existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  const html = readFileSync(filePath, 'utf-8');
  return new JSDOM(html);
}

/**
 * Get the document from a parsed HTML file
 * @param filename - The filename relative to dist/
 * @returns Document object for querying
 */
export function getDocument(filename: string): Document {
  const dom = parseHTMLFile(filename);
  return dom.window.document;
}

/**
 * Check if a file exists in the dist directory
 * @param filename - The filename relative to dist/
 * @returns true if file exists, false otherwise
 */
export function fileExistsInDist(filename: string): boolean {
  const filePath = join(process.cwd(), 'dist', filename);
  return existsSync(filePath);
}

/**
 * Get all HTML files in the dist directory
 * @returns Array of HTML filenames
 */
export function getAllHTMLFiles(): string[] {
  const distPath = join(process.cwd(), 'dist');
  
  if (!existsSync(distPath)) {
    return [];
  }
  
  const files: string[] = [];
  
  function traverse(dir: string, relativePath: string = '') {
    const entries = readdirSync(dir);
    
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const relPath = relativePath ? join(relativePath, entry) : entry;
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath, relPath);
      } else if (entry.endsWith('.html')) {
        files.push(relPath);
      }
    }
  }
  
  traverse(distPath);
  return files;
}

/**
 * Load and validate the site configuration
 * @returns The site configuration object
 */
export async function loadConfig() {
  const config = await import('../../src/config.ts');
  return config.siteConfig;
}

/**
 * Validate that config has all required fields
 * @param config - The configuration object to validate
 * @returns true if valid, throws error otherwise
 */
export function validateConfig(config: any): boolean {
  const requiredFields = ['companyName', 'tagline', 'description', 'contact'];
  const requiredContactFields = ['email', 'phone', 'address'];
  
  for (const field of requiredFields) {
    if (!config[field]) {
      throw new Error(`Missing required config field: ${field}`);
    }
  }
  
  for (const field of requiredContactFields) {
    if (!config.contact[field]) {
      throw new Error(`Missing required contact field: ${field}`);
    }
  }
  
  return true;
}

/**
 * Get the total size of all files in dist directory
 * @param excludeImages - Whether to exclude image files from calculation
 * @returns Total size in bytes
 */
export function getDistSize(excludeImages: boolean = false): number {
  const distPath = join(process.cwd(), 'dist');
  
  if (!existsSync(distPath)) {
    return 0;
  }
  
  let totalSize = 0;
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico'];
  
  function traverse(dir: string) {
    const entries = readdirSync(dir);
    
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else {
        if (excludeImages) {
          const isImage = imageExtensions.some(ext => entry.toLowerCase().endsWith(ext));
          if (!isImage) {
            totalSize += stat.size;
          }
        } else {
          totalSize += stat.size;
        }
      }
    }
  }
  
  traverse(distPath);
  return totalSize;
}
