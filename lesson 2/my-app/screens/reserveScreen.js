import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-web";

export default function reserveScreen({ navigation }) {
  return (

    <Button
      
    title="go to reserve screen"
    onPress={()=> navigation.navigate("Main")}></Button>
  );
}