import {StyleSheet, Text, View, StatusBar, SafeAreaView, FlatList} from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import { sampleData3 } from '../database/sampleData';
import TaskItem from '../components/TaskItem';
import { database } from '../database/database';
import LoadingScreen from './LoadingScreen';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import TasksListFooter from '../components/TasksListFooter';

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
  dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
  dayNamesShort: ['Nd.', 'Pn.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sb.'],
  today: "Dzisiaj"
};

LocaleConfig.defaultLocale = 'pl';

const CalendarScreen = ({navigation}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);
    const [listDataDay, setListDataDay] = useState([]);
    const [selectedDay, setSelectedDay] = useState((temp = new Date()) => {return temp.toISOString().split('T')[0]}); //useState('2023-04-03');
    const [markedDays, setMarkedDays] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const styles = isThemeLight ? stylesLight : stylesDark;

    const loadHabits = async () => {  
        setIsLoading(true);
        await database.getHabitsByDay(selectedDay, (result) => console.log(result))
        await database.getHabitsByDay(selectedDay, setListDataDay)
        .then(setIsLoading(false))
    }

    const loadMarkedDates = async () => {

        const setTemp = (temp) => {
          var tempDates = {};
          temp.forEach(element => {
            tempDates[element.date] = { marked: true }  //ewentualnie .split('T')[0]
          });
          setMarkedDays(tempDates);
        }

        console.log("loadMarkedDates");
        await database.getDates(setTemp);
        //await database.getDates((result) => console.log("DATES: ", result));
    }

    useEffect(() => {
      const focusHandler = navigation.addListener('focus', () => {
          loadMarkedDates();
          console.log("markeddyas: ", markedDays);
          //database.getAllDates((result) => console.log(result))
        });
        return focusHandler;
    }, [navigation]);

    useEffect(() => {
        loadHabits();
    }, [selectedDay]);

    const goToDetails = (id) => {
        navigation.navigate('Details', {id: id});
    }

    const goToUpdate = (id, name, type) => {
        navigation.navigate('Update', {id: id, name: name, type: type});
    }

    const goToAddTask = () => {
      navigation.navigate('Add');
  }

    return(
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={day => {
              setSelectedDay(day.dateString);
              console.log(day.dateString);
            }}
            style={styles.calendarStyle}
            theme={styles.calendarTheme}
            key={isThemeLight}
            enableSwipeMonths={true}
            firstDay={1}
            markedDates={{
              ...markedDays,
              [selectedDay]: {selected: true, disableTouchEvent: true},
            }}
          />
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
              //ListEmptyComponent={<Text style={[[styles.name], {alignSelf: 'center', marginTop: 20}]}>Brak wydarzeń tego dnia</Text>}
              refreshing={isLoading}
              onRefresh={() => loadHabits()}
              ListFooterComponent={<TasksListFooter addTask={goToAddTask} tasksExist={true}/>}
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
      paddingTop: StatusBar.currentHeight * 2,
    },
    calendarContainer: {
      flex: 1,
    },
    daySectionContainer: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      color: 'black',
      marginLeft: 15,
      marginTop: 20
    },
    calendarStyle: {
      borderBottomWidth: 1,
      //paddingBottom: 10,
      borderColor: 'lightgray',
    },
    calendarTheme: {
      backgroundColor: '#ffffff',
      calendarBackground: '#ffffff',
      textSectionTitleColor: '#b6c1cd',
      selectedDayBackgroundColor: '#4aabff',
      selectedDayTextColor: 'white',
      todayTextColor: '#4aabff',
      dayTextColor: 'black',
      monthTextColor: 'black',
      arrowColor: '#4aabff',
      dotColor: 'skyblue'
    }
});

const stylesDark = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#232931',
      justifyContent: 'space-evenly',
      paddingTop: StatusBar.currentHeight * 2,
    },
    calendarContainer: {
      flex: 1,
    },
    daySectionContainer: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      color: '#ccc',
      marginLeft: 15,
      marginTop: 20
    },
    calendarStyle: {
      borderBottomWidth: 1,
      //paddingBottom: 10,
      borderColor: 'gray',
      backgroundColor: '#232931',
    },
    calendarTheme: {
      backgroundColor: '#232931',
      calendarBackground: '#393E46',
      textSectionTitleColor: '#777',
      selectedDayBackgroundColor: '#2f7d74',
      selectedDayTextColor: 'white',
      todayTextColor: '#2f7d74',
      dayTextColor: '#ccc',
      textDisabledColor: '#222',
      monthTextColor: '#eee',
      arrowColor: '#2f7d74',
      dotColor: '#4cd4c5'
    }
});

export default CalendarScreen;