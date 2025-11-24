import {
    TASK_CATEGORY,
    TASK_RECURRENCE,
    COUNTDOWN_MODE,
} from '../types';



export const taskCategoryOptions = [
    { label: 'Kişisel', value: TASK_CATEGORY.PERSONAL },
    { label: 'İş', value: TASK_CATEGORY.WORK },
    { label: 'Sağlık', value: TASK_CATEGORY.HEALTH },
    { label: 'Eğitim', value: TASK_CATEGORY.STUDY },
    { label: 'Diğer', value: TASK_CATEGORY.OTHER },
];

// Task recurrence options
export const taskRecurrenceOptions = [
    { label: 'Tek Seferlik', value: TASK_RECURRENCE.ONCE },
    { label: 'Günlük', value: TASK_RECURRENCE.DAILY },
    { label: 'Haftalık', value: TASK_RECURRENCE.WEEKLY },
    { label: 'Aylık', value: TASK_RECURRENCE.MONTHLY },
    { label: 'Yıllık', value: TASK_RECURRENCE.YEARLY },
];

// Countdown mode options
export const countdownModeOptions = [
    { label: 'Geri Sayım', value: COUNTDOWN_MODE.COUNTDOWN },
    { label: 'İleri Sayım', value: COUNTDOWN_MODE.COUNTUP },
];

// Diary mood options
export const diaryMoodOptions = [
    { label: 'Çok Mutlu 😄', value: 'very_happy' },
    { label: 'Mutlu 🙂', value: 'happy' },
    { label: 'Normal 😐', value: 'neutral' },
    { label: 'Üzgün 😔', value: 'sad' },
    { label: 'Çok Üzgün 😢', value: 'very_sad' },
    { label: 'Sinirli 😠', value: 'angry' },
    { label: 'Kaygılı 😰', value: 'anxious' },
    { label: 'Huzurlu 😌', value: 'peaceful' },
    { label: 'Enerjik ⚡', value: 'energetic' },
    { label: 'Yorgun 😴', value: 'tired' },
];
