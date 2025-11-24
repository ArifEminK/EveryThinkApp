/**
 * Alarm State Types
 * Type definitions for alarm state management
 */

/**
 * Alarm State Interface
 */
export interface AlarmState {
    title: string;
    time: Date | null;
    repeatDays: string;
    vibrate: boolean;
}

/**
 * Alarm Action Types
 */
export enum AlarmActionType {
    SET_FIELD = 'ALARM_SET_FIELD',
    SET_TITLE = 'ALARM_SET_TITLE',
    SET_TIME = 'ALARM_SET_TIME',
    SET_REPEAT_DAYS = 'ALARM_SET_REPEAT_DAYS',
    SET_VIBRATE = 'ALARM_SET_VIBRATE',
    RESET = 'ALARM_RESET',
    INITIALIZE = 'ALARM_INITIALIZE',
}

/**
 * Alarm Actions
 */
export type AlarmAction =
    | { type: AlarmActionType.SET_FIELD; field: keyof AlarmState; value: any }
    | { type: AlarmActionType.SET_TITLE; payload: string }
    | { type: AlarmActionType.SET_TIME; payload: Date | null }
    | { type: AlarmActionType.SET_REPEAT_DAYS; payload: string }
    | { type: AlarmActionType.SET_VIBRATE; payload: boolean }
    | { type: AlarmActionType.RESET }
    | { type: AlarmActionType.INITIALIZE; payload: Partial<AlarmState> };
