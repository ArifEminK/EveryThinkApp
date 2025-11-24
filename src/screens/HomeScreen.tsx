import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  SafeAreaWrapper,
  ItemCard,
  StatusHeader,
} from '../components/common';
import { theme } from '../theme';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { mockItems } from '../constants/mockData';
import { useEditContext } from '../navigation/AppNavigator';

export function HomeScreen() {
  const { setEditingItem } = useEditContext();

  // Bugünün öğeleri
  const todayItems = useMemo(() => {
    const today = new Date();
    return mockItems.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getDate() === today.getDate() &&
        itemDate.getMonth() === today.getMonth() &&
        itemDate.getFullYear() === today.getFullYear()
      );
    });
  }, []);

  return (
    <SafeAreaWrapper edges={['bottom']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* StatusHeader */}
        <View style={styles.statusHeaderContainer}>
          <StatusHeader taskCount={todayItems.length} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bugünün Planı</Text>
        </View>

        {/* Bugünün Item Cards */}
        <View style={styles.itemsContainer}>
          {todayItems.length > 0 ? (
            todayItems.map((item) => (
              <ItemCard
                key={item.id}
                type={item.type}
                title={item.title}
                subtitle={item.subtitle}
                date={item.date}
                onPress={() => console.log(`${item.type} pressed:`, item.id)}
                onEdit={() => setEditingItem(item)}
                onComplete={() => console.log('Complete:', item.id)}
                onDelete={() => console.log('Delete:', item.id)}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Bugün için planlanmış bir şey yok
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  contentContainer: {
    paddingBottom: verticalScale(20),
  },
  statusHeaderContainer: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(8),
  },
  sectionHeader: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: theme.typography.fontWeight.bold,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  itemsContainer: {
    paddingHorizontal: scale(16),
  },
  emptyContainer: {
    paddingVertical: verticalScale(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: moderateScale(16),
    fontWeight: theme.typography.fontWeight.regular,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
  },
});

export default HomeScreen;
