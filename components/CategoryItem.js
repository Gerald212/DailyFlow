import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CategoryItem = ({item, selectedCategory, setCategory, goToDelete}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);

    let styles = isThemeLight ? stylesLight : stylesDark;

    return(
        <TouchableOpacity 
            onPress={() => setCategory(item.category_id)}
            style={[
                styles.itemContainer,
                {
                    opacity: selectedCategory === item.category_id ? 1.0 : 0.8,
                }
            ]} 
        >
                <Text style={selectedCategory === item.category_id ? styles.categoryNameActive : styles.categoryNameInactive}>
                    {item.name}
                </Text>
                {selectedCategory === item.category_id && selectedCategory != 0 ?
                    <TouchableOpacity onPress={() => goToDelete(item.category_id, item.name)} style={{marginLeft: 4, marginRight: -6}}>
                        <Ionicons
                            name="trash-outline"
                            //color={isThemeLight ? '#4aabff' : '#2f7d74'}
                            color={'red'}
                            size={22}
                        />
                    </TouchableOpacity>
                :
                    <></>
                }
        </TouchableOpacity>
    );
}

const stylesLight = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'aliceblue',
        padding: 20,
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 2,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'lightgray',
    },
    categoryNameInactive: {
        fontSize: 18,
        color: 'gray',
    },
    categoryNameActive: {
        fontSize: 18,
        color: 'black',
    },
});

const stylesDark = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#393E46',
        padding: 20,
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 2,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#1d2024',
    },
    categoryNameInactive: {
        fontSize: 18,
        color: '#3b9c92',
    },
    categoryNameActive: {
        fontSize: 18,
        color: '#4cd4c5',
    },
});

export default CategoryItem;