/**
 * Task Reducer
 * Handles all task-related state updates
 */

import { TASK_CATEGORY, TASK_RECURRENCE } from '../../types';
import type { TaskState, TaskAction, TaskActionType } from '../types/taskState';

/**
 * Initial Task State
 */
export const initialTaskState: TaskState = {
    title: '',
    description: '',
    category: TASK_CATEGORY.PERSONAL,
    recurrence: TASK_RECURRENCE.ONCE,
    dueDate: new Date(),
    noDueDate: false,
    reminder: false,
};

/**
 * Task Reducer Function
 * @param state - Current task state
 * @param action - Action to perform
 * @returns Updated task state
 */
export function taskReducer(state: TaskState, action: TaskAction): TaskState {
    switch (action.type) {
        case 'TASK_SET_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };

        case 'TASK_SET_TITLE':
            return {
                ...state,
                title: action.payload,
            };

        case 'TASK_SET_DESCRIPTION':
            return {
                ...state,
                description: action.payload,
            };

        case 'TASK_SET_CATEGORY':
            return {
                ...state,
                category: action.payload,
            };

        case 'TASK_SET_RECURRENCE':
            return {
                ...state,
                recurrence: action.payload,
            };

        case 'TASK_SET_DUE_DATE':
            return {
                ...state,
                dueDate: action.payload,
            };

        case 'TASK_SET_NO_DUE_DATE':
            return {
                ...state,
                noDueDate: action.payload,
                dueDate: action.payload ? null : state.dueDate || new Date(),
            };

        case 'TASK_SET_REMINDER':
            return {
                ...state,
                reminder: action.payload,
            };

        case 'TASK_RESET':
            return initialTaskState;

        case 'TASK_INITIALIZE':
            return {
                ...initialTaskState,
                ...action.payload,
            };

        default:
            return state;
    }
}
