/**
 * Diary Action Creators
 * Functions to create diary-related actions
 */

import { DiaryActionType, type DiaryAction, type DiaryState } from '../types/diaryState';

/**
 * Diary Action Creators
 */
export const diaryActions = {
    /**
     * Set a specific field value
     */
    setField: (field: keyof DiaryState, value: any): DiaryAction => ({
        type: DiaryActionType.SET_FIELD,
        field,
        value,
    }),

    /**
     * Set diary title
     */
    setTitle: (title: string): DiaryAction => ({
        type: DiaryActionType.SET_TITLE,
        payload: title,
    }),

    /**
     * Set diary content
     */
    setContent: (content: string): DiaryAction => ({
        type: DiaryActionType.SET_CONTENT,
        payload: content,
    }),

    /**
     * Set diary date
     */
    setDate: (date: Date | null): DiaryAction => ({
        type: DiaryActionType.SET_DATE,
        payload: date,
    }),

    /**
     * Set diary mood
     */
    setMood: (mood: string): DiaryAction => ({
        type: DiaryActionType.SET_MOOD,
        payload: mood,
    }),

    /**
     * Reset diary state to initial values
     */
    reset: (): DiaryAction => ({
        type: DiaryActionType.RESET,
    }),

    /**
     * Initialize diary state with data
     */
    initialize: (data: Partial<DiaryState>): DiaryAction => ({
        type: DiaryActionType.INITIALIZE,
        payload: data,
    }),
};
