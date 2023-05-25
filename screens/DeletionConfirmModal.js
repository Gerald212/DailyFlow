import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";

const DeletionConfirmModal = ({route, navigation}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);
    const styles = isThemeLight ? stylesLight : stylesDark;

    var type;
    if(route.params.type === "habit"){
        type = "zadanie";
    }else{
        type = "kategorię"
    }

    console.log("PARAMTERY: ",route.params);

    return(
        <View style={styles.outerContainer}>
            <View style={styles.modalContainer}>
                <View>
                    <Text style={styles.text}>Czy na pewno chcesz usunąć {type} o nazwie</Text>
                    <Text style={styles.text}>"{route.params.name}"?</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginTop: 20}}>
                    <TouchableOpacity style={{justifyContent: "center", alignItems: "center", padding: 5}}>
                        <Text>Tak</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text>Anuluj</Text>
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
      //marginHorizontal: 16,
    },
    modalContainer: {
        //flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 30,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: 'skyblue',
        opacity: 1.0
    },
    text: {
      fontSize: 16,
      alignSelf: "center",
      color: 'black'
    },
});

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232931',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
    //marginHorizontal: 16,
  },
  taskName: {
    fontSize: 16,
    color: '#ccc'
  },
});

export default DeletionConfirmModal;