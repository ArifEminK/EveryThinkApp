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
}

const tabs: TabItem[] = [
  {
    id: 'home',
    label: 'Ana Ekran',
    icon: 'home-outline',
    activeIcon: 'home',
  },
  {
    id: 'tasks',
    label: 'Görevler',
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

// Responsive size constants using react-native-size-matters
const ADD_BUTTON_SIZE = moderateScale(64);
const ADD_ICON_SIZE = moderateScale(40);
const TAB_ICON_SIZE = moderateScale(24);
const TAB_MIN_WIDTH = moderateScale(50);
const TAB_SPACING = moderateScale(24);
const CONTAINER_MIN_HEIGHT = verticalScale(56);
const CONTAINER_PADDING_HORIZONTAL = scale(16);
const CONTAINER_PADDING_TOP = verticalScale(4);
const ADD_BUTTON_TOP_OFFSET = -ADD_BUTTON_SIZE / 2;

/**
 * BottomNavbar - Bottom navigation bar with tabs and central add button
 * Features rounded corners and clean minimal design
 * Fully responsive using react-native-size-matters
 */
export function BottomNavbar({
  activeTab,
  onTabPress,
  onAddPress,
}: BottomNavbarProps) {
  const insets = useSafeAreaInsets();
  const [containerWidth, setContainerWidth] = useState(0);

  const handleAddPress = () => {
    if (onAddPress) {
      onAddPress();
    }
  };

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  // Calculate button position - center of container minus half button width
  const addButtonLeft = containerWidth > 0 ? containerWidth / 2 - ADD_BUTTON_SIZE / 2 : 0;

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, verticalScale(8)) },
      ]}
      onLayout={handleContainerLayout}
    >
      {/* Left Tabs */}
      <View style={styles.leftTabs}>
        {tabs.slice(0, 2).map((tab, index) => {
          const isActive = activeTab === tab.id;
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

      {/* Central Add Button */}
      {containerWidth > 0 && (
        <TouchableOpacity
          style={[
            styles.addButton,
            {
              left: addButtonLeft,
            },
          ]}
          onPress={handleAddPress}
          activeOpacity={0.8}
        >
          <View style={styles.addButtonInner}>
            <Ionicons
              name="add"
              size={ADD_ICON_SIZE}
              color={theme.colors.text.primary}
            />
          </View>
        </TouchableOpacity>
      )}

      {/* Right Tabs */}
      <View style={styles.rightTabs}>
        {tabs.slice(2, 4).map((tab, index) => {
          const isActive = activeTab === tab.id;
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: theme.colors.surface.secondary,
    paddingHorizontal: CONTAINER_PADDING_HORIZONTAL,
    paddingTop: CONTAINER_PADDING_TOP,
    minHeight: CONTAINER_MIN_HEIGHT,
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
    shadowColor: theme.colors.text.primary,
    shadowOffset: {
      width: 0,
      height: verticalScale(-2),
    },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(8),
    elevation: 8,
  },
  leftTabs: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
  },
  rightTabs: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: TAB_MIN_WIDTH,
    paddingVertical: verticalScale(4),
    paddingBottom: verticalScale(8),
  },
  tabLabel: {
    fontSize: moderateScale(12),
    fontFamily: theme.typography.fontFamily.regular,
    marginTop: verticalScale(2),
  },
  tabLabelActive: {
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  tabLabelInactive: {
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.fontWeight.regular,
  },
  addButton: {
    position: 'absolute',
    top: ADD_BUTTON_TOP_OFFSET,
    width: ADD_BUTTON_SIZE,
    height: ADD_BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  addButtonInner: {
    width: ADD_BUTTON_SIZE,
    height: ADD_BUTTON_SIZE,
    borderRadius: ADD_BUTTON_SIZE / 2,
    backgroundColor: theme.colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomNavbar;

