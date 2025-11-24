/**
 * Alarm Action Creators
 * Functions to create alarm-related actions
 */

import { AlarmActionType, type AlarmAction, type AlarmState } from '../types/alarmState';

/**
 * Alarm Action Creators
 */
export const alarmActions = {
    /**
     * Set a specific field value
     */
    setField: (field: keyof AlarmState, value: any): AlarmAction => ({
        type: AlarmActionType.SET_FIELD,
        field,
        value,
    }),

    /**
     * Set alarm title
     */
    setTitle: (title: string): AlarmAction => ({
        type: AlarmActionType.SET_TITLE,
        payload: title,
    }),

    /**
     * Set alarm time
     */
    setTime: (time: Date | null): AlarmAction => ({
        type: AlarmActionType.SET_TIME,
        payload: time,
    }),

    /**
     * Set alarm repeat days
     */
    setRepeatDays: (repeatDays: string): AlarmAction => ({
        type: AlarmActionType.SET_REPEAT_DAYS,
        payload: repeatDays,
    }),

    /**
     * Set alarm vibrate flag
     */
    setVibrate: (vibrate: boolean): AlarmAction => ({
        type: AlarmActionType.SET_VIBRATE,
        payload: vibrate,
    }),

    /**
     * Reset alarm state to initial values
     */
    reset: (): AlarmAction => ({
        type: AlarmActionType.RESET,
    }),

    /**
     * Initialize alarm state with data
     */
    initialize: (data: Partial<AlarmState>): AlarmAction => ({
        type: AlarmActionType.INITIALIZE,
        payload: data,
    }),
};
