import react from "react";
import { Text,StyleSheet,View } from "react-native";


const BoxScreen =()=>{
    return(
     <View style={styles.container}>
        <Text style={styles.title}> flex direction:"row"</Text>

        <View style={styles.boxArea}>
            <View style={[styles.box,{backgroundColor:"powderblue"}]}>1</View>
            <View style={[styles.box,{backgroundColor:"skyblue"}]}>2</View>
            <View style={[styles.box,{backgroundColor:"darkblue"}]}>3</View>
        </View>
     </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:40,
        alignItems:"center",
        backgroundColor:"#dfdbdbff"
    },

    title:{
        fontSize:20,
        marginBottom:12,
    },

    boxArea:{
        width:"95%",

        backgroundColor:"#d3d3dbff",
        justifyContent:"center",//flex
        paddingHorizontal:10,
        flexDirection:"row-reverse", //row //row-reverse
        alignItems:"center",
    },
    box:{
        width:50,
        height:50,
    }
})
export default BoxScreen