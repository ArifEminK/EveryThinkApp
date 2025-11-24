/**
 * Task Hooks
 * Custom hooks for task state management
 */

import { useCallback } from 'react';
import { useEditItemContext } from '../context/EditItemContext';
import type { TaskCategory, TaskRecurrence } from '../../types';

/**
 * Hook for managing task state
 * Provides task state and convenient setter functions
 */
export function useTaskState() {
    const { state, dispatch, actions } = useEditItemContext();

    // Memoized setter functions
    const setTitle = useCallback(
        (title: string) => dispatch(actions.task.setTitle(title)),
        [dispatch, actions.task]
    );

    const setDescription = useCallback(
        (description: string) => dispatch(actions.task.setDescription(description)),
        [dispatch, actions.task]
    );

    const setCategory = useCallback(
        (category: TaskCategory) => dispatch(actions.task.setCategory(category)),
        [dispatch, actions.task]
    );

    const setRecurrence = useCallback(
        (recurrence: TaskRecurrence) => dispatch(actions.task.setRecurrence(recurrence)),
        [dispatch, actions.task]
    );

    const setDueDate = useCallback(
        (dueDate: Date | null) => dispatch(actions.task.setDueDate(dueDate)),
        [dispatch, actions.task]
    );

    const setNoDueDate = useCallback(
        (noDueDate: boolean) => dispatch(actions.task.setNoDueDate(noDueDate)),
        [dispatch, actions.task]
    );

    const setReminder = useCallback(
        (reminder: boolean) => dispatch(actions.task.setReminder(reminder)),
        [dispatch, actions.task]
    );

    const setField = useCallback(
        (field: keyof typeof state.task, value: any) =>
            dispatch(actions.task.setField(field, value)),
        [dispatch, actions.task, state.task]
    );

    const reset = useCallback(
        () => dispatch(actions.task.reset()),
        [dispatch, actions.task]
    );

    const initialize = useCallback(
        (data: Partial<typeof state.task>) => dispatch(actions.task.initialize(data)),
        [dispatch, actions.task, state.task]
    );

    return {
        // State
        ...state.task,

        // Setters
        setTitle,
        setDescription,
        setCategory,
        setRecurrence,
        setDueDate,
        setNoDueDate,
        setReminder,
        setField,

        // Utilities
        reset,
        initialize,
    };
}
