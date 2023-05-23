import {Text, View, StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const EmptyTasksListComponent = ({addTask}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);
    const styles = isThemeLight ? stylesLight : stylesDark;

    return(
        <TouchableOpacity style={styles.itemContainer} onPress={() => addTask()}>
            <Text style={styles.name}>
                Ta kategoria jest pusta!
            </Text>
            <Text style={styles.subName}>
                Dotknij żeby dodać
            </Text>
        </TouchableOpacity>
    );
}

const stylesLight = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'aliceblue',
        marginVertical: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'lightgray',
        padding: 15,
      },
      name: {
        fontSize: 24,
      },
      subName: {
        fontSize: 16,
      }
});

const stylesDark = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        borderBottomWidth: 2,
        padding: 15,
        backgroundColor: '#393E46',
        borderBottomColor: '#1d2024',
      },
      name: {
        fontSize: 24,
        color: '#ccc',
      },
      subName: {
        fontSize: 16,
        color: '#ccc',
      }
});

export default EmptyTasksListComponent;