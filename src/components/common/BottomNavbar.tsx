import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { theme } from '../../theme';

export type TabType = 'home' | 'tasks' | 'add' | 'journal' | 'calendar';

interface TabItem {
  id: TabType;
  label: string;
  icon: string;
  activeIcon?: string;
}

interface BottomNavbarProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
  onAddPress?: () => void;
  isAddButtonActive?: boolean;
}

const tabs: TabItem[] = [
  {
    id: 'home',
    label: 'Ana Sayfa',
    icon: 'home-outline',
    activeIcon: 'home',
  },
  {
    id: 'tasks',
    label: 'Tüm Görevler',
    icon: 'checkmark-circle-outline',
    activeIcon: 'checkmark-circle',
  },
  {
    id: 'journal',
    label: 'Günlük',
    icon: 'book-outline',
    activeIcon: 'book',
  },
  {
    id: 'calendar',
    label: 'Takvim',
    icon: 'calendar-outline',
    activeIcon: 'calendar',
  },
];

// Responsive size constants
const FAB_SIZE = moderateScale(65); // 60-70 arası
const FAB_ICON_SIZE = moderateScale(32);
const TAB_ICON_SIZE = moderateScale(28);
const TAB_LABEL_FONT_SIZE = moderateScale(10);
const CONTAINER_BORDER_RADIUS = moderateScale(24);
const CONTAINER_PADDING_HORIZONTAL = scale(16);
const CONTAINER_PADDING_VERTICAL = verticalScale(12);
const TAB_SPACING = scale(24);

/**
 * BottomNavbar - Bottom navigation bar with FAB button
 * Layout: LeftContainer (2 icons) | CenterSpacer (FAB) | RightContainer (2 icons)
 * Features: White background, rounded corners, shadow effect, fully responsive
 */
export function BottomNavbar({
  activeTab,
  onTabPress,
  onAddPress,
  isAddButtonActive = false,
}: BottomNavbarProps) {
  const insets = useSafeAreaInsets();
  const [centerSpacerLayout, setCenterSpacerLayout] = useState<{
    x: number;
    width: number;
  } | null>(null);

  const handleAddPress = () => {
    if (onAddPress) {
      onAddPress();
    }
  };

  const handleCenterSpacerLayout = (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    setCenterSpacerLayout({ x, width });
  };

  // Calculate FAB position - center of CenterSpacer
  const fabLeft = centerSpacerLayout
    ? centerSpacerLayout.x + centerSpacerLayout.width / 2 - FAB_SIZE / 2
    : 0;

  const leftTabs = tabs.slice(0, 2);
  const rightTabs = tabs.slice(2, 4);

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, verticalScale(8)) },
      ]}
    >
      {/* Left Container - 2 Icons */}
      <View style={styles.leftContainer}>
        {leftTabs.map((tab, index) => {
          const isActive = !isAddButtonActive && activeTab === tab.id;
          const iconName = isActive && tab.activeIcon ? tab.activeIcon : tab.icon;

          return (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabItem,
                index > 0 && { marginLeft: TAB_SPACING },
              ]}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={iconName as any}
                size={TAB_ICON_SIZE}
                color={
                  isActive
                    ? theme.colors.text.primary
                    : theme.colors.text.secondary
                }
              />
              <Text
                style={[
                  styles.tabLabel,
                  isActive ? styles.tabLabelActive : styles.tabLabelInactive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Center Spacer - Empty space for FAB */}
      <View
        style={styles.centerSpacer}
        onLayout={handleCenterSpacerLayout}

      >
        <TouchableOpacity
          style={[
            styles.fabButton,
            isAddButtonActive && styles.fabButtonActive,
          ]}
          onPress={handleAddPress}
          activeOpacity={0.8}
        >
          <Ionicons
            name="add"
            size={FAB_ICON_SIZE}
            color={theme.colors.text.light}
          />
        </TouchableOpacity>
      </View>
      {/* Right Container - 2 Icons */}
      <View style={styles.rightContainer}>
        {rightTabs.map((tab, index) => {
          const isActive = !isAddButtonActive && activeTab === tab.id;
          const iconName = isActive && tab.activeIcon ? tab.activeIcon : tab.icon;

          return (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabItem,
                index > 0 && { marginLeft: TAB_SPACING },
              ]}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={iconName as any}
                size={TAB_ICON_SIZE}
                color={
                  isActive
                    ? theme.colors.text.primary
                    : theme.colors.text.secondary
                }
              />
              <Text
                style={[
                  styles.tabLabel,
                  isActive ? styles.tabLabelActive : styles.tabLabelInactive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* FAB Button - Absolute positioned in center */}
      {/* {centerSpacerLayout && (
        <TouchableOpacity
          style={[
            styles.fabButton,
            {
              left: fabLeft,
            },
            isAddButtonActive && styles.fabButtonActive,
          ]}
          onPress={handleAddPress}
          activeOpacity={0.8}
        >
          <Ionicons
            name="add"
            size={FAB_ICON_SIZE}
            color={theme.colors.text.light}
          />
        </TouchableOpacity>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.secondary,
    borderTopLeftRadius: CONTAINER_BORDER_RADIUS,
    borderTopRightRadius: CONTAINER_BORDER_RADIUS,
    paddingHorizontal: CONTAINER_PADDING_HORIZONTAL,
    paddingTop: CONTAINER_PADDING_VERTICAL,
    minHeight: verticalScale(64),
    // Shadow effect
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: verticalScale(-2),
    },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(8),
    elevation: 8,
  },
  leftContainer: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centerSpacer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: FAB_SIZE,
    // Empty spacer for FAB positioning
  },
  rightContainer: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(4),
    minWidth: moderateScale(50),
  },
  tabLabel: {
    fontSize: TAB_LABEL_FONT_SIZE,
    fontFamily: theme.typography.fontFamily.regular,
    marginTop: verticalScale(4),
  },
  tabLabelActive: {
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  tabLabelInactive: {
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.fontWeight.regular,
  },
  fabButton: {
    position: 'absolute',
    top: -FAB_SIZE, // Half above the bar
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: '#89061C',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    // Shadow effect
    shadowColor: '#89061C',
    shadowOffset: {
      width: 0,
      height: verticalScale(4),
    },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(8),
    elevation: 8,
  },
  fabButtonActive: {
    shadowOpacity: 0.5,
    shadowRadius: moderateScale(12),
    elevation: 12,
    transform: [{ scale: 1.05 }],
  },
});

export default BottomNavbar;
