import { describe, it, expect } from 'vitest';
import { getDistSize } from '../utils/test-utils';

describe('Performance Tests', () => {
  it('should have total bundle size (HTML + CSS + JS) under 500KB', () => {
    // Get size excluding images
    const sizeInBytes = getDistSize(true);
    const sizeInKB = sizeInBytes / 1024;
    
    // Log the actual size for debugging
    console.log(`Total bundle size (excluding images): ${sizeInKB.toFixed(2)} KB`);
    
    expect(sizeInKB).toBeLessThan(500);
  });
});
