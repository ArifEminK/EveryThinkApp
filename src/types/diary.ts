/**
 * Diary Type Definitions
 * TypeScript types for diary/journal entries
 */

export interface Diary {
  id: string; // uuid
  userId: string; // uuid - Foreign Key to users
  date: Date;
  title: string;
  content: string;
  mood: string;
  createdAt: Date;
}

export interface CreateDiaryInput {
  userId: string;
  date: Date;
  title: string;
  content: string;
  mood?: string;
}

export interface UpdateDiaryInput {
  date?: Date;
  title?: string;
  content?: string;
  mood?: string;
}

// Diary with user relation (optional)
export interface DiaryWithUser extends Diary {
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

