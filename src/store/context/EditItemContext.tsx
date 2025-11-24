/**
 * Edit Item Context
 * Context for managing edit item state across the application
 */

import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react';
import type { RootState, RootAction } from '../types/rootState';
import { rootReducer, initialRootState } from '../reducers/rootReducer';
import { taskActions } from '../actions/taskActions';
import { countdownActions } from '../actions/countdownActions';
import { diaryActions } from '../actions/diaryActions';
import { alarmActions } from '../actions/alarmActions';

/**
 * Context Value Interface
 */
interface EditItemContextValue {
    state: RootState;
    dispatch: React.Dispatch<RootAction>;
    actions: {
        task: typeof taskActions;
        countdown: typeof countdownActions;
        diary: typeof diaryActions;
        alarm: typeof alarmActions;
    };
}

/**
 * Create Context
 */
const EditItemContext = createContext<EditItemContextValue | undefined>(undefined);

/**
 * Provider Props Interface
 */
interface EditItemProviderProps {
    children: React.ReactNode;
    initialState?: Partial<RootState>;
}

/**
 * Edit Item Provider Component
 * Provides state management for edit item screens
 */
export function EditItemProvider({ children, initialState }: EditItemProviderProps) {
    // Initialize state with optional initial values
    const [state, dispatch] = useReducer(
        rootReducer,
        initialState ? { ...initialRootState, ...initialState } : initialRootState
    );

    // Memoize actions to prevent unnecessary re-renders
    const actions = useMemo(
        () => ({
            task: taskActions,
            countdown: countdownActions,
            diary: diaryActions,
            alarm: alarmActions,
        }),
        []
    );

    // Memoize context value
    const contextValue = useMemo(
        () => ({
            state,
            dispatch,
            actions,
        }),
        [state, dispatch, actions]
    );

    return (
        <EditItemContext.Provider value={contextValue}>
            {children}
        </EditItemContext.Provider>
    );
}

/**
 * Hook to use Edit Item Context
 * @throws Error if used outside of EditItemProvider
 */
export function useEditItemContext(): EditItemContextValue {
    const context = useContext(EditItemContext);

    if (!context) {
        throw new Error('useEditItemContext must be used within EditItemProvider');
    }

    return context;
}

/**
 * Hook to get state and dispatch
 */
export function useEditItemState() {
    const { state, dispatch } = useEditItemContext();
    return { state, dispatch };
}

/**
 * Hook to get actions
 */
export function useEditItemActions() {
    const { actions, dispatch } = useEditItemContext();
    return { actions, dispatch };
}
