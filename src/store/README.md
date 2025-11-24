# Edit Item State Management Architecture

## 📋 Overview

This is a **production-ready, scalable state management architecture** built with **useReducer** and **React Context**. It replaces the previous scattered `useState` approach with a modular, type-safe, and maintainable solution.

## 🏗️ Architecture

### Folder Structure

```
src/store/
├── types/              # TypeScript type definitions
│   ├── taskState.ts
│   ├── countdownState.ts
│   ├── diaryState.ts
│   ├── alarmState.ts
│   ├── rootState.ts
│   └── index.ts
├── reducers/           # State reducers
│   ├── taskReducer.ts
│   ├── countdownReducer.ts
│   ├── diaryReducer.ts
│   ├── alarmReducer.ts
│   ├── rootReducer.ts
│   └── index.ts
├── actions/            # Action creators
│   ├── taskActions.ts
│   ├── countdownActions.ts
│   ├── diaryActions.ts
│   ├── alarmActions.ts
│   └── index.ts
├── context/            # React Context & Provider
│   ├── EditItemContext.tsx
│   └── index.ts
├── hooks/              # Custom hooks
│   ├── useTaskState.ts
│   ├── useCountdownState.ts
│   ├── useDiaryState.ts
│   ├── useAlarmState.ts
│   └── index.ts
└── index.ts            # Main export
```

## 🎯 Key Features

### 1. **Modular Design**
- Each module (Task, Countdown, Diary, Alarm) has its own:
  - State type definitions
  - Reducer with initial state
  - Action types and creators
  - Custom hook

### 2. **Type Safety**
- Full TypeScript support
- Strict action types
- Type-safe action creators
- Compile-time error checking

### 3. **Performance Optimized**
- Memoized context values
- Memoized action creators
- Memoized setter functions in hooks
- Prevents unnecessary re-renders

### 4. **Developer Experience**
- Clean, intuitive API
- Auto-completion support
- Easy to test
- Easy to extend

## 📖 Usage Guide

### Basic Usage in a Component

```tsx
import { EditItemProvider, useTaskState } from '../store';

function MyComponent() {
  return (
    <EditItemProvider>
      <TaskForm />
    </EditItemProvider>
  );
}

function TaskForm() {
  const taskState = useTaskState();

  return (
    <InputField
      label="Task Title"
      value={taskState.title}
      onChangeText={taskState.setTitle}
    />
  );
}
```

### Using Multiple Modules

```tsx
function EditItemScreenContent({ itemType }) {
  const taskState = useTaskState();
  const countdownState = useCountdownState();
  const diaryState = useDiaryState();
  const alarmState = useAlarmState();

  // Use the appropriate state based on itemType
  if (itemType === 'task') {
    return <TaskForm state={taskState} />;
  }
  // ... other types
}
```

### Initializing State with Data

```tsx
useEffect(() => {
  if (itemData) {
    taskState.initialize({
      title: itemData.title || '',
      description: itemData.description || '',
      category: itemData.category,
      // ... other fields
    });
  }
}, [itemData]);
```

### Using Individual Setters

```tsx
// Set individual fields
taskState.setTitle('New Title');
taskState.setDescription('New Description');
taskState.setCategory(TASK_CATEGORY.WORK);

// Or use the generic setField
taskState.setField('title', 'New Title');
```

### Resetting State

```tsx
// Reset to initial values
taskState.reset();
```

## 🔧 Available Hooks

### `useTaskState()`

Returns task state and setters:

```tsx
{
  // State
  title: string;
  description: string;
  category: TaskCategory;
  recurrence: TaskRecurrence;
  dueDate: Date | null;
  noDueDate: boolean;
  reminder: boolean;

  // Setters
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setCategory: (category: TaskCategory) => void;
  setRecurrence: (recurrence: TaskRecurrence) => void;
  setDueDate: (dueDate: Date | null) => void;
  setNoDueDate: (noDueDate: boolean) => void;
  setReminder: (reminder: boolean) => void;
  setField: (field: keyof TaskState, value: any) => void;

  // Utilities
  reset: () => void;
  initialize: (data: Partial<TaskState>) => void;
}
```

### `useCountdownState()`

Returns countdown state and setters:

```tsx
{
  // State
  title: string;
  description: string;
  targetDate: Date | null;
  mode: CountdownMode;

  // Setters
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setTargetDate: (targetDate: Date | null) => void;
  setMode: (mode: CountdownMode) => void;
  setField: (field: keyof CountdownState, value: any) => void;

  // Utilities
  reset: () => void;
  initialize: (data: Partial<CountdownState>) => void;
}
```

### `useDiaryState()`

Returns diary state and setters:

```tsx
{
  // State
  title: string;
  content: string;
  date: Date | null;
  mood: string;

  // Setters
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setDate: (date: Date | null) => void;
  setMood: (mood: string) => void;
  setField: (field: keyof DiaryState, value: any) => void;

  // Utilities
  reset: () => void;
  initialize: (data: Partial<DiaryState>) => void;
}
```

### `useAlarmState()`

Returns alarm state and setters:

```tsx
{
  // State
  title: string;
  time: Date | null;
  repeatDays: string;
  vibrate: boolean;

  // Setters
  setTitle: (title: string) => void;
  setTime: (time: Date | null) => void;
  setRepeatDays: (repeatDays: string) => void;
  setVibrate: (vibrate: boolean) => void;
  setField: (field: keyof AlarmState, value: any) => void;

  // Utilities
  reset: () => void;
  initialize: (data: Partial<AlarmState>) => void;
}
```

## 🚀 Advanced Usage

### Direct Dispatch (Advanced)

If you need more control, you can use the context directly:

```tsx
import { useEditItemContext, taskActions } from '../store';

function MyComponent() {
  const { state, dispatch } = useEditItemContext();

  const handleUpdate = () => {
    dispatch(taskActions.setTitle('New Title'));
  };

  return <button onClick={handleUpdate}>Update</button>;
}
```

### Custom Actions

You can extend the action creators:

```tsx
// In taskActions.ts
export const taskActions = {
  // ... existing actions

  // Custom action
  updateMultipleFields: (updates: Partial<TaskState>): TaskAction => ({
    type: TaskActionType.INITIALIZE,
    payload: updates,
  }),
};
```

## 🧪 Testing

### Testing Reducers

```tsx
import { taskReducer, initialTaskState } from '../store';
import { taskActions } from '../store';

describe('taskReducer', () => {
  it('should update title', () => {
    const action = taskActions.setTitle('New Title');
    const newState = taskReducer(initialTaskState, action);
    expect(newState.title).toBe('New Title');
  });
});
```

### Testing Components

```tsx
import { render } from '@testing-library/react-native';
import { EditItemProvider } from '../store';

function renderWithProvider(component) {
  return render(
    <EditItemProvider>
      {component}
    </EditItemProvider>
  );
}

test('renders task form', () => {
  const { getByText } = renderWithProvider(<TaskForm />);
  expect(getByText('Task Title')).toBeTruthy();
});
```

## 📝 Migration Guide

### Before (useState)

```tsx
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [category, setCategory] = useState(TASK_CATEGORY.PERSONAL);

<InputField value={title} onChangeText={setTitle} />
```

### After (useReducer)

```tsx
const taskState = useTaskState();

<InputField value={taskState.title} onChangeText={taskState.setTitle} />
```

## 🎨 Benefits

### Before
- ❌ 20+ useState declarations
- ❌ Scattered state logic
- ❌ Difficult to maintain
- ❌ Potential re-render issues
- ❌ Hard to test

### After
- ✅ Single useReducer per module
- ✅ Centralized state logic
- ✅ Easy to maintain and extend
- ✅ Optimized re-renders
- ✅ Easy to test
- ✅ Type-safe
- ✅ Scalable architecture

## 🔮 Future Enhancements

1. **Middleware Support**: Add logging, analytics, or persistence middleware
2. **DevTools Integration**: Add Redux DevTools support for debugging
3. **Async Actions**: Add support for async operations
4. **State Persistence**: Add local storage persistence
5. **Undo/Redo**: Implement time-travel debugging

## 📚 Additional Resources

- [React useReducer Hook](https://react.dev/reference/react/useReducer)
- [React Context](https://react.dev/reference/react/useContext)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

**Built with ❤️ for scalability and maintainability**
