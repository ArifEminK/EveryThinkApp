/**
 * Diary Hooks
 * Custom hooks for diary state management
 */

import { useCallback } from 'react';
import { useEditItemContext } from '../context/EditItemContext';

/**
 * Hook for managing diary state
 * Provides diary state and convenient setter functions
 */
export function useDiaryState() {
    const { state, dispatch, actions } = useEditItemContext();

    // Memoized setter functions
    const setTitle = useCallback(
        (title: string) => dispatch(actions.diary.setTitle(title)),
        [dispatch, actions.diary]
    );

    const setContent = useCallback(
        (content: string) => dispatch(actions.diary.setContent(content)),
        [dispatch, actions.diary]
    );

    const setDate = useCallback(
        (date: Date | null) => dispatch(actions.diary.setDate(date)),
        [dispatch, actions.diary]
    );

    const setMood = useCallback(
        (mood: string) => dispatch(actions.diary.setMood(mood)),
        [dispatch, actions.diary]
    );

    const setField = useCallback(
        (field: keyof typeof state.diary, value: any) =>
            dispatch(actions.diary.setField(field, value)),
        [dispatch, actions.diary, state.diary]
    );

    const reset = useCallback(
        () => dispatch(actions.diary.reset()),
        [dispatch, actions.diary]
    );

    const initialize = useCallback(
        (data: Partial<typeof state.diary>) => dispatch(actions.diary.initialize(data)),
        [dispatch, actions.diary, state.diary]
    );

    return {
        // State
        ...state.diary,

        // Setters
        setTitle,
        setContent,
        setDate,
        setMood,
        setField,

        // Utilities
        reset,
        initialize,
    };
}
