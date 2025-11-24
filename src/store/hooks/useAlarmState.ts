/**
 * Alarm Hooks
 * Custom hooks for alarm state management
 */

import { useCallback } from 'react';
import { useEditItemContext } from '../context/EditItemContext';

/**
 * Hook for managing alarm state
 * Provides alarm state and convenient setter functions
 */
export function useAlarmState() {
    const { state, dispatch, actions } = useEditItemContext();

    // Memoized setter functions
    const setTitle = useCallback(
        (title: string) => dispatch(actions.alarm.setTitle(title)),
        [dispatch, actions.alarm]
    );

    const setTime = useCallback(
        (time: Date | null) => dispatch(actions.alarm.setTime(time)),
        [dispatch, actions.alarm]
    );

    const setRepeatDays = useCallback(
        (repeatDays: string) => dispatch(actions.alarm.setRepeatDays(repeatDays)),
        [dispatch, actions.alarm]
    );

    const setVibrate = useCallback(
        (vibrate: boolean) => dispatch(actions.alarm.setVibrate(vibrate)),
        [dispatch, actions.alarm]
    );

    const setField = useCallback(
        (field: keyof typeof state.alarm, value: any) =>
            dispatch(actions.alarm.setField(field, value)),
        [dispatch, actions.alarm, state.alarm]
    );

    const reset = useCallback(
        () => dispatch(actions.alarm.reset()),
        [dispatch, actions.alarm]
    );

    const initialize = useCallback(
        (data: Partial<typeof state.alarm>) => dispatch(actions.alarm.initialize(data)),
        [dispatch, actions.alarm, state.alarm]
    );

    return {
        // State
        ...state.alarm,

        // Setters
        setTitle,
        setTime,
        setRepeatDays,
        setVibrate,
        setField,

        // Utilities
        reset,
        initialize,
    };
}
