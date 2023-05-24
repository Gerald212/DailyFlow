import { View, ActivityIndicator, StyleSheet, Text} from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const LoadingScreen = () => {
    const {isThemeLight} = useContext(ThemeContext);
    const styles = isThemeLight ? stylesLight : stylesDark;

    return(
        <View style={styles.container}>
            <ActivityIndicator size={100} color={"#2f7d74"}/>
            <Text style={styles.text}>Ładowanie...</Text>
        </View>
    );
}

const stylesLight = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 16,
      color: 'black'
    },
});

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232931',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: '#ccc'
  },
});

export default LoadingScreen;