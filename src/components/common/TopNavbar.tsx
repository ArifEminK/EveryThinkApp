import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { theme } from '../../theme';

// Responsive size constants
const BUTTON_SIZE = moderateScale(40);
const BUTTON_ICON_SIZE = moderateScale(24);
const LOGO_HEIGHT = BUTTON_SIZE; // Yükseklik buton yüksekliği kadar
const LOGO_WIDTH = moderateScale(120); // Genişlik daha geniş

interface TopNavbarProps {
  onMenuPress: () => void;
}

/**
 * TopNavbar - Application top navigation bar
 * Contains hamburger menu button (left) and app logo (right)
 */
export function TopNavbar({
  onMenuPress,
}: TopNavbarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Left: Hamburger Menu Button */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={onMenuPress}
        activeOpacity={0.7}
      >
        <Ionicons
          name="menu"
          size={BUTTON_ICON_SIZE}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>

      {/* Right: App Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/EveryThinkApp.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(8),
  },
  menuButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface.secondary,
    shadowColor: theme.colors.text.primary,
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(4),
    elevation: 3,
  },
  logoContainer: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

export default TopNavbar;

