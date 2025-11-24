import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native';
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
 * Background Images Configuration
 * Images change based on time of day
 */
const backgroundImages = {
  dayLeft: require('../../../assets/images/day-left.jpg'),
  dayMiddle: require('../../../assets/images/day-middle.jpg'),
  dayRight: require('../../../assets/images/day-right.jpg'),
  nightLeft: require('../../../assets/images/night-left.jpg'),
  nightMiddle: require('../../../assets/images/night-middle.jpg'),
  nightRight: require('../../../assets/images/night-right.jpg'),
};

/**
 * Get background image based on current hour
 * @param hour - Current hour (0-23)
 * @returns Image source for background
 */
const getBackgroundImage = (hour: number): ImageSourcePropType => {
  // Day cycle (7:00 - 18:59)
  if (hour >= 7 && hour < 11) {
    return backgroundImages.dayLeft;
  }
  if (hour >= 11 && hour < 15) {
    return backgroundImages.dayMiddle;
  }
  if (hour >= 15 && hour < 19) {
    return backgroundImages.dayRight;
  }

  // Night cycle (19:00 - 6:59)
  if (hour >= 19 && hour < 23) {
    return backgroundImages.nightLeft;
  }
  if (hour >= 23 || hour < 3) {
    return backgroundImages.nightMiddle;
  }
  if (hour >= 3 && hour < 7) {
    return backgroundImages.nightRight;
  }

  // Default fallback
  return backgroundImages.dayMiddle;
};

/**
 * StatusHeader - Top status bar showing date, weather, and task count
 * Displays below TopNavbar on main screen
 * Background changes automatically based on time of day
 */
export function StatusHeader({
  date,
  weather = { icon: 'sunny-outline', condition: 'Güneşli' },
  taskCount = 5,
}: StatusHeaderProps) {
  // State for dynamic background
  const [backgroundImage, setBackgroundImage] = useState<ImageSourcePropType>(
    getBackgroundImage(new Date().getHours())
  );

  // Update background based on current time
  useEffect(() => {
    // Function to update background
    const updateBackground = () => {
      const currentHour = new Date().getHours();
      const newBackground = getBackgroundImage(currentHour);
      setBackgroundImage(newBackground);
    };

    // Update immediately on mount
    updateBackground();

    // Set interval to update every hour (60 * 60 * 1000 ms)
    const intervalId = setInterval(updateBackground, 60 * 60 * 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

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
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Left Column: Date and Weather */}
      <View style={styles.leftColumn}>
        {/* Date */}
        <Text style={styles.dateText}>{formattedDate}</Text>

        {/* Weather Info */}
        <View style={styles.weatherContainer}>
          <Ionicons
            name={weather.icon as any}
            size={ICON_SIZE}
            color="#FFFFFF"
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
            color="#FFFFFF"
          />
          <Text style={[styles.locationText, { marginLeft: scale(4) }]}>
            Konya, Türkiye
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: moderateScale(16),
    backgroundColor: theme.colors.surface.secondary, // Fallback color
    paddingHorizontal: CONTAINER_PADDING_H,
    paddingTop: CONTAINER_PADDING_V,
    paddingBottom: CONTAINER_PADDING_V,
    marginHorizontal: CONTAINER_MARGIN_H,
    overflow: 'hidden', // Ensures image respects border radius
  },
  backgroundImage: {
    borderRadius: moderateScale(16),

  },
  leftColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: DATE_FONT_SIZE,
    fontWeight: theme.typography.fontWeight.regular,
    fontFamily: theme.typography.fontFamily.bold,
    color: '#FFFFFF', // White text
    marginBottom: verticalScale(4),
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherText: {
    fontSize: WEATHER_FONT_SIZE,
    fontWeight: theme.typography.fontWeight.regular,
    fontFamily: theme.typography.fontFamily.regular,
    color: '#FFFFFF', // White text
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  rightColumn: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Increased opacity for better contrast
    paddingHorizontal: TASK_PADDING_H,
    paddingVertical: TASK_PADDING_V,
    borderRadius: moderateScale(8),
    marginBottom: LOCATION_SPACING,
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskText: {
    fontSize: TASK_FONT_SIZE,
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary, // Keep dark text inside the white container
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
    color: '#FFFFFF', // White text
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});

export default StatusHeader;

