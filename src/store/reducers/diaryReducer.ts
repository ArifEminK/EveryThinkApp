/**
 * Diary Reducer
 * Handles all diary-related state updates
 */

import type { DiaryState, DiaryAction } from '../types/diaryState';

/**
 * Initial Diary State
 */
export const initialDiaryState: DiaryState = {
    title: '',
    content: '',
    date: new Date(),
    mood: '',
};

/**
 * Diary Reducer Function
 * @param state - Current diary state
 * @param action - Action to perform
 * @returns Updated diary state
 */
export function diaryReducer(state: DiaryState, action: DiaryAction): DiaryState {
    switch (action.type) {
        case 'DIARY_SET_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };

        case 'DIARY_SET_TITLE':
            return {
                ...state,
                title: action.payload,
            };

        case 'DIARY_SET_CONTENT':
            return {
                ...state,
                content: action.payload,
            };

        case 'DIARY_SET_DATE':
            return {
                ...state,
                date: action.payload,
            };

        case 'DIARY_SET_MOOD':
            return {
                ...state,
                mood: action.payload,
            };

        case 'DIARY_RESET':
            return initialDiaryState;

        case 'DIARY_INITIALIZE':
            return {
                ...initialDiaryState,
                ...action.payload,
            };

        default:
            return state;
    }
}
