import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { database } from '../database/database';
import LoadingScreen from './LoadingScreen';
import * as Progress from 'react-native-progress';
import PanelStatItem from '../components/PanelStatItem';
import TaskDetailsHeader from '../components/TaskDetailsHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const TaskDetails = ({route, navigation}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);
    const styles = isThemeLight ? stylesLight : stylesDark;
    const [isLoading, setIsLoading] = useState(true);

    const [item, setItem] = useState({});
    const [days, setDays] = useState([]);
    const [progressDescription, setProgressDescription] = useState();
    const [progressValue, setProgressValue] = useState();

    //ustawianie stylu nagłowka
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
      navigation.setOptions({
        headerRight: () => <TaskDetailsHeader goToUpdate={goToUpdate} goToDelete={goToDelete}/>,
      });
    }, [item])

    //pobieranie danych o zadaniu
    useEffect(() => {
      const loadData = async () => {
        console.log("Pobieram dane taska o id: " + route.params.id);
        await database.getHabitById(route.params.id, (result)=> console.log(result))    //wypisywanie w konsoli wyniku zapytania
        await database.getHabitById(route.params.id, setItem)
        await database.getDatesByHabit(route.params.id, (result)=> console.log("daty: ", result))
        await database.getDatesByHabit(route.params.id, setDays)
        .then(() => setIsLoading(false))
        .finally(() => console.log("Zakończono pobieranie taska"))
      }

      loadData();

      //return setDays([]);
    }, [route.params.id]);

    useEffect(() => {
      const calculateProgress = () => {
        setIsLoading(true);
        var tempValue, tempDescription;
        
        if(item.hours_goal){
          tempDescription = item.hours + '/' + item.hours_goal + ' godzin';
          tempValue = item.hours / item.hours_goal;
        }else if(item.days_goal){
          tempDescription = days.length + '/' + item.days_goal + ' dni';
          tempValue = days.length / item.days_goal;
        }else if(item.times_goal){
          tempDescription = item.times + '/' + item.times_goal + ' razy';
          tempValue = item.times / item.times_goal;
        }else{
          tempDescription = item.hours + ' godzin';
          tempValue = item.hours;
        }
        // console.log(tempDescription);
        // console.log(tempValue);
        setProgressDescription(tempDescription);
        setProgressValue(tempValue);
        setIsLoading(false);
      }

      calculateProgress();
    }, [item, days]);

    const goToUpdate = () => {
      //console.log(item.habit_id);
      navigation.navigate('Update', {id: item.habit_id, name: item.name, type: item.type});
    }

    const goToDelete = () => {
      console.log(item.habit_id + ' ' + item.name);
      //console.log(item);
      navigation.navigate('Delete', {type: 'habit', id: item.habit_id, name: item.name});
    }

    return(
      isLoading ? 
        <LoadingScreen/>
      :
        <SafeAreaView style={styles.container}>
          <ScrollView>
              <View style={[styles.containerBorder, {alignItems: 'center', marginTop: 0}]}>
                  <View style={{alignSelf: 'flex-start', flexDirection: 'row'}}>
                      <Text style={styles.text}>{item.type == 0 ? 'Nawyk ' : 'Zadanie '}</Text>
                      <MaterialCommunityIcons
                          name={item.type == 0 ? "calendar-refresh-outline" : "calendar-check-outline"}
                          color={isThemeLight ? 'black' : '#ccc'}
                          size={24}
                          //style={{marginLeft: 2}}
                      />
                  </View>
                  
                  <Text style={styles.taskName}>{item.name}</Text>
                  <Text style={styles.text}>{item.category_name}</Text>
              </View>
              <View style={[styles.containerBorder, {justifyContent: 'center', alignItems: 'center', marginTop: 0}]}>
                <Progress.Circle
                    size={150}
                    color={isThemeLight ? '#4aabff' : '#2f7d74'}
                    thickness={8}
                    borderWidth={progressValue ? 0 : 1}
                    progress={progressValue}
                    textStyle={{alignSelf:'center', fontSize: 36, fontWeight: 'bold'}} 
                    showsText={true}
                    //ewentualnie pozbyć się tego formatText
                    formatText={item.times_goal || item.hours_goal || item.days_goal 
                      ? 
                          (progress) => Math.round(progress * 100)+"%" 
                      : 
                          item.type == 0 
                          ? 
                              () => item.hours
                          :
                              // () => 'W trakcie'
                              () => <MaterialCommunityIcons 
                                      name={item.completed == 0 ? "clock-end" : "check"}
                                      size={72} 
                                      color={isThemeLight ? '#4aabff' : '#2f7d74'}
                                    />
                    }
                />
                {item.type == 0 
                ?
                    <Text style={[styles.text, {marginTop: 10}]}>Postęp: {progressDescription}</Text>
                :
                    <View style={{marginTop: 10}}></View>
                }
                <Text style={styles.text}>Status: {item.completed ? "Zakończone" : "W trakcie"}</Text>
                {item.completed == 1 
                ?
                  <Ionicons
                      name="medal-outline"
                      color={'gold'}
                      size={72}
                  />
                :
                  <></>
                }
              </View>
              <View style={[styles.containerBorder, {paddingVertical: 20}]}>
                  <Text style={styles.text}>Opis</Text>
                  <Text style={styles.text}>{item.description}</Text>
              </View>
              {item.type == 0
              ?
                  <View style={[styles.containerBorder, {flex: 1, marginTop: 0}]}>
                    <PanelStatItem value={1} content={item.hours} title={"Liczba godzin:"} leftSide={true} size={80}/>
                    <PanelStatItem value={1} content={item.times} title={"Razy:"} leftSide={true} size={80}/>
                    <PanelStatItem value={1} content={days.length} title={"Liczba dni:"} leftSide={true} size={80}/>
                  </View>
              :
                <View style={{alignItems: 'center'}}>
                    {days[0] ? <Text style={styles.dateText}>Termin {days[0].date.split(':')[0] + ':' + days[0].date.split(':')[1]}</Text> : <></>}
                </View>
              }
              {/* <Text>KALENDARZ(HEATMAP Z CHARTS.KIT)</Text>
              <Text>I POTENCJALNIE JAKIES INNE WYKRESY</Text> */}
            </ScrollView>
        </SafeAreaView>
    );
}

const stylesLight = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //justifyContent: 'center',
      //alignItems: 'center',
      padding: 20,
      opacity: 0.95,
      //marginHorizontal: 16,
    },
    containerBorder: {
      paddingVertical: 10,
      marginVertical: 20,
      borderColor: 'lightgray', 
      borderBottomWidth: 1, 
      //borderRightWidth: 1, 
      //borderBottomRightRadius: 20,
      justifyContent: 'center'
    },
    taskName: {
      fontSize: 36,
      color: 'black'
    },
    text: {
      fontSize: 18,
      color: 'black'
    },
    dateText: {
      fontSize: 18,
      color: 'black'
    }
});

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232931',
    // justifyContent: 'center',
    // alignItems: 'center',
    opacity: 0.95,
    padding: 20
  },
  containerBorder: {
    paddingVertical: 10,
    marginVertical: 20,
    borderColor: 'black', 
    borderBottomWidth: 1, 
    //borderRightWidth: 1, 
    // borderBottomRightRadius: 20,
    justifyContent: 'center',
  },
  taskName: {
    fontSize: 36,
    color: 'white'
  },
  text: {
    fontSize: 18,
    color: '#ccc'
  },
  dateText: {
    fontSize: 18,
    color: '#2f7d74'
  }
});

export default TaskDetails;