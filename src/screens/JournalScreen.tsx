import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  SafeAreaWrapper,
  ItemCard,
  SegmentControl,
} from '../components/common';
import { theme } from '../theme';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { mockItems } from '../constants/mockData';
import { useEditContext } from '../navigation/AppNavigator';

type JournalFilterType = 'week' | 'month' | 'year' | 'all';

const segments = [
  { label: 'Bu Hafta', value: 'week' as JournalFilterType },
  { label: 'Bu Ay', value: 'month' as JournalFilterType },
  { label: 'Bu Yıl', value: 'year' as JournalFilterType },
  { label: 'Hepsi', value: 'all' as JournalFilterType },
];

export function JournalScreen() {
  const [selectedFilter, setSelectedFilter] = useState<JournalFilterType>('week');
  const { setEditingItem } = useEditContext();

  // Filtrelenmiş günlükler
  const filteredDiaries = useMemo(() => {
    // Sadece diary tipindeki itemları al
    const diaries = mockItems.filter((item) => item.type === 'diary');

    if (selectedFilter === 'all') {
      return diaries;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return diaries.filter((diary) => {
      const diaryDate = new Date(diary.date);
      const diaryDay = new Date(diaryDate.getFullYear(), diaryDate.getMonth(), diaryDate.getDate());

      if (selectedFilter === 'week') {
        // Bu haftanın başlangıcı (Pazartesi)
        const dayOfWeek = today.getDay();
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Pazar ise -6, diğer günler için 1 - dayOfWeek
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() + diff);

        // Bu haftanın sonu (Pazar)
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        return diaryDay >= weekStart && diaryDay <= weekEnd;
      }

      if (selectedFilter === 'month') {
        // Bu ay
        return (
          diaryDate.getMonth() === now.getMonth() &&
          diaryDate.getFullYear() === now.getFullYear()
        );
      }

      if (selectedFilter === 'year') {
        // Bu yıl
        return diaryDate.getFullYear() === now.getFullYear();
      }

      return true;
    });
  }, [selectedFilter]);

  // Tarihe göre sırala (en yeni en üstte)
  const sortedDiaries = useMemo(() => {
    return [...filteredDiaries].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [filteredDiaries]);

  return (
    <SafeAreaWrapper edges={['bottom']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        {/* Segment Control - Sticky */}
        <View style={styles.segmentControlContainer}>
          <SegmentControl
            segments={segments}
            selectedSegment={selectedFilter}
            onSegmentChange={setSelectedFilter}
          />
        </View>

        {/* Günlükler */}
        <View style={styles.itemsContainer}>
          {sortedDiaries.length > 0 ? (
            sortedDiaries.map((diary) => (
              <ItemCard
                key={diary.id}
                type={diary.type}
                title={diary.title}
                subtitle={diary.subtitle}
                date={diary.date}
                onPress={() => console.log('Diary pressed:', diary.id)}
                onEdit={() => setEditingItem(diary)}
                onComplete={() => console.log('Complete:', diary.id)}
                onDelete={() => console.log('Delete:', diary.id)}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {selectedFilter === 'week' && 'Bu hafta günlük kaydı yok'}
                {selectedFilter === 'month' && 'Bu ay günlük kaydı yok'}
                {selectedFilter === 'year' && 'Bu yıl günlük kaydı yok'}
                {selectedFilter === 'all' && 'Henüz günlük kaydı yok'}
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

export default JournalScreen;
