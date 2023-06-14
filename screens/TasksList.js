import {Text, View, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity} from 'react-native';
import TaskItem from '../components/TaskItem';
import CategoryItem from '../components/CategoryItem';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import { database } from '../database/database';
import LoadingScreen from './LoadingScreen';
import TasksListFooter from '../components/TasksListFooter';
import CategoriesListFooter from '../components/CategoriesListFooter';

const allCategory = {
    name: 'Wszystkie',
    category_id: 0
}

const TasksList = ({navigation, route}) => {
  const {isThemeLight,setIsThemeLight} = useContext(ThemeContext);

  //kategorie i wybrana kategoria
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  //habity i taski
  const [listData, setListData] = useState([]);

  //stan kontrolujący czy dane są wczytywane
  const [isLoading, setIsLoading] = useState(true);

  //wczytywanie zadań gdy jest to konieczne
  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
          //alert('Refreshed');
          //console.log("params: ", route.params);
          // console.log("route: ", route);
          // if(route.params?.refresh){
          //   console.log("test");
          //   navigation.setParams({refresh: false})
          // }
          loadHabits();
          console.log("Odświeżono");
      });
      return focusHandler;
  }, [navigation]);

  //wczytywanie kategorii
  useEffect(() => {
      loadCategories();
  }, []);

  const loadCategories = async () => {
      const setTemp = (temp) => {
          const tempCategories = temp;
          setCategories(tempCategories);
      }
      database.getAllCategories(setTemp)
  }

  //wczytywanie zadań z wybranej kategorii
  useEffect(() => {
      loadHabits();
  }, [selectedCategory]);

  //funkcja pobierająca dane z bazy
  const loadHabits = async () => {  
    const setTemp = (temp) => {
      const tempHabits = temp;
      setListData(tempHabits);
    }
    setIsLoading(true);
    //await database.getHabitsByCategory(selectedCategory, (result) => console.log("pobrane: ",result))
    await database.getHabitsByCategory(selectedCategory, setTemp)
    .then(setIsLoading(false))
    //.finally(() => console.log("Wyswietlona kategoria o id: " + selectedCategory))
  }


  //funkcje przenoszące użytkownika do innych ekranów
  const goToDetails = (id) => {
      //console.log(id);
      navigation.navigate('Details', {id: id});
  }

  const goToUpdate = (id, name, type) => {
    navigation.navigate('Update', {id: id, name: name, type: type});
  }

  const goToDelete = (category_id, category_name) => {
    console.log(category_id);
    navigation.navigate('Delete', {type: 'category', id: category_id, name: category_name});
  }

  const goToAddTask = () => {
      navigation.navigate('Add', {selectedCategory: selectedCategory});
  }

  const goToAddCategory = () => {
    navigation.navigate('AddCategory');
}

  return (
      <SafeAreaView style={isThemeLight ? styles.containerLight : styles.containerDark}>
          {/* <TouchableOpacity onPress={() => navigation.navigate("Add", {id: 1})}>  //do testów
            <Text style={{fontSize: 42}}>
              DODAJ
            </Text>
          </TouchableOpacity> */}
          <View style={{paddingHorizontal: 5}}>
            <FlatList
              data={categories}
              horizontal={true}
              keyExtractor={item => item.category_id}
              renderItem={({item}) => <CategoryItem item={item} setCategory={setSelectedCategory} selectedCategory={selectedCategory} goToDelete={goToDelete}/>}
              ListHeaderComponent={<CategoryItem item={allCategory} setCategory={setSelectedCategory} selectedCategory={selectedCategory}/>}
              ListHeaderComponentStyle={{flexDirection: 'row'}}
              ListFooterComponent={<CategoriesListFooter addCategory={goToAddCategory}/>}
            />
          </View>
          {isLoading ? 
            <LoadingScreen/>
          :
            <FlatList
              data={listData}
              renderItem={({item}) => <TaskItem item={item} showDetails={goToDetails} updateTask={goToUpdate}/>}
              keyExtractor={item => item.habit_id}
              //ListEmptyComponent={<EmptyTasksListComponent addTask={goToAddTask}/>} //nieaktualne
              refreshing={isLoading}
              onRefresh={() => {loadHabits(); loadCategories();}}
              ListFooterComponent={<TasksListFooter addTask={goToAddTask} tasksExist={listData.length}/>}
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