// App.js
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import reserveScreen from "./screens/reserveScreen";


import MainScreen from "./screens/MainScreen";

import ListScreen from "./screens/ListScreen"; // 👈 like ListScreen in the example
import StudentDetail from "./components/StudentDetail";
import StudentScreen from "./screens/StudentScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
   //  <NavigationContainer>
    // <Stack.Navigator
    //    initialRouteName="Main"
  //      screenOptions={{
  //       title: "App",
   //     }}
   //   >
    //    <Stack.Screen name="Main" component={MainScreen} />

      //   <Stack.Screen name="List" component={ListScreen} />
      //    <Stack.Screen name="reserve" component={reserveScreen} />
  //    </Stack.Navigator>

     // <StatusBar style="auto" />
   //  </NavigationContainer>
    <StudentScreen></StudentScreen>
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
