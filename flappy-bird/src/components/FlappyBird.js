import React from "react";
import { View } from "react-native";

const FlappyBird = (birdBottom) => {
    return (
        <View  style={{
        position: 'absolute',
        width: 50,
        height: 50,
        backgroundColor: 'yellow',
        left: 100,
        bottom: birdBottom
     }}>
   
        </View>
    )
}
export default FlappyBird;