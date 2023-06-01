import {Text, View, StatusBar, StyleSheet, Button, TouchableOpacity, Image} from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import PanelStatItem from '../components/PanelStatItem';
import * as Progress from 'react-native-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { database } from '../database/database';

const Panel = () => {
  const {isThemeLight,setIsThemeLight,changeTheme} = useContext(ThemeContext);
  const styles = isThemeLight ? stylesLight : stylesDark;
  const [showStats, setShowStats] = useState(true);
  const [habitsCount, setHabitsCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [averageCompletion, setAverageCompletion] = useState(0);

    useEffect(() => {
        const getHabitsCount = async () => {
            await database.getHabitsCount(setHabitsCount);
        }
        const getCompletedCount = async () => {
            await database.getCompletedCount(setCompletedCount);
        }
        const getAverage = async () => {
            await database.getAverageCompletion((result) => {
              console.log("srednia", result);
              //let average = Math.round(result * 100);
              console.log(result);
              setAverageCompletion(result);
            });
        }

        getHabitsCount();
        getCompletedCount();
        getAverage();
    }, []);

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
              {/* <Text style={isThemeLight ? styles.text : styles.textDark}>Pozostałe</Text> */}
              <View style={{flex:1}}>          
                <PanelStatItem value={1} content={habitsCount} title={"Liczba aktywnych nawyków"} leftSide={false}/>
                <PanelStatItem value={1} content={completedCount} title={"Liczba zakończonych\nnawyków"} leftSide={true}/>
                <PanelStatItem value={averageCompletion} content={Math.round(averageCompletion * 100)+'%'} title={"Średnie ukończenie zadań"} leftSide={false}/>
                <PanelStatItem value={1} content={0} title={"liczba tasków?"} leftSide={true}/>
                <PanelStatItem value={0.54} content={"54%"} title={"jescze coś innego"} leftSide={false}/>
              </View>
          </View>
          :
          <View style={styles.containerInfo}>
              <Image source={require('../assets/dailyflowiconPNG.png')} style={styles.icon}/>
              <Text style={styles.title}>DailyFlow</Text>
              <View style={styles.infoTextContainer}>
                  <Text>Informacje o aplikacji</Text>
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
      justifyContent: 'center',
      alignItems: 'center',
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
      //borderBottomWidth: 1,
      // borderRightWidth: 1,
      // borderColor: 'lightgray',
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
      justifyContent: 'center',
      alignItems: 'center',
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
    }
});

export default Panel;