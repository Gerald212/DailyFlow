import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import Calendar from "./Calendar";
import TasksList from "./TasksList";
import Panel from "./Panel";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext } from "../ThemeContext";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, StatusBar} from 'react-native';

const Tabs = createBottomTabNavigator();

const MainTabsNavigator = () => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);

    return (
        <NavigationContainer>
            <Tabs.Navigator
                initialRouteName='TasksList'
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: isThemeLight ? 'white' : '#161a1f',
                        borderTopColor: isThemeLight ? 'lightgray' : '#1d2024',
                    },
                }}
            >
                <Tabs.Screen
                    name="Calendar"
                    component={Calendar}
                    options={{
                        tabBarInactiveTintColor: isThemeLight ? 'gray' : '#3b9c92',
                        tabBarActiveTintColor: isThemeLight ? 'skyblue' : '#4cd4c5',
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
        </NavigationContainer>
      );
}

export default MainTabsNavigator;