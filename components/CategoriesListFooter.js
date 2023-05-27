import { TouchableOpacity, View, StyleSheet } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";


const CategoriesListFooter = ({addCategory}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);
    const styles = isThemeLight ? stylesLight : stylesDark;

    return(
        <TouchableOpacity style={styles.container} onPress={() => addCategory()}>
            <Ionicons
                name="add-circle-outline"
                color={isThemeLight ? '#4aabff' : '#2f7d74'}
                size={32}
            />
        </TouchableOpacity>
    )
}

const stylesLight = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'aliceblue',
        padding: 18,
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 2,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'lightgray',
    }
});

const stylesDark = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'aliceblue',
        padding: 18,
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 2,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'lightgray',
        backgroundColor: '#393E46',
        borderColor: '#1d2024'
    }
});

export default CategoriesListFooter;