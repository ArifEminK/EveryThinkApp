/**
 * Alarm Reducer
 * Handles all alarm-related state updates
 */

import type { AlarmState, AlarmAction } from '../types/alarmState';

/**
 * Initial Alarm State
 */
export const initialAlarmState: AlarmState = {
    title: '',
    time: new Date(),
    repeatDays: '',
    vibrate: true,
};

/**
 * Alarm Reducer Function
 * @param state - Current alarm state
 * @param action - Action to perform
 * @returns Updated alarm state
 */
export function alarmReducer(state: AlarmState, action: AlarmAction): AlarmState {
    switch (action.type) {
        case 'ALARM_SET_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };

        case 'ALARM_SET_TITLE':
            return {
                ...state,
                title: action.payload,
            };

        case 'ALARM_SET_TIME':
            return {
                ...state,
                time: action.payload,
            };

        case 'ALARM_SET_REPEAT_DAYS':
            return {
                ...state,
                repeatDays: action.payload,
            };

        case 'ALARM_SET_VIBRATE':
            return {
                ...state,
                vibrate: action.payload,
            };

        case 'ALARM_RESET':
            return initialAlarmState;

        case 'ALARM_INITIALIZE':
            return {
                ...initialAlarmState,
                ...action.payload,
            };

        default:
            return state;
    }
}
