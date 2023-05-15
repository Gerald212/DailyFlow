import {StyleSheet, Text, View, StatusBar} from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const Calendar = () => {
  const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);

    return(
        <View style={isThemeLight ? styles.containerLight : styles.containerDark}>
            <Text>KAlendarz czy cos</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerLight: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: StatusBar.currentHeight * 2,
      justifyContent: 'center',
      alignItems: 'center',
      //marginHorizontal: 16,
    },
    containerDark: {
      flex: 1,
      backgroundColor: '#232931',
      paddingTop: StatusBar.currentHeight * 2,
      justifyContent: 'center',
      alignItems: 'center',
      //marginHorizontal: 16,
    },
});

export default Calendar;