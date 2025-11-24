import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  Easing,
  LayoutChangeEvent,
} from 'react-native';
import { SafeAreaWrapper } from '../components/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  InputField,
  TextAreaField,
  SelectField,
  ToggleField,
  DatePickerField,
  DayPickerField,
} from '../components/forms';
import { theme } from '../theme';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import {
  ItemType,
  ITEM_TYPES,
  TASK_CATEGORY,
  TASK_RECURRENCE,
  COUNTDOWN_MODE,
  NOTIFICATION_TYPE,
} from '../types';
import type {
  TaskCategory,
  TaskRecurrence,
  CreateTaskInput,
  CountdownMode,
  CreateCountdownInput,
  CreateDiaryInput,
  NotificationType,
  CreateNotificationInput,
  CreateAlarmInput,
} from '../types';
import { formatDate, now } from '../utils/date';
import { taskCategoryOptions, taskRecurrenceOptions, countdownModeOptions, diaryMoodOptions } from '../constants';

interface AddTaskScreenProps {
  onGoBack?: () => void;
}




export function AddTaskScreen({ onGoBack }: AddTaskScreenProps) {
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState<ItemType>('task');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>(TASK_CATEGORY.PERSONAL);
  const [recurrence, setRecurrence] = useState<TaskRecurrence>(
    TASK_RECURRENCE.ONCE
  );
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [noDueDate, setNoDueDate] = useState(false); // Bitiş tarihi yok toggle'ı
  const [reminder, setReminder] = useState(false);

  // Countdown states
  const [countdownTitle, setCountdownTitle] = useState('');
  const [countdownDescription, setCountdownDescription] = useState('');
  const [targetDate, setTargetDate] = useState<Date | null>(new Date());
  const [countdownMode, setCountdownMode] = useState<CountdownMode>(
    COUNTDOWN_MODE.COUNTDOWN
  );

  // Diary states
  const [diaryTitle, setDiaryTitle] = useState('');
  const [diaryContent, setDiaryContent] = useState('');
  const [diaryDate, setDiaryDate] = useState<Date | null>(new Date());
  const [diaryMood, setDiaryMood] = useState<string>('');

  // Alarm states
  const [alarmTitle, setAlarmTitle] = useState('');
  const [alarmTime, setAlarmTime] = useState<Date | null>(new Date());
  const [alarmRepeatDays, setAlarmRepeatDays] = useState<string>('');
  const [alarmVibrate, setAlarmVibrate] = useState(true);

  // Reminder states
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderMessage, setReminderMessage] = useState('');
  const [reminderDate, setReminderDate] = useState<Date | null>(new Date());
  const [reminderTime, setReminderTime] = useState<Date | null>(new Date());

  // Animation states
  const [typeLayouts, setTypeLayouts] = useState<
    Record<string, { x: number; y: number; width: number; height: number }>
  >({});
  const indicatorX = useRef(new Animated.Value(0)).current;
  const indicatorW = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const layout = typeLayouts[selectedType];
    if (layout) {
      Animated.parallel([
        Animated.timing(indicatorX, {
          toValue: layout.x,
          duration: 250,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(indicatorW, {
          toValue: layout.width,
          duration: 250,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [selectedType, typeLayouts]);

  const handleTypeLayout = (id: string) => (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setTypeLayouts((prev) => ({ ...prev, [id]: { x, y, width, height } }));
  };

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    }
  };

  const handleSave = () => {
    if (selectedType === 'task') {
      handleSaveTask();
    } else if (selectedType === 'countdown') {
      handleSaveCountdown();
    } else if (selectedType === 'diary') {
      handleSaveDiary();
    } else if (selectedType === 'reminder') {
      handleSaveReminder();
    }
  };

  const handleSaveTask = () => {
    if (!title.trim()) {
      Alert.alert('Hata', 'Lütfen görev başlığı giriniz.');
      return;
    }

    // TODO: Save task to database
    const taskData: CreateTaskInput = {
      userId: 'user-123', // TODO: Get from auth context
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      recurrence,
      dueDate: noDueDate || !dueDate ? null : dueDate.toISOString(), // Convert to ISO string
    };

    console.log('Saving task:', taskData);
    Alert.alert('Başarılı', 'Görev kaydedildi!', [
      {
        text: 'Tamam',
        onPress: handleGoBack,
      },
    ]);
  };

  const handleSaveCountdown = () => {
    if (!countdownTitle.trim()) {
      Alert.alert('Hata', 'Lütfen sayaç başlığı giriniz.');
      return;
    }

    if (!targetDate) {
      const fieldLabel =
        countdownMode === COUNTDOWN_MODE.COUNTUP
          ? 'başlangıç tarihi'
          : 'bitiş tarihi';
      Alert.alert('Hata', `Lütfen ${fieldLabel} seçiniz.`);
      return;
    }

    const now = new Date();

    // Validasyonlar
    if (countdownMode === COUNTDOWN_MODE.COUNTUP) {
      // İleri sayım: Başlangıç tarihi bugünden önce olmalı
      if (targetDate > now) {
        Alert.alert('Hata', 'Başlangıç tarihi bugünden önce olmalıdır.');
        return;
      }
    } else {
      // Geri sayım: Bitiş tarihi bugünden sonra olmalı
      if (targetDate <= now) {
        Alert.alert('Hata', 'Bitiş tarihi bugünden sonra olmalıdır.');
        return;
      }
    }

    // TODO: Save countdown to database
    const countdownData: CreateCountdownInput = {
      userId: 'user-123', // TODO: Get from auth context
      title: countdownTitle.trim(),
      description: countdownDescription.trim() || undefined,
      targetDate: targetDate!.toISOString(), // Convert to ISO string
      mode: countdownMode,
    };

    console.log('Saving countdown:', countdownData);
    Alert.alert('Başarılı', 'Sayaç kaydedildi!', [
      {
        text: 'Tamam',
        onPress: handleGoBack,
      },
    ]);
  };

  const handleSaveDiary = () => {
    if (!diaryTitle.trim()) {
      Alert.alert('Hata', 'Lütfen günlük başlığı giriniz.');
      return;
    }

    if (!diaryContent.trim()) {
      Alert.alert('Hata', 'Lütfen günlük içeriği giriniz.');
      return;
    }

    if (!diaryDate) {
      Alert.alert('Hata', 'Lütfen tarih seçiniz.');
      return;
    }

    // TODO: Save diary to database
    const diaryData: CreateDiaryInput = {
      userId: 'user-123', // TODO: Get from auth context
      date: formatDate(diaryDate!), // Convert to YYYY-MM-DD
      title: diaryTitle.trim(),
      content: diaryContent.trim(),
      mood: diaryMood || undefined,
    };

    console.log('Saving diary:', diaryData);
    Alert.alert('Başarılı', 'Günlük kaydedildi!', [
      {
        text: 'Tamam',
        onPress: handleGoBack,
      },
    ]);
  };

  const handleSaveAlarm = () => {
    if (!alarmTitle.trim()) {
      Alert.alert('Hata', 'Lütfen alarm başlığı giriniz.');
      return;
    }

    if (!alarmTime) {
      Alert.alert('Hata', 'Lütfen saat seçiniz.');
      return;
    }

    // Saati HH:mm formatına çevir
    const hours = alarmTime.getHours().toString().padStart(2, '0');
    const minutes = alarmTime.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    // TODO: Save alarm to database
    const alarmData: CreateAlarmInput = {
      userId: 'user-123', // TODO: Get from auth context (string)
      title: alarmTitle.trim(),
      time: timeString,
      repeatDays: alarmRepeatDays.trim() ? alarmRepeatDays.split(',').map(d => parseInt(d.trim())) : null, // Convert to number array
      isEnabled: true,
      vibrate: alarmVibrate,
    };

    console.log('Saving alarm:', alarmData);
    Alert.alert('Başarılı', 'Alarm kaydedildi!', [
      {
        text: 'Tamam',
        onPress: handleGoBack,
      },
    ]);
  };

  const handleSaveReminder = () => {
    if (!reminderTitle.trim()) {
      Alert.alert('Hata', 'Lütfen hatırlatıcı başlığı giriniz.');
      return;
    }

    if (!reminderMessage.trim()) {
      Alert.alert('Hata', 'Lütfen hatırlatıcı mesajı giriniz.');
      return;
    }

    if (!reminderDate) {
      Alert.alert('Hata', 'Lütfen tarih seçiniz.');
      return;
    }

    if (!reminderTime) {
      Alert.alert('Hata', 'Lütfen saat seçiniz.');
      return;
    }

    // Tarih ve saati birleştir
    const reminderDateTime = new Date(reminderDate);
    reminderDateTime.setHours(reminderTime.getHours());
    reminderDateTime.setMinutes(reminderTime.getMinutes());
    reminderDateTime.setSeconds(0);
    reminderDateTime.setMilliseconds(0);

    // Bugün seçilirse ve saat geçmişse uyarı ver
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);

    if (reminderDateTime <= now) {
      const isToday =
        reminderDate.toISOString().split('T')[0] ===
        now.toISOString().split('T')[0];

      if (isToday) {
        Alert.alert('Hata', 'Seçilen saat geçmişte. Lütfen gelecekteki bir saat seçiniz.');
      } else {
        Alert.alert('Hata', 'Hatırlatıcı tarihi ve saati gelecekte olmalıdır.');
      }
      return;
    }

    // TODO: Save reminder to database
    // Note: Tarih bilgisi message'a eklenebilir veya ayrı bir scheduledDate field'ı eklenebilir
    const reminderData: CreateNotificationInput = {
      userId: 'user-123', // TODO: Get from auth context
      title: reminderTitle.trim(),
      message: `${reminderMessage.trim()}\n\nTarih: ${reminderDateTime.toLocaleString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}`,
      type: NOTIFICATION_TYPE.REMINDER as NotificationType,
      relatedId: null,
      read: false,
    };

    console.log('Saving reminder:', reminderData);
    Alert.alert('Başarılı', 'Hatırlatıcı kaydedildi!', [
      {
        text: 'Tamam',
        onPress: handleGoBack,
      },
    ]);
  };

  const renderTaskForm = () => {
    return (
      <View style={styles.formContainer}>
        <View style={styles.card}>
          <InputField
            label="Görev Başlığı"
            value={title}
            onChangeText={setTitle}
            placeholder="Örn. Proje raporunu tamamla"
          />
          <TextAreaField
            label="Açıklama"
            value={description}
            onChangeText={setDescription}
            placeholder="Görevle ilgili detaylar..."
            numberOfLines={4}
          />
        </View>

        <SelectField
          label="Kategori"
          value={category}
          options={taskCategoryOptions}
          onSelect={(value) => setCategory(value as TaskCategory)}
          icon="grid-outline"
        />

        <SelectField
          label="Tekrar Tipi"
          value={recurrence}
          options={taskRecurrenceOptions}
          onSelect={(value) => setRecurrence(value as TaskRecurrence)}
          icon="repeat-outline"
        />

        <DatePickerField
          label="Bitiş Tarihi"
          value={dueDate}
          onSelect={setDueDate}
          icon="calendar-outline"
          mode="date"
          disabled={noDueDate}
        />

        <ToggleField
          label="Bitiş Tarihi Yok"
          value={noDueDate}
          onToggle={(value) => {
            setNoDueDate(value);
            if (value) {
              setDueDate(null); // Toggle aktif olunca tarihi sıfırla
            } else {
              setDueDate(new Date()); // Toggle kapalı olunca bugünü seç
            }
          }}
          icon="calendar-outline"
        />

        <ToggleField
          label="Hatırlatma"
          value={reminder}
          onToggle={setReminder}
          icon="notifications-outline"
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>
            {selectedType === 'task' && 'Görevi Kaydet'}
            {selectedType === 'countdown' && 'Sayacı Kaydet'}
            {selectedType === 'diary' && 'Günlüğü Kaydet'}
            {selectedType === 'reminder' && 'Hatırlatıcıyı Kaydet'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCountdownForm = () => {
    return (
      <View style={styles.formContainer}>
        <View style={styles.card}>
          <InputField
            label="Sayaç Başlığı"
            value={countdownTitle}
            onChangeText={setCountdownTitle}
            placeholder="Örn. Yılbaşı geri sayımı"
          />
          <TextAreaField
            label="Açıklama"
            value={countdownDescription}
            onChangeText={setCountdownDescription}
            placeholder="Sayaçla ilgili detaylar..."
            numberOfLines={4}
          />
        </View>

        <SelectField
          label="Sayaç Modu"
          value={countdownMode}
          options={countdownModeOptions}
          onSelect={(value) => {
            const newMode = value as CountdownMode;
            setCountdownMode(newMode);
            // Mod değiştiğinde tarihi sıfırla
            setTargetDate(new Date());
          }}
          icon="timer-outline"
        />

        {countdownMode === COUNTDOWN_MODE.COUNTUP ? (
          <DatePickerField
            label="Başlangıç Tarihi"
            value={targetDate}
            onSelect={setTargetDate}
            icon="play-outline"
            mode="datetime"
            maximumDate={new Date()} // İleri sayım: Bugünden önceki tarih seçilebilir
          />
        ) : (
          <DatePickerField
            label="Bitiş Tarihi"
            value={targetDate}
            onSelect={setTargetDate}
            icon="flag-outline"
            mode="datetime"
            minimumDate={new Date()} // Geri sayım: Bugünden sonraki tarih seçilebilir
          />
        )}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Sayacı Kaydet</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderDiaryForm = () => {
    return (
      <View style={styles.formContainer}>
        <View style={styles.card}>
          <InputField
            label="Günlük Başlığı"
            value={diaryTitle}
            onChangeText={setDiaryTitle}
            placeholder="Örn. Bugün çok güzel bir gündü"
          />
          <TextAreaField
            label="Günlük İçeriği"
            value={diaryContent}
            onChangeText={setDiaryContent}
            placeholder="Bugün neler oldu? Nasıl hissediyorsun?..."
            numberOfLines={8}
          />
        </View>

        <DatePickerField
          label="Tarih"
          value={diaryDate}
          onSelect={setDiaryDate}
          icon="calendar-outline"
          mode="date"
          maximumDate={new Date()} // Geçmiş veya bugün seçilebilir
        />

        <SelectField
          label="Ruh Hali (Opsiyonel)"
          value={diaryMood}
          options={diaryMoodOptions}
          onSelect={setDiaryMood}
          icon="happy-outline"
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Günlüğü Kaydet</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderAlarmForm = () => {
    return (
      <View style={styles.formContainer}>
        <View style={styles.card}>
          <InputField
            label="Alarm Başlığı"
            value={alarmTitle}
            onChangeText={setAlarmTitle}
            placeholder="Örn. Sabah alarmı"
          />
        </View>

        <DatePickerField
          label="Saat"
          value={alarmTime}
          onSelect={setAlarmTime}
          icon="time-outline"
          mode="time"
        />

        <DayPickerField
          label="Tekrar Günleri"
          value={alarmRepeatDays}
          onSelect={setAlarmRepeatDays}
        />

        <ToggleField
          label="Titreşim"
          value={alarmVibrate}
          onToggle={setAlarmVibrate}
          icon="phone-portrait-outline"
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Alarmı Kaydet</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderReminderForm = () => {
    return (
      <View style={styles.formContainer}>
        <View style={styles.card}>
          <InputField
            label="Hatırlatıcı Başlığı"
            value={reminderTitle}
            onChangeText={setReminderTitle}
            placeholder="Örn. Doktor randevusu"
          />
          <TextAreaField
            label="Hatırlatıcı Mesajı"
            value={reminderMessage}
            onChangeText={setReminderMessage}
            placeholder="Ne hakkında hatırlatıcı istiyorsun?..."
            numberOfLines={6}
          />
        </View>

        <DatePickerField
          label="Tarih"
          value={reminderDate}
          onSelect={setReminderDate}
          icon="calendar-outline"
          mode="date"
          minimumDate={new Date()} // Sadece bugün veya gelecekteki tarih seçilebilir
        />

        <DatePickerField
          label="Saat"
          value={reminderTime}
          onSelect={setReminderTime}
          icon="time-outline"
          mode="time"
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Hatırlatıcıyı Kaydet</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderTypeSelector = () => {
    const activeItemColor = ITEM_TYPES.find((t) => t.id === selectedType)?.color;

    return (
      <View style={styles.typeSelectorContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typeSelectorContent}
        >
          {/* Background Layer (Inactive Items) */}
          {Object.entries(typeLayouts).map(([id, layout]) => (
            <View
              key={`bg-${id}`}
              style={[
                styles.typeButtonBase,
                {
                  position: 'absolute',
                  left: layout.x,
                  top: layout.y,
                  width: layout.width,
                  height: layout.height,
                  backgroundColor: theme.colors.surface.main,
                },
              ]}
            />
          ))}

          {/* Active Indicator Layer */}
          {typeLayouts[selectedType] && (
            <Animated.View
              style={[
                styles.typeButtonBase,
                {
                  position: 'absolute',
                  left: 0,
                  top: typeLayouts[selectedType].y,
                  width: indicatorW,
                  height: typeLayouts[selectedType].height,
                  transform: [{ translateX: indicatorX }],
                  backgroundColor: theme.colors.surface.secondary,
                  borderColor: activeItemColor,
                  borderWidth: 2,
                  zIndex: 1,
                },
              ]}
            />
          )}

          {/* Foreground Layer (Content) */}
          {ITEM_TYPES.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                {
                  backgroundColor: typeLayouts[type.id]
                    ? 'transparent'
                    : theme.colors.surface.main,
                  borderWidth: 0, // Border handled by indicator
                  zIndex: 2,
                },
              ]}
              onPress={() => setSelectedType(type.id)}
              onLayout={handleTypeLayout(type.id)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.typeIconContainer,
                  selectedType === type.id && {
                    backgroundColor: type.color,
                  },
                ]}
              >
                <Ionicons
                  name={type.icon as any}
                  size={moderateScale(24)}
                  color={
                    selectedType === type.id
                      ? theme.colors.text.light
                      : type.color
                  }
                />
              </View>
              <Text
                style={[
                  styles.typeLabel,
                  selectedType === type.id && styles.typeLabelActive,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaWrapper edges={['top']}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom:
                Math.max(insets.bottom, verticalScale(8)) +
                verticalScale(16) + // BottomNavbar approximate height
                verticalScale(8), // Small margin
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {renderTypeSelector()}
          {selectedType === 'task' && renderTaskForm()}
          {selectedType === 'alarm' && renderAlarmForm()}
          {selectedType === 'countdown' && renderCountdownForm()}
          {selectedType === 'diary' && renderDiaryForm()}
          {selectedType === 'reminder' && renderReminderForm()}
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: scale(16),
    paddingTop: verticalScale(8),
  },
  typeSelectorContainer: {
    marginBottom: verticalScale(16),
  },
  typeSelectorContent: {
    paddingHorizontal: scale(4),
  },
  typeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    marginHorizontal: scale(8),
    borderRadius: moderateScale(12),
    borderWidth: 2,
    backgroundColor: theme.colors.surface.main,
    minWidth: moderateScale(100),
  },
  typeButtonBase: {
    borderRadius: moderateScale(12),
    // Base styles for background and indicator
  },
  typeButtonActive: {
    backgroundColor: theme.colors.surface.secondary,
    borderWidth: 2,
  },
  typeIconContainer: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.tertiary,
    marginBottom: verticalScale(8),
  },
  typeLabel: {
    fontSize: moderateScale(14),
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
  },
  typeLabelActive: {
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.bold,
  },
  formContainer: {
  },
  card: {
    backgroundColor: theme.colors.surface.main,
    borderRadius: moderateScale(16),
    padding: scale(16),
    marginBottom: verticalScale(16),
    shadowColor: theme.colors.text.primary,
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(8),
    elevation: 2,
  },
  divider: {
    marginVertical: verticalScale(0),
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(40),
    minHeight: verticalScale(200),
  },
  placeholderText: {
    fontSize: moderateScale(16),
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: theme.colors.accent.main,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.accent.main,
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(6),
    elevation: 3,
  },
  saveButtonText: {
    fontSize: moderateScale(16),
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.light,
  },
});

export default AddTaskScreen;
