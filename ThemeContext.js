import {createContext,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar';

const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {
    const [isThemeLight, setIsThemeLight] = useState(false);

    NavigationBar.setBackgroundColorAsync(isThemeLight ? 'white' : '#161a1f');

    const saveTheme = async (isThemeLight) => {
        try {
          await AsyncStorage.setItem("isThemeLight", JSON.stringify(isThemeLight));
          console.log('Zapisany isThemeLight: ' + isThemeLight);
        } catch (error) {
          console.log('Podczas zapisywania motywu: '+ error.message);
        }
    }

    const getTheme = async () => {
        try {
            let value =  await AsyncStorage.getItem("isThemeLight");
            console.log('Wczytany isThemeLight: ' + value);
            //return JSON.parse(value);
            setIsThemeLight(JSON.parse(value));
        } catch (error) {
            console.log('Podczas odczytywania motywu: '+ error.message);
            return false;
        }
    }

    const changeTheme = () => {
        saveTheme(!isThemeLight);
        setIsThemeLight(!isThemeLight);
    }

    //console.log("jakies cos");

    return (
        <ThemeContext.Provider value={{isThemeLight, setIsThemeLight, changeTheme, getTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeContextProvider};