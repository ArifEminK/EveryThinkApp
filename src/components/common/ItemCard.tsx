import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { theme } from '../../theme';
import { ItemType, ITEM_TYPES } from '../../types/item';

interface ItemCardProps {
  type: ItemType;
  title: string;
  subtitle?: string;
  date?: Date;
  onPress?: () => void;
  onComplete?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

/**
 * ItemCard - Displays an item card with type icon, title, and optional details
 * Shows item type icon in top-left corner with corresponding color
 * Includes a 3-dot menu for actions: Complete, Edit, Remove
 */
export function ItemCard({
  type,
  title,
  subtitle,
  date,
  onPress,
  onComplete,
  onEdit,
  onDelete,
}: ItemCardProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const itemConfig = ITEM_TYPES.find((item) => item.id === type) || ITEM_TYPES[0];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleAction = (action: () => void) => {
    closeMenu();
    // Give time for modal to close before executing action
    setTimeout(() => {
      action();
    }, 300);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.9}
      >
        {/* Type Icon - Sol üstte */}
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: `${itemConfig.color}20` }, // Renkli arka plan (20% opacity)
          ]}
        >
          <Ionicons
            name={itemConfig.icon as any}
            size={moderateScale(20)}
            color={itemConfig.color}
          />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

          {/* Subtitle */}
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}

          {/* Date */}
          {date && (
            <View style={styles.dateContainer}>
              <Ionicons
                name="calendar-outline"
                size={moderateScale(12)}
                color={theme.colors.text.secondary}
              />
              <Text style={styles.dateText}>{formatDate(date)}</Text>
            </View>
          )}
        </View>

        {/* 3-Dot Menu Button - Sağ Üst */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={handleMenuPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={moderateScale(20)}
            color={theme.colors.text.tertiary}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Action Sheet Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.menuContainer}>
                <View style={styles.menuHeader}>
                  <View style={styles.menuIndicator} />
                </View>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => onComplete && handleAction(onComplete)}
                >
                  <View style={[styles.menuIconContainer, { backgroundColor: theme.colors.semantic.success + '20' }]}>
                    <Ionicons name="checkmark-circle-outline" size={22} color={theme.colors.semantic.success} />
                  </View>
                  <Text style={styles.menuItemText}>Tamamla</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => onEdit && handleAction(onEdit)}
                >
                  <View style={[styles.menuIconContainer, { backgroundColor: theme.colors.accent.main + '20' }]}>
                    <Ionicons name="create-outline" size={22} color={theme.colors.accent.main} />
                  </View>
                  <Text style={styles.menuItemText}>Düzenle</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.menuItem, styles.menuItemLast]}
                  onPress={() => onDelete && handleAction(onDelete)}
                >
                  <View style={[styles.menuIconContainer, { backgroundColor: theme.colors.semantic.error + '20' }]}>
                    <Ionicons name="trash-outline" size={22} color={theme.colors.semantic.error} />
                  </View>
                  <Text style={[styles.menuItemText, { color: theme.colors.semantic.error }]}>
                    Kaldır
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface.main,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginBottom: verticalScale(12),
    shadowColor: theme.colors.text.primary,
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(8),
    elevation: 3,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    position: 'relative',
  },
  iconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: scale(24), // Menu butonu için boşluk
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
    marginBottom: verticalScale(4),
  },
  subtitle: {
    fontSize: moderateScale(14),
    fontWeight: theme.typography.fontWeight.regular,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
    marginBottom: verticalScale(6),
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(4),
  },
  dateText: {
    fontSize: moderateScale(12),
    fontWeight: theme.typography.fontWeight.regular,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
    marginLeft: scale(4),
  },
  menuButton: {
    position: 'absolute',
    top: moderateScale(12),
    right: moderateScale(12),
    padding: moderateScale(4),
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: theme.colors.surface.main,
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    padding: moderateScale(24),
    paddingBottom: verticalScale(40),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: verticalScale(-4),
    },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(8),
    elevation: 10,
  },
  menuHeader: {
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  menuIndicator: {
    width: scale(40),
    height: verticalScale(4),
    backgroundColor: theme.colors.border.light,
    borderRadius: moderateScale(2),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(16),
  },
  menuItemText: {
    fontSize: moderateScale(16),
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
});

export default ItemCard;

