import { describe, it, expect } from 'vitest';
import { 
  fileExistsInDist, 
  getAllHTMLFiles, 
  loadConfig, 
  validateConfig,
  getDocument 
} from './test-utils';

describe('Test Utilities', () => {
  it('should check if files exist in dist', () => {
    expect(fileExistsInDist('index.html')).toBe(true);
  });

  it('should get all HTML files', () => {
    const htmlFiles = getAllHTMLFiles();
    expect(htmlFiles.length).toBeGreaterThan(0);
    expect(htmlFiles.some(f => f.includes('index.html'))).toBe(true);
  });

  it('should load config', async () => {
    const config = await loadConfig();
    expect(config).toBeDefined();
    expect(config.companyName).toBeDefined();
  });

  it('should validate config', async () => {
    const config = await loadConfig();
    expect(() => validateConfig(config)).not.toThrow();
  });

  it('should parse HTML document', () => {
    const doc = getDocument('index.html');
    expect(doc).toBeDefined();
    expect(doc.querySelector('html')).not.toBeNull();
  });
});
