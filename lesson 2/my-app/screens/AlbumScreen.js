import React from "react";
import { FlatList ,View,Text} from "react-native-web";
import { StyleSheet } from "react-native/types_generated/index";

class AlbumScreen extends React.Component{
    constructor(props){
        super(props);

        this.state={
            Album:[],
        };
    }
    async componentDidMount(){
        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/albums");
            const jsonData= await response.json();

            this.setState({posts:jsonData});


        }catch(error){
            console.log("Error fetching albums;",error)
        }
        

    }
    render(){
        return(
            <View>
                <FlatList
                data={this.state.Album}
                keyExtractor={(userId)=>item.id.toString()}
                renderItem={({userId})=>
                
                (
                    <View style={Styles.Album}>
                        <br></br>
                        <Text>{item.userId}</Text>
                        
                    </View>
                )
            }
                >


                </FlatList>
            </View>

        )
        
    }

}

export default AlbumScreen;