/**
 * Settings Type Definitions
 * TypeScript types for user settings and preferences
 */

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Settings {
    id: string;                  // uuid
    userId: string;              // uuid - Foreign Key to users (one-to-one)
    theme: ThemeMode;
    language: string;
    notificationEnabled: boolean;
    reminderTime?: string;       // time format (HH:mm)
    createdAt: string;           // ISO string
    updatedAt: string;           // ISO string
}

// Create/Update input types
export type CreateSettingsInput = Omit<Settings, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateSettingsInput = Partial<Omit<Settings, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>;

// Firestore Converter
export const SettingsConverter = {
    toFirestore(settings: Settings): FirebaseFirestoreTypes.DocumentData {
        return settings;
    },
    fromFirestore(snapshot: FirebaseFirestoreTypes.QueryDocumentSnapshot): Settings {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            userId: data.userId,
            theme: data.theme,
            language: data.language,
            notificationEnabled: data.notificationEnabled,
            reminderTime: data.reminderTime,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    },
};
