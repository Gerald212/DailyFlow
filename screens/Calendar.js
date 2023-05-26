import {StyleSheet, Text, View, StatusBar, SafeAreaView, FlatList} from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import { sampleData3 } from '../database/sampleData';
import TaskItem from '../components/TaskItem';
import { database } from '../database/database';
import LoadingScreen from './LoadingScreen';

const Calendar = ({navigation}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);
    const [listDataDay, setListDataDay] = useState([]);
    const [selectedDay, setSelectedDay] = useState('2023-04-03'); //potem domyslna wartosc zmienic na new Date()
    const [isLoading, setIsLoading] = useState(true);

    const styles = isThemeLight ? stylesLight : stylesDark;

    useEffect(() => {
        const loadHabits = async () => {  
          // await database.getHabitsByDay('2023-04-03', (result) => console.log(result))
          await database.getHabitsByDay(selectedDay, setListDataDay)
          .then(setIsLoading(false))
        }

        loadHabits();
    }, [selectedDay]);

    const goToDetails = (id) => {
      navigation.navigate('Details', {id: id});
    }

  const goToUpdate = (id) => {
      navigation.navigate('Update', {id: id});
    }

    return(
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <Text>
            Kalendarz
          </Text>
        </View>
        <SafeAreaView style={styles.daySectionContainer}>
          <Text style={styles.name}>
            {selectedDay}
          </Text>
          {isLoading ?
            <LoadingScreen/>
          :
            <FlatList
              data={listDataDay}
              renderItem={({item}) => <TaskItem item={item} showDetails={goToDetails} updateTask={goToUpdate}/>}
              keyExtractor={item => item.date_id}
              ListEmptyComponent={<Text style={[[styles.name], {alignSelf: 'center', marginTop: 20}]}>Brak wydarzeń tego dnia</Text>}
            />
          }
        </SafeAreaView>
      </View>
    );
}
//
const stylesLight = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'space-evenly',
      //alignItems: 'center',
      paddingTop: StatusBar.currentHeight * 2,
    },
    calendarContainer: {
      flex: 1,
      //backgroundColor: 'red',
    },
    daySectionContainer: {
      flex: 1,
      //backgroundColor: 'blue',
    },
    name: {
      fontSize: 16,
      color: 'black'
    },
});

const stylesDark = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#232931',
      justifyContent: 'space-evenly',
      //alignItems: 'center',
      paddingTop: StatusBar.currentHeight * 2,
      //marginHorizontal: 16,
    },
    calendarContainer: {
      flex: 1,
      //backgroundColor: 'red',
    },
    daySectionContainer: {
      flex: 1,
      //backgroundColor: 'blue',
    },
    name: {
      fontSize: 16,
      color: '#ccc'
    },
});

export default Calendar;