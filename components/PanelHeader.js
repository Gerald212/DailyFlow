import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../ThemeContext';
import { useContext } from 'react';

const PanelHeader = () => {
    const {isThemeLight,setIsThemeLight,changeTheme} = useContext(ThemeContext);

    return(
        <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingVertical: 10,
        }}>
            <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={changeTheme}
            >
            {isThemeLight ? 
                <Ionicons
                    name="moon-outline"
                    color='gray'
                    size={36}
                />
                :
                <Ionicons
                    name="sunny-outline"
                    color='#ccc'
                    size={36}
                />
            }
          </TouchableOpacity>
        </View>
    );
}

export default PanelHeader;