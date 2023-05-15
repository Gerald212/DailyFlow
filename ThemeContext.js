import {createContext,useState} from 'react';

const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {
    const [isThemeLight, setIsThemeLight] = useState(true);

    return (
        <ThemeContext.Provider value={{isThemeLight, setIsThemeLight}}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeContextProvider};