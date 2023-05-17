import {Text, View, StatusBar, StyleSheet, Button} from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import * as Progress from 'react-native-progress';

const PanelStatItem = (props) => {
    const {isThemeLight,setIsThemeLight,changeTheme} = useContext(ThemeContext);
    
    return(
        <View style={isThemeLight ? styles.container : styles.containerDark}>
            {props.leftSide ?
            <View>
                <Text style={isThemeLight ? styles.title : styles.titleDark}>{props.title}</Text>
            </View>
            :
            <></>
            }
            <View>
                <Progress.Circle
                    size={100}
                    color={isThemeLight ? '#4aabff' : '#2f7d74'}
                    thickness={4}
                    borderWidth={0}
                    progress={props.value}
                    formatText={() => props.content} 
                    textStyle={{alignSelf:'center', fontSize: 32, fontWeight: 'bold'}} 
                    showsText={true}
                /> 
            </View>
            {props.leftSide ?
            <></>
            :
            <View>
                <Text style={isThemeLight ? styles.title : styles.titleDark}>{props.title}</Text>
            </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '10%',
    },
    containerDark: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#232931',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '10%',
    },
    title: {
        fontSize: 20,

    },
    titleDark: {
        fontSize: 20,
        color: '#ccc',
    },
});

export default PanelStatItem;