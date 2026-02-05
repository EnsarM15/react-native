import React from "react";
import {View,FlatList,Stylesheet,ScrollView,TouchableOpacity,Text} from "react-native";

import data from "../data/data.json";
import Item from "../components/Item";

class Ios extends React.Component{
    constructor(){
        super();
        this.state = {
            product:[],
        };
    }

    componentDidMount(){
        this.setState({
            prduct:data.ios,
        })
    }
    render(){
        return(
            <ScrollView>
                <View style={Stylesheet.container}>
                    <Text style={Stylesheet.desc}>
                      eglandin baba
                    </Text>
                </View>
                <View style={Stylesheet.productContainer}>
                    <FlatList data={this.state.product}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={({item})=><Item item={item}></Item>}></FlatList>

                </View>

                <TouchableOpacity style={Stylesheet.btn}>
                    <Text style={Stylesheet.btnText}> view more</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}
export default Ios

const Stylesheet = Stylesheet.create({
    container:{
        padding:15,
    },
    desc:{
        marginBottom:15,
        fontSize:14,
    },
    productContainer:{
        marginBottom:20
    },
    btn:{
        backgroundColor:"#2f3b52",
        padding:12,
        borderRadius:"center"
    },
    btnText:{
        color:"#fff"
    }
})