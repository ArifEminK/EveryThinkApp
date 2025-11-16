/**
 * Item Type Definitions
 * General type for all addable items (task, countdown, diary, reminder)
 */

export type ItemType = 'task' | 'alarm' | 'countdown' | 'diary' | 'reminder';

export interface ItemTypeConfig {
  id: ItemType;
  label: string;
  icon: string;
  color: string;
}

export const ITEM_TYPES: ItemTypeConfig[] = [
  {
    id: 'task',
    label: 'Görev',
    icon: 'checkmark-circle',
    color: '#748FFC',
  },
  {
    id: 'alarm',
    label: 'Alarm',
    icon: 'alarm',
    color: '#AB47BC',
  },
  {
    id: 'countdown',
    label: 'Sayaç',
    icon: 'timer',
    color: '#9CCC65',
  },
  {
    id: 'diary',
    label: 'Günlük',
    icon: 'book',
    color: '#FFB74D',
  },
  {
    id: 'reminder',
    label: 'Hatırlatıcı',
    icon: 'notifications',
    color: '#E57373',
  },
];

// Union type for all create inputs
export type CreateItemInput =
  | { type: 'task'; data: import('./task').CreateTaskInput }
  | { type: 'alarm'; data: import('./alarm').CreateAlarmInput }
  | { type: 'countdown'; data: import('./countdown').CreateCountdownInput }
  | { type: 'diary'; data: import('./diary').CreateDiaryInput }
  | { type: 'reminder'; data: import('./notification').CreateNotificationInput };

