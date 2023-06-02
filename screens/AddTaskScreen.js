import {StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, Alert} from 'react-native';
import { Fragment, useContext, useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list';
import { ThemeContext } from '../ThemeContext';
import { database } from '../database/database';

const AddTaskScreen = ({route, navigation}) => {
    const {isThemeLight, setIsThemeLight} = useContext(ThemeContext);
    const styles = isThemeLight ? stylesLight : stylesDark;

    const [goalId, setGoalId] = useState(0);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(0);
    const [goalValue, setGoalValue] = useState(0);
    const [type, setType] = useState(0);
    // const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

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

    //wczytywanie kategorii
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const parseCategories = (temp) => {
          var tempCategories = [{key:'0', value:'Brak kategorii'}];
          temp.forEach(element => {
            tempCategories.push({key: element.category_id, value: element.name})
          });
          setCategories(tempCategories);
          console.log(tempCategories);
        }

        await database.getAllCategories((result) => parseCategories(result));
    }

    const handleSubmit = async () => {
        var days_goal = 0, hours_goal = 0, times_goal = 0;
        switch(goalId){
          case 0:
            times_goal = 0;
            hours_goal = 0;
            days_goal = 0;
            break;
          case 1:
            days_goal = goalValue;
            times_goal = 0;
            hours_goal = 0;
            break;
          case 2:
            times_goal = goalValue;
            days_goal = 0;
            hours_goal = 0;
            break;
          case 3:
            hours_goal = goalValue;
            days_goal = 0;
            times_goal = 0;
            break;
        }

        if(!name){
            Alert.alert("", "Wypełnij wymagane pola!");
            return;
        }

        console.log("name: ", name, "desc: ", description, "cat: ", category, "daysgoal: ", days_goal, "timesgoal: ", times_goal, "hoursgoal: ", hours_goal);

        if(type == 1){
          var tempDate = time.toISOString().split('T')[0] + ' ' + time.toISOString().split('T')[1];
          tempDate = tempDate.slice(0,-1);
          console.log("HABIT: ", name, description, category, days_goal, times_goal, hours_goal, type);
          console.log("DATE: ", tempDate);
          database.addTask(name, description, category, type, tempDate)
          .then(Alert.alert("", "Dodano zadanie " + '"'+ name + '"'))
          .then(navigation.navigate("Home"));

        }else{
          await database.addHabit(name, description, category, days_goal, times_goal, hours_goal, type)
          .then(Alert.alert("", "Dodano nawyk " + '"'+ name + '"'))
          .then(navigation.navigate("Home"));
        }
    }

    const handleTimeChange = (date) => {
      console.log(date.nativeEvent.timestamp);
      //var day = new Date(date.nativeEvent.timestamp);
      //console.log(day.toLocaleString());
      setShowTimePicker(false);
      setShowDatePicker(false);
      setTime(new Date(date.nativeEvent.timestamp));
    }

    return(
        <View style={styles.container}>
            <View style={styles.section}>
                <View style={styles.bar}>
                    <TouchableOpacity 
                        style={styles.barButton}
                        onPress={()=>setType(0)}
                    >
                        <MaterialCommunityIcons
                            name="calendar-refresh-outline"
                            color={
                              isThemeLight ? 
                                type ? 'lightgrey' : 'black'
                              : 
                                type ? '#ccc' : 'white'
                            }
                            size={42}
                        />
                        <Text style={{color: 
                              isThemeLight ? 
                                type ? 'lightgrey' : 'black'
                              : 
                                type ? '#ccc' : 'white'
                        }}>
                            Nawyk
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.barButton}
                      onPress={()=>setType(1)}
                    >
                        <MaterialCommunityIcons
                            name="calendar-check-outline"
                            color={
                              isThemeLight ? 
                                type ? 'black' : 'lightgrey'
                              : 
                                type ? 'white' : '#ccc'
                            }
                            size={42}
                        />
                        <Text style={{color:
                          isThemeLight ? 
                            type ? 'black' : 'lightgrey'
                          : 
                            type ? 'white' : '#ccc'
                        }}>
                            Zadanie
                        </Text>
                     </TouchableOpacity>
                </View>
                <Text style={styles.label}>Nazwa</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="Nazwa zadania"
                    onChangeText={text => setName(text)}
                />
                {name ? <View style={{marginTop: 20}}></View> : <Text style={styles.errorLabel}>Nazwa jest wymagana!</Text>}
                <Text style={[styles.label, {marginTop: 10}]}>Opis</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="Opis zadania"
                    multiline
                    numberOfLines={4}
                    onChangeText={text => setDescription(text)}
                />
                <Text style={styles.label}>Kategoria</Text>
                <View>
                    <SelectList
                        data={categories}
                        placeholder='Wybierz kategorię'
                        search={false}
                        setSelected={(val) => setCategory(val)}
                        onSelect={() => console.log("wybrana kategoria: ", category)}
                        boxStyles={styles.dropListContainer}
                        dropdownStyles={{borderRadius: 20}}
                        dropdownTextStyles={{color: isThemeLight ? 'black' : 'white'}}
                        inputStyles={{color: isThemeLight ? 'gray' : '#ccc'}}
                        defaultOption={{key:'0', value:'Brak kategorii'}}
                        maxHeight={150}
                        arrowicon={<Ionicons name="chevron-down-circle-outline" size={18} color={'black'} />} 
                    />
                </View>
                    {type == 0 
                    ?
                        <>
                        <Text style={styles.label}>Cel</Text>
                        <View style={styles.goalsContainer}>
                            <TouchableOpacity style={!goalId ? styles.goalButtonActive : styles.goalButtonInactive} onPress={() => setGoalId(0)}>
                                <Text style={styles.text}>Brak celu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={goalId == 1 ? styles.goalButtonActive : styles.goalButtonInactive} onPress={() => setGoalId(1)}>
                                <Text style={styles.text}>Dni</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={goalId == 2 ? styles.goalButtonActive : styles.goalButtonInactive} onPress={() => setGoalId(2)}>
                                <Text style={styles.text}>Jednostki</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={goalId == 3 ? styles.goalButtonActive : styles.goalButtonInactive} onPress={() => setGoalId(3)}>
                                <Text style={styles.text}>Godziny</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={[styles.inputField, {opacity: goalId ? 1 : 0.5}]}
                            placeholder="Cel"
                            onChangeText={text => setGoalValue(text)}
                            keyboardType="numeric"
                            inputMode='numeric'
                            editable={goalId != 0}
                        />
                        </>
                    :
                        <View>
                            <Text style={styles.label}>Termin</Text>
                            <View style={styles.bar}>
                                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.timeText}>
                                    <MaterialCommunityIcons name="calendar-month-outline" size={24} color={isThemeLight ? "black" : "#ccc"}/>
                                    <Text style={styles.text}> {time.toISOString().split('T')[0]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.timeText}>
                                    <MaterialCommunityIcons name="clock-outline" size={24} color={isThemeLight ? "black" : "#ccc"}/>
                                    <Text style={styles.text}> {time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}</Text>
                                </TouchableOpacity>
                            </View>
                            {showDatePicker &&
                                <DateTimePicker 
                                  value={time}
                                  mode="date"
                                  minimumDate={new Date()}
                                  onChange={(date) => handleTimeChange(date)}
                                />
                            }
                            {showTimePicker &&
                                <DateTimePicker 
                                  value={time}
                                  mode="time"  
                                  minuteInterval={5}
                                  onChange={(date) => handleTimeChange(date)}
                                />
                            }
                        </View>
                    }
                        <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
                            <Text style={styles.submitText}>Dodaj</Text>
                        </TouchableOpacity>
            </View>
        </View>
    );
}

const stylesLight = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.95,
    },
    section: {
      flex: 1,
      justifyContent: 'center',
      width: '90%',
      paddingVertical: 20,
      padding: 10
    },
    goalsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      //marginVertical: 10,
      marginBottom: 10
    },
    dropListContainer: {
      borderRadius: 20, 
      backgroundColor: 'aliceblue',
      borderColor: 'skyblue'
    }, 
    goalButtonInactive: {
      padding: 5,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'skyblue',
      borderRadius: 20
    },
    goalButtonActive: {
      padding: 5,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: 'skyblue',
      backgroundColor: 'aliceblue'
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
      backgroundColor: 'aliceblue',
      padding: 10,
      borderWidth: 1,
      borderColor: 'skyblue',
      borderRadius: 20,
      //marginBottom: 20
    },
    label: {
      marginLeft: 10,
      marginBottom: 2,
      marginTop: 20
    },
    errorLabel: {
      marginLeft: 10,
      marginBottom: 2,
      color: 'red'
    },
    text: {
      fontSize: 16,
      color: 'black'
    },
    submitText: {
      fontSize: 20,
      color: 'black'
    },
    barButton : {
      justifyContent: 'center',
      alignItems:'center',
    },
    bar: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
    timeText: {
      fontSize: 16,
      flexDirection: 'row',
      alignItems: 'center',
      color: 'black',
      borderWidth: 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
      borderColor: 'skyblue'
    }
});

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232931',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.95,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    width: '90%',
    paddingVertical: 20,
    padding: 10
  },
  goalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //marginVertical: 10,
    marginBottom: 10,
  },
  dropListContainer: {
    borderRadius: 20, 
    backgroundColor: '#393E46',
    borderColor: '#2f7d74',
    color: '#ccc'
  }, 
  goalButtonInactive: {
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#3b9c92',
    borderRadius: 20
  },
  goalButtonActive: {
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#4cd4c5',
    backgroundColor: '#393E46'
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
    backgroundColor: '#393E46',
    padding: 10,
    borderWidth: 1,
    borderColor: '#2f7d74',
    borderRadius: 20,
    //marginBottom: 20
  },
  label: {
    marginLeft: 10,
    marginBottom: 2,
    marginTop: 20,
    color: 'white'
  },
  errorLabel: {
    marginLeft: 10,
    marginBottom: 2,
    color: 'red'
  },
  text: {
    fontSize: 16,
    color: 'white'
  },
  submitText: {
    fontSize: 20,
    color: 'white'
  },
  barButton : {
    justifyContent: 'center',
    alignItems:'center',
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  timeText: {
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#ccc',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: '#2f7d74'
  }
});

export default AddTaskScreen;