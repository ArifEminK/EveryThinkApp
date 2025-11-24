/**
 * ID Generation Utilities
 * Standardized ID generation for all models
 */

/**
 * Generate a unique ID using timestamp and random string
 * This is a simple UUID-like implementation for React Native
 * @returns Unique string ID
 */
export function generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${randomStr}`;
}

/**
 * Generate a task completion log ID
 * Format: ${taskId}_${YYYY-MM-DD}
 * @param taskId - Task ID
 * @param date - Date string in YYYY-MM-DD format
 * @returns Completion log ID
 */
export function generateCompletionLogId(taskId: string, date: string): string {
    return `${taskId}_${date}`;
}
