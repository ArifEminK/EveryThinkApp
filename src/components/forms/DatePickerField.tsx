import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { theme } from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DatePickerFieldProps {
  label: string;
  value: Date | null;
  onSelect: (date: Date) => void;
  icon?: string;
  error?: string;
  containerStyle?: object;
  mode?: 'date' | 'time' | 'datetime';
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
}

export function DatePickerField({
  label,
  value,
  onSelect,
  icon,
  error,
  containerStyle,
  mode = 'date',
  minimumDate,
  maximumDate,
  disabled = false,
}: DatePickerFieldProps) {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value || new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (value) {
      setTempDate(value);
    }
  }, [value]);

  const formatDate = (date: Date | null): string => {
    if (!date) return 'Seçiniz';

    if (mode === 'time') {
      return date.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    if (mode === 'datetime') {
      const today = new Date();
      const dateStr = date.toISOString().split('T')[0];
      const todayStr = today.toISOString().split('T')[0];

      if (dateStr === todayStr) {
        return `Bugün, ${date.toLocaleTimeString('tr-TR', {
          hour: '2-digit',
          minute: '2-digit',
        })}`;
      }

      return `${date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}, ${date.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dateStr = date.toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    if (dateStr === todayStr) return 'Bugün';
    if (dateStr === yesterdayStr) return 'Dün';
    if (dateStr === tomorrowStr) return 'Yarın';

    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleOpenModal = () => {
    if (disabled) return; // Disabled ise modal açılmasın
    setTempDate(value || new Date());
    if (Platform.OS === 'android') {
      setShowPicker(true);
    } else {
      setModalVisible(true);
      setShowPicker(true);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
      if (event.type === 'set' && selectedDate) {
        onSelect(selectedDate);
      }
    } else {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const handleConfirm = () => {
    onSelect(tempDate);
    setModalVisible(false);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setShowPicker(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.dateContainer,
          error && styles.dateError,
          disabled && styles.dateDisabled,
        ]}
        onPress={handleOpenModal}
        activeOpacity={disabled ? 1 : 0.7}
        disabled={disabled}
      >
        <View style={styles.dateContent}>
          {icon && (
            <Ionicons
              name={icon as any}
              size={moderateScale(20)}
              color={
                disabled
                  ? theme.colors.text.tertiary
                  : theme.colors.text.secondary
              }
              style={styles.icon}
            />
          )}
          <View style={styles.dateTextContainer}>
            <Text
              style={[
                styles.label,
                disabled && styles.labelDisabled,
              ]}
            >
              {label}
            </Text>
            <Text
              style={[
                styles.value,
                disabled && styles.valueDisabled,
              ]}
            >
              {formatDate(value)}
            </Text>
          </View>
        </View>
        <Ionicons
          name="chevron-forward"
          size={moderateScale(20)}
          color={theme.colors.text.tertiary}
          style={disabled && { opacity: 0.5 }}
        />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={tempDate}
          mode={mode === 'datetime' ? 'date' : mode}
          display="default"
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          is24Hour={true}
        />
      )}

      {Platform.OS === 'ios' && modalVisible && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={handleCancel}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={handleCancel}
          >
            <Pressable
              style={[
                styles.modalContent,
                { paddingBottom: Math.max(insets.bottom, verticalScale(16)) },
              ]}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={handleCancel}>
                  <Text style={styles.cancelButton}>İptal</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{label}</Text>
                <TouchableOpacity onPress={handleConfirm}>
                  <Text style={styles.confirmButton}>Tamam</Text>
                </TouchableOpacity>
              </View>

              {mode === 'datetime' ? (
                <>
                  <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display="spinner"
                    onChange={(event, date) => {
                      if (date) {
                        setTempDate(date);
                      }
                    }}
                    locale="tr_TR"
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    is24Hour={true}
                  />
                  <DateTimePicker
                    value={tempDate}
                    mode="time"
                    display="spinner"
                    onChange={(event, date) => {
                      if (date) {
                        setTempDate(date);
                      }
                    }}
                    locale="tr_TR"
                    is24Hour={true}
                  />
                </>
              ) : (
                <DateTimePicker
                  value={tempDate}
                  mode={mode}
                  display="spinner"
                  onChange={(event, date) => {
                    if (date) {
                      setTempDate(date);
                    }
                  }}
                  locale="tr_TR"
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                  is24Hour={true}
                />
              )}
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(12),
  },
  dateContainer: {
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
  dateError: {
    borderColor: theme.colors.semantic.error,
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: scale(12),
  },
  dateTextContainer: {
    flex: 1,
  },
  label: {
    fontSize: moderateScale(12),
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
    marginBottom: verticalScale(2),
  },
  value: {
    fontSize: moderateScale(16),
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
  dateDisabled: {
    opacity: 0.5,
  },
  labelDisabled: {
    color: theme.colors.text.tertiary,
  },
  valueDisabled: {
    color: theme.colors.text.tertiary,
  },
  errorText: {
    fontSize: moderateScale(12),
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.semantic.error,
    marginTop: verticalScale(4),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.surface.main,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    paddingTop: verticalScale(20),
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
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  cancelButton: {
    fontSize: moderateScale(16),
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
  },
  confirmButton: {
    fontSize: moderateScale(16),
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.accent.main,
  },
});

