/**
 * Example Usage of Edit Item State Management
 * This file demonstrates various usage patterns
 */

import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import {
    EditItemProvider,
    useTaskState,
    useCountdownState,
    useDiaryState,
    useAlarmState,
    useEditItemContext,
    taskActions,
} from '../store';
import { TASK_CATEGORY, TASK_RECURRENCE } from '../types';

/**
 * Example 1: Basic Task Form
 */
export function BasicTaskFormExample() {
    const taskState = useTaskState();

    return (
        <View>
            <Text>Title: {taskState.title}</Text>
            <Button
                title="Set Title"
                onPress={() => taskState.setTitle('My New Task')}
            />
            <Button
                title="Set Category to Work"
                onPress={() => taskState.setCategory(TASK_CATEGORY.WORK)}
            />
            <Button title="Reset" onPress={taskState.reset} />
        </View>
    );
}

/**
 * Example 2: Initialize with Data
 */
export function InitializeTaskExample({ taskData }: { taskData: any }) {
    const taskState = useTaskState();

    useEffect(() => {
        if (taskData) {
            taskState.initialize({
                title: taskData.title || '',
                description: taskData.description || '',
                category: taskData.category || TASK_CATEGORY.PERSONAL,
                recurrence: taskData.recurrence || TASK_RECURRENCE.ONCE,
                dueDate: taskData.dueDate ? new Date(taskData.dueDate) : new Date(),
                noDueDate: !taskData.dueDate,
                reminder: taskData.reminder || false,
            });
        }
    }, [taskData]);

    return (
        <View>
            <Text>Title: {taskState.title}</Text>
            <Text>Description: {taskState.description}</Text>
            <Text>Category: {taskState.category}</Text>
        </View>
    );
}

/**
 * Example 3: Using Multiple Modules
 */
export function MultiModuleExample() {
    const taskState = useTaskState();
    const countdownState = useCountdownState();
    const diaryState = useDiaryState();
    const alarmState = useAlarmState();

    return (
        <View>
            <Text>Task: {taskState.title}</Text>
            <Text>Countdown: {countdownState.title}</Text>
            <Text>Diary: {diaryState.title}</Text>
            <Text>Alarm: {alarmState.title}</Text>
        </View>
    );
}

/**
 * Example 4: Using setField for Dynamic Updates
 */
export function DynamicFieldUpdateExample() {
    const taskState = useTaskState();

    const updateField = (fieldName: string, value: any) => {
        // Type-safe field updates
        if (fieldName === 'title') {
            taskState.setField('title', value);
        } else if (fieldName === 'description') {
            taskState.setField('description', value);
        }
        // ... etc
    };

    return (
        <View>
            <Button
                title="Update Title"
                onPress={() => updateField('title', 'Dynamic Title')}
            />
            <Button
                title="Update Description"
                onPress={() => updateField('description', 'Dynamic Description')}
            />
        </View>
    );
}

/**
 * Example 5: Advanced - Direct Dispatch
 */
export function AdvancedDispatchExample() {
    const { state, dispatch, actions } = useEditItemContext();

    const handleBatchUpdate = () => {
        // Dispatch multiple actions
        dispatch(actions.task.setTitle('Batch Title'));
        dispatch(actions.task.setDescription('Batch Description'));
        dispatch(actions.task.setCategory(TASK_CATEGORY.WORK));
    };

    const handleInitialize = () => {
        // Initialize with custom data
        dispatch(
            actions.task.initialize({
                title: 'Initialized Task',
                description: 'This was initialized',
                category: TASK_CATEGORY.PERSONAL,
                recurrence: TASK_RECURRENCE.DAILY,
                dueDate: new Date(),
                noDueDate: false,
                reminder: true,
            })
        );
    };

    return (
        <View>
            <Text>Task Title: {state.task.title}</Text>
            <Button title="Batch Update" onPress={handleBatchUpdate} />
            <Button title="Initialize" onPress={handleInitialize} />
        </View>
    );
}

/**
 * Example 6: Form Validation
 */
export function FormValidationExample() {
    const taskState = useTaskState();

    const validateAndSave = () => {
        // Validation
        if (!taskState.title.trim()) {
            alert('Title is required');
            return;
        }

        if (taskState.title.length < 3) {
            alert('Title must be at least 3 characters');
            return;
        }

        // Save logic
        const taskData = {
            title: taskState.title.trim(),
            description: taskState.description.trim(),
            category: taskState.category,
            recurrence: taskState.recurrence,
            dueDate: taskState.noDueDate ? null : taskState.dueDate?.toISOString(),
            reminder: taskState.reminder,
        };

        console.log('Saving task:', taskData);
        // Call API or database save function
    };

    return (
        <View>
            <Button title="Validate and Save" onPress={validateAndSave} />
        </View>
    );
}

/**
 * Example 7: Conditional Rendering Based on State
 */
export function ConditionalRenderingExample() {
    const taskState = useTaskState();

    return (
        <View>
            {taskState.noDueDate ? (
                <Text>No due date set</Text>
            ) : (
                <Text>Due: {taskState.dueDate?.toLocaleDateString()}</Text>
            )}

            {taskState.reminder && <Text>🔔 Reminder enabled</Text>}

            {taskState.category === TASK_CATEGORY.WORK && (
                <Text>💼 Work Task</Text>
            )}
        </View>
    );
}

/**
 * Example 8: Complete Form Component
 */
export function CompleteTaskFormExample() {
    const taskState = useTaskState();

    const handleSave = () => {
        if (!taskState.title.trim()) {
            alert('Please enter a title');
            return;
        }

        const data = {
            title: taskState.title.trim(),
            description: taskState.description.trim() || undefined,
            category: taskState.category,
            recurrence: taskState.recurrence,
            dueDate: taskState.noDueDate ? null : taskState.dueDate?.toISOString(),
            reminder: taskState.reminder,
        };

        console.log('Saving:', data);
        taskState.reset(); // Reset form after save
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Task Title:</Text>
            <Text>{taskState.title || 'Not set'}</Text>
            <Button
                title="Set Title"
                onPress={() => taskState.setTitle('My Task')}
            />

            <Text style={{ marginTop: 10 }}>Description:</Text>
            <Text>{taskState.description || 'Not set'}</Text>
            <Button
                title="Set Description"
                onPress={() => taskState.setDescription('Task description')}
            />

            <Text style={{ marginTop: 10 }}>Category: {taskState.category}</Text>
            <Button
                title="Set Work Category"
                onPress={() => taskState.setCategory(TASK_CATEGORY.WORK)}
            />

            <Text style={{ marginTop: 10 }}>
                No Due Date: {taskState.noDueDate ? 'Yes' : 'No'}
            </Text>
            <Button
                title="Toggle No Due Date"
                onPress={() => taskState.setNoDueDate(!taskState.noDueDate)}
            />

            <View style={{ marginTop: 20 }}>
                <Button title="Save Task" onPress={handleSave} />
                <Button title="Reset Form" onPress={taskState.reset} />
            </View>
        </View>
    );
}

/**
 * Example 9: Wrapper Component with Provider
 */
export function TaskFormWithProvider() {
    return (
        <EditItemProvider>
            <CompleteTaskFormExample />
        </EditItemProvider>
    );
}

/**
 * Example 10: Multiple Forms in Same Provider
 */
export function MultipleFormsExample() {
    return (
        <EditItemProvider>
            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Task Form</Text>
                <BasicTaskFormExample />

                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
                    All Modules
                </Text>
                <MultiModuleExample />
            </View>
        </EditItemProvider>
    );
}

/**
 * Example 11: Countdown State Usage
 */
export function CountdownFormExample() {
    const countdownState = useCountdownState();

    return (
        <View>
            <Text>Countdown Title: {countdownState.title}</Text>
            <Button
                title="Set Title"
                onPress={() => countdownState.setTitle('New Year Countdown')}
            />

            <Text>Target Date: {countdownState.targetDate?.toLocaleDateString()}</Text>
            <Button
                title="Set Target Date"
                onPress={() => countdownState.setTargetDate(new Date('2025-01-01'))}
            />

            <Button title="Reset" onPress={countdownState.reset} />
        </View>
    );
}

/**
 * Example 12: Diary State Usage
 */
export function DiaryFormExample() {
    const diaryState = useDiaryState();

    return (
        <View>
            <Text>Diary Title: {diaryState.title}</Text>
            <Button
                title="Set Title"
                onPress={() => diaryState.setTitle('Today was amazing')}
            />

            <Text>Content: {diaryState.content}</Text>
            <Button
                title="Set Content"
                onPress={() =>
                    diaryState.setContent('I had a wonderful day today...')
                }
            />

            <Text>Mood: {diaryState.mood || 'Not set'}</Text>
            <Button title="Set Happy Mood" onPress={() => diaryState.setMood('😊')} />

            <Button title="Reset" onPress={diaryState.reset} />
        </View>
    );
}

/**
 * Example 13: Alarm State Usage
 */
export function AlarmFormExample() {
    const alarmState = useAlarmState();

    return (
        <View>
            <Text>Alarm Title: {alarmState.title}</Text>
            <Button
                title="Set Title"
                onPress={() => alarmState.setTitle('Morning Alarm')}
            />

            <Text>Time: {alarmState.time?.toLocaleTimeString()}</Text>
            <Button
                title="Set Time to 7:00 AM"
                onPress={() => {
                    const time = new Date();
                    time.setHours(7, 0, 0, 0);
                    alarmState.setTime(time);
                }}
            />

            <Text>Vibrate: {alarmState.vibrate ? 'Yes' : 'No'}</Text>
            <Button
                title="Toggle Vibrate"
                onPress={() => alarmState.setVibrate(!alarmState.vibrate)}
            />

            <Button title="Reset" onPress={alarmState.reset} />
        </View>
    );
}
