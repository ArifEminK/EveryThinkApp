/**
 * Task Completion Log Type Definitions
 * TypeScript types for task completion tracking
 */

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface TaskCompletionLog {
    id: string;            // docId = `${taskId}_${YYYY-MM-DD}`
    taskId: string;
    userId?: string;       // Firestore path'te olsa da belgenin içinde tutmak iyi olur
    date: string;          // 'YYYY-MM-DD'
    completedAt?: string;  // ISO time
    value?: number | null;
    note?: string | null;
}

// Create/Update input types
export type CreateTaskCompletionLogInput = Omit<TaskCompletionLog, 'id'>;
export type UpdateTaskCompletionLogInput = Partial<Omit<TaskCompletionLog, 'id' | 'taskId' | 'userId' | 'date'>>;

// Firestore Converter
export const TaskCompletionLogConverter = {
    toFirestore(log: TaskCompletionLog): FirebaseFirestoreTypes.DocumentData {
        return log;
    },
    fromFirestore(snapshot: FirebaseFirestoreTypes.QueryDocumentSnapshot): TaskCompletionLog {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            taskId: data.taskId,
            userId: data.userId,
            date: data.date,
            completedAt: data.completedAt,
            value: data.value,
            note: data.note,
        };
    },
};
