/**
 * Countdown Action Creators
 * Functions to create countdown-related actions
 */

import type { CountdownMode } from '../../types';
import { CountdownActionType, type CountdownAction, type CountdownState } from '../types/countdownState';

/**
 * Countdown Action Creators
 */
export const countdownActions = {
    /**
     * Set a specific field value
     */
    setField: (field: keyof CountdownState, value: any): CountdownAction => ({
        type: CountdownActionType.SET_FIELD,
        field,
        value,
    }),

    /**
     * Set countdown title
     */
    setTitle: (title: string): CountdownAction => ({
        type: CountdownActionType.SET_TITLE,
        payload: title,
    }),

    /**
     * Set countdown description
     */
    setDescription: (description: string): CountdownAction => ({
        type: CountdownActionType.SET_DESCRIPTION,
        payload: description,
    }),

    /**
     * Set countdown target date
     */
    setTargetDate: (targetDate: Date | null): CountdownAction => ({
        type: CountdownActionType.SET_TARGET_DATE,
        payload: targetDate,
    }),

    /**
     * Set countdown mode
     */
    setMode: (mode: CountdownMode): CountdownAction => ({
        type: CountdownActionType.SET_MODE,
        payload: mode,
    }),

    /**
     * Reset countdown state to initial values
     */
    reset: (): CountdownAction => ({
        type: CountdownActionType.RESET,
    }),

    /**
     * Initialize countdown state with data
     */
    initialize: (data: Partial<CountdownState>): CountdownAction => ({
        type: CountdownActionType.INITIALIZE,
        payload: data,
    }),
};
