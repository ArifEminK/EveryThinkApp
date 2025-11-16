import React, { useState, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import {
  SafeAreaWrapper,
  ItemCard,
  SegmentControl,
  SegmentType,
  StatusHeader,
} from '../components/common';
import { theme } from '../theme';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import type { ItemType } from '../types/item';

// Statik örnek veriler
const mockItems = [
  {
    id: '1',
    type: 'task' as ItemType,
    title: 'Market alışverişi yap',
    subtitle: 'Süt, yumurta, ekmek al',
    date: new Date(),
  },
  {
    id: '2',
    type: 'alarm' as ItemType,
    title: 'Sabah uyanma alarmı',
    subtitle: '07:00 - Her gün',
    date: new Date(),
  },
  {
    id: '3',
    type: 'countdown' as ItemType,
    title: 'Yılbaşı geri sayımı',
    subtitle: 'Geri sayım modu',
    date: new Date('2025-01-01'),
  },
  {
    id: '4',
    type: 'diary' as ItemType,
    title: 'Bugünkü günlük',
    subtitle: 'Çok mutluyum 😄',
    date: new Date(),
  },
  {
    id: '5',
    type: 'reminder' as ItemType,
    title: 'Doktor randevusu',
    subtitle: 'Yarın saat 14:00',
    date: new Date(),
  },
  {
    id: '6',
    type: 'task' as ItemType,
    title: 'Proje raporunu tamamla',
    subtitle: 'Acil - Bugün bitirilmeli',
    date: new Date(),
  },
  {
    id: '7',
    type: 'diary' as ItemType,
    title: 'Haftalık özet',
    subtitle: 'Güzel bir hafta geçirdim',
    date: new Date(),
  },
];

const segments = [
  { label: 'Tümü', value: 'all' as SegmentType },
  { label: 'Görev', value: 'task' as SegmentType },
  { label: 'Günlük', value: 'diary' as SegmentType },
  { label: 'Sayaç', value: 'countdown' as SegmentType },
  { label: 'Alarm', value: 'alarm' as SegmentType },
];

export function HomeScreen() {
  const [selectedSegment, setSelectedSegment] = useState<SegmentType>('all');
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
        stickyHeaderIndices={[1]} // SegmentControl sticky olacak
      >
        {/* StatusHeader - Scroll edilebilir */}
        <View style={styles.statusHeaderContainer}>
          <StatusHeader taskCount={5} />
        </View>

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
    paddingBottom: verticalScale(32),
  },
  statusHeaderContainer: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(8),
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

export default HomeScreen;
