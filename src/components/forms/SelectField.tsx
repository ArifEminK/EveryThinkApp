import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { theme } from '../../theme';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: SelectOption[];
  onSelect: (value: string) => void;
  icon?: string;
  error?: string;
  containerStyle?: object;
}

export function SelectField({
  label,
  value,
  options,
  onSelect,
  icon,
  error,
  containerStyle,
}: SelectFieldProps) {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.selectContainer, error && styles.selectError]}
        onPress={() => {
          // TODO: Open modal/picker
          console.log('Open picker for:', label);
        }}
        activeOpacity={0.7}
      >
        <View style={styles.selectContent}>
          {icon && (
            <Ionicons
              name={icon as any}
              size={moderateScale(20)}
              color={theme.colors.text.secondary}
              style={styles.icon}
            />
          )}
          <View style={styles.selectTextContainer}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>
              {selectedOption?.label || 'Seçiniz'}
            </Text>
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
  selectContainer: {
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
  selectError: {
    borderColor: theme.colors.semantic.error,
  },
  selectContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: scale(12),
  },
  selectTextContainer: {
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

