import {Text, View, StatusBar, StyleSheet, Button} from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const Panel = () => {
  const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);

    return(
        <View style={isThemeLight ? styles.containerLight : styles.containerDark}>
            <Text style={isThemeLight ? styles.text : styles.textDark}>Pozostałe</Text>
            <Button title='Zmiana Motywu' onPress={() => setIsThemeLight(!isThemeLight)}/>
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
    text: {
        fontSize: 16,
    },
    textDark: {
        fontSize: 16,
        color: '#3b9c92',
    },
});

export default Panel;