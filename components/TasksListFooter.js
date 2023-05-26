import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from "../ThemeContext";

const TasksListFooter = ({addTask, tasksExist}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);
    let styles = isThemeLight ? stylesLight : stylesDark;

    return(
        <View style={styles.container}>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => addTask()}>
                {tasksExist ?
                    
                    <></>
                :
                    <Text style={styles.text}>Ta kategoria jest pusta!</Text>
                }
                <Ionicons
                    name="add-circle-outline"
                    color={isThemeLight ? '#4aabff' : '#2f7d74'}
                    size={48}
                />
                <Text style={styles.text}>Dodaj</Text>
            </TouchableOpacity>
        </View>
    );
}

const stylesLight = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'aliceblue',
        marginVertical: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'lightgray',
        padding: 1
      },
      text: {
        fontSize: 16,
        marginTop: -4
      }
});

const stylesDark = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        borderBottomWidth: 2,
        backgroundColor: '#393E46',
        borderBottomColor: '#1d2024',
        padding: 1
      },
      text: {
        fontSize: 16,
        marginTop: -4,
        color: '#ccc',
      }
});

export default TasksListFooter;