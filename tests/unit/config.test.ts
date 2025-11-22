import { describe, it, expect } from 'vitest';
import { siteConfig } from '../../src/config';
import { validateConfig } from '../utils/test-utils';

describe('Configuration Tests', () => {
  it('should export a valid SiteConfig object', () => {
    expect(siteConfig).toBeDefined();
    expect(typeof siteConfig).toBe('object');
  });

  it('should have all required fields present', () => {
    expect(siteConfig.companyName).toBeDefined();
    expect(siteConfig.tagline).toBeDefined();
    expect(siteConfig.description).toBeDefined();
    expect(siteConfig.contact).toBeDefined();
  });

  it('should have all required contact fields present', () => {
    expect(siteConfig.contact.email).toBeDefined();
    expect(siteConfig.contact.phone).toBeDefined();
    expect(siteConfig.contact.address).toBeDefined();
  });

  it('should have non-empty required fields', () => {
    expect(siteConfig.companyName.length).toBeGreaterThan(0);
    expect(siteConfig.tagline.length).toBeGreaterThan(0);
    expect(siteConfig.description.length).toBeGreaterThan(0);
    expect(siteConfig.contact.email.length).toBeGreaterThan(0);
    expect(siteConfig.contact.phone.length).toBeGreaterThan(0);
    expect(siteConfig.contact.address.length).toBeGreaterThan(0);
  });

  it('should pass validation', () => {
    expect(() => validateConfig(siteConfig)).not.toThrow();
  });

  it('should have social object defined', () => {
    expect(siteConfig.social).toBeDefined();
    expect(typeof siteConfig.social).toBe('object');
  });
});
