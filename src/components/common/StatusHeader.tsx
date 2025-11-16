import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { theme } from '../../theme';

// Responsive size constants
const ICON_SIZE = moderateScale(18);
const DATE_FONT_SIZE = moderateScale(18);
const WEATHER_FONT_SIZE = moderateScale(14);
const TASK_FONT_SIZE = moderateScale(14);
const LOCATION_FONT_SIZE = moderateScale(14);
const CONTAINER_PADDING_H = scale(16);
const CONTAINER_PADDING_V = verticalScale(16);
const CONTAINER_MARGIN_H = scale(8);
const TASK_PADDING_H = scale(12);
const TASK_PADDING_V = verticalScale(6);
const LOCATION_SPACING = verticalScale(6);

interface StatusHeaderProps {
  date?: string;
  weather?: {
    icon: string;
    condition: string;
  };
  taskCount?: number;
}

/**
 * StatusHeader - Top status bar showing date, weather, and task count
 * Displays below TopNavbar on main screen
 */
export function StatusHeader({
  date,
  weather = { icon: 'sunny-outline', condition: 'Güneşli' },
  taskCount = 5,
}: StatusHeaderProps) {
  // Get current date if not provided
  const displayDate =
    date ||
    new Date().toLocaleDateString('tr-TR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });

  // Capitalize first letter of date
  const formattedDate =
    displayDate.charAt(0).toUpperCase() + displayDate.slice(1);

  return (
    <View style={styles.container}>
      {/* Left Column: Date and Weather */}
      <View style={styles.leftColumn}>
        {/* Date */}
        <Text style={styles.dateText}>{formattedDate}</Text>

        {/* Weather Info */}
        <View style={styles.weatherContainer}>
          <Ionicons
            name={weather.icon as any}
            size={ICON_SIZE}
            color={theme.colors.accent.main}
          />
          <Text style={[styles.weatherText, { marginLeft: scale(4) }]}>
            {weather.condition}
          </Text>
        </View>
      </View>

      {/* Right Column: Task Count and Location */}
      <View style={styles.rightColumn}>
        <View style={styles.taskContainer}>
          <Ionicons
            name="checkmark-circle-outline"
            size={ICON_SIZE}
            color={theme.colors.primary.main}
          />
          <Text style={[styles.taskText, { marginLeft: scale(4) }]}>
            {taskCount} görev
          </Text>
        </View>
        
        {/* Location Info */}
        <View style={styles.locationContainer}>
          <Ionicons
            name="location-outline"
            size={ICON_SIZE}
            color={theme.colors.text.secondary}
          />
          <Text style={[styles.locationText, { marginLeft: scale(4) }]}>
            Konya, Türkiye
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: moderateScale(16),
    backgroundColor: theme.colors.surface.secondary,
    paddingHorizontal: CONTAINER_PADDING_H,
    paddingTop: CONTAINER_PADDING_V,
    paddingBottom: CONTAINER_PADDING_V,
    marginHorizontal: CONTAINER_MARGIN_H,
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: DATE_FONT_SIZE,
    fontWeight: theme.typography.fontWeight.regular,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: verticalScale(4),
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherText: {
    fontSize: WEATHER_FONT_SIZE,
    fontWeight: theme.typography.fontWeight.regular,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
  },
  rightColumn: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface.main,
    paddingHorizontal: TASK_PADDING_H,
    paddingVertical: TASK_PADDING_V,
    borderRadius: moderateScale(8),
    marginBottom: LOCATION_SPACING,
    alignSelf: 'flex-end',
  },
  taskText: {
    fontSize: TASK_FONT_SIZE,
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  locationText: {
    fontSize: LOCATION_FONT_SIZE,
    fontWeight: theme.typography.fontWeight.regular,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
  },
});

export default StatusHeader;

