import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaWrapper, ItemCard } from '../components/common';
import { theme } from '../theme';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { mockItems } from '../constants/mockData';
import { ITEM_TYPES } from '../types/item';
import { useEditContext } from '../navigation/AppNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DAYS_OF_WEEK = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
const CELL_HEIGHT = verticalScale(65); // Daha küçük hücreler

const MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

export function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { setEditingItem } = useEditContext();
  const insets = useSafeAreaInsets();

  // Modal state
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [tempMonth, setTempMonth] = useState(currentDate.getMonth());
  const [tempYear, setTempYear] = useState(currentDate.getFullYear());

  // Ayın günlerini hesapla
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    // 0 = Pazar, 1 = Pazartesi... Biz Pazartesi (1) ile başlatmak istiyoruz
    let startDay = firstDayOfMonth.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1; // Pazar(0) -> 6, Pzt(1) -> 0

    const days = [];

    // Önceki ayın boşlukları
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Bu ayın günleri
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }, [currentDate]);

  // Seçili güne ait görevleri getir
  const selectedDateItems = useMemo(() => {
    return mockItems.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getDate() === selectedDate.getDate() &&
        itemDate.getMonth() === selectedDate.getMonth() &&
        itemDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }, [selectedDate]);

  // Bir güne ait görev ikonlarını getir
  const getDayIcons = (date: Date) => {
    const dayItems = mockItems.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getDate() === date.getDate() &&
        itemDate.getMonth() === date.getMonth() &&
        itemDate.getFullYear() === date.getFullYear()
      );
    });

    // Maksimum 4 ikon göster
    return dayItems.slice(0, 4).map((item) => {
      const typeInfo = ITEM_TYPES.find((t) => t.id === item.type);
      return {
        id: item.id,
        color: typeInfo?.color || theme.colors.text.primary,
      };
    });
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  const openPicker = () => {
    setTempMonth(currentDate.getMonth());
    setTempYear(currentDate.getFullYear());
    setIsPickerVisible(true);
  };

  const closePicker = () => {
    setIsPickerVisible(false);
  };

  const applyPicker = () => {
    const newDate = new Date(tempYear, tempMonth, 1);
    setCurrentDate(newDate);
    setIsPickerVisible(false);
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  return (
    <SafeAreaWrapper edges={['bottom']}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Takvim Grid */}
          <View style={styles.calendarContainer}>
            {/* Header: Ay/Yıl ve Navigasyon - Takvim içinde */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navButton}>
                <Ionicons name="chevron-back" size={24} color={theme.colors.text.primary} />
              </TouchableOpacity>

              <TouchableOpacity onPress={openPicker} activeOpacity={0.7}>
                <View style={styles.monthTitleContainer}>
                  <Text style={styles.monthTitle}>
                    {currentDate.toLocaleString('tr-TR', { month: 'long' })}, {currentDate.getFullYear()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navButton}>
                <Ionicons name="chevron-forward" size={24} color={theme.colors.text.primary} />
              </TouchableOpacity>
            </View>

            {/* Gün İsimleri - Takvim içinde */}
            <View style={styles.weekDays}>
              {DAYS_OF_WEEK.map((day) => (
                <Text key={day} style={styles.weekDayText}>{day}</Text>
              ))}
            </View>

            <View style={styles.calendarGrid}>
              {calendarDays.map((date, index) => {
                if (!date) {
                  return <View key={`empty-${index}`} style={styles.dayCell} />;
                }

                const isSelected = isSameDay(date, selectedDate);
                const isCurrentDay = isToday(date);
                const dayIcons = getDayIcons(date);

                return (
                  <TouchableOpacity
                    key={date.toISOString()}
                    style={[
                      styles.dayCell,
                      isSelected && styles.selectedDayCell,
                      isCurrentDay && !isSelected && styles.todayCell,
                    ]}
                    onPress={() => setSelectedDate(date)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        isSelected && styles.selectedDayText,
                        isCurrentDay && !isSelected && styles.todayText,
                      ]}
                    >
                      {date.getDate()}
                    </Text>

                    {/* Görev İkonları */}
                    <View style={styles.iconContainer}>
                      {dayIcons.map((icon) => (
                        <View
                          key={icon.id}
                          style={[styles.dot, { backgroundColor: icon.color }]}
                        />
                      ))}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Seçili Günün Detayları */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>
              {selectedDate.toLocaleString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' })}
            </Text>

            {selectedDateItems.length > 0 ? (
              selectedDateItems.map((item) => (
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
                <Text style={styles.emptyText}>Bu gün için planlanmış bir şey yok</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Month/Year Picker Modal */}
      <Modal
        visible={isPickerVisible}
        transparent
        animationType="fade"
        onRequestClose={closePicker}
      >
        <Pressable style={styles.modalOverlay} onPress={closePicker}>
          <Pressable
            style={[styles.modalContent, { paddingBottom: Math.max(insets.bottom, verticalScale(16)) }]}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closePicker}>
                <Text style={styles.cancelButton}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={applyPicker}>
                <Text style={styles.confirmButton}>Tamam</Text>
              </TouchableOpacity>
            </View>

            {/* Pickers Container */}
            <View style={styles.pickersContainer}>
              {/* Month Picker */}
              <View style={styles.pickerColumn}>
                <ScrollView style={styles.pickerScroll} showsVerticalScrollIndicator={false}>
                  {MONTHS.map((month, index) => (
                    <TouchableOpacity
                      key={month}
                      style={[
                        styles.pickerItem,
                        tempMonth === index && styles.pickerItemSelected,
                      ]}
                      onPress={() => setTempMonth(index)}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          tempMonth === index && styles.pickerItemTextSelected,
                        ]}
                      >
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Year Picker */}
              <View style={styles.pickerColumn}>
                <ScrollView style={styles.pickerScroll} showsVerticalScrollIndicator={false}>
                  {Array.from({ length: 11 }, (_, i) => 2020 + i).map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.pickerItem,
                        tempYear === year && styles.pickerItemSelected,
                      ]}
                      onPress={() => setTempYear(year)}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          tempYear === year && styles.pickerItemTextSelected,
                        ]}
                      >
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(4),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    marginBottom: verticalScale(4),
  },
  monthTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  monthTitle: {
    fontSize: moderateScale(18),
    fontWeight: theme.typography.fontWeight.bold,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    textTransform: 'capitalize',
  },
  navButton: {
    padding: moderateScale(8),
  },
  weekDays: {
    flexDirection: 'row',
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(4),
  },
  weekDayText: {
    width: '14.28%', // Hücre genişliğiyle aynı
    textAlign: 'center',
    fontSize: moderateScale(12),
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  calendarContainer: {
    marginHorizontal: scale(16),
    backgroundColor: theme.colors.surface.main,
    borderRadius: moderateScale(16),
    paddingBottom: scale(4),
    overflow: 'hidden',
    shadowColor: theme.colors.text.primary,
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(8),
    elevation: 2,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    height: CELL_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: verticalScale(8),
    borderWidth: 0.5,
    borderColor: theme.colors.border.light,
    borderRadius: 0,
  },
  selectedDayCell: {
    backgroundColor: theme.colors.surface.secondary,
    borderColor: theme.colors.accent.main,
    borderWidth: 1,
  },
  todayCell: {
    backgroundColor: theme.colors.background.tertiary,
  },
  dayText: {
    fontSize: moderateScale(14),
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
    marginBottom: verticalScale(4),
  },
  selectedDayText: {
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  todayText: {
    color: theme.colors.accent.main,
    fontWeight: theme.typography.fontWeight.bold,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: verticalScale(2),
    paddingHorizontal: scale(2),
  },
  dot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
  },
  detailsContainer: {
    padding: scale(16),
    paddingBottom: verticalScale(100),
  },
  detailsTitle: {
    fontSize: moderateScale(16),
    fontWeight: theme.typography.fontWeight.bold,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: verticalScale(12),
  },
  emptyContainer: {
    paddingVertical: verticalScale(24),
    alignItems: 'center',
  },
  emptyText: {
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.regular,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: moderateScale(16),
    width: '85%',
    maxHeight: '70%',
    paddingTop: verticalScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: verticalScale(4),
    },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(8),
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: theme.typography.fontWeight.bold,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  cancelButton: {
    fontSize: moderateScale(16),
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  confirmButton: {
    fontSize: moderateScale(16),
    color: '#89061C',
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily.semibold,
  },
  pickersContainer: {
    flexDirection: 'row',
    paddingTop: verticalScale(16),
    gap: scale(16),
    paddingHorizontal: scale(16),
  },
  pickerColumn: {
    flex: 1,
  },
  pickerLabel: {
    fontSize: moderateScale(14),
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily.semibold,
    color: theme.colors.text.primary,
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  pickerScroll: {
    maxHeight: verticalScale(250),
  },
  pickerItem: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(4),
    alignItems: 'center',
  },
  pickerItemSelected: {
    backgroundColor: 'rgba(137, 6, 28, 0.1)',
  },
  pickerItemText: {
    fontSize: moderateScale(16),
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.regular,
  },
  pickerItemTextSelected: {
    color: '#89061C',
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily.semibold,
  },
});

export default CalendarScreen;
