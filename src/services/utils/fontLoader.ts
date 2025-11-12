import * as Font from 'expo-font';

/**
 * Font file paths mapping
 * Defines all custom fonts used in the app
 */
export const fontAssets = {
  // Google Sans Code Font Family
  'GoogleSansCode-Regular': require('../../../assets/fonts/GoogleSansCode/GoogleSansCode-Regular.ttf'),
  'GoogleSansCode-Light': require('../../../assets/fonts/GoogleSansCode/GoogleSansCode-Light.ttf'),
  'GoogleSansCode-Medium': require('../../../assets/fonts/GoogleSansCode/GoogleSansCode-Medium.ttf'),
  'GoogleSansCode-SemiBold': require('../../../assets/fonts/GoogleSansCode/GoogleSansCode-SemiBold.ttf'),
  'GoogleSansCode-Bold': require('../../../assets/fonts/GoogleSansCode/GoogleSansCode-Bold.ttf'),
  'GoogleSansCode-ExtraBold': require('../../../assets/fonts/GoogleSansCode/GoogleSansCode-ExtraBold.ttf'),

  // Poppins Font Family
  'Poppins-Thin': require('../../../assets/fonts/Poppins/Poppins-Thin.ttf'),
  'Poppins-ExtraLight': require('../../../assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
  'Poppins-Light': require('../../../assets/fonts/Poppins/Poppins-Light.ttf'),
  'Poppins-Regular': require('../../../assets/fonts/Poppins/Poppins-Regular.ttf'),
  'Poppins-Medium': require('../../../assets/fonts/Poppins/Poppins-Medium.ttf'),
  'Poppins-SemiBold': require('../../../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
  'Poppins-Bold': require('../../../assets/fonts/Poppins/Poppins-Bold.ttf'),
  'Poppins-ExtraBold': require('../../../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
  'Poppins-Black': require('../../../assets/fonts/Poppins/Poppins-Black.ttf'),
  'Poppins-Italic': require('../../../assets/fonts/Poppins/Poppins-Italic.ttf'),
  'Poppins-BlackItalic': require('../../../assets/fonts/Poppins/Poppins-BlackItalic.ttf'),
};

/**
 * Load all custom fonts
 * @returns Promise that resolves when all fonts are loaded
 */
export async function loadFonts(): Promise<void> {
  try {
    await Font.loadAsync(fontAssets);
    console.log('✅ Fonts loaded successfully');
  } catch (error) {
    console.error('❌ Error loading fonts:', error);
    throw error;
  }
}

/**
 * Check if fonts are loaded
 * @returns boolean indicating if fonts are loaded
 */
export function areFontsLoaded(): boolean {
  return Object.keys(fontAssets).every((fontName) => 
    Font.isLoaded(fontName as string)
  );
}


