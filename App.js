import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
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
import AddTaskScreen from './components/AddTaskScreen';
import { database } from './database/database';

const Stack = createNativeStackNavigator();

export default function App() {
  
  useEffect(() => {
      const createDatabase = async () => {
        // await database.dropTableAsync("habits");       //drop table habits
        // await database.dropTableAsync("categories");   //drop table categories
        // await database.dropTableAsync("dates");

        await database.setupDatabaseAsync();              //stworzenie tabel (jesli ich nie ma)

        // await database.initializeDatabaseAsync();       //inserty przyklaowdych danych
        console.log("Zakończono tworzenie bazy danych");

        await database.getAllCategories((result)=>{console.log("kategorie: ", result)}) //wypisanie wszytkich kategorii
        await database.getAllHabits((result)=>{console.log("zwyczaje: ", result)})      //wypisanie wszytkich habitsow
        await database.getAllDates((result)=>{console.log("daty: ", result)})             //wypisanie wszytkich dat
      }
    
      createDatabase();

      //return await database.closeDatabase();
  }, []);

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
              <Stack.Screen
                name="Add"
                component={AddTaskScreen}
                options={{
                  headerTitle: "Dodaj",
                  presentation: 'modal',
                  animation: 'slide_from_bottom',
                }}
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
