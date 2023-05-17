import {Text, View, StyleSheet, SafeAreaView, SectionList, StatusBar, FlatList} from 'react-native';
import {sampleData, sampleData2, sampleData3, sampleData4} from '../assets/sampleData';
import TaskItem from './TaskItem';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

// const renderItem = ({item}) => {
//     return(
//         <TaskItem item={item}/>
//     );
// }

// const renderSectionHeader = ({title}) => {
//     return(
//         <>
//             <Text style={isThemeLight ? styles.header : styles.headerDark}>{title}</Text>
//         </>
//     );
// }

const TasksList = () => {
  const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);
  const tasks = sampleData2;

  return (
      <SafeAreaView style={isThemeLight ? styles.containerLight : styles.containerDark}>
          {/* <SectionList
              sections={tasks}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => <TaskItem item={item}/>}
              renderSectionHeader={({section: {title}}) => <Text style={isThemeLight ? styles.header : styles.headerDark}>{title}</Text>}
          /> */}
          <FlatList
            data={sampleData4}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({item}) => <Text>{item.name}   </Text>}
          />
          <FlatList
            data={sampleData3}
            renderItem={({item}) => <TaskItem item={item}/>}
            keyExtractor={item => item.id}
          />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    containerLight: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: StatusBar.currentHeight,
      //marginHorizontal: 16,
    },
    containerDark: {
      flex: 1,
      backgroundColor: '#232931',
      paddingTop: StatusBar.currentHeight,
      //marginHorizontal: 16,
    },
    header: {
      fontSize: 32,
      alignSelf: 'center',
      marginTop: 8,
    },
    headerDark: {
      fontSize: 32,
      alignSelf: 'center',
      color: '#ccc',
      marginTop: 8,
    },
});

export default TasksList;