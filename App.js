import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import sampleData from './database/sampleData';
import TasksList from './screens/TasksList';
import { ThemeContextProvider } from './ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Calendar from './screens/Calendar';
import Panel from './screens/Panel';
import MainTabsNavigator from './components/MainTabsNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskDetails from './screens/TaskDetailsScreen';
import UpdateTaskScreen from './screens/UpdateTaskScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import { database } from './database/database';
import DeletionConfirmModal from './screens/DeletionConfirmModal';
import AddCategoryModal from './screens/AddCategoryModal';

const Stack = createNativeStackNavigator();

export default function App() {
  
  //operacje na bazie danych wykonywane po włączeniu aplikacji
  useEffect(() => {
      const createDatabase = async () => {
        // await database.dropTableAsync("habits");       //drop table habits
        // await database.dropTableAsync("categories");   //drop table categories
        // await database.dropTableAsync("dates");

        await database.setupDatabaseAsync();              //stworzenie tabel (jesli ich nie ma)

        // await database.initializeDatabaseAsync();       //inserty przyklaowdych danych
        console.log("Zakończono tworzenie bazy danych");

        //await database.getAllCategories((result)=>{console.log("kategorie: ", result)}) //wypisanie wszytkich kategorii
        //await database.getAllHabits((result)=>{console.log("zwyczaje: ", result)})      //wypisanie wszytkich habitsow
        //await database.getAllDates((result)=>{console.log("daty: ", result)})             //wypisanie wszytkich dat
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
                options={{headerTitle: "Dodaj"}}
              />
              <Stack.Screen
                name="Delete"
                component={DeletionConfirmModal}
                options={{headerShown: false, animation: 'fade'}}
              />
              <Stack.Screen
                name="AddCategory"
                component={AddCategoryModal}
                options={{headerShown: false, animation: 'fade'}}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
    </ThemeContextProvider>
  );
}
