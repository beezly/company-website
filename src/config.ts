/**
 * Site Configuration
 * 
 * This configuration is synchronized with the Project Rhubarb brand standards
 * maintained at: https://github.com/beezly/company-branding
 * 
 * Brand Standards Version: 1.2.0
 * Last Synced: 2025-11-22
 */

export interface SiteConfig {
  companyName: string;
  tagline: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    linkedin?: string;
    twitter?: string;
  };
  branding: {
    repositoryUrl: string;
    version: string;
  };
}

export const siteConfig: SiteConfig = {
  companyName: "Project Rhubarb",
  tagline: "Reliable Managed IT Services",
  description: "Professional managed services for small and medium businesses",
  contact: {
    email: "contact@projectrhubarb.com",
    phone: "(555) 123-4567",
    address: "123 Business St, City, ST 12345"
  },
  social: {
    linkedin: "",
    twitter: ""
  },
  branding: {
    repositoryUrl: "https://github.com/beezly/company-branding",
    version: "1.2.0"
  }
};
