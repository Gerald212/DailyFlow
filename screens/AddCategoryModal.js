import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { ThemeContext } from "../ThemeContext";
import { database } from "../database/database";
import { useContext, useState } from "react";

const AddCategoryModal = ({route, navigation}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);
    const styles = isThemeLight ? stylesLight : stylesDark;

    const [name, setName] = useState("");

    const handleSubmit = async () => {
        if(!name){
            Alert.alert("", "Podaj nazwę!");
            return;
        }

        console.log(name);
        await database.addCategory(name)
        .then(Alert.alert("", "Dodano kategorię " + '"'+ name + '"'))
        .then(navigation.goBack());
    }

    return(
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                        <Text style={styles.title}>Dodaj kategorię</Text>
                    <Text style={styles.label}>Nazwa</Text>
                    <TextInput 
                        style={styles.inputField}
                        placeholder="Nazwa kategorii"
                        onChangeText={text => setName(text)}
                    />
                    <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
                        <Text style={styles.submitText}>Dodaj</Text>
                    </TouchableOpacity>
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
        padding: 50,
        borderWidth: 2,
        borderColor: 'skyblue',
    },
    container: {
        backgroundColor: 'white',
    },
    inputField: {
        backgroundColor: 'aliceblue',
        padding: 10,
        borderWidth: 1,
        borderColor: 'skyblue',
        borderRadius: 20,
    },
    submitButton: {
        alignSelf: 'center',
        padding: 20,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'skyblue',
        marginTop: 20,
        backgroundColor: 'white'
    },
    label: {
        marginLeft: 10,
        marginBottom: 2
    },
    title: {
        fontSize: 24,
        marginBottom: 20
    },
    submitText: {
        fontSize: 20,
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
        padding: 50,
        borderWidth: 2,
        borderColor: '#2f7d74',
    },
    container: {
        backgroundColor: '#232931',
    },
    inputField: {
        backgroundColor: '#393E46',
        padding: 10,
        borderWidth: 1,
        borderColor: '#2f7d74',
        borderRadius: 20,
        color: 'white',
        
    },
    submitButton: {
        alignSelf: 'center',
        padding: 20,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#2f7d74',
        marginTop: 20,
        backgroundColor: '#393E46'
    },
    label: {
        marginLeft: 10,
        marginBottom: 2,
        color: '#ccc'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#ccc'
    },
    submitText: {
        fontSize: 20,
        color: '#ccc'
    }
});

export default AddCategoryModal;