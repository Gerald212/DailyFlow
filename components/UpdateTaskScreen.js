import {StyleSheet, Text, View, StatusBar} from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const UpdateTaskScreen = ({route, navigation}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);

    let styles = isThemeLight ? stylesLight : stylesDark;

    return(
        <View style={styles.container}>
            <Text style={styles.taskName}>Zaktualizuj zadanie o id:</Text>
            <Text style={[styles.taskName, {fontSize: 24}]}>{route.params.taskId}</Text>
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
      opacity: 0.8,
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
    opacity: 0.8,
    //marginHorizontal: 16,
  },
  taskName: {
    fontSize: 16,
    color: '#ccc'
  },
});

export default UpdateTaskScreen;