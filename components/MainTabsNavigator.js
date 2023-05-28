import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect } from "react";
import CalendarScreen from "../screens/CalendarScreen";
import TasksList from "../screens/TasksList";
import Panel from "../screens/Panel";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext } from "../ThemeContext";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, View} from 'react-native';
import PanelHeader from "./PanelHeader";
import * as NavigationBar from 'expo-navigation-bar';
//import { StatusBar } from "react-native";

const Tabs = createBottomTabNavigator();

const MainTabsNavigator = () => {
    const {isThemeLight,setIsThemeLight, getTheme} = useContext(ThemeContext);

    //pobieranie ustawien motywu z AsyncStorage, tylko raz gdy MainTabsNavigator zostaje podmontowany
    useEffect(() => {
        getTheme();
    }, []);


    return (
        <>
            <StatusBar style={isThemeLight ? "auto" : "inverted"}/>
            {/* statusbar z react-native */}
            {/* <StatusBar
                backgroundColor={isThemeLight ? 'white' : '#232931'}
                barStyle={isThemeLight ? 'dark-content' : 'light-content'}
            /> */}
            <Tabs.Navigator
                initialRouteName='TasksList'
                screenOptions={{
                    //headerShown: false,
                    tabBarStyle: {
                        backgroundColor: isThemeLight ? 'white' : '#161a1f',
                        borderTopColor: isThemeLight ? 'lightgray' : '#1d2024',
                  },
                }}
            >
                <Tabs.Screen
                    name="Calendar"
                    component={CalendarScreen}
                    options={{
                        tabBarInactiveTintColor: isThemeLight ? 'gray' : '#3b9c92',
                        tabBarActiveTintColor: isThemeLight ? 'skyblue' : '#4cd4c5',
                        headerShown: false,
                        tabBarLabel: ({color}) => (
                            <Text style={{color: color, fontSize: 14}}>Kalendarz</Text>
                        ),
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="calendar-outline"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="TasksList"
                    component={TasksList}
                    options={{
                        tabBarInactiveTintColor: isThemeLight ? 'gray' : '#3b9c92',
                        tabBarActiveTintColor: isThemeLight ? 'skyblue' : '#4cd4c5',
                        headerShown: false,
                        tabBarLabel: ({color}) => (
                            <Text style={{color: color, fontSize: 14}}>Lista</Text>
                        ),
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="clipboard-outline"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Panel"
                    component={Panel}
                    options={{
                        tabBarInactiveTintColor: isThemeLight ? 'gray' : '#3b9c92',
                        tabBarActiveTintColor: isThemeLight ? 'skyblue' : '#4cd4c5',
                        headerStyle: {
                            backgroundColor: isThemeLight ? 'white' : '#161a1f',
                            borderBottomColor: isThemeLight ? 'lightgray' : '#1d2024',
                            borderBottomWidth: 1,
                        },
                        //headerTitle: () => <PanelHeader/>,
                        headerRight: () => <PanelHeader/>,
                        headerTitle: () => <></>,

                        tabBarLabel: ({color}) => (
                            <Text style={{color: color, fontSize: 14}}>Panel</Text>
                        ),
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="menu-outline"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            </Tabs.Navigator>
        </>
      );
}

export default MainTabsNavigator;