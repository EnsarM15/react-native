import React from "react";
import { FlatList ,View,Text} from "react-native-web";
import { StyleSheet } from "react-native/types_generated/index";

class PostsScreen extends React.Component{
    constructor(props){
        super(props);

        this.state={
            posts:[],
        };
    }
    async componentDidMount(){
        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const jsonData= await response.json();

            this.setState({posts:jsonData});


        }catch(error){
            console.log("Error fetching posts;",error)
        }
        

    }
    render(){
        return(
            <View>
                <FlatList
                data={this.state.posts}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={({item})=>
                
                (
                    <View style={Styles.Posts}>
                        <br></br>
                        <Text>{item.title}</Text>
                        <Text>{item.body}</Text>
                    </View>
                )
                }
                >


                </FlatList>
            </View>

        )
        
    }

}

export default PostsScreen;