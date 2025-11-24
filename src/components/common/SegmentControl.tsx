import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutChangeEvent,
  Easing,
} from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { theme } from '../../theme';
import { ITEM_TYPES } from '../../types/item';

export type SegmentType = 'all' | 'task' | 'diary' | 'countdown' | 'alarm';

interface SegmentControlProps<T extends string = SegmentType> {
  segments: { label: string; value: T }[];
  selectedSegment: T;
  onSegmentChange: (segment: T) => void;
}

// Segment renkleri - ITEM_TYPES'dan alınır
const getSegmentColor = (segmentValue: string): string => {
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

type SegmentLayoutMap<T extends string> = Partial<
  Record<
    T,
    {
      x: number;
      width: number;
    }
  >
>;

/**
 * SegmentControl - Horizontal segment control for filtering items
 * Displays segments with active/inactive states
 */
export function SegmentControl<T extends string = SegmentType>({
  segments,
  selectedSegment,
  onSegmentChange,
}: SegmentControlProps<T>) {
  const [segmentLayouts, setSegmentLayouts] = useState<SegmentLayoutMap<T>>({});
  const indicatorTranslate = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;

  const activeSegmentColor = useMemo(
    () => getSegmentColor(selectedSegment),
    [selectedSegment]
  );

  useEffect(() => {
    const layout = segmentLayouts[selectedSegment];

    if (!layout) {
      return;
    }

    Animated.parallel([
      Animated.timing(indicatorTranslate, {
        toValue: layout.x,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(indicatorWidth, {
        toValue: layout.width,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();
  }, [selectedSegment, segmentLayouts, indicatorTranslate, indicatorWidth]);

  const handleSegmentLayout =
    (segmentValue: T) =>
      (event: LayoutChangeEvent): void => {
        const { x, width } = event.nativeEvent.layout;
        setSegmentLayouts((prev) => ({
          ...prev,
          [segmentValue]: { x, width },
        }));
      };

  return (
    <View style={styles.container}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.activeIndicator,
          {
            transform: [{ translateX: indicatorTranslate }],
            width: indicatorWidth,
            backgroundColor:
              selectedSegment === 'all'
                ? theme.colors.surface.main
                : hexToRgba(activeSegmentColor, 0.2),
            shadowColor:
              selectedSegment === 'all'
                ? theme.colors.text.primary
                : activeSegmentColor,
          },
        ]}
      />

      {segments.map((segment, index) => {
        const isActive = selectedSegment === segment.value;
        const segmentColor = getSegmentColor(segment.value);

        return (
          <TouchableOpacity
            key={segment.value}
            style={[
              styles.segment,
              index === 0 && styles.segmentFirst,
              index === segments.length - 1 && styles.segmentLast,
            ]}
            onPress={() => onSegmentChange(segment.value)}
            onLayout={handleSegmentLayout(segment.value)}
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
    position: 'relative',
    overflow: 'hidden',
  },
  activeIndicator: {
    position: 'absolute',
    top: moderateScale(3),
    bottom: moderateScale(3),
    borderRadius: moderateScale(7),
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(1.5),
    elevation: 0,
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
