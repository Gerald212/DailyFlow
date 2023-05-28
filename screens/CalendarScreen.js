import {StyleSheet, Text, View, StatusBar, SafeAreaView, FlatList} from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import { sampleData3 } from '../database/sampleData';
import TaskItem from '../components/TaskItem';
import { database } from '../database/database';
import LoadingScreen from './LoadingScreen';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['pl'] = {
  monthNames: [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień'
  ],
  monthNamesShort: ['St.', 'Lt.', 'Mrc', 'Kw.', 'Mj', 'Cz.', 'Lpc.', 'Srp.', 'Wrz.', 'Pźd.', 'Lis.', 'Grd.'],
  dayNames: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
  dayNamesShort: ['Pn.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sb.', 'Ndz.'],
  today: "Dzisiaj"
};

LocaleConfig.defaultLocale = 'pl';

const CalendarScreen = ({navigation}) => {
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
          <Calendar/>
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

export default CalendarScreen;