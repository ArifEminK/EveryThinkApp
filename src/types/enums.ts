/**
 * Enum Constants
 * Reusable enum values for type safety
 */

// Task enums
export const TASK_CATEGORY = {
  PERSONAL: 'personal',
  WORK: 'work',
  HEALTH: 'health',
  STUDY: 'study',
  OTHER: 'other',
} as const;

export const TASK_TYPE = {
  TODO: 'todo',
  TASK: 'task',
} as const;

export const TASK_RECURRENCE = {
  ONCE: 'once',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as const;

// Countdown enums
export const COUNTDOWN_MODE = {
  COUNTUP: 'countup',
  COUNTDOWN: 'countdown',
} as const;

// Notification enums
export const NOTIFICATION_TYPE = {
  TASK: 'task',
  REMINDER: 'reminder',
  COUNTDOWN: 'countdown',
  SYSTEM: 'system',
} as const;

// Settings enums
export const THEME_MODE = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Type exports
export type TaskCategory = typeof TASK_CATEGORY[keyof typeof TASK_CATEGORY];
export type TaskType = typeof TASK_TYPE[keyof typeof TASK_TYPE];
export type TaskRecurrence = typeof TASK_RECURRENCE[keyof typeof TASK_RECURRENCE];
export type CountdownMode = typeof COUNTDOWN_MODE[keyof typeof COUNTDOWN_MODE];
export type NotificationType = typeof NOTIFICATION_TYPE[keyof typeof NOTIFICATION_TYPE];
export type ThemeMode = typeof THEME_MODE[keyof typeof THEME_MODE];

