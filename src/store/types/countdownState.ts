/**
 * Countdown State Types
 * Type definitions for countdown state management
 */

import type { CountdownMode } from '../../types';

/**
 * Countdown State Interface
 */
export interface CountdownState {
    title: string;
    description: string;
    targetDate: Date | null;
    mode: CountdownMode;
}

/**
 * Countdown Action Types
 */
export enum CountdownActionType {
    SET_FIELD = 'COUNTDOWN_SET_FIELD',
    SET_TITLE = 'COUNTDOWN_SET_TITLE',
    SET_DESCRIPTION = 'COUNTDOWN_SET_DESCRIPTION',
    SET_TARGET_DATE = 'COUNTDOWN_SET_TARGET_DATE',
    SET_MODE = 'COUNTDOWN_SET_MODE',
    RESET = 'COUNTDOWN_RESET',
    INITIALIZE = 'COUNTDOWN_INITIALIZE',
}

/**
 * Countdown Actions
 */
export type CountdownAction =
    | { type: CountdownActionType.SET_FIELD; field: keyof CountdownState; value: any }
    | { type: CountdownActionType.SET_TITLE; payload: string }
    | { type: CountdownActionType.SET_DESCRIPTION; payload: string }
    | { type: CountdownActionType.SET_TARGET_DATE; payload: Date | null }
    | { type: CountdownActionType.SET_MODE; payload: CountdownMode }
    | { type: CountdownActionType.RESET }
    | { type: CountdownActionType.INITIALIZE; payload: Partial<CountdownState> };
