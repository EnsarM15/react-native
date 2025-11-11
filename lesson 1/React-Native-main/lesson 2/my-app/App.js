import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./components/mainScreen";
import MainScreen2 from "./components/mainScreen2";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigatior>
    <Stack.Screen name="Home screen" component={HomeScreen}></Stack.Screen>
    </Stack.Navigatior>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
