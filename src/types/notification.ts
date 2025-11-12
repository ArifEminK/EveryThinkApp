/**
 * Notification Type Definitions
 * TypeScript types for notifications
 */

export type NotificationType = 'task' | 'reminder' | 'countdown' | 'system';

export interface Notification {
  id: string; // uuid
  userId: string; // uuid - Foreign Key to users
  title: string;
  message: string;
  type: NotificationType;
  relatedId: string | null; // uuid - Polymorphic relation (taskId, countdownId, etc.)
  read: boolean;
  createdAt: Date;
}

export interface CreateNotificationInput {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  relatedId?: string | null;
  read?: boolean;
}

export interface UpdateNotificationInput {
  title?: string;
  message?: string;
  type?: NotificationType;
  relatedId?: string | null;
  read?: boolean;
}

// Notification with user relation (optional)
export interface NotificationWithUser extends Notification {
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

// Notification filter options
export interface NotificationFilterOptions {
  type?: NotificationType;
  read?: boolean;
  search?: string;
}

