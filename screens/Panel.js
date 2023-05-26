import {Text, View, StatusBar, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import PanelStatItem from '../components/PanelStatItem';
import * as Progress from 'react-native-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Panel = () => {
  const {isThemeLight,setIsThemeLight,changeTheme} = useContext(ThemeContext);
  const [showStats, setShowStats] = useState(true);

    return(
      <>
        <View style={isThemeLight ? styles.panelsBar : styles.panelsBarDark}>
          <TouchableOpacity 
            style={isThemeLight ? styles.panelsBarButton : styles.panelsBarButtonDark}
            onPress={()=>setShowStats(true)}
          >
            <Ionicons
                name="pie-chart-outline"
                color={
                  isThemeLight ? 
                    showStats ? 'black' : 'lightgrey'
                  : 
                    showStats ? 'white' : '#ccc'
                }
                size={36}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={isThemeLight ? styles.panelsBarButton : styles.panelsBarButtonDark}
            onPress={()=>setShowStats(false)}
          >
            <Ionicons
                name="information-circle-outline"
                color={
                  isThemeLight ? 
                    showStats ? 'lightgrey' : 'black'
                  : 
                    showStats ? '#ccc' : 'white'
                }
                size={36}
            />
          </TouchableOpacity>

        </View>
        {showStats ?
          <View style={isThemeLight ? styles.container : styles.containerDark}>
              {/* <Text style={isThemeLight ? styles.text : styles.textDark}>Pozostałe</Text> */}
              <View style={{flex:1}}>          
                <PanelStatItem value={1} content={5} title={"najdluższe coś"} leftSide={false}/>
                <PanelStatItem value={1} content={7} title={"liczba taskow?"} leftSide={true}/>
                <PanelStatItem value={1} content={16} title={"liczba habitow?"} leftSide={false}/>
                <PanelStatItem value={0.8} content={"80%"} title={"średnie cośtam"} leftSide={true}/>
                <PanelStatItem value={0.54} content={"54%"} title={"jescze cos cośtam"} leftSide={false}/>
              </View>
          </View>
          :
          <View style={isThemeLight ? styles.containerInfo : styles.containerInfoDark}>
            <Text>Info</Text>
          </View>
        }
      </>
          
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    containerDark: {
      flex: 1,
      backgroundColor: '#232931',
      justifyContent: 'center',
    },
    containerInfo: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerInfoDark: {
      flex: 1,
      backgroundColor: '#232931',
      justifyContent: 'center',
      alignItems: 'center',
    },
    panelsBar: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: '#fff',
    },
    panelsBarDark: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: '#232931',
    },
    panelsBarButton: {
      justifyContent: 'center',
      alignItems:'center',
      //borderBottomWidth: 1,
      // borderRightWidth: 1,
      // borderColor: 'lightgray',
      paddingVertical: 5,
      paddingHorizontal: '20%',
    },
    panelsBarButtonDark: {
      justifyContent: 'center',
      alignItems:'center',
      //borderBottomWidth: 1,
      // borderRightWidth: 1,
      // borderColor: 'gray',
      paddingVertical: 5,
      paddingHorizontal: '20%',
    },
    text: {
        fontSize: 16,
    },
    textDark: {
        fontSize: 16,
        color: '#3b9c92',
    },
});

export default Panel;