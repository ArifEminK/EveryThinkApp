import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen, TasksScreen, JournalScreen, CalendarScreen } from '../screens';
import { BottomNavbar, TabType } from '../components/common';

export function AppNavigator() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const handleTabPress = (tab: TabType) => {
    if (tab === 'add') {
      // Add button will open modal later
      console.log('Add button pressed');
      return;
    }
    setActiveTab(tab);
  };

  const handleAddPress = () => {
    // Add button will open modal later
    console.log('Add button pressed');
  };

  const renderScreen = () => {
    switch (activeTab) {
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

