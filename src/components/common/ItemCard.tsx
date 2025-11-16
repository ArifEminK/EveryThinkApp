import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
}

/**
 * ItemCard - Displays an item card with type icon, title, and optional details
 * Shows item type icon in top-left corner with corresponding color
 */
export function ItemCard({
  type,
  title,
  subtitle,
  date,
  onPress,
}: ItemCardProps) {
  const itemConfig = ITEM_TYPES.find((item) => item.id === type) || ITEM_TYPES[0];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const CardContent = (
    <View style={styles.card}>
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

      {/* Right Arrow */}
      <View style={styles.arrowContainer}>
        <Ionicons
          name="chevron-forward"
          size={moderateScale(20)}
          color={theme.colors.text.tertiary}
        />
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
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
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(8),
  },
});

export default ItemCard;

