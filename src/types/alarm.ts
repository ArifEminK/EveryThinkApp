/**
 * Alarm Type Definitions
 * TypeScript types for alarms
 */

export interface Alarm {
  id: number; // Primary key, auto increment
  userId: number; // Foreign Key to users.id
  title: string;
  time: string; // Time format (HH:mm) - alarmın çalacağı saat
  repeatDays: string | null; // Örnek: "1,3,5" -> Pazartesi, Çarşamba, Cuma (haftanın günleri: 0=Pazar, 1=Pazartesi, ..., 6=Cumartesi)
  isEnabled: boolean;
  vibrate: boolean;
  createdAt: Date;
}

export interface CreateAlarmInput {
  userId: number;
  title: string;
  time: string; // Time format (HH:mm)
  repeatDays?: string | null; // Opsiyonel: "1,3,5" gibi gün numaraları (boş ise tek seferlik)
  vibrate?: boolean;
}

export interface UpdateAlarmInput {
  title?: string;
  time?: string;
  repeatDays?: string | null;
  isEnabled?: boolean;
  vibrate?: boolean;
}

// Alarm with user relation (optional)
export interface AlarmWithUser extends Alarm {
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

