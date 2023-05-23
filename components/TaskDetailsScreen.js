import {StyleSheet, Text, View, StatusBar, ActivityIndicator} from 'react-native';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import { useState } from 'react/cjs/react.development';
import { database } from '../database/database';



const TaskDetails = ({route, navigation}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);
    const styles = isThemeLight ? stylesLight : stylesDark;

    const [isLoading, setIsLoading] = useState(true);
    const [task, setTask] = useState({});

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

    useEffect(() => {
      const loadData = async () => {
        console.log("Pobieram dane taska o id: " + route.params.id);
        //await database.getHabitById(route.params.id, (result)=> console.log(result))    //wypisywanie w konsoli wyniku zapytania
        await database.getHabitById(route.params.id, setTask)
          .then(() => setIsLoading(false))
          .then(() => console.log("Zakończono pobieranie taska"))
      }

      loadData();
    }, [route.params.id]);

    return(
      isLoading ? 
        <View style={styles.container}>
          <ActivityIndicator size={100} color={"#2f7d74"}/>
          <Text>Ładowanie</Text>
        </View>
      :
        <View style={styles.container}>
            <Text style={styles.taskName}>Szczegoly zadania o id: {task.habit_id}</Text>
            <Text style={styles.taskName}>Tytuł: {task.name}</Text>
            <Text style={styles.taskName}>Opis: {task.description}</Text>
            <Text style={styles.taskName}>Kategoria: {task.category_name} ({task.category_id})</Text>
            <Text style={styles.taskName}>Godziny: {task.hours}</Text>
            <Text style={styles.taskName}>Razy: {task.times}</Text>
            <Text style={styles.taskName}>Cel godzinowy: {task.hours_goal}</Text>
            <Text style={styles.taskName}>Cel jednostkowy: {task.times_goal}</Text>
            <Text style={styles.taskName}>Cel dniowy: {task.days_goal}</Text>
            <Text style={styles.taskName}>Status: {task.completed ? "Zakończone" : "W trakcie"}</Text>
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