import { ItemType } from '../types/item';

export const mockItems = [
  {
    id: '1',
    type: 'task' as ItemType,
    title: 'Market alışverişi yap',
    subtitle: 'Süt, yumurta, ekmek al',
    date: new Date(),
    completed: true,
  },
  {
    id: '2',
    type: 'alarm' as ItemType,
    title: 'Sabah uyanma alarmı',
    subtitle: '07:00 - Her gün',
    date: new Date(),
  },
  {
    id: '3',
    type: 'countdown' as ItemType,
    title: 'Yılbaşı geri sayımı',
    subtitle: 'Geri sayım modu',
    date: new Date('2025-01-01'),
  },
  {
    id: '4',
    type: 'diary' as ItemType,
    title: 'Bugünkü günlük',
    subtitle: 'Çok mutluyum 😄',
    date: new Date(),
  },
  {
    id: '5',
    type: 'reminder' as ItemType,
    title: 'Doktor randevusu',
    subtitle: 'Yarın saat 14:00',
    date: new Date(new Date().setDate(new Date().getDate() + 1)), // Yarın
  },
  {
    id: '6',
    type: 'task' as ItemType,
    title: 'Proje raporunu tamamla',
    subtitle: 'Acil - Bugün bitirilmeli',
    date: new Date(),
  },
  {
    id: '7',
    type: 'diary' as ItemType,
    title: 'Haftalık özet',
    subtitle: 'Güzel bir hafta geçirdim',
    date: new Date(),
  },
  {
    id: '8',
    type: 'diary' as ItemType,
    title: 'Haftalık özet',
    subtitle: 'Güzel bir hafta geçirdim',
    date: new Date("2025-01-24"),
  },
];
