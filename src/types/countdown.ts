/**
 * Countdown Type Definitions
 * TypeScript types for countdown/count-up events
 */

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type CountdownMode = 'countup' | 'countdown';

export interface Countdown {
    id: string;            // uuid
    userId: string;        // uuid - Foreign Key to users
    title: string;
    description?: string;
    targetDate: string;    // ISO string - countdown mode: bitiş tarihi, countup mode: başlangıç tarihi
    mode: CountdownMode;
    createdAt: string;     // ISO string
}

// Create/Update input types
export type CreateCountdownInput = Omit<Countdown, 'id' | 'createdAt'>;
export type UpdateCountdownInput = Partial<Omit<Countdown, 'id' | 'userId' | 'createdAt'>>;

// Firestore Converter
export const CountdownConverter = {
    toFirestore(countdown: Countdown): FirebaseFirestoreTypes.DocumentData {
        return countdown;
    },
    fromFirestore(snapshot: FirebaseFirestoreTypes.QueryDocumentSnapshot): Countdown {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            userId: data.userId,
            title: data.title,
            description: data.description,
            targetDate: data.targetDate,
            mode: data.mode,
            createdAt: data.createdAt,
        };
    },
};
