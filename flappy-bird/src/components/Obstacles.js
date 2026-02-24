import React from "react";
import { View } from "react-native";

const Obsatcles = (
    {
        color,
        ObstacleWidth,
        obstacleHeight,
        gap,
        obstacleLeft,
        randomBottom
    }
)=> {
    return (
        <>
        <View
        style={{
            position: 'absolute',
            backgroundColor: color,
            width: ObstacleWidth,
            height: 500,
            left: obstacleLeft,
            bottom: randomBottom + gap + obstacleHeight
        }}
    >

        </View>
        
            <View
        style={{
            position: 'absolute',
            backgroundColor: color,
            width: ObstacleWidth,
            height: obstacleHeight,
            left: obstacleLeft,
            bottom: randomBottom 
        }}
    >

        </View>
        </>
    )
};
export default Obsatcles;