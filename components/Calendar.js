import {StyleSheet, Text, View, StatusBar, SafeAreaView, FlatList} from 'react-native';
import { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { sampleData3 } from '../assets/sampleData';
import TaskItem from './TaskItem';

const Calendar = ({navigation}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);
    const [dayData, setDayData] = useState(sampleData3);

    const styles = isThemeLight ? stylesLight : stylesDark;

    const goToDetails = (id) => {
      //console.log(id);
      navigation.navigate('Details', {taskId: id});
    }

    const goToUpdate = (id) => {
      //console.log(id);
      navigation.navigate('Update', {taskId: id});
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
            Dzisiaj
          </Text>
          <FlatList
            data={dayData}
            renderItem={({item}) => <TaskItem item={item} showDetails={goToDetails} updateTask={goToUpdate}/>}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
    );
}

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