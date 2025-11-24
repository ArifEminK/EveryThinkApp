/**
 * Task Action Creators
 * Functions to create task-related actions
 */

import type { TaskCategory, TaskRecurrence } from '../../types';
import { TaskActionType, type TaskAction, type TaskState } from '../types/taskState';

/**
 * Task Action Creators
 */
export const taskActions = {
    /**
     * Set a specific field value
     */
    setField: (field: keyof TaskState, value: any): TaskAction => ({
        type: TaskActionType.SET_FIELD,
        field,
        value,
    }),

    /**
     * Set task title
     */
    setTitle: (title: string): TaskAction => ({
        type: TaskActionType.SET_TITLE,
        payload: title,
    }),

    /**
     * Set task description
     */
    setDescription: (description: string): TaskAction => ({
        type: TaskActionType.SET_DESCRIPTION,
        payload: description,
    }),

    /**
     * Set task category
     */
    setCategory: (category: TaskCategory): TaskAction => ({
        type: TaskActionType.SET_CATEGORY,
        payload: category,
    }),

    /**
     * Set task recurrence
     */
    setRecurrence: (recurrence: TaskRecurrence): TaskAction => ({
        type: TaskActionType.SET_RECURRENCE,
        payload: recurrence,
    }),

    /**
     * Set task due date
     */
    setDueDate: (dueDate: Date | null): TaskAction => ({
        type: TaskActionType.SET_DUE_DATE,
        payload: dueDate,
    }),

    /**
     * Set no due date flag
     */
    setNoDueDate: (noDueDate: boolean): TaskAction => ({
        type: TaskActionType.SET_NO_DUE_DATE,
        payload: noDueDate,
    }),

    /**
     * Set reminder flag
     */
    setReminder: (reminder: boolean): TaskAction => ({
        type: TaskActionType.SET_REMINDER,
        payload: reminder,
    }),

    /**
     * Reset task state to initial values
     */
    reset: (): TaskAction => ({
        type: TaskActionType.RESET,
    }),

    /**
     * Initialize task state with data
     */
    initialize: (data: Partial<TaskState>): TaskAction => ({
        type: TaskActionType.INITIALIZE,
        payload: data,
    }),
};
