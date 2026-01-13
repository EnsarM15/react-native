import React from "react";
import { StyleSheet,View,Text,FlatList } from "react-native";
import data from "../data/cities.json";

class CitiesScreen extends Comment{
    constructor (props){
        super(props);
        this.state={
            cities:[],
        }
    }

    componentDidMount(){
        this.setState({cities: data})
    }
    renderItem = ({item}) =>{
        const{name,countryCode,population,description}=item;
        return(
            <View style={styles.cardWrapper}>
                <Text style={styles.title}>{name}</Text>
                 <Text style={styles.subtitle}>{countryCode}</Text>
                  <Text style={styles.description}>{description}</Text>
                   <Text style={styles.small}>{population}</Text>
            </View>
        );
    };
    render(){
        return(
            <View>
                <Text style={styles.eglantinBossi}>cities</Text>
                
                <FlatList data={this.state.cities}
                keyExtractor={(item,index)=>
                    item.id ? item.id.toString() :index.toString()
                }></FlatList>
                            </View>
        )
    }
}

export default CitiesScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:16,
  },
  eglantinBossi:{
    fontSize:22,
    fontWeight:"bold",
    marginBottom:12,
    textAlign:"center"
  },
  cardWrapper:{
    backgroundColor:"#666",
    padding:12,
    marginBottom:10,
    borderRadius:8
  },
  title:{
    fontSize:16,
    fontWeight:"bold"
  },
  subtitle:{
    fontSize:14,
    marginTop:6,
    color:"#555"
  },
  description:{
    fontSize:13,
    marginTop:6,
    color:"#555"
  },
  small:{
    marginTop:6,
    fontSize:12,
    color:"#555"
  },

})