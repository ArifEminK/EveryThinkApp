/**
 * Notification Type Definitions
 * TypeScript types for notifications
 */

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type NotificationType = 'task' | 'reminder' | 'countdown' | 'system';

export interface Notification {
  id: string;                  // uuid
  userId: string;              // uuid - Foreign Key to users
  title: string;
  message: string;
  type: NotificationType;
  relatedId?: string | null;   // uuid - Polymorphic relation (taskId, countdownId, etc.)
  read: boolean;
  createdAt: string;           // ISO string
}

// Create/Update input types
export type CreateNotificationInput = Omit<Notification, 'id' | 'createdAt'>;
export type UpdateNotificationInput = Partial<Omit<Notification, 'id' | 'userId' | 'createdAt'>>;

// Notification filter options
export interface NotificationFilterOptions {
  type?: NotificationType;
  read?: boolean;
  search?: string;
}

// Firestore Converter
export const NotificationConverter = {
  toFirestore(notification: Notification): FirebaseFirestoreTypes.DocumentData {
    return notification;
  },
  fromFirestore(snapshot: FirebaseFirestoreTypes.QueryDocumentSnapshot): Notification {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      userId: data.userId,
      title: data.title,
      message: data.message,
      type: data.type,
      relatedId: data.relatedId,
      read: data.read,
      createdAt: data.createdAt,
    };
  },
};
