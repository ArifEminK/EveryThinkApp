/**
 * Task Type Definitions
 * TypeScript types for tasks and to-do items
 */

export type TaskCategory = 'personal' | 'work' | 'health' | 'study' | 'other';
export type TaskType = 'todo' | 'task';
export type TaskRecurrence = 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Task {
  id: string; // uuid
  userId: string; // uuid - Foreign Key to users
  title: string;
  description: string;
  category: TaskCategory;
  type: TaskType;
  recurrence: TaskRecurrence;
  dueDate: Date | null;
  completed: boolean;
  createdAt: Date;
}

export interface CreateTaskInput {
  userId: string;
  title: string;
  description?: string;
  category?: TaskCategory;
  type?: TaskType;
  recurrence?: TaskRecurrence;
  dueDate?: Date | null;
  completed?: boolean;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  category?: TaskCategory;
  type?: TaskType;
  recurrence?: TaskRecurrence;
  dueDate?: Date | null;
  completed?: boolean;
}

// Task with user relation (optional)
export interface TaskWithUser extends Task {
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

// Task filter options
export interface TaskFilterOptions {
  category?: TaskCategory;
  type?: TaskType;
  completed?: boolean;
  dueDate?: {
    from?: Date;
    to?: Date;
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

