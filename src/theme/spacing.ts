/**
 * Spacing System
 * Consistent spacing values throughout the app
 */

export const spacing = {
  // Base spacing unit (4px grid system)
  base: 4,

  // Semantic spacing values
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,

  // Component-specific spacing
  screen: {
    horizontal: 16,
    vertical: 20,
  },

  // Button spacing
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },

  // Card spacing
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 12,
  },

  // Input spacing
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },

  // Icon spacing
  icon: {
    small: 16,
    medium: 24,
    large: 32,
  },

  // List item spacing
  list: {
    itemSpacing: 12,
    sectionSpacing: 24,
  },

  // Border radius values
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },
} as const;

