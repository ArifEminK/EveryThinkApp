/**
 * Alarm Type Definitions
 * TypeScript types for alarms
 */

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface Alarm {
    id: string;            // uuid
    userId: string;        // uuid - Foreign Key to users
    title: string;
    time: string;          // Time format (HH:mm) - alarmın çalacağı saat
    repeatDays?: number[] | null; // [0,1,2,3,4,5,6] - 0=Sunday, 1=Monday, ..., 6=Saturday
    isEnabled: boolean;
    vibrate: boolean;
    createdAt: string;     // ISO string
}

// Create/Update input types
export type CreateAlarmInput = Omit<Alarm, 'id' | 'createdAt'>;
export type UpdateAlarmInput = Partial<Omit<Alarm, 'id' | 'userId' | 'createdAt'>>;

// Firestore Converter
export const AlarmConverter = {
    toFirestore(alarm: Alarm): FirebaseFirestoreTypes.DocumentData {
        return alarm;
    },
    fromFirestore(snapshot: FirebaseFirestoreTypes.QueryDocumentSnapshot): Alarm {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            userId: data.userId,
            title: data.title,
            time: data.time,
            repeatDays: data.repeatDays,
            isEnabled: data.isEnabled,
            vibrate: data.vibrate,
            createdAt: data.createdAt,
        };
    },
};
