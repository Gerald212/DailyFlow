import { useState, useEffect } from 'react';
import { ThemeContextProvider } from './ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import MainTabsNavigator from './components/MainTabsNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskDetails from './screens/TaskDetailsScreen';
import UpdateTaskScreen from './screens/UpdateTaskScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import { database } from './database/database';
import DeletionConfirmModal from './screens/DeletionConfirmModal';
import AddCategoryModal from './screens/AddCategoryModal';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true
    }}
})

const Stack = createNativeStackNavigator();

export default function App() {
  
  //operacje na bazie danych wykonywane po włączeniu aplikacji
  useEffect(() => {
      const createDatabase = async () => {
        await database.setupDatabaseAsync();              //stworzenie tabel (jesli ich nie ma)
        await database.checkDatabase();                   //inserty przyklaowdych danych jesli potzrebne     
        console.log("Zakończono tworzenie bazy danych");
      }
    
      createDatabase();

      //return await database.closeDatabase();
  }, []);

  //zarejestrowanie kanału powiadomień
  useEffect(() => {
    const registerNotifications = async () => {
        await Notifications.setNotificationChannelAsync('DailyFlowTasksId', {
          name: 'DailyFlow Zadania',
          importance: Notifications.AndroidImportance.MAX,
          lightColor: '#2f7d74',
          enableVibrate: true,
        });
    }
    registerNotifications();

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
