/**
 * Countdown Reducer
 * Handles all countdown-related state updates
 */

import { COUNTDOWN_MODE } from '../../types';
import type { CountdownState, CountdownAction } from '../types/countdownState';

/**
 * Initial Countdown State
 */
export const initialCountdownState: CountdownState = {
    title: '',
    description: '',
    targetDate: new Date(),
    mode: COUNTDOWN_MODE.COUNTDOWN,
};

/**
 * Countdown Reducer Function
 * @param state - Current countdown state
 * @param action - Action to perform
 * @returns Updated countdown state
 */
export function countdownReducer(state: CountdownState, action: CountdownAction): CountdownState {
    switch (action.type) {
        case 'COUNTDOWN_SET_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };

        case 'COUNTDOWN_SET_TITLE':
            return {
                ...state,
                title: action.payload,
            };

        case 'COUNTDOWN_SET_DESCRIPTION':
            return {
                ...state,
                description: action.payload,
            };

        case 'COUNTDOWN_SET_TARGET_DATE':
            return {
                ...state,
                targetDate: action.payload,
            };

        case 'COUNTDOWN_SET_MODE':
            return {
                ...state,
                mode: action.payload,
            };

        case 'COUNTDOWN_RESET':
            return initialCountdownState;

        case 'COUNTDOWN_INITIALIZE':
            return {
                ...initialCountdownState,
                ...action.payload,
            };

        default:
            return state;
    }
}
