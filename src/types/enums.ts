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
