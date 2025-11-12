/**
 * Main Theme Configuration
 * Centralized theme object combining all theme variables
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,
} as const;

// Export individual components for convenience
export { colors, typography, spacing };

// Theme type for TypeScript
export type Theme = typeof theme;

// Default export for convenience
export default theme;

