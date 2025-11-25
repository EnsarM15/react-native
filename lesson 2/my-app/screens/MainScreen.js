import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-web";

export default function MainScreen({ navigation }) {
  return (
      <View>


          <Button
            style={styles.MainBtn}
          title="go to list screen"
          onPress={()=> navigation.navigate("List")}></Button>

            <Button
            style={styles.reserveBtn}
           title="go to reserve screen"
           onPress={()=> navigation.navigate("reserve")}>

          </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  
  MainBtn :{
    backgroundColor:"Red",
    borderRadius:50,
    
  },
});
