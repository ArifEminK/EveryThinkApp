/**
 * Database Type Definitions
 * Central type definitions for all database entities
 * Re-exports all entity types for convenience
 */

// Re-export all entity types
export * from './user';
export * from './diary';
export * from './countdown';
export * from './task';
export * from './notification';
export * from './settings';

// Common database types
export type EntityId = string; // uuid
export type Timestamp = Date;

// Pagination types
export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Generic API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

// Database relations
export interface DatabaseRelations {
  user: {
    diaries: import('./diary').Diary[];
    countdowns: import('./countdown').Countdown[];
    tasks: import('./task').Task[];
    notifications: import('./notification').Notification[];
    settings: import('./settings').Settings;
  };
}

