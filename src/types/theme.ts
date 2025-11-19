/**
 * Theme Type Definitions
 * TypeScript types for theme system
 */

import type { Theme, colors } from '../theme/theme';

// Re-export theme types
export type { Theme, colors };

// Extended theme types for styled components
export interface ThemeProps {
  theme: Theme;
}

// Component props with theme access
export interface WithTheme<T extends object = object> {
  theme: Theme;
  children: React.ReactNode;
}

