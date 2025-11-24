import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
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
    COUNTDOWN_MODE,
} from '../types';
import type {
    TaskCategory,
    TaskRecurrence,
    CountdownMode,
} from '../types';
import { formatDate } from '../utils/date';
import { taskCategoryOptions, taskRecurrenceOptions, countdownModeOptions, diaryMoodOptions } from '../constants';
import { StatusBar } from 'expo-status-bar';
import {
    EditItemProvider,
    useTaskState,
    useCountdownState,
    useDiaryState,
    useAlarmState,
} from '../store';

interface EditItemScreenProps {
    itemType: ItemType;
    itemData: any; // TODO: Type this properly based on itemType
    onGoBack?: () => void;
    onSave?: (data: any) => void;
}

/**
 * Edit Item Screen Content Component
 * Separated to use hooks inside provider
 */
function EditItemScreenContent({ itemType, itemData, onGoBack, onSave }: EditItemScreenProps) {
    const insets = useSafeAreaInsets();

    // Get state hooks based on item type
    const taskState = useTaskState();
    const countdownState = useCountdownState();
    const diaryState = useDiaryState();
    const alarmState = useAlarmState();

    // Initialize state from itemData on mount
    useEffect(() => {
        if (itemType === 'task' && itemData) {
            taskState.initialize({
                title: itemData.title || '',
                description: itemData.description || '',
                category: itemData.category,
                recurrence: itemData.recurrence,
                dueDate: itemData.dueDate ? new Date(itemData.dueDate) : new Date(),
                noDueDate: !itemData.dueDate,
                reminder: itemData.reminder || false,
            });
        } else if (itemType === 'countdown' && itemData) {
            countdownState.initialize({
                title: itemData.title || '',
                description: itemData.description || '',
                targetDate: itemData.targetDate ? new Date(itemData.targetDate) : new Date(),
                mode: itemData.mode,
            });
        } else if (itemType === 'diary' && itemData) {
            diaryState.initialize({
                title: itemData.title || '',
                content: itemData.content || '',
                date: itemData.date ? new Date(itemData.date) : new Date(),
                mood: itemData.mood || '',
            });
        } else if (itemType === 'alarm' && itemData) {
            alarmState.initialize({
                title: itemData.title || '',
                time: itemData.time ? new Date(`2000-01-01T${itemData.time}`) : new Date(),
                repeatDays: itemData.repeatDays?.join(',') || '',
                vibrate: itemData.vibrate ?? true,
            });
        }
    }, [itemType, itemData]);

    const handleGoBack = () => {
        if (onGoBack) {
            onGoBack();
        }
    };

    const handleSave = () => {
        if (itemType === 'task') {
            handleSaveTask();
        } else if (itemType === 'countdown') {
            handleSaveCountdown();
        } else if (itemType === 'diary') {
            handleSaveDiary();
        } else if (itemType === 'alarm') {
            handleSaveAlarm();
        }
    };

    const handleSaveTask = () => {
        if (!taskState.title.trim()) {
            Alert.alert('Hata', 'Lütfen görev başlığı giriniz.');
            return;
        }

        const taskData = {
            ...itemData,
            title: taskState.title.trim(),
            description: taskState.description.trim() || undefined,
            category: taskState.category,
            recurrence: taskState.recurrence,
            dueDate: taskState.noDueDate || !taskState.dueDate ? null : taskState.dueDate.toISOString(),
        };

        if (onSave) {
            onSave(taskData);
        }

        Alert.alert('Başarılı', 'Görev güncellendi!', [
            {
                text: 'Tamam',
                onPress: handleGoBack,
            },
        ]);
    };

    const handleSaveCountdown = () => {
        if (!countdownState.title.trim()) {
            Alert.alert('Hata', 'Lütfen sayaç başlığı giriniz.');
            return;
        }

        if (!countdownState.targetDate) {
            Alert.alert('Hata', 'Lütfen tarih seçiniz.');
            return;
        }

        const countdownData = {
            ...itemData,
            title: countdownState.title.trim(),
            description: countdownState.description.trim() || undefined,
            targetDate: countdownState.targetDate.toISOString(),
            mode: countdownState.mode,
        };

        if (onSave) {
            onSave(countdownData);
        }

        Alert.alert('Başarılı', 'Sayaç güncellendi!', [
            {
                text: 'Tamam',
                onPress: handleGoBack,
            },
        ]);
    };

    const handleSaveDiary = () => {
        if (!diaryState.title.trim()) {
            Alert.alert('Hata', 'Lütfen günlük başlığı giriniz.');
            return;
        }

        if (!diaryState.content.trim()) {
            Alert.alert('Hata', 'Lütfen günlük içeriği giriniz.');
            return;
        }

        const diaryData = {
            ...itemData,
            date: formatDate(diaryState.date!),
            title: diaryState.title.trim(),
            content: diaryState.content.trim(),
            mood: diaryState.mood || undefined,
        };

        if (onSave) {
            onSave(diaryData);
        }

        Alert.alert('Başarılı', 'Günlük güncellendi!', [
            {
                text: 'Tamam',
                onPress: handleGoBack,
            },
        ]);
    };

    const handleSaveAlarm = () => {
        if (!alarmState.title.trim()) {
            Alert.alert('Hata', 'Lütfen alarm başlığı giriniz.');
            return;
        }

        if (!alarmState.time) {
            Alert.alert('Hata', 'Lütfen saat seçiniz.');
            return;
        }

        const hours = alarmState.time.getHours().toString().padStart(2, '0');
        const minutes = alarmState.time.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;

        const alarmData = {
            ...itemData,
            title: alarmState.title.trim(),
            time: timeString,
            repeatDays: alarmState.repeatDays.trim() ? alarmState.repeatDays.split(',').map(d => parseInt(d.trim())) : null,
            vibrate: alarmState.vibrate,
        };

        if (onSave) {
            onSave(alarmData);
        }

        Alert.alert('Başarılı', 'Alarm güncellendi!', [
            {
                text: 'Tamam',
                onPress: handleGoBack,
            },
        ]);
    };

    const getTitle = () => {
        switch (itemType) {
            case 'task':
                return 'Görevi Düzenle';
            case 'countdown':
                return 'Sayacı Düzenle';
            case 'diary':
                return 'Günlüğü Düzenle';
            case 'alarm':
                return 'Alarmı Düzenle';
            default:
                return 'Düzenle';
        }
    };

    const renderTaskForm = () => {
        return (
            <View style={styles.formContainer}>
                <StatusBar
                    backgroundColor={theme.colors.background.primary}
                    translucent={false}
                />
                <View style={styles.card}>
                    <InputField
                        label="Görev Başlığı"
                        value={taskState.title}
                        onChangeText={taskState.setTitle}
                        placeholder="Örn. Proje raporunu tamamla"
                    />
                    <TextAreaField
                        label="Açıklama"
                        value={taskState.description}
                        onChangeText={taskState.setDescription}
                        placeholder="Görevle ilgili detaylar..."
                        numberOfLines={4}
                    />
                </View>

                <SelectField
                    label="Kategori"
                    value={taskState.category}
                    options={taskCategoryOptions}
                    onSelect={(value) => taskState.setCategory(value as TaskCategory)}
                    icon="grid-outline"
                />

                <SelectField
                    label="Tekrar Tipi"
                    value={taskState.recurrence}
                    options={taskRecurrenceOptions}
                    onSelect={(value) => taskState.setRecurrence(value as TaskRecurrence)}
                    icon="repeat-outline"
                />

                <DatePickerField
                    label="Bitiş Tarihi"
                    value={taskState.dueDate}
                    onSelect={taskState.setDueDate}
                    icon="calendar-outline"
                    mode="date"
                    disabled={taskState.noDueDate}
                />

                <ToggleField
                    label="Bitiş Tarihi Yok"
                    value={taskState.noDueDate}
                    onToggle={taskState.setNoDueDate}
                    icon="calendar-outline"
                />

                <ToggleField
                    label="Hatırlatma"
                    value={taskState.reminder}
                    onToggle={taskState.setReminder}
                    icon="notifications-outline"
                />
            </View>
        );
    };

    const renderCountdownForm = () => {
        return (
            <View style={styles.formContainer}>
                <View style={styles.card}>
                    <InputField
                        label="Sayaç Başlığı"
                        value={countdownState.title}
                        onChangeText={countdownState.setTitle}
                        placeholder="Örn. Yılbaşı geri sayımı"
                    />
                    <TextAreaField
                        label="Açıklama"
                        value={countdownState.description}
                        onChangeText={countdownState.setDescription}
                        placeholder="Sayaçla ilgili detaylar..."
                        numberOfLines={4}
                    />
                </View>

                <SelectField
                    label="Sayaç Modu"
                    value={countdownState.mode}
                    options={countdownModeOptions}
                    onSelect={(value) => countdownState.setMode(value as CountdownMode)}
                    icon="timer-outline"
                />

                {countdownState.mode === COUNTDOWN_MODE.COUNTUP ? (
                    <DatePickerField
                        label="Başlangıç Tarihi"
                        value={countdownState.targetDate}
                        onSelect={countdownState.setTargetDate}
                        icon="play-outline"
                        mode="datetime"
                        maximumDate={new Date()}
                    />
                ) : (
                    <DatePickerField
                        label="Bitiş Tarihi"
                        value={countdownState.targetDate}
                        onSelect={countdownState.setTargetDate}
                        icon="flag-outline"
                        mode="datetime"
                        minimumDate={new Date()}
                    />
                )}
            </View>
        );
    };

    const renderDiaryForm = () => {
        return (
            <View style={styles.formContainer}>
                <View style={styles.card}>
                    <InputField
                        label="Günlük Başlığı"
                        value={diaryState.title}
                        onChangeText={diaryState.setTitle}
                        placeholder="Örn. Bugün çok güzel bir gündü"
                    />
                    <TextAreaField
                        label="Günlük İçeriği"
                        value={diaryState.content}
                        onChangeText={diaryState.setContent}
                        placeholder="Bugün neler oldu? Nasıl hissediyorsun?..."
                        numberOfLines={8}
                    />
                </View>

                <DatePickerField
                    label="Tarih"
                    value={diaryState.date}
                    onSelect={diaryState.setDate}
                    icon="calendar-outline"
                    mode="date"
                    maximumDate={new Date()}
                />

                <SelectField
                    label="Ruh Hali (Opsiyonel)"
                    value={diaryState.mood}
                    options={diaryMoodOptions}
                    onSelect={diaryState.setMood}
                    icon="happy-outline"
                />
            </View>
        );
    };

    const renderAlarmForm = () => {
        return (
            <View style={styles.formContainer}>
                <View style={styles.card}>
                    <InputField
                        label="Alarm Başlığı"
                        value={alarmState.title}
                        onChangeText={alarmState.setTitle}
                        placeholder="Örn. Sabah alarmı"
                    />
                </View>

                <DatePickerField
                    label="Saat"
                    value={alarmState.time}
                    onSelect={alarmState.setTime}
                    icon="time-outline"
                    mode="time"
                />

                <DayPickerField
                    label="Tekrar Günleri"
                    value={alarmState.repeatDays}
                    onSelect={alarmState.setRepeatDays}
                />

                <ToggleField
                    label="Titreşim"
                    value={alarmState.vibrate}
                    onToggle={alarmState.setVibrate}
                    icon="phone-portrait-outline"
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + verticalScale(8) }]}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color={theme.colors.text.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{getTitle()}</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Form Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {itemType === 'task' && renderTaskForm()}
                {itemType === 'countdown' && renderCountdownForm()}
                {itemType === 'diary' && renderDiaryForm()}
                {itemType === 'alarm' && renderAlarmForm()}

                {/* Save Button */}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                    activeOpacity={0.8}
                >
                    <Text style={styles.saveButtonText}>Değişiklikleri Kaydet</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

/**
 * Edit Item Screen Component
 * Main component with provider wrapper
 */
export function EditItemScreen(props: EditItemScreenProps) {
    return (
        <EditItemProvider>
            <EditItemScreenContent {...props} />
        </EditItemProvider>
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
        paddingBottom: verticalScale(16),
        backgroundColor: theme.colors.background.primary,
    },
    backButton: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(8),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.surface.secondary,
        shadowColor: theme.colors.text.primary,
        shadowOffset: {
            width: 0,
            height: verticalScale(2),
        },
        shadowOpacity: 0.15,
        shadowRadius: moderateScale(4),
        elevation: 3,
    },
    headerTitle: {
        fontSize: moderateScale(20),
        fontWeight: theme.typography.fontWeight.bold,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text.primary,
        letterSpacing: 0.3,
    },
    placeholder: {
        width: moderateScale(40),
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: scale(16),
        paddingBottom: verticalScale(40),
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
    saveButton: {
        backgroundColor: theme.colors.accent.main,
        borderRadius: moderateScale(10),
        paddingVertical: verticalScale(14),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(24),
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

export default EditItemScreen;
