import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import ProgressBar from 'react-native-progress/Bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TaskItem = ({item, showDetails, updateTask}) => {
    const {isThemeLight, setIsThemeLight} = useContext(ThemeContext);

    let progressDescription = '';
    let progressValue = 0.0;

    if(item.hours_goal){
      progressDescription = item.hours + '/' + item.hours_goal + ' godzin';
      progressValue = item.hours / item.hours_goal;
    }else if(item.days_goal){
      // progressDescription = item.days.length + '/' + item.days_goal + ' dni';
      // progressValue = item.days.length / item.days_goal;
      progressDescription = item.days + '/' + item.days_goal + ' dni';
      progressValue = item.days / item.days_goal;
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
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={isThemeLight ? styles.typeName : styles.typeNameDark}>
                        {item.type == 0 ? 'Nawyk ' : 'Zadanie '}
                    </Text>
                    <MaterialCommunityIcons
                        name={item.type == 0 ? "calendar-refresh-outline" : "calendar-check-outline"}
                        color={isThemeLight ? 'black' : '#2f7d74'}
                        size={18}
                        //style={{marginLeft: 2}}
                    />
                    {item.type ?
                    <Text style={{color: isThemeLight ? 'black' : '#3b9c92'}}> 
                        {' '}{item.date ? item.date.split(':')[0] + ':' + item.date.split(':')[1] : ''}
                    </Text>
                    :
                    <></>
                    }
                </View>
                <Text style={isThemeLight ? styles.taskName : styles.taskNameDark}>
                    {item.name}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  
                    {item.type == 0 
                    ?
                        <Text style={isThemeLight ? styles.taskProgress : styles.taskProgressDark}>
                            Postęp: {progressDescription} {"|"} {item.completed ? 'Zakończone' : 'W trakcie'}
                        </Text>
                    :
                        <Text style={isThemeLight ? styles.taskProgress : styles.taskProgressDark}>
                            {item.completed ? 'Zakończone' : 'Do wykonania'}
                        </Text>
                    }
                    {item.completed == 1 
                    ?
                      <Ionicons
                          name="medal-outline"
                          color={'gold'}
                          size={32}
                          style={{marginLeft: 10}}
                      />
                    :
                      <MaterialCommunityIcons 
                          name="clock-end"
                          size={20} 
                          color={isThemeLight ? 'black' : '#bbb'}
                          style={{marginLeft: 5}}
                      />
                    }
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() => updateTask(item.habit_id, item.name, item.type)}
                disabled={item.completed == 1 ? true : false}
            >
                <MaterialCommunityIcons
                    // name={item.type == 0 ? "update" : "checkbox-marked-circle-outline"}
                    name={"update"}
                    color={isThemeLight ? '#4aabff' : '#2f7d74'}
                    size={48}
                    style={{opacity: item.completed == 1 ? 0.2 : 1}}
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
    typeName: {
      fontSize: 12,
    },
    typeNameDark: {
      fontSize: 12,
      color: '#3b9c92'
    }
  });

export default TaskItem;