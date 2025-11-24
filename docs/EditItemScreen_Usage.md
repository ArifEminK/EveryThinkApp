# EditItemScreen - Kullanım Kılavuzu

## 📝 Genel Bakış

`EditItemScreen` bileşeni, farklı item tiplerini (task, countdown, diary, alarm) düzenlemek için kullanılan bir ekrandır. Item tipine göre uygun formu gösterir ve mevcut verileri otomatik olarak doldurur.

## ✨ Özellikler

- ✅ **Tip Bazlı Form**: Item tipine göre doğru form gösterilir
- ✅ **Otomatik Doldurma**: Mevcut item verileri form alanlarına otomatik doldurulur
- ✅ **Geri Navigasyon**: Sol üstte `<` butonu ve telefon back tuşu ile çıkış
- ✅ **Menü Yok**: BottomNavbar ve LeftSidebar görünmez
- ✅ **Validasyon**: Form alanları için validasyon kontrolleri
- ✅ **Responsive**: Keyboard-aware scroll view

## 🎯 Kullanım

### Temel Kullanım

```tsx
import { EditItemScreen } from './screens/EditItemScreen';

function MyComponent() {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEdit(true);
  };

  const handleSave = (updatedData) => {
    console.log('Updated data:', updatedData);
    // Veritabanına kaydet
  };

  const handleGoBack = () => {
    setShowEdit(false);
  };

  if (showEdit) {
    return (
      <EditItemScreen
        itemType={selectedItem.type}
        itemData={selectedItem}
        onGoBack={handleGoBack}
        onSave={handleSave}
      />
    );
  }

  return (
    // Normal ekran
  );
}
```

### ItemCard ile Entegrasyon

```tsx
import { ItemCard } from './components/common/ItemCard';

function CalendarScreen() {
  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  if (editingItem) {
    return (
      <EditItemScreen
        itemType={editingItem.type}
        itemData={editingItem}
        onGoBack={() => setEditingItem(null)}
        onSave={(data) => {
          // Veritabanına kaydet
          console.log('Saved:', data);
          setEditingItem(null);
        }}
      />
    );
  }

  return (
    <View>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          type={item.type}
          title={item.title}
          subtitle={item.subtitle}
          date={item.date}
          onEdit={() => handleEdit(item)}
          onComplete={() => console.log('Complete')}
          onDelete={() => console.log('Delete')}
        />
      ))}
    </View>
  );
}
```

## 📦 Props

### EditItemScreenProps

| Prop | Tip | Gerekli | Açıklama |
|------|-----|---------|----------|
| `itemType` | `ItemType` | ✅ | Item tipi ('task', 'countdown', 'diary', 'alarm') |
| `itemData` | `any` | ✅ | Düzenlenecek item verisi |
| `onGoBack` | `() => void` | ❌ | Geri butonu callback |
| `onSave` | `(data: any) => void` | ❌ | Kaydet butonu callback |

## 🎨 Item Tipleri ve Veri Formatları

### Task
```typescript
{
  id: string;
  title: string;
  description?: string;
  category: 'personal' | 'work' | 'health' | 'study' | 'other';
  recurrence: 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  dueDate?: string; // ISO string
  reminder?: boolean;
}
```

### Countdown
```typescript
{
  id: string;
  title: string;
  description?: string;
  targetDate: string; // ISO string
  mode: 'countdown' | 'countup';
}
```

### Diary
```typescript
{
  id: string;
  title: string;
  content: string;
  date: string; // YYYY-MM-DD
  mood?: string;
}
```

### Alarm
```typescript
{
  id: string;
  title: string;
  time: string; // HH:mm
  repeatDays?: number[]; // [0,1,2,3,4,5,6]
  vibrate: boolean;
}
```

## 🔄 Veri Akışı

1. **Açılış**: Item verisi props ile gelir
2. **Form Doldurma**: State'ler otomatik doldurulur
3. **Düzenleme**: Kullanıcı form alanlarını değiştirir
4. **Kaydetme**: `onSave` callback çağrılır
5. **Geri Dönüş**: `onGoBack` callback çağrılır

## 🎯 Önemli Notlar

### BottomNavbar ve LeftSidebar Gizleme

EditItemScreen'i gösterirken ana layout'tan ayrı render edin:

```tsx
function App() {
  const [editingItem, setEditingItem] = useState(null);

  if (editingItem) {
    // Sadece EditItemScreen, navbar/sidebar YOK
    return (
      <EditItemScreen
        itemType={editingItem.type}
        itemData={editingItem}
        onGoBack={() => setEditingItem(null)}
        onSave={handleSave}
      />
    );
  }

  // Normal layout (navbar/sidebar ile)
  return (
    <MainLayout>
      <YourScreen />
    </MainLayout>
  );
}
```

### Back Button Handling

Android back button'u handle etmek için:

```tsx
import { BackHandler } from 'react-native';

useEffect(() => {
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    () => {
      if (editingItem) {
        setEditingItem(null);
        return true; // Event handled
      }
      return false;
    }
  );

  return () => backHandler.remove();
}, [editingItem]);
```

## 🎨 Tasarım Özellikleri

- **Header**: Sol üstte `<` butonu, ortada başlık
- **Form**: Item tipine göre dinamik form alanları
- **Save Button**: Alt kısımda "Değişiklikleri Kaydet" butonu
- **Scroll**: Keyboard-aware scroll view
- **Validation**: Form validasyonları ile hata mesajları

## 📱 Ekran Görünümü

```
┌─────────────────────────────┐
│  <  Görevi Düzenle          │ ← Header (back button + title)
├─────────────────────────────┤
│                             │
│  [Form Alanları]            │ ← Item tipine göre form
│  - Başlık                   │
│  - Açıklama                 │
│  - Kategori                 │
│  - ...                      │
│                             │
│  ┌─────────────────────┐   │
│  │ Değişiklikleri Kaydet│   │ ← Save button
│  └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

## 🚀 Sonraki Adımlar

1. **Navigation Entegrasyonu**: React Navigation ile entegre edin
2. **Firestore Bağlantısı**: `onSave` callback'inde Firestore'a kaydedin
3. **Loading States**: Kaydetme sırasında loading gösterin
4. **Error Handling**: Hata durumlarını handle edin
5. **Optimistic Updates**: UI'ı hemen güncelleyin

## 💡 İpuçları

- Item verilerini state management (Context, Redux) ile yönetin
- Form validasyonlarını genişletin
- Unsaved changes uyarısı ekleyin
- Keyboard dismiss için tap outside ekleyin
- Success/error toast mesajları ekleyin

---

**Oluşturulma Tarihi**: 2025-11-21
**Versiyon**: 1.0.0
