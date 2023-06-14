import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import PanelStatItem from '../components/PanelStatItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { database } from '../database/database';
import * as Notifications from 'expo-notifications';

const Panel = () => {
  const {isThemeLight,setIsThemeLight,changeTheme} = useContext(ThemeContext);
  const styles = isThemeLight ? stylesLight : stylesDark;
  const [showStats, setShowStats] = useState(true);
  const [habitsCount, setHabitsCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [completedHabitsCount, setCompletedHabitsCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [averageCompletion, setAverageCompletion] = useState(0);

    useEffect(() => {
        const getHabitsCount = async () => {
            await database.getItemsCount(setHabitsCount, 0, 0);
        }
        const getTasksCount = async () => {
            await database.getItemsCount(setTasksCount, 0, 1);
        } 
        const getCompletedHabitsCount = async () => {
            await database.getItemsCount(setCompletedHabitsCount, 1, 0);
        }
        const getCompletedTasksCount = async () => {
            await database.getItemsCount(setCompletedTasksCount, 1, 1);
        }
        const getAverage = async () => {
            await database.getAverageCompletion((result) => {
              //console.log("srednia", result);
              //let average = Math.round(result * 100);
              //console.log(result);
              setAverageCompletion(result);
            });
        }

        getHabitsCount();
        getTasksCount();
        getCompletedHabitsCount();
        getCompletedTasksCount();
        getAverage();
    }, []);

    //do testów powiadomień v
    // const triggerNotifications = async () => {
    //     await Notifications.scheduleNotificationAsync({
    //         content: {
    //             title: "Tytuł powiadomienia",
    //             body: 'Treść powiadomienia',
    //             data: { data: 'data' },
    //             //sound: 'default',
                
    //         },
    //         // trigger: new Date(Date.now() + 10000),
    //         // trigger: { channelId: 'DailyFlowTasksID', date: new Date(Date.now() + 10000) }
    //         trigger: { seconds: 3, channelId: 'DailyFlowTasksId' }
    //     });
    //     console.log(await Notifications.getAllScheduledNotificationsAsync());
    // }

    return(
      <>
        <View style={styles.panelsBar}>
          <TouchableOpacity 
            style={styles.panelsBarButton}
            onPress={()=>setShowStats(true)}
          >
            <Ionicons
                name="pie-chart-outline"
                color={
                  isThemeLight ? 
                    showStats ? 'black' : 'lightgrey'
                  : 
                    showStats ? 'white' : '#ccc'
                }
                size={36}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.panelsBarButton}
            onPress={()=>setShowStats(false)}
          >
            <Ionicons
                name="information-circle-outline"
                color={
                  isThemeLight ? 
                    showStats ? 'lightgrey' : 'black'
                  : 
                    showStats ? '#ccc' : 'white'
                }
                size={36}
            />
          </TouchableOpacity>
        </View>
        {showStats ?
          <View style={styles.container}>
              <View style={{flex:1}}>          
                <PanelStatItem value={1} content={habitsCount} title={"Liczba aktywnych nawyków"} leftSide={false}/>
                <PanelStatItem value={1} content={completedHabitsCount} title={"Liczba zakończonych\nnawyków"} leftSide={true}/>
                <PanelStatItem value={averageCompletion} content={Math.round(averageCompletion * 100)+'%'} title={"Średnie ukończenie zadań"} leftSide={false}/>
                <PanelStatItem value={1} content={tasksCount} title={"Liczba aktywnych zadań"} leftSide={true}/>
                <PanelStatItem value={1} content={completedTasksCount} title={"Liczba zakończonych\nzadań"} leftSide={false}/>
                {/* <PanelStatItem value={0.54} content={"54%"} title={"jescze coś innego"} leftSide={false}/> */}
              </View>
          </View>
          :
          <View style={styles.containerInfo}>
              <Image source={require('../assets/dailyflowiconPNG.png')} style={styles.icon}/>
              <Text style={styles.title}>DailyFlow</Text>
              <View style={styles.infoTextContainer}>
                  <Text style={styles.infoText}>Kliknij <Ionicons name="add-circle-outline" color={isThemeLight ? '#4aabff' : '#2f7d74'} size={32}/> aby dodać zadanie/nawyk lub kategorię.{'\n'}</Text>
                  <Text style={styles.infoText}>Kliknij <MaterialCommunityIcons name={"update"} color={isThemeLight ? '#4aabff' : '#2f7d74'} size={32}/> aby zaktualizować zadanie/nawyk.{'\n'}</Text>
                  <Text style={styles.infoText}>Kliknij <Ionicons name="trash-outline" color='darkred' size={30}/> aby usunąć zadanie, nawyk lub kategorię.{'\n'}</Text>
                  <Text style={styles.infoText}>Kliknij na zadanie/nawyk na liśćie aby wyświetlić szczegóły.{'\n'}</Text>
                  <Text style={styles.infoText}>Wybierz datę w kalendarzu aby zobaczyć zadania zaplanowane na ten dzień i nawyki, które w tym dniu zostały wykonane.{'\n'}</Text>
                  {/* do testów powiadomień v */}
                  {/* <TouchableOpacity onPress={() => triggerNotifications()}>
                    <Text style={{color: 'red', fontSize: 40}}>POWIADOMIENIE</Text>
                  </TouchableOpacity> */}
              </View>
          </View>
        }
      </>
          
        
    );
}

const stylesLight = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    containerInfo: {
      flex: 1,
      backgroundColor: '#fff',
      //justifyContent: 'center',
      alignItems: 'center',
    },
    infoTextContainer: {
      flex: 1,
      paddingHorizontal: '5%',
      justifyContent: 'center',
    },
    panelsBar: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: '#fff',
    },
    panelsBarButton: {
      justifyContent: 'center',
      alignItems:'center',
      paddingVertical: 5,
      paddingHorizontal: '20%',
    },
    text: {
      fontSize: 16,
    },
    title: {
      fontSize: 48,
      marginTop: -80,
      fontFamily: 'monospace'
    },
    icon: {
      height: '50%', 
      width: '50%', 
      marginTop: -20,
      tintColor: 'black'
    },
    infoText: {
      color: 'black'
    }
});

const stylesDark = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#232931',
      justifyContent: 'center',
    },
    containerInfo: {
      flex: 1,
      backgroundColor: '#232931',
      //justifyContent: 'center',
      alignItems: 'center',
    },
    infoTextContainer: {
      flex: 1,
      paddingHorizontal: '5%',
      justifyContent: 'center',
    },
    panelsBar: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: '#232931',
    },
    panelsBarButton: {
      justifyContent: 'center',
      alignItems:'center',
      //borderBottomWidth: 1,
      // borderRightWidth: 1,
      // borderColor: 'gray',
      paddingVertical: 5,
      paddingHorizontal: '20%',
    },
    text: {
      fontSize: 16,
      color: '#3b9c92',
    },
    title: {
      fontSize: 48,
      color: '#3b9c92',
      marginTop: -80,
      fontFamily: 'monospace'
    },
    icon: {
      height: '50%', 
      width: '50%', 
      marginTop: -20,
      tintColor: '#3b9c92'
    },
    infoText: {
      color: '#ccc'
    }
});

export default Panel;