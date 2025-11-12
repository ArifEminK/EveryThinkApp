import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
  backgroundColor?: string;
}

/**
 * SafeAreaWrapper - Safe area container for all screens
 * Manages safe area insets (notches, status bar, etc.)
 */
export function SafeAreaWrapper({
  children,
  edges = ['top', 'bottom'],
  backgroundColor = theme.colors.background.primary,
}: SafeAreaWrapperProps) {
  return (
    <SafeAreaView
      edges={edges}
      style={[styles.container, { backgroundColor }]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={backgroundColor}
        translucent={false}
      />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default SafeAreaWrapper;

