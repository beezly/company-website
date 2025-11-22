/**
 * Brand Colors
 * 
 * Synchronized with Project Rhubarb brand standards
 * Source: https://github.com/beezly/company-branding
 * Brand Version: 1.2.0
 * 
 * DO NOT modify these values directly. All brand colors should be updated
 * in the company-branding repository and synced here.
 */

export const brandColors = {
  primary: {
    name: "Rhubarb Pink",
    hex: "#D64161",
    rgb: [214, 65, 97] as const,
    usage: "Primary brand color for headers, CTAs, and key interactive elements"
  },
  secondary: {
    name: "Rhubarb Green",
    hex: "#5A8F5A",
    rgb: [90, 143, 90] as const,
    usage: "Secondary accent color for highlights and notifications"
  },
  neutralDark: {
    name: "Charcoal",
    hex: "#2C3E50",
    rgb: [44, 62, 80] as const,
    usage: "Primary text color for body copy and headings"
  },
  neutralMedium: {
    name: "Slate Gray",
    hex: "#7F8C8D",
    rgb: [127, 140, 141] as const,
    usage: "Secondary text color for captions and metadata"
  },
  neutralLight: {
    name: "Light Gray",
    hex: "#ECF0F1",
    rgb: [236, 240, 241] as const,
    usage: "Background color for sections and cards"
  },
  success: {
    name: "Success Green",
    hex: "#27AE60",
    rgb: [39, 174, 96] as const,
    usage: "Indicates successful operations and confirmations"
  },
  warning: {
    name: "Warning Yellow",
    hex: "#F39C12",
    rgb: [243, 156, 18] as const,
    usage: "Indicates warnings and states requiring attention"
  },
  error: {
    name: "Error Red",
    hex: "#E74C3C",
    rgb: [231, 76, 60] as const,
    usage: "Indicates errors and critical states"
  },
  white: {
    name: "Pure White",
    hex: "#FFFFFF",
    rgb: [255, 255, 255] as const,
    usage: "Background color for main content areas"
  }
} as const;

export type BrandColor = keyof typeof brandColors;
