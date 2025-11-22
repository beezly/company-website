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
}

export const siteConfig: SiteConfig = {
  companyName: "Your Company Name",
  tagline: "Reliable Managed IT Services",
  description: "Professional managed services for small and medium businesses",
  contact: {
    email: "contact@example.com",
    phone: "(555) 123-4567",
    address: "123 Business St, City, ST 12345"
  },
  social: {
    linkedin: "",
    twitter: ""
  }
};
