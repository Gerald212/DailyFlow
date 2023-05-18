import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import sampleData from './assets/sampleData';
import TasksList from './components/TasksList';
import { ThemeContextProvider } from './ThemeContext';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Calendar from './components/Calendar';
import Panel from './components/Panel';
import MainTabsNavigator from './components/MainTabsNavigator';

const Tabs = createBottomTabNavigator();

export default function App() {
  const [tasks, setTasks] = useState(sampleData);

  // const changeProgress = ({id}) => {
  // }

  //console.log("jakies cos");

  return (
    <ThemeContextProvider>
      {/* tu dodac stack navigator gdzie jednym stackscreenem bedzie maintabs, drugim taskDetailsModal? a trzecim addTaskModal? ???
      https://reactnavigation.org/docs/nesting-navigators#navigating-to-a-screen-in-a-nested-navigator */}
      <MainTabsNavigator/>
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
