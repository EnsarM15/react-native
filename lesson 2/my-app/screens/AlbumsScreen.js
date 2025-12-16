import React from "react";
import { FlatList ,View,Text,StyleSheet} from "react-native";



class AlbumsScreen extends React.Component{
    constructor(props){
        super(props);

        this.state={
            albums:[],
        };
    }
    async componentDidMount(){
        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/albums");
            const jsonData= await response.json();

            this.setState({albums:jsonData});


        }catch(error){
            console.log("Error fetching albums;",error)
        }
        

    }
    render(){
        return(
            <View>
                <FlatList
                data={this.state.albums}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={({item})=> 
                
                (
                    <View  style={styles.card}>
                        <br></br>
                        <Text>{item.title}</Text>
                        
                    </View>
                )
            }
                >


                </FlatList>
            </View>

        )
        
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1033beff",
        paddingHorizontal: 12,
        paddingTop: 12,
    },
    card: {
        backgroundColor: "#990505ff",
        borderRadius: 8,
        elevation: 2,
        shadowColor: "#191bafff",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        padding: 12,
        spaceAround: 10,
    },
    cardContent: {
        flexDirection: "column",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2049a1ff",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 13,
        color: "#6B7280",
    },
    separator: {
        height: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 40,
    },
    emptyText: {
        color: "#6B7280",
        fontSize: 16,
    },
});

export default AlbumsScreen;