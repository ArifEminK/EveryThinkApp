import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { theme } from '../../theme';

// Responsive size constants
const BUTTON_SIZE = moderateScale(40);
const BUTTON_ICON_SIZE = moderateScale(24);
const AVATAR_FONT_SIZE = moderateScale(16);

interface TopNavbarProps {
  onMenuPress: () => void;
  onProfilePress: () => void;
  profileImageUri?: string;
  userName?: string;
}

/**
 * TopNavbar - Application top navigation bar
 * Contains hamburger menu button (left) and profile button (right)
 */
export function TopNavbar({
  onMenuPress,
  onProfilePress,
  profileImageUri,
  userName,
}: TopNavbarProps) {
  const insets = useSafeAreaInsets();

  // Get first letter of username or default to 'U'
  const userInitial = userName?.charAt(0).toUpperCase() || 'U';

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

      {/* Right: Profile Button */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={onProfilePress}
        activeOpacity={0.7}
      >
        {profileImageUri ? (
          <View style={styles.avatarContainer}>
            {/* Profile image would go here when implemented */}
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{userInitial}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{userInitial}</Text>
          </View>
        )}
      </TouchableOpacity>
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
  profileButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    overflow: 'hidden',
  },
  avatarPlaceholder: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: theme.colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scale(2),
    borderColor: theme.colors.background.primary,
    shadowColor: theme.colors.text.primary,
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(4),
    elevation: 3,
  },
  avatarText: {
    fontSize: AVATAR_FONT_SIZE,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.light,
  },
});

export default TopNavbar;

