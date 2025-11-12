/**
 * Theme Type Definitions
 * TypeScript types for theme system
 */

import type { Theme, Color } from '../theme/theme';

// Re-export theme types
export type { Theme, Color };

// Extended theme types for styled components
export interface ThemeProps {
  theme: Theme;
}

// Component props with theme access
export interface WithTheme<T = {}> extends T {
  theme?: Theme;
}

