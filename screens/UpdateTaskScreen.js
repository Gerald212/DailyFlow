import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { useContext, useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemeContext } from '../ThemeContext';
import { database } from '../database/database';

const UpdateTaskScreen = ({route, navigation}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);
    const styles = isThemeLight ? stylesLight : stylesDark;

    const [hours, setHours] = useState(0.0);
    //const [date, setDate] = useState((temp = new Date()) => {return temp.toISOString().split('T')[0]});
    const [date, setDate] = useState(new Date());
    const [calendarShown, setCalendarShown] = useState(false);

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

    const handleSubmit = () => {
        const updateTask = async () => {
          //console.log("godziny: ", hours, "data: ", date.toISOString().split('T')[0]);
          await database.updateHabitById(route.params.id, hours, date.toISOString().split('T')[0])
          //.then(() => console.log("godziny: ", hours, "data: ", date))
          .then(navigation.navigate("Home", {screen: 'TasksList', params: {refresh: 'true'}}));
        }

        if(!hours){
          Alert.alert("", "Czy na pewno chcesz zaktualizować zadanie wyłącznie o datę?", [
              {
                  text: 'Anuluj',
                  onPress: () => {return},
                  style: 'cancel',
              },
              {text: 'Tak', onPress: () => updateTask()},
          ])
        }else{
          updateTask();
        }
    }

    const handleCompletion = () => {
        const updateTask = async () => {
          await database.completeTask(route.params.id)
          .then(navigation.navigate("Home", {screen: 'TasksList', params: {refresh: 'true'}}));
        }

        updateTask();
    }

    const handleTimeChange = (date) => {
      console.log(date.nativeEvent.timestamp);
      // var tempDate = new Date(date.nativeEvent.timestamp);
      setCalendarShown(false);
      setDate(new Date(date.nativeEvent.timestamp))
      //setDate(tempDate.toISOString().split('T')[0]);
    }

    return(
        <View style={styles.outerContainer}>
            <Text style={styles.title}>{route.params.name}</Text>
            {route.params.type ?
              <TouchableOpacity style={styles.submitButton} onPress={() => handleCompletion()}>
                  <Text style={styles.submitText}>Wykonane</Text>
              </TouchableOpacity>
            :
              <View style={styles.container}>
                  <View style={styles.section}>
                      <Text style={styles.label}>Godziny:</Text>
                      <TextInput
                        style={styles.inputField}
                        placeholder="0"
                        onChangeText={text => setHours(text)}
                        keyboardType="numeric"
                        inputMode='numeric'
                        textAlign={'right'}
                      />
                  </View>
                  <View style={styles.section}>
                      <Text style={styles.label}>Data:</Text>
                      <View style={styles.inputField}>
                          <Text style={{textAlign: 'right'}}>{date.toISOString().split('T')[0]}</Text>
                      </View>
                  </View>
                  <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: 10}} onPress={() => setCalendarShown(!calendarShown)}>
                      <Text style={calendarShown ? styles.textInactive : styles.textActive}>Zmień datę</Text>
                  </TouchableOpacity>
                  {/* {calendarShown ?
                      <View>
                        <Calendar
                          onDayPress={day => {
                            setDate(day.dateString);
                            setCalendarShown(false);
                            //console.log(day.dateString);
                          }}
                          key={343331}
                          style={styles.calendarStyle}
                          theme={styles.calendarTheme}
                        />
                      </View>
                  :
                      <></>
                  } */}
                  {calendarShown ?
                      <DateTimePicker 
                          value={date}
                          mode="date"
                          onChange={(date) => handleTimeChange(date)}
                          maximumDate={new Date()}
                      />
                  :
                      <></>
                  }
                  <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
                      <Text style={styles.submitText}>Dodaj</Text>
                  </TouchableOpacity>
              </View>
            }
        </View>
    );
}

const stylesLight = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    opacity: 0.95,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 20,
    padding: 10
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  goalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  submitButton: {
    alignSelf: 'center',
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'skyblue',
    marginTop: 20
  },
  inputField: {
    flex: 2,
    backgroundColor: 'aliceblue',
    padding: 10,
    borderWidth: 1,
    borderColor: 'skyblue',
    borderRadius: 20,
  },
  label: {
    flex: 2
  },
  textActive: {
    color: 'black'
  },
  textInactive: {
    color: 'lightgray'
  },
  title: {
    fontSize: 32,
    color: 'black',
    marginTop: 20
  },
  submitText: {
    fontSize: 20,
    color: 'black'
  },
  calendarStyle: {
    backgroundColor: 'aliceblue',
    marginTop: 5,
    borderRadius: 15,
    paddingBottom: 15
  },
});

const stylesDark = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#232931',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    opacity: 0.95,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 20,
    padding: 10
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  goalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  submitButton: {
    alignSelf: 'center',
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#2f7d74',
    marginTop: 20
  },
  inputField: {
    flex: 2,
    backgroundColor: '#393E46',
    padding: 10,
    borderWidth: 1,
    borderColor: '#2f7d74',
    borderRadius: 20,
    color: '#ccc'
  },
  label: {
    flex: 2,
    color: '#ccc'
  },
  textActive: {
    color: 'white'
  },
  textInactive: {
    color: 'gray'
  },
  title: {
    fontSize: 32,
    color: '#ccc',
    marginTop: 20
  },
  submitText: {
    fontSize: 20,
    color: '#ccc'
  },
  calendarStyle: {
    backgroundColor: '#161a1f',
    marginTop: 5,
    borderRadius: 15,
    paddingBottom: 15
  },
  calendarTheme: {
    backgroundColor: '#161a1f',
    calendarBackground: '#393E46',
    textSectionTitleColor: '#777',
    selectedDayBackgroundColor: '#2f7d74',
    selectedDayTextColor: 'white',
    todayTextColor: '#2f7d74',
    dayTextColor: '#ccc',
    textDisabledColor: '#222',
    monthTextColor: '#eee',
    arrowColor: '#2f7d74'
  }
});//#232931

export default UpdateTaskScreen;