/**
 * Date Utility Functions
 * Helper functions for date formatting and manipulation
 */

/**
 * Format a Date object to YYYY-MM-DD string
 * @param date - Date object to format
 * @returns Formatted date string (YYYY-MM-DD)
 */
export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Get today's date as YYYY-MM-DD string
 * @returns Today's date in YYYY-MM-DD format
 */
export function today(): string {
    return formatDate(new Date());
}

/**
 * Parse YYYY-MM-DD string to Date object
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Date object
 */
export function parseDate(dateString: string): Date {
    return new Date(dateString);
}

/**
 * Get current timestamp as ISO string
 * @returns Current timestamp in ISO format
 */
export function now(): string {
    return new Date().toISOString();
}

/**
 * Format Date to ISO string
 * @param date - Date object
 * @returns ISO string
 */
export function toISOString(date: Date): string {
    return date.toISOString();
}
