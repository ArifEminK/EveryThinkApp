/**
 * Task Type Definitions
 * TypeScript types for tasks and to-do items
 */

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type TaskCategory = 'personal' | 'work' | 'health' | 'study' | 'other';
export type TaskRecurrence = 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RecurrenceOptions {
  weeklyDays?: number[]; // 0=Sunday, 1=Monday, ..., 6=Saturday
  monthlyDay?: number;   // 1-31
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: TaskCategory;
  recurrence: TaskRecurrence;
  recurrenceOptions?: RecurrenceOptions;
  dueDate?: string | null;   // ISO string
  createdAt: string;         // ISO string
}

// Create/Update input types
export type CreateTaskInput = Omit<Task, 'id' | 'createdAt'>;
export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>;

// Task with completion status (computed from logs)
export interface TaskWithStatus extends Task {
  completedToday: boolean;
}

// Task filter options
export interface TaskFilterOptions {
  category?: TaskCategory;
  dueDate?: {
    from?: string;
    to?: string;
  };
  search?: string;
}

// Task sort options
export type TaskSortBy = 'createdAt' | 'dueDate' | 'title' | 'category';
export type TaskSortOrder = 'asc' | 'desc';

export interface TaskSortOptions {
  sortBy: TaskSortBy;
  sortOrder: TaskSortOrder;
}

// Firestore Converter
export const TaskConverter = {
  toFirestore(task: Task): FirebaseFirestoreTypes.DocumentData {
    return task;
  },
  fromFirestore(snapshot: FirebaseFirestoreTypes.QueryDocumentSnapshot): Task {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      userId: data.userId,
      title: data.title,
      description: data.description,
      category: data.category,
      recurrence: data.recurrence,
      recurrenceOptions: data.recurrenceOptions,
      dueDate: data.dueDate,
      createdAt: data.createdAt,
    };
  },
};
