import {StyleSheet, Text, View, StatusBar} from 'react-native';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';

const TaskDetails = ({route, navigation}) => {
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
            <Text style={styles.taskName}>Szczegoly zadania o id:</Text>
            <Text style={[styles.taskName, {fontSize: 24}]}>{route.params.taskId}</Text>
            <Text style={styles.taskName}>Szczegóły Lorem ipsum</Text>
        </View>
    );
}

const stylesLight = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.9,
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
    opacity: 0.9,
    //marginHorizontal: 16,
  },
  taskName: {
    fontSize: 16,
    color: '#ccc'
  },
});

export default TaskDetails;