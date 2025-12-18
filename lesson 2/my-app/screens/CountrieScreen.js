import React, { Component } from "react";
import data from "../data/countries.json";
import { FlatList, View,Text } from "react-native-web";


class CountriesScreen extends Component{
    constructor(props){
        super(props);


        this.state={
            countries:[],
        }
    }


    componentDidMount(){


        // i fetch ose i merr te dhanat prej local JSON file
        this.setState({
            countries:data,
        })
    }


    renderItem =({item})=>{ 
        const {name,country,description } = item;


        return(
            <View>
                <Text>
                    City Name:{name}
                </Text>
                 <Text>
                    Country Name:{country}
                </Text>
                   <Text>
                    {description}
                </Text>
            </View>
        );
    };
       render(){
        return (
            <View>
                <Text> Countries Sceen</Text>



                <FlatList
                    data={this.state.countries}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={this.renderItem}
                >


                </FlatList>


            </View>
        )
    }
    
}


export default CountriesScreen