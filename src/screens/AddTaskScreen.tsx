import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaWrapper } from '../components/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  InputField,
  TextAreaField,
  SelectField,
  ToggleField,
  DatePickerField,
} from '../components/forms';
import { theme } from '../theme';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import {
  ItemType,
  ITEM_TYPES,
  TASK_CATEGORY,
  TASK_TYPE,
  TASK_RECURRENCE,
} from '../types';
import type {
  TaskCategory,
  TaskType as TaskTypeEnum,
  TaskRecurrence,
  CreateTaskInput,
} from '../types';

interface AddTaskScreenProps {
  onGoBack?: () => void;
}

// Task category options
const taskCategoryOptions = [
  { label: 'Kişisel', value: TASK_CATEGORY.PERSONAL },
  { label: 'İş', value: TASK_CATEGORY.WORK },
  { label: 'Sağlık', value: TASK_CATEGORY.HEALTH },
  { label: 'Eğitim', value: TASK_CATEGORY.STUDY },
  { label: 'Diğer', value: TASK_CATEGORY.OTHER },
];

// Task recurrence options
const taskRecurrenceOptions = [
  { label: 'Tek Seferlik', value: TASK_RECURRENCE.ONCE },
  { label: 'Günlük', value: TASK_RECURRENCE.DAILY },
  { label: 'Haftalık', value: TASK_RECURRENCE.WEEKLY },
  { label: 'Aylık', value: TASK_RECURRENCE.MONTHLY },
  { label: 'Yıllık', value: TASK_RECURRENCE.YEARLY },
];

export function AddTaskScreen({ onGoBack }: AddTaskScreenProps) {
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState<ItemType>('task');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>(TASK_CATEGORY.PERSONAL);
  const [taskType, setTaskType] = useState<TaskTypeEnum>(TASK_TYPE.TODO);
  const [recurrence, setRecurrence] = useState<TaskRecurrence>(
    TASK_RECURRENCE.ONCE
  );
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [reminder, setReminder] = useState(false);

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    }
  };

  const handleSave = () => {
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
      type: taskType,
      recurrence,
      dueDate,
      completed: false,
    };

    console.log('Saving task:', taskData);
    Alert.alert('Başarılı', 'Görev kaydedildi!', [
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
          <View style={styles.divider} />
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

  const renderTypeSelector = () => {
    return (
      <View style={styles.typeSelectorContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typeSelectorContent}
        >
          {ITEM_TYPES.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                selectedType === type.id && styles.typeButtonActive,
                { borderColor: type.color },
              ]}
              onPress={() => setSelectedType(type.id)}
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
                verticalScale(70) + // BottomNavbar approximate height
                verticalScale(8), // Small margin
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {renderTypeSelector()}
          {selectedType === 'task' && renderTaskForm()}
          {selectedType === 'countdown' && (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>
                Sayaç formu yakında eklenecek
              </Text>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                activeOpacity={0.8}
              >
                <Text style={styles.saveButtonText}>Sayacı Kaydet</Text>
              </TouchableOpacity>
            </View>
          )}
          {selectedType === 'diary' && (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>
                Günlük formu yakında eklenecek
              </Text>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                activeOpacity={0.8}
              >
                <Text style={styles.saveButtonText}>Günlüğü Kaydet</Text>
              </TouchableOpacity>
            </View>
          )}
          {selectedType === 'reminder' && (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>
                Hatırlatıcı formu yakında eklenecek
              </Text>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                activeOpacity={0.8}
              >
                <Text style={styles.saveButtonText}>Hatırlatıcıyı Kaydet</Text>
              </TouchableOpacity>
            </View>
          )}
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
    marginBottom: verticalScale(20),
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
    marginTop: verticalScale(8),
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
    height: 1,
    backgroundColor: theme.colors.border.light,
    marginVertical: verticalScale(16),
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
    marginTop: verticalScale(24),
    marginBottom: 0,
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
    fontSize: moderateScale(14),
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.light,
  },
});

export default AddTaskScreen;
