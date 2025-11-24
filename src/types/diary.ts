/**
 * Diary Type Definitions
 * TypeScript types for diary/journal entries
 */

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface Diary {
    id: string;            // uuid
    userId: string;        // uuid - Foreign Key to users
    date: string;          // YYYY-MM-DD
    title: string;
    content: string;
    mood?: string;
    createdAt: string;     // ISO string
}

// Create/Update input types
export type CreateDiaryInput = Omit<Diary, 'id' | 'createdAt'>;
export type UpdateDiaryInput = Partial<Omit<Diary, 'id' | 'userId' | 'createdAt'>>;

// Firestore Converter
export const DiaryConverter = {
    toFirestore(diary: Diary): FirebaseFirestoreTypes.DocumentData {
        return diary;
    },
    fromFirestore(snapshot: FirebaseFirestoreTypes.QueryDocumentSnapshot): Diary {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            userId: data.userId,
            date: data.date,
            title: data.title,
            content: data.content,
            mood: data.mood,
            createdAt: data.createdAt,
        };
    },
};
