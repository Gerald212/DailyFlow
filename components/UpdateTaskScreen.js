import {StyleSheet, Text, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';

const UpdateTaskScreen = ({route, navigation}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);

    const styles = isThemeLight ? stylesLight : stylesDark;

    useEffect(() => {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: isThemeLight ? 'white' : '#161a1f',
          borderBottomColor: isThemeLight ? 'lightgray' : '#1d2024',
          borderBottomWidth: 1,
        },
        headerTintColor: isThemeLight ? 'black' : '#ccc',
      });
    }, [isThemeLight]);

    return(
        <View style={styles.container}>
            <Text style={styles.taskName}>Zaktualizuj zadanie o id:</Text>
            <Text style={[styles.taskName, {fontSize: 24}]}>{route.params.id}</Text>
            <Text style={styles.taskName}>Data</Text>
            <Text style={styles.taskName}>Godziny</Text>
            <Text style={styles.taskName}>itd.</Text>
        </View>
    );
}

const stylesLight = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.95,
      //marginHorizontal: 16,
    },
    taskName: {
      fontSize: 16,
      color: 'black'
    },
});

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232931',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.95,
    //marginHorizontal: 16,
  },
  taskName: {
    fontSize: 16,
    color: '#ccc'
  },
});

export default UpdateTaskScreen;