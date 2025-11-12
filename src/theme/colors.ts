/**
 * Modern Minimal Color Palette
 * Clean, professional color scheme for productivity app
 */

export const colors = {
  // Primary Colors - Main accent (buttons, selected items)
  primary: {
    main: '#A7B4C2',
    light: '#C4CED8',
    dark: '#8A9AAA',
  },

  // Secondary Colors - Secondary areas, card backgrounds
  secondary: {
    main: '#D1D9E0',
    light: '#E8ECF0',
    dark: '#B5C0CB',
  },

  // Background Colors
  background: {
    primary: '#DFDEE2',
    secondary: '#FFFFFF',
    tertiary: '#EDEDED',
  },

  // Surface / Card Colors
  surface: {
    main: '#FFFFFF',
    secondary: '#FAFAFA',
    elevated: '#FFFFFF',
  },

  // Border & Divider Colors
  border: {
    light: '#E4E6E8',
    medium: '#D1D5D8',
    dark: '#B8BDC2',
  },

  // Text Colors
  text: {
    primary: '#1C1C1E',
    secondary: '#6C757D',
    tertiary: '#9CA3AF',
    light: '#FFFFFF',
    disabled: '#C7CBD1',
  },

  // Accent / Highlight Colors
  accent: {
    main: '#748FFC',
    light: '#9BB0FD',
    dark: '#5A6FE8',
  },

  // Semantic Colors (for UI feedback)
  semantic: {
    success: '#9CCC65',
    warning: '#FFB74D',
    error: '#E57373',
    info: '#748FFC',
  },

  // Icon Colors
  icon: {
    primary: '#1C1C1E',
    secondary: '#6C757D',
    accent: '#748FFC',
    disabled: '#C7CBD1',
  },
} as const;

// Type export for TypeScript
export type Color = typeof colors;

