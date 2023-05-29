import {StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, Alert} from 'react-native';
import { Fragment, useContext, useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
        await database.addHabit(name, description, category, days_goal, times_goal, hours_goal)
        .then(Alert.alert("", "Dodano zadanie " + '"'+ name + '"'))
        .then(navigation.navigate("Home"));
    }

    return(
        <View style={styles.container}>
            <View style={styles.section}>
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
  }
});

export default AddTaskScreen;