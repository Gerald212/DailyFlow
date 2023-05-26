import {StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { ThemeContext } from '../ThemeContext';

const AddTaskScreen = ({route, navigation}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);
    const styles = isThemeLight ? stylesLight : stylesDark;

    const [goalId, setGoalId] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(0);
    const [goalValue, setGoalValue] = useState(0);

    const sample = [
      {key:'1', value:'Mobiles'},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers'},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]

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

        console.log(name, description, selectedCategory, days_goal, times_goal, hours_goal);
        //database.addHabit( z tym ^)
    }

    return(
        <View style={styles.container}>
            {/* <Text style={styles.taskName}>Dodaj zadanie do kategorii {route.params.selectedCategory}</Text>
            <Text style={styles.taskName}>formularz Lorem ipsum</Text> */}
            <View style={styles.section}>
                <Text style={styles.label}>Tytuł</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="Tytuł zadania"
                    onChangeText={text => setName(text)}
                />
                <Text style={styles.label}>Opis</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="Opis zadania"
                    multiline
                    numberOfLines={4}
                    onChangeText={text => setDescription(text)}
                />
                <Text style={styles.label}>Kategoria</Text>
                <View style={{marginBottom: 20}}>
                    <SelectList
                        data={sample}
                        placeholder='Wybierz kategorię'
                        search={false}
                        setSelected={(val) => setSelectedCategory(val)}
                        onSelect={() => alert(selectedCategory)}
                        boxStyles={{borderRadius: 20, backgroundColor: 'aliceblue'}}
                        dropdownStyles={{borderRadius: 20}}
                        maxHeight={150}
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
      padding: 10,
      //backgroundColor: 'red'
    },
    goalsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      //marginVertical: 10,
      marginBottom: 10
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
    },
    inputField: {
      backgroundColor: 'aliceblue',
      padding: 10,
      borderWidth: 1,
      borderColor: 'skyblue',
      borderRadius: 20,
      marginBottom: 20
    },
    label: {
      marginLeft: 10,
      marginBottom: 2
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
    //opacity: 0.9,
    //marginHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: '#ccc'
  },
});

export default AddTaskScreen;