import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaWrapper, TopNavbar, StatusHeader } from '../components/common';
import { theme } from '../theme';
import { moderateScale } from 'react-native-size-matters';

export function HomeScreen() {
  return (
    <SafeAreaWrapper edges={['bottom']}>
      <TopNavbar
        onMenuPress={() => {}}
        onProfilePress={() => {}}
        userName="User"
      />
      <StatusHeader taskCount={5} />
      <View style={styles.container}>
        <Text style={styles.title}>Ana Ekran</Text>
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

export default HomeScreen;

