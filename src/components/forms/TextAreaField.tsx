import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { theme } from '../../theme';

interface TextAreaFieldProps extends TextInputProps {
  label: string;
  error?: string;
  containerStyle?: object;
}

export function TextAreaField({
  label,
  error,
  containerStyle,
  style,
  ...textInputProps
}: TextAreaFieldProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.textArea, error && styles.inputError, style]}
        placeholderTextColor={theme.colors.text.tertiary}
        multiline
        textAlignVertical="top"
        {...textInputProps}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(20),
  },
  label: {
    fontSize: moderateScale(14),
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
    marginBottom: verticalScale(8),
  },
  textArea: {
    fontSize: moderateScale(16),
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.surface.main,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    minHeight: verticalScale(100),
    maxHeight: verticalScale(200),
  },
  inputError: {
    borderColor: theme.colors.semantic.error,
  },
  errorText: {
    fontSize: moderateScale(12),
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.semantic.error,
    marginTop: verticalScale(4),
  },
});

