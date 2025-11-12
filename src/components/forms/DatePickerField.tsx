import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { theme } from '../../theme';

interface DatePickerFieldProps {
  label: string;
  value: Date | null;
  onSelect: (date: Date) => void;
  icon?: string;
  error?: string;
  containerStyle?: object;
  mode?: 'date' | 'time' | 'datetime';
}

export function DatePickerField({
  label,
  value,
  onSelect,
  icon,
  error,
  containerStyle,
  mode = 'date',
}: DatePickerFieldProps) {
  const formatDate = (date: Date | null): string => {
    if (!date) return 'Seçiniz';

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dateStr = date.toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    if (dateStr === todayStr) return 'Bugün';
    if (dateStr === yesterdayStr) return 'Dün';
    if (dateStr === tomorrowStr) return 'Yarın';

    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.dateContainer, error && styles.dateError]}
        onPress={() => {
          // TODO: Open date picker
          console.log('Open date picker for:', label);
        }}
        activeOpacity={0.7}
      >
        <View style={styles.dateContent}>
          {icon && (
            <Ionicons
              name={icon as any}
              size={moderateScale(20)}
              color={theme.colors.text.secondary}
              style={styles.icon}
            />
          )}
          <View style={styles.dateTextContainer}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{formatDate(value)}</Text>
          </View>
        </View>
        <Ionicons
          name="chevron-forward"
          size={moderateScale(20)}
          color={theme.colors.text.tertiary}
        />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(12),
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface.main,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  dateError: {
    borderColor: theme.colors.semantic.error,
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: scale(12),
  },
  dateTextContainer: {
    flex: 1,
  },
  label: {
    fontSize: moderateScale(12),
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
    marginBottom: verticalScale(2),
  },
  value: {
    fontSize: moderateScale(16),
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
  errorText: {
    fontSize: moderateScale(12),
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.semantic.error,
    marginTop: verticalScale(4),
  },
});

