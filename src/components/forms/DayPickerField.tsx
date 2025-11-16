import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { theme } from '../../theme';

interface DayPickerFieldProps {
  label: string;
  value: string; // Comma-separated day numbers: "1,3,5"
  onSelect: (days: string) => void; // Returns comma-separated day numbers
  error?: string;
  containerStyle?: object;
}

// Pazartesi ile başlayıp Pazar ile bitsin
const DAYS = [
  { value: '1', label: 'Pazartesi', letter: 'P' },
  { value: '2', label: 'Salı', letter: 'S' },
  { value: '3', label: 'Çarşamba', letter: 'Ç' },
  { value: '4', label: 'Perşembe', letter: 'P' },
  { value: '5', label: 'Cuma', letter: 'C' },
  { value: '6', label: 'Cumartesi', letter: 'C' },
  { value: '0', label: 'Pazar', letter: 'P' },
];

export function DayPickerField({
  label,
  value,
  onSelect,
  error,
  containerStyle,
}: DayPickerFieldProps) {
  const selectedDays = useMemo(() => {
    return new Set(value ? value.split(',').map((d) => d.trim()) : []);
  }, [value]);

  const handleDayToggle = (dayValue: string) => {
    const newSelectedDays = new Set(selectedDays);
    if (newSelectedDays.has(dayValue)) {
      newSelectedDays.delete(dayValue);
    } else {
      newSelectedDays.add(dayValue);
    }
    
    const daysArray = Array.from(newSelectedDays).sort((a, b) => 
      parseInt(a) - parseInt(b)
    );
    onSelect(daysArray.join(','));
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.daysRow}>
        {DAYS.map((day) => {
          const isSelected = selectedDays.has(day.value);
          return (
            <TouchableOpacity
              key={day.value}
              style={[
                styles.dayCircle,
                isSelected && styles.dayCircleSelected,
              ]}
              onPress={() => handleDayToggle(day.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dayLetter,
                  isSelected && styles.dayLetterSelected,
                ]}
              >
                {day.letter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(12),
  },
  label: {
    fontSize: moderateScale(12),
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
    marginBottom: verticalScale(8),
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: scale(8),
  },
  dayCircle: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: moderateScale(20),
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    backgroundColor: theme.colors.surface.main,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: moderateScale(40),
    maxHeight: moderateScale(40),
  },
  dayCircleSelected: {
    borderColor: theme.colors.accent.main,
    backgroundColor: theme.colors.accent.main,
  },
  dayLetter: {
    fontSize: moderateScale(14),
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
  },
  dayLetterSelected: {
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.light,
  },
  errorText: {
    fontSize: moderateScale(12),
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.semantic.error,
    marginTop: verticalScale(4),
  },
});
