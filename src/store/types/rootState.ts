/**
 * Root State Types
 * Combined state type definitions
 */

import type { TaskState, TaskAction } from './taskState';
import type { CountdownState, CountdownAction } from './countdownState';
import type { DiaryState, DiaryAction } from './diaryState';
import type { AlarmState, AlarmAction } from './alarmState';

/**
 * Root State Interface
 * Combines all module states
 */
export interface RootState {
    task: TaskState;
    countdown: CountdownState;
    diary: DiaryState;
    alarm: AlarmState;
}

/**
 * Root Action Type
 * Union of all module actions
 */
export type RootAction = TaskAction | CountdownAction | DiaryAction | AlarmAction;
