/**
 * Firestore Helper Functions
 * Utility functions for Firestore operations
 */

import firestore from '@react-native-firebase/firestore';
import { Task, TaskWithStatus, TaskCompletionLog } from '../types';
import { today, now } from '../utils/date';
import { generateCompletionLogId } from '../utils/id';

/**
 * Mark a task as completed
 * Creates a completion log with the format: ${taskId}_${date}
 * This prevents duplicate logs for the same task on the same day
 * 
 * @param userId - User ID
 * @param taskId - Task ID
 * @param opts - Optional parameters (value, note, date)
 * @returns Promise<void>
 */
export async function markTaskCompleted(
    userId: string,
    taskId: string,
    opts?: { value?: number; note?: string; date?: string }
): Promise<void> {
    const date = opts?.date || today();
    const docId = generateCompletionLogId(taskId, date);

    const logData: TaskCompletionLog = {
        id: docId,
        taskId,
        userId,
        date,
        completedAt: now(),
        value: opts?.value ?? null,
        note: opts?.note ?? null,
    };

    await firestore()
        .collection('users')
        .doc(userId)
        .collection('taskCompletionLogs')
        .doc(docId)
        .set(logData);
}

/**
 * Unmark a task as completed
 * Deletes the completion log for the given task and date
 * 
 * @param userId - User ID
 * @param taskId - Task ID
 * @param date - Date string (YYYY-MM-DD), defaults to today
 * @returns Promise<void>
 */
export async function unmarkTaskCompleted(
    userId: string,
    taskId: string,
    date?: string
): Promise<void> {
    const targetDate = date || today();
    const docId = generateCompletionLogId(taskId, targetDate);

    await firestore()
        .collection('users')
        .doc(userId)
        .collection('taskCompletionLogs')
        .doc(docId)
        .delete();
}

/**
 * Fetch today's completed task IDs
 * Returns a Set of task IDs that have been completed today
 * 
 * @param userId - User ID
 * @param date - Date string (YYYY-MM-DD), defaults to today
 * @returns Promise<Set<string>>
 */
export async function fetchTodayCompletedTaskIds(
    userId: string,
    date?: string
): Promise<Set<string>> {
    const targetDate = date || today();

    const snapshot = await firestore()
        .collection('users')
        .doc(userId)
        .collection('taskCompletionLogs')
        .where('date', '==', targetDate)
        .get();

    return new Set(snapshot.docs.map(doc => doc.data().taskId));
}

/**
 * Get tasks with completion status
 * Fetches all tasks and marks which ones are completed today
 * 
 * @param userId - User ID
 * @param date - Date string (YYYY-MM-DD), defaults to today
 * @returns Promise<TaskWithStatus[]>
 */
export async function getTasksWithStatus(
    userId: string,
    date?: string
): Promise<TaskWithStatus[]> {
    // Fetch all tasks
    const tasksSnapshot = await firestore()
        .collection('users')
        .doc(userId)
        .collection('tasks')
        .get();

    const tasks: Task[] = tasksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    } as Task));

    // Fetch completed task IDs for the given date
    const completedTaskIds = await fetchTodayCompletedTaskIds(userId, date);

    // Combine tasks with completion status
    const tasksWithStatus: TaskWithStatus[] = tasks.map(task => ({
        ...task,
        completedToday: completedTaskIds.has(task.id),
    }));

    return tasksWithStatus;
}

/**
 * Get completion logs for a specific task
 * 
 * @param userId - User ID
 * @param taskId - Task ID
 * @param limit - Maximum number of logs to fetch (optional)
 * @returns Promise<TaskCompletionLog[]>
 */
export async function getTaskCompletionLogs(
    userId: string,
    taskId: string,
    limit?: number
): Promise<TaskCompletionLog[]> {
    let query = firestore()
        .collection('users')
        .doc(userId)
        .collection('taskCompletionLogs')
        .where('taskId', '==', taskId)
        .orderBy('date', 'desc');

    if (limit) {
        query = query.limit(limit);
    }

    const snapshot = await query.get();

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    } as TaskCompletionLog));
}

/**
 * Get completion logs for a date range
 * 
 * @param userId - User ID
 * @param startDate - Start date (YYYY-MM-DD)
 * @param endDate - End date (YYYY-MM-DD)
 * @returns Promise<TaskCompletionLog[]>
 */
export async function getCompletionLogsInRange(
    userId: string,
    startDate: string,
    endDate: string
): Promise<TaskCompletionLog[]> {
    const snapshot = await firestore()
        .collection('users')
        .doc(userId)
        .collection('taskCompletionLogs')
        .where('date', '>=', startDate)
        .where('date', '<=', endDate)
        .orderBy('date', 'desc')
        .get();

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    } as TaskCompletionLog));
}
