/**
 * Diary State Types
 * Type definitions for diary state management
 */

/**
 * Diary State Interface
 */
export interface DiaryState {
    title: string;
    content: string;
    date: Date | null;
    mood: string;
}

/**
 * Diary Action Types
 */
export enum DiaryActionType {
    SET_FIELD = 'DIARY_SET_FIELD',
    SET_TITLE = 'DIARY_SET_TITLE',
    SET_CONTENT = 'DIARY_SET_CONTENT',
    SET_DATE = 'DIARY_SET_DATE',
    SET_MOOD = 'DIARY_SET_MOOD',
    RESET = 'DIARY_RESET',
    INITIALIZE = 'DIARY_INITIALIZE',
}

/**
 * Diary Actions
 */
export type DiaryAction =
    | { type: DiaryActionType.SET_FIELD; field: keyof DiaryState; value: any }
    | { type: DiaryActionType.SET_TITLE; payload: string }
    | { type: DiaryActionType.SET_CONTENT; payload: string }
    | { type: DiaryActionType.SET_DATE; payload: Date | null }
    | { type: DiaryActionType.SET_MOOD; payload: string }
    | { type: DiaryActionType.RESET }
    | { type: DiaryActionType.INITIALIZE; payload: Partial<DiaryState> };
