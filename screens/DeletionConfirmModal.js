import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from "../ThemeContext";
import { database } from "../database/database";
import { useContext } from "react";

const DeletionConfirmModal = ({route, navigation}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);
    const styles = isThemeLight ? stylesLight : stylesDark;

    
    const deleteItem = async () => {
        if(route.params.type === "habit"){
            console.log("Usuwam nawyk o id: " + route.params.id);
            await database.deleteHabitById(route.params.id).then(navigation.navigate("Home"));
            //navigation.navigate("Home");
        }else if(route.params.type === "category"){
            console.log("Usuwam kategorie o id: " + route.params.id);
            await database.deleteCategoryById(route.params.id).then(navigation.navigate("Home"));
            //navigation.navigate("Home");
        }
    }

    var type = '';
    if(route.params.type === "habit"){
        type = "zadanie";
    }else if(route.params.type === "category"){
        type = "kategorię"
    }

    return(
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <View>
                        <Text style={styles.text}>Czy na pewno chcesz usunąć {type} o nazwie</Text>
                        <Text style={styles.text}>"{route.params.name}"?</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginTop: 20}}>
                        <TouchableOpacity style={styles.button} onPress={() => deleteItem()}>
                            <Text style={[styles.buttonText, {color: 'darkred'}]}>Usuń</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonText}>Anuluj</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const stylesLight = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
    },
    modalContainer: {
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 30,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: 'skyblue',
        opacity: 1.0
    },
    container: {
        backgroundColor: 'white',
    },
    text: {
        fontSize: 16,
        alignSelf: "center",
        color: 'black'
    },
    button: {
        flexDirection: 'row', 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    buttonText: {
        fontSize: 24,
        color: 'black'
    }
});

const stylesDark = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
    },
    modalContainer: {
        justifyContent: 'center',
        backgroundColor: '#232931',
        paddingVertical: 30,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: '#2f7d74',
        opacity: 1.0
    },
    container: {
        backgroundColor: '#232931'
    },
    text: {
        fontSize: 16,
        alignSelf: "center",
        color: '#ccc'
    },
    button: {
        flexDirection: 'row', 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 5,
        borderBottomColor: '#2f7d74',
        borderBottomWidth: 1,
    },
    buttonText: {
        fontSize: 24,
        color: '#ccc'
    }
});

export default DeletionConfirmModal;