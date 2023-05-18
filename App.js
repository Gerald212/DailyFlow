import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import sampleData from './assets/sampleData';
import TasksList from './components/TasksList';
import { ThemeContextProvider } from './ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Calendar from './components/Calendar';
import Panel from './components/Panel';
import MainTabsNavigator from './components/MainTabsNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskDetails from './components/TaskDetailsScreen';
import UpdateTaskScreen from './components/UpdateTaskScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Nawigatotr z głownymi ekranami*/}
          <Stack.Screen name="Home" component={MainTabsNavigator} options={{headerShown: false}}/>
          {/* Pozostałe ekrany */}
          <Stack.Group screenOptions={{
            presentation: 'transparentModal',
            animation: 'slide_from_bottom',
          }}>
            <Stack.Screen
              name="Details"
              component={TaskDetails}
              options={{headerTitle: "Szczegóły"}}
            />
            <Stack.Screen
              name="Update"
              component={UpdateTaskScreen}
              options={{headerTitle: "Aktualizuj"}}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContextProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
