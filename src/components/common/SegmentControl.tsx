import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { theme } from '../../theme';
import { ITEM_TYPES } from '../../types/item';

export type SegmentType = 'all' | 'task' | 'diary' | 'countdown' | 'alarm';

interface SegmentControlProps {
  segments: { label: string; value: SegmentType }[];
  selectedSegment: SegmentType;
  onSegmentChange: (segment: SegmentType) => void;
}

// Segment renkleri - ITEM_TYPES'dan alınır
const getSegmentColor = (segmentValue: SegmentType): string => {
  if (segmentValue === 'all') {
    return theme.colors.text.primary; // Tümü için varsayılan renk
  }
  const itemType = ITEM_TYPES.find((item) => item.id === segmentValue);
  return itemType?.color || theme.colors.text.primary;
};

// Hex rengi rgba'ya çevir (opacity için)
const hexToRgba = (hex: string, opacity: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * SegmentControl - Horizontal segment control for filtering items
 * Displays segments with active/inactive states
 */
export function SegmentControl({
  segments,
  selectedSegment,
  onSegmentChange,
}: SegmentControlProps) {
  return (
    <View style={styles.container}>
      {segments.map((segment, index) => {
        const isActive = selectedSegment === segment.value;
        const segmentColor = getSegmentColor(segment.value);

        return (
          <TouchableOpacity
            key={segment.value}
            style={[
              styles.segment,
              isActive && {
                backgroundColor:
                  segment.value === 'all'
                    ? theme.colors.surface.main
                    : hexToRgba(segmentColor, 0.2), // %20 opacity ile arka plan
                shadowColor: segment.value === 'all' ? theme.colors.text.primary : segmentColor,
                shadowOffset: {
                  width: 0,
                  height: verticalScale(1),
                },
                shadowOpacity: 0.1,
                shadowRadius: moderateScale(2),
                elevation: 2,
              },
              index === 0 && styles.segmentFirst,
              index === segments.length - 1 && styles.segmentLast,
            ]}
            onPress={() => onSegmentChange(segment.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.segmentText,
                isActive && [
                  styles.segmentTextActive,
                  {
                    color:
                      segment.value === 'all'
                        ? theme.colors.text.primary
                        : segmentColor, // Aktif segment metin rengi
                  },
                ],
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.7}
            >
              {segment.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface.secondary,
    borderRadius: moderateScale(10),
    padding: moderateScale(3),
    gap: moderateScale(2),
  },
  segment: {
    flex: 1,
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(4),
    borderRadius: moderateScale(7),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: verticalScale(32),
  },
  segmentFirst: {
    borderTopLeftRadius: moderateScale(7),
    borderBottomLeftRadius: moderateScale(7),
  },
  segmentLast: {
    borderTopRightRadius: moderateScale(7),
    borderBottomRightRadius: moderateScale(7),
  },
  segmentText: {
    fontSize: moderateScale(11),
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  segmentTextActive: {
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});

export default SegmentControl;

