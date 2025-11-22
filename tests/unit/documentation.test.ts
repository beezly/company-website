import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('Documentation Tests', () => {
  const readmePath = join(process.cwd(), 'README.md');

  it('should have README.md file', () => {
    expect(existsSync(readmePath)).toBe(true);
  });

  describe('README content', () => {
    let readmeContent: string;

    it('should be readable', () => {
      readmeContent = readFileSync(readmePath, 'utf-8');
      expect(readmeContent.length).toBeGreaterThan(0);
    });

    it('should contain setup instructions section', () => {
      readmeContent = readFileSync(readmePath, 'utf-8');
      const hasSetupSection = 
        readmeContent.includes('Setup') || 
        readmeContent.includes('Installation') ||
        readmeContent.includes('npm install');
      expect(hasSetupSection).toBe(true);
    });

    it('should contain company name update instructions', () => {
      readmeContent = readFileSync(readmePath, 'utf-8');
      const hasCompanyNameInstructions = 
        readmeContent.includes('company name') || 
        readmeContent.includes('companyName') ||
        readmeContent.includes('config.ts');
      expect(hasCompanyNameInstructions).toBe(true);
    });

    it('should contain build instructions', () => {
      readmeContent = readFileSync(readmePath, 'utf-8');
      const hasBuildInstructions = 
        readmeContent.includes('build') || 
        readmeContent.includes('npm run build');
      expect(hasBuildInstructions).toBe(true);
    });

    it('should contain deployment instructions', () => {
      readmeContent = readFileSync(readmePath, 'utf-8');
      const hasDeploymentInstructions = 
        readmeContent.includes('deploy') || 
        readmeContent.includes('Deployment') ||
        readmeContent.includes('hosting');
      expect(hasDeploymentInstructions).toBe(true);
    });

    it('should contain project structure documentation', () => {
      readmeContent = readFileSync(readmePath, 'utf-8');
      const hasStructureSection = 
        readmeContent.includes('structure') || 
        readmeContent.includes('Structure') ||
        readmeContent.includes('src/');
      expect(hasStructureSection).toBe(true);
    });
  });
});
