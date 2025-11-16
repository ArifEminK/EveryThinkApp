import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { theme } from '../../theme';

interface SidebarMenuItem {
  id: string;
  label: string;
  icon: string;
  onPress: () => void;
}

interface LeftSidebarProps {
  visible: boolean;
  onClose: () => void;
  menuItems?: SidebarMenuItem[];
}

// Geçici menü öğeleri
const DEFAULT_MENU_ITEMS: SidebarMenuItem[] = [
  {
    id: 'settings',
    label: 'Ayarlar',
    icon: 'settings-outline',
    onPress: () => {
      console.log('Ayarlar tıklandı');
    },
  },
  {
    id: 'profile',
    label: 'Profil',
    icon: 'person-outline',
    onPress: () => {
      console.log('Profil tıklandı');
    },
  },
  {
    id: 'notifications',
    label: 'Bildirimler',
    icon: 'notifications-outline',
    onPress: () => {
      console.log('Bildirimler tıklandı');
    },
  },
  {
    id: 'help',
    label: 'Yardım',
    icon: 'help-circle-outline',
    onPress: () => {
      console.log('Yardım tıklandı');
    },
  },
  {
    id: 'about',
    label: 'Hakkında',
    icon: 'information-circle-outline',
    onPress: () => {
      console.log('Hakkında tıklandı');
    },
  },
];

export function LeftSidebar({
  visible,
  onClose,
  menuItems = DEFAULT_MENU_ITEMS,
}: LeftSidebarProps) {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(-scale(280))).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Sidebar'ı soldan içeri al ve overlay'i görünür yap
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 350,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Yumuşak easing curve
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Sidebar'ı sola dışarı çıkar ve overlay'i gizle
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -scale(280),
          duration: 350,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Yumuşak easing curve
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 350,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, overlayOpacity]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Sidebar Content */}
        <Animated.View
          style={[
            styles.sidebar,
            {
              paddingTop: Math.max(insets.top, verticalScale(16)),
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Menü</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Ionicons
                name="close"
                size={moderateScale(24)}
                color={theme.colors.text.primary}
              />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  index > 0 && styles.menuItemWithBorder,
                ]}
                onPress={() => {
                  item.onPress();
                  onClose();
                }}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.icon as any}
                  size={moderateScale(24)}
                  color={theme.colors.text.primary}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={moderateScale(20)}
                  color={theme.colors.text.tertiary}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>EveryThink v1.0.0</Text>
          </View>
        </Animated.View>

        {/* Overlay - Sidebar dışındaki alan */}
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: overlayOpacity,
            },
          ]}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onClose}
          />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    width: scale(280),
    backgroundColor: theme.colors.surface.main,
    shadowColor: theme.colors.text.primary,
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(10),
    elevation: 10,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  closeButton: {
    padding: scale(4),
  },
  menuContainer: {
    flex: 1,
    paddingTop: verticalScale(8),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(16),
    backgroundColor: theme.colors.surface.main,
  },
  menuItemWithBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  menuIcon: {
    marginRight: scale(16),
  },
  menuLabel: {
    flex: 1,
    fontSize: moderateScale(16),
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.primary,
  },
  footer: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(16),
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  footerText: {
    fontSize: moderateScale(12),
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});

