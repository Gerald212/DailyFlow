import {Text, View, StyleSheet, SafeAreaView, SectionList, StatusBar, FlatList, TouchableOpacity} from 'react-native';
import {sampleData, sampleData2, sampleData3, sampleData4} from '../assets/sampleData';
import TaskItem from './TaskItem';
import CategoryItem from './CategoryItem';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import { database } from '../database/database';
import EmptyTasksListComponent from './EmptyTasksListComponent';
import LoadingScreen from '../screens/LoadingScreen';

const allCategory = {
    name: 'Wszystkie',
    category_id: 0
}

const TasksList = ({navigation}) => {
  const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);

  //kategorie i wybrana kategoria
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  //habity i taski
  const [listData, setListData] = useState([]);

  //stan kontrolujący czy dane są wczytywane
  const [isLoading, setIsLoading] = useState(true);

  //wczytywanie kategorii
  useEffect(() => {
      const setTemp = (temp) => {
        const tempCategories = temp;
        setCategories(tempCategories);
      }
      database.getAllCategories(setTemp)
  }, []);

  //wczytywanie zadań z wybranej kategorii
  useEffect(() => {
      const loadHabits = async () => {  
        
        const setTemp = (temp) => {
          const tempHabits = temp;
          setListData(tempHabits);
        }

        await database.getHabitsByCategory(selectedCategory, (result) => console.log("pobrane: ",result))
        await database.getHabitsByCategory(selectedCategory, setTemp)
        .then(setIsLoading(false))
        .finally(() => console.log("Wyswietlona kategoria o id: " + selectedCategory))
      }

      loadHabits();
  }, [selectedCategory]);


  const goToDetails = (id) => {
      //console.log(id);
      navigation.navigate('Details', {id: id});
  }

  const goToUpdate = (id) => {
      //console.log(id);
      navigation.navigate('Update', {id: id});
  }

  const goToAddTask = () => {
      navigation.navigate('Add');
  }


  return (
      <SafeAreaView style={isThemeLight ? styles.containerLight : styles.containerDark}>
          {/* <TouchableOpacity onPress={() => navigation.navigate("Add")}>
            <Text style={{fontSize: 42}}>
              DODAJ
            </Text>
          </TouchableOpacity> */}
          <View style={{paddingHorizontal: 5}}>
            <FlatList
              //data={sampleData4}
              data={categories}
              horizontal={true}
              keyExtractor={item => item.category_id}
              renderItem={({item}) => <CategoryItem item={item} setCategory={setSelectedCategory} selectedCategory={selectedCategory}/>}
              ListHeaderComponent={<CategoryItem item={allCategory} setCategory={setSelectedCategory} selectedCategory={selectedCategory}/>}
              ListHeaderComponentStyle={{flexDirection: 'row'}}
            />
          </View>
          {isLoading ? 
            <LoadingScreen/>
          :
            <FlatList
              data={listData}
              renderItem={({item}) => <TaskItem item={item} showDetails={goToDetails} updateTask={goToUpdate}/>}
              keyExtractor={item => item.habit_id}
              ListEmptyComponent={<EmptyTasksListComponent addTask={goToAddTask}/>}
            />
          }
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