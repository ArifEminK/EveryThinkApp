import React, { useState, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import {
  SafeAreaWrapper,
  ItemCard,
  SegmentControl,
  SegmentType,
} from '../components/common';
import { theme } from '../theme';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { mockItems } from '../constants/mockData';
import { useEditContext } from '../navigation/AppNavigator';

const segments = [
  { label: 'Tümü', value: 'all' as SegmentType },
  { label: 'Görev', value: 'task' as SegmentType },
  { label: 'Günlük', value: 'diary' as SegmentType },
  { label: 'Sayaç', value: 'countdown' as SegmentType },
  { label: 'Alarm', value: 'alarm' as SegmentType },
];

export function TasksScreen() {
  const [selectedSegment, setSelectedSegment] = useState<SegmentType>('all');
  const { setEditingItem } = useEditContext();
  const scrollY = useRef(new Animated.Value(0)).current;
  const segmentControlRef = useRef<View>(null);

  // Filtrelenmiş öğeler
  const filteredItems = useMemo(() => {
    if (selectedSegment === 'all') {
      return mockItems;
    }
    return mockItems.filter((item) => item.type === selectedSegment);
  }, [selectedSegment]);

  return (
    <SafeAreaWrapper edges={['bottom']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        stickyHeaderIndices={[0]} // SegmentControl sticky olacak (artık ilk eleman)
      >
        {/* Segment Control - Sticky */}
        <View style={styles.segmentControlContainer} ref={segmentControlRef}>
          <SegmentControl
            segments={segments}
            selectedSegment={selectedSegment}
            onSegmentChange={setSelectedSegment}
          />
        </View>

        {/* Filtrelenmiş Item Cards */}
        <View style={styles.itemsContainer}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
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
                Bu kategoride öğe bulunamadı
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
    paddingBottom: verticalScale(20), // Bottom bar için ekstra boşluk
  },
  segmentControlContainer: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(12),
    backgroundColor: theme.colors.background.primary,
    zIndex: 10,
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

export default TasksScreen;

