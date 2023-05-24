import {Text, View, StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import ProgressBar from 'react-native-progress/Bar';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Wykorzystana biblioteka react-native-progress: https://github.com/oblador/react-native-progress

//item:
// {
//   name: 'Rysowac cos',
//   type: 0,        //0 - habit, 1 - task
//   id: 1,          //id
//   hours: 1,       
//   days: [],       //tablica z datami?
//   hours_goal: 0,
//   days_goal: 0,
//   completed: false,
// }

const TaskItem = ({item, showDetails, updateTask}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);

    let progressDescription = '';
    let progressValue = 0.0;
    let days = 10;

    if(item.hours_goal){
      progressDescription = item.hours + '/' + item.hours_goal + ' godzin';
      progressValue = item.hours / item.hours_goal;
    }else if(item.days_goal){
      // progressDescription = item.days.length + '/' + item.days_goal + ' dni';
      // progressValue = item.days.length / item.days_goal;
      progressDescription = days + '/' + item.days_goal + ' dni';
      progressValue = days / item.days_goal;
    }else if(item.times_goal){
      progressDescription = item.times + '/' + item.times_goal + ' razy';
      progressValue = item.times / item.times_goal;
    }else{
      progressDescription = item.hours + ' godzin';
      progressValue = 0.0;
    }

    //console.log('1. item:\t' + progressDescription + '\t' + progressValue);

    return(
      //zewnetrzny kontener v
      <View style={isThemeLight ? styles.itemContainer : styles.itemContainerDark}> 
        {/* kontener na dane i przycisk v*/}
        <View style={isThemeLight ? styles.dataContainer : styles.dataContainerDark}>
            {/* kontener na dane */}
            <TouchableOpacity style={{flex:1, alignItems: 'stretch'}} onPress={() => showDetails(item.habit_id)}>
                <Text style={isThemeLight ? styles.taskName : styles.taskNameDark}>
                    {item.name}
                </Text>
                <Text style={isThemeLight ? styles.taskProgress : styles.taskProgressDark}>
                    Postęp: {progressDescription}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() => updateTask(item.habit_id)}
            >
                <Ionicons
                    name="checkmark-circle-outline"
                    color={isThemeLight ? '#4aabff' : '#2f7d74'}
                    size={48}
                />
            </TouchableOpacity>
        </View>
          {progressValue ? 
            <ProgressBar
              width={null}
              progress={progressValue}
              color={isThemeLight ? '#4aabff' : '#2f7d74'}
              height={4}
              borderRadius={0}
              borderWidth={0}
            />
            : 
            <></>
          }
      </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'aliceblue',
      marginVertical: 5,
      //marginHorizontal: 10,
      borderBottomWidth: 2,
      borderBottomColor: 'lightgray',
    },
    itemContainerDark: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#393E46',
      marginVertical: 5,
      borderBottomWidth: 2,
      borderBottomColor: '#1d2024',
    },   
    dataContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 15,
    },
    dataContainerDark: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 15,
    },
    taskName: {
      fontSize: 24,
    },
    taskNameDark: {
      fontSize: 24,
      //color: '#3b9c92',
      color: '#ccc',
    },
    taskProgress: {
      fontSize: 16,
    },
    taskProgressDark: {
      fontSize: 16,
      //color: '#3b9c92',
      color: '#ccc',
    },
  });

export default TaskItem;