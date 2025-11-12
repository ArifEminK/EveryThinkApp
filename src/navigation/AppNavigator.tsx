import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  HomeScreen,
  TasksScreen,
  JournalScreen,
  CalendarScreen,
  AddTaskScreen,
} from '../screens';
import { BottomNavbar, TabType } from '../components/common';

type ScreenType = TabType | 'addTask';

export function AppNavigator() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');

  const handleTabPress = (tab: TabType) => {
    if (tab === 'add') {
      // Add button handled by handleAddPress
      return;
    }
    setActiveTab(tab);
    setCurrentScreen(tab);
  };

  const handleAddPress = () => {
    setCurrentScreen('addTask');
  };

  const handleGoBack = () => {
    // Return to the last active tab
    setCurrentScreen(activeTab);
  };

  const renderScreen = () => {
    if (currentScreen === 'addTask') {
      return <AddTaskScreen onGoBack={handleGoBack} />;
    }

    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'tasks':
        return <TasksScreen />;
      case 'journal':
        return <JournalScreen />;
      case 'calendar':
        return <CalendarScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {renderScreen()}
        <BottomNavbar
          activeTab={activeTab}
          onTabPress={handleTabPress}
          onAddPress={handleAddPress}
          isAddButtonActive={currentScreen === 'addTask'}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

