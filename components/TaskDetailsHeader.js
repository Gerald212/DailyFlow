import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { ThemeContext } from '../ThemeContext';
import { useContext } from 'react';

const TaskDetailsHeader = ({update}) => {
    const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);

    return(
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 20,
            paddingVertical: 10
            }}
        >
            <TouchableOpacity
                style={{marginRight: 20}}
                onPress={() => update()}
            >
                <MaterialIcons
                    name="update"
                    color={isThemeLight ? '#4aabff' : '#2f7d74'}
                    size={36}
                />
          </TouchableOpacity>
          <TouchableOpacity
                //style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() => alert("Czy na pewno chcesz usunąć?")}
            >
                <Ionicons
                    name="trash-outline"
                    color='darkred'
                    size={36}
                />
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingRight: 20,
        paddingVertical: 10,
    }
});

export default TaskDetailsHeader;