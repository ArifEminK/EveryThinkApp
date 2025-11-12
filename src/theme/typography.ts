/**
 * Typography Configuration
 * Font sizes, weights, and text styles for the app
 */

export const typography = {
  // Font Families
  fontFamily: {
    // Primary font family - Poppins (General UI, Body Text)
    regular: 'Poppins-Regular',
    light: 'Poppins-Light',
    medium: 'Poppins-Medium',
    semibold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
    extrabold: 'Poppins-ExtraBold',
    black: 'Poppins-Black',
    thin: 'Poppins-Thin',
    extralight: 'Poppins-ExtraLight',
    italic: 'Poppins-Italic',
    
    // Secondary font family - Google Sans Code (Headings, Special Cases)
    code: {
      regular: 'GoogleSansCode-Regular',
      light: 'GoogleSansCode-Light',
      medium: 'GoogleSansCode-Medium',
      semibold: 'GoogleSansCode-SemiBold',
      bold: 'GoogleSansCode-Bold',
      extrabold: 'GoogleSansCode-ExtraBold',
    },
    
    // Fallback to system font if custom fonts fail to load
    fallback: 'System',
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  // Font Weights
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Text Styles (predefined combinations)
  textStyles: {
    h1: {
      fontSize: 30,
      fontWeight: '700' as const,
      fontFamily: 'Poppins-Bold',
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600' as const,
      fontFamily: 'Poppins-SemiBold',
      letterSpacing: -0.3,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      fontFamily: 'Poppins-SemiBold',
      letterSpacing: -0.2,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as const,
      fontFamily: 'Poppins-SemiBold',
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      fontFamily: 'Poppins-Regular',
      lineHeight: 24,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      fontFamily: 'Poppins-Regular',
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      fontFamily: 'Poppins-Regular',
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      fontFamily: 'Poppins-SemiBold',
    },
  },

  // Line Heights
  lineHeight: {
    tight: 20,
    normal: 24,
    relaxed: 28,
    loose: 32,
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
} as const;

