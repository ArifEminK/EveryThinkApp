import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import {
  HomeScreen,
  TasksScreen,
  JournalScreen,
  CalendarScreen,
  AddTaskScreen,
} from '../screens';
import {
  BottomNavbar,
  TabType,
  LeftSidebar,
  TopNavbar,
} from '../components/common';
import { theme } from '../theme';

type ScreenType = TabType | 'addTask';

export function AppNavigator() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const mainContentTranslateX = useRef(new Animated.Value(0)).current;

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

  const handleMenuPress = () => {
    setIsSidebarVisible(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarVisible(false);
  };

  // Ana ekranı sağa kaydır (Spotify tarzı)
  useEffect(() => {
    if (isSidebarVisible) {
      // Sidebar açıldığında ana ekranı sağa kaydır
      Animated.timing(mainContentTranslateX, {
        toValue: scale(280),
        duration: 350,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Yumuşak easing curve
        useNativeDriver: true,
      }).start();
    } else {
      // Sidebar kapandığında ana ekranı eski haline getir
      Animated.timing(mainContentTranslateX, {
        toValue: 0,
        duration: 350,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Yumuşak easing curve
        useNativeDriver: true,
      }).start();
    }
  }, [isSidebarVisible, mainContentTranslateX]);

  const renderScreen = () => {
    if (currentScreen === 'addTask') {
      return <AddTaskScreen onGoBack={handleGoBack} />;
    }

    switch (currentScreen) {
      case 'home':
        return (
          <View style={styles.container}>
            <TopNavbar
              onMenuPress={handleMenuPress}
            />
            <HomeScreen />
          </View>
        );
      case 'tasks':
        return (
          <>
            <TopNavbar
              onMenuPress={handleMenuPress}
            />
            <TasksScreen />
          </>
        );
      case 'journal':
        return (
          <>
            <TopNavbar
              onMenuPress={handleMenuPress}
            />
            <JournalScreen />
          </>
        );
      case 'calendar':
        return (
          <>
            <TopNavbar
              onMenuPress={handleMenuPress}
            />
            <CalendarScreen />
          </>
        );
        default:
        return (
          <>
            <TopNavbar
              onMenuPress={handleMenuPress}
            />
            <HomeScreen />
          </>
        );
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.mainContent,
            {
              transform: [{ translateX: mainContentTranslateX }],
            },
          ]}
        >
          {renderScreen()}
          <BottomNavbar
            activeTab={activeTab}
            onTabPress={handleTabPress}
            onAddPress={handleAddPress}
            isAddButtonActive={currentScreen === 'addTask'}
          />
        </Animated.View>
        <LeftSidebar
          visible={isSidebarVisible}
          onClose={handleSidebarClose}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
  },
});

