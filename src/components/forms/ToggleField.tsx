import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { theme } from '../../theme';

interface ToggleFieldProps {
  label: string;
  value: boolean;
  onToggle: (value: boolean) => void;
  icon?: string;
  containerStyle?: object;
}

export function ToggleField({
  label,
  value,
  onToggle,
  icon,
  containerStyle,
}: ToggleFieldProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={styles.toggleContainer}
        onPress={() => onToggle(!value)}
        activeOpacity={0.7}
      >
        <View style={styles.toggleContent}>
          {icon && (
            <Ionicons
              name={icon as any}
              size={moderateScale(20)}
              color={theme.colors.text.secondary}
              style={styles.icon}
            />
          )}
          <Text style={styles.label}>{label}</Text>
        </View>
        <View
          style={[
            styles.toggle,
            value && styles.toggleActive,
          ]}
        >
          <View
            style={[
              styles.toggleThumb,
              {
                transform: [{ translateX: value ? moderateScale(20) : 0 }],
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(12),
  },
  toggleContainer: {
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
  toggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: scale(12),
  },
  label: {
    fontSize: moderateScale(16),
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
  toggle: {
    width: moderateScale(50),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    backgroundColor: theme.colors.border.medium,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(2),
  },
  toggleActive: {
    backgroundColor: theme.colors.accent.main,
  },
  toggleThumb: {
    width: moderateScale(26),
    height: moderateScale(26),
    borderRadius: moderateScale(13),
    backgroundColor: theme.colors.surface.main,
    shadowColor: theme.colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});

