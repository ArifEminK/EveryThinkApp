/**
 * Countdown Hooks
 * Custom hooks for countdown state management
 */

import { useCallback } from 'react';
import { useEditItemContext } from '../context/EditItemContext';
import type { CountdownMode } from '../../types';

/**
 * Hook for managing countdown state
 * Provides countdown state and convenient setter functions
 */
export function useCountdownState() {
    const { state, dispatch, actions } = useEditItemContext();

    // Memoized setter functions
    const setTitle = useCallback(
        (title: string) => dispatch(actions.countdown.setTitle(title)),
        [dispatch, actions.countdown]
    );

    const setDescription = useCallback(
        (description: string) => dispatch(actions.countdown.setDescription(description)),
        [dispatch, actions.countdown]
    );

    const setTargetDate = useCallback(
        (targetDate: Date | null) => dispatch(actions.countdown.setTargetDate(targetDate)),
        [dispatch, actions.countdown]
    );

    const setMode = useCallback(
        (mode: CountdownMode) => dispatch(actions.countdown.setMode(mode)),
        [dispatch, actions.countdown]
    );

    const setField = useCallback(
        (field: keyof typeof state.countdown, value: any) =>
            dispatch(actions.countdown.setField(field, value)),
        [dispatch, actions.countdown, state.countdown]
    );

    const reset = useCallback(
        () => dispatch(actions.countdown.reset()),
        [dispatch, actions.countdown]
    );

    const initialize = useCallback(
        (data: Partial<typeof state.countdown>) => dispatch(actions.countdown.initialize(data)),
        [dispatch, actions.countdown, state.countdown]
    );

    return {
        // State
        ...state.countdown,

        // Setters
        setTitle,
        setDescription,
        setTargetDate,
        setMode,
        setField,

        // Utilities
        reset,
        initialize,
    };
}
