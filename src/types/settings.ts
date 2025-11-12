/**
 * Settings Type Definitions
 * TypeScript types for user settings and preferences
 */

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Settings {
  id: string; // uuid
  userId: string; // uuid - Foreign Key to users (one-to-one)
  theme: ThemeMode;
  language: string;
  notificationEnabled: boolean;
  reminderTime: string; // time format (HH:mm)
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSettingsInput {
  userId: string;
  theme?: ThemeMode;
  language?: string;
  notificationEnabled?: boolean;
  reminderTime?: string;
}

export interface UpdateSettingsInput {
  theme?: ThemeMode;
  language?: string;
  notificationEnabled?: boolean;
  reminderTime?: string;
}

// Settings with user relation (optional)
export interface SettingsWithUser extends Settings {
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

