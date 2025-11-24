/**
 * Task State Types
 * Type definitions for task state management
 */

import type { TaskCategory, TaskRecurrence } from '../../types';

/**
 * Task State Interface
 */
export interface TaskState {
    title: string;
    description: string;
    category: TaskCategory;
    recurrence: TaskRecurrence;
    dueDate: Date | null;
    noDueDate: boolean;
    reminder: boolean;
}

/**
 * Task Action Types
 */
export enum TaskActionType {
    SET_FIELD = 'TASK_SET_FIELD',
    SET_TITLE = 'TASK_SET_TITLE',
    SET_DESCRIPTION = 'TASK_SET_DESCRIPTION',
    SET_CATEGORY = 'TASK_SET_CATEGORY',
    SET_RECURRENCE = 'TASK_SET_RECURRENCE',
    SET_DUE_DATE = 'TASK_SET_DUE_DATE',
    SET_NO_DUE_DATE = 'TASK_SET_NO_DUE_DATE',
    SET_REMINDER = 'TASK_SET_REMINDER',
    RESET = 'TASK_RESET',
    INITIALIZE = 'TASK_INITIALIZE',
}

/**
 * Task Actions
 */
export type TaskAction =
    | { type: TaskActionType.SET_FIELD; field: keyof TaskState; value: any }
    | { type: TaskActionType.SET_TITLE; payload: string }
    | { type: TaskActionType.SET_DESCRIPTION; payload: string }
    | { type: TaskActionType.SET_CATEGORY; payload: TaskCategory }
    | { type: TaskActionType.SET_RECURRENCE; payload: TaskRecurrence }
    | { type: TaskActionType.SET_DUE_DATE; payload: Date | null }
    | { type: TaskActionType.SET_NO_DUE_DATE; payload: boolean }
    | { type: TaskActionType.SET_REMINDER; payload: boolean }
    | { type: TaskActionType.RESET }
    | { type: TaskActionType.INITIALIZE; payload: Partial<TaskState> };
