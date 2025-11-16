import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../components/common';
import { theme } from '../theme';
import { moderateScale } from 'react-native-size-matters';

export function JournalScreen() {
  return (
    <SafeAreaWrapper edges={['bottom']}>
      <View style={styles.container}>
        <Text style={styles.title}>Günlük</Text>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: theme.typography.fontWeight.bold,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
});

export default JournalScreen;

