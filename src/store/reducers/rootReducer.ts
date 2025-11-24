/**
 * Root Reducer
 * Combines all module reducers into a single root reducer
 */

import type { RootState, RootAction } from '../types/rootState';
import { taskReducer, initialTaskState } from './taskReducer';
import { countdownReducer, initialCountdownState } from './countdownReducer';
import { diaryReducer, initialDiaryState } from './diaryReducer';
import { alarmReducer, initialAlarmState } from './alarmReducer';

/**
 * Initial Root State
 * Combines all module initial states
 */
export const initialRootState: RootState = {
    task: initialTaskState,
    countdown: initialCountdownState,
    diary: initialDiaryState,
    alarm: initialAlarmState,
};

/**
 * Root Reducer Function
 * Delegates actions to appropriate module reducers
 * @param state - Current root state
 * @param action - Action to perform
 * @returns Updated root state
 */
export function rootReducer(state: RootState, action: RootAction): RootState {
    // Check which module the action belongs to based on action type prefix
    const actionType = action.type as string;

    if (actionType.startsWith('TASK_')) {
        return {
            ...state,
            task: taskReducer(state.task, action as any),
        };
    }

    if (actionType.startsWith('COUNTDOWN_')) {
        return {
            ...state,
            countdown: countdownReducer(state.countdown, action as any),
        };
    }

    if (actionType.startsWith('DIARY_')) {
        return {
            ...state,
            diary: diaryReducer(state.diary, action as any),
        };
    }

    if (actionType.startsWith('ALARM_')) {
        return {
            ...state,
            alarm: alarmReducer(state.alarm, action as any),
        };
    }

    // If action doesn't match any module, return state unchanged
    return state;
}
