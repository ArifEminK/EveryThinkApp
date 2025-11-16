/**
 * Countdown Type Definitions
 * TypeScript types for countdown/count-up events
 */

export type CountdownMode = 'countup' | 'countdown';

export interface Countdown {
  id: string; // uuid
  userId: string; // uuid - Foreign Key to users
  title: string;
  description: string;
  targetDate: Date; // countdown mode: bitiş tarihi, countup mode: başlangıç tarihi
  mode: CountdownMode;
  createdAt: Date;
}

export interface CreateCountdownInput {
  userId: string;
  title: string;
  description: string;
  targetDate: Date; // countdown mode: bitiş tarihi, countup mode: başlangıç tarihi
  mode: CountdownMode;
}

export interface UpdateCountdownInput {
  title?: string;
  description?: string;
  targetDate?: Date;
  mode?: CountdownMode;
}

// Countdown with user relation (optional)
export interface CountdownWithUser extends Countdown {
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

