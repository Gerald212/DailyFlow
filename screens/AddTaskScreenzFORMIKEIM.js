import {StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { Field, Formik } from 'formik';
import { ThemeContext } from '../ThemeContext';

const AddTaskScreen = ({route, navigation}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);
    const styles = isThemeLight ? stylesLight : stylesDark;

    const [goal, setGoal] = useState(0);

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

    return(
        <View style={styles.container}>
            {/* <Text style={styles.taskName}>Dodaj zadanie do kategorii {route.params.selectedCategory}</Text>
            <Text style={styles.taskName}>formularz Lorem ipsum</Text> */}
            <Formik
                initialValues={{ name: '', description: '', category_id: 0, hours_goal: 0, times_goal: 0, days_goal: 0, }}
                onSubmit={(values) => console.log(values)}
            >
                {({handleChange, handleBlur, handleSubmit, values}) => (
                    <View style={styles.section}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Tytuł zadania"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                        <TextInput
                            style={styles.inputField}
                            placeholder="Opis zadania"
                            multiline
                            numberOfLines={4}
                            onChangeText={handleChange('description')}
                            onBlur={handleBlur('description')}
                            value={values.description}
                        />
                        <View style={styles.goalsContainer}>
                            <TouchableOpacity style={styles.goalButton} onPress={() => setGoal(0)}>
                                <Text style={styles.text}>Brak celu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.goalButton} onPress={setGoal(1)}>
                                <Text style={styles.text}>Dni</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.goalButton} onPress={setGoal(2)}>
                                <Text style={styles.text}>Jednostki</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.goalButton} onPress={setGoal(3)}>
                                <Text style={styles.text}>Godziny</Text>
                            </TouchableOpacity>
                        </View>
                        {goal ?
                          <TextInput
                              style={styles.inputField}
                              placeholder="Cel"
                              onChangeText={handleChange('name')}
                              onBlur={handleBlur('name')}
                              value={values.name}
                          />
                          :
                          <Text>NFDKFDIFNDI</Text>
                        }
                        
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitText}>Dodaj</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
}

const stylesLight = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      //opacity: 0.9,
      //marginHorizontal: 16,
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
      marginVertical: 10
    },
    goalButton: {
      padding: 5,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderRadius: 20
    },
    submitButton: {
      alignSelf: 'center',
      padding: 20,
      borderWidth: 1,
      borderRadius: 20
    },
    inputField: {
      backgroundColor: 'azure',
      padding: 10,
      borderWidth: 1,
      borderColor: 'skyblue',
      borderRadius: 20,
      marginBottom: 20
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