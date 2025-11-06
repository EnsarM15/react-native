import React from "react";
import { Text , Stylesheet, View } from "react-native-web";

const MainScreen=()=>{
    return(
        <View style={styles.container}>
            <Text style={Stylesheet.textStyle}>this is main screen 2</Text>
        </View>
    );
};

const styles = StyleSheet.create({
   container={
    flex=1;
    backgroundColor: "red";
    alignItems:"center"
   }

    textStyle:{
        fontSize:30,
    },
})

export default MainScreen2