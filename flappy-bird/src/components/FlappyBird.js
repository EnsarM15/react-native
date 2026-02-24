import React from "react";
import { View } from "react-native";


const FlappyBird = ({ FlappyBirdBottom }) => {
  return (
    <View
      style={{
        position: "absolute",
        height: 50,
        backgroundColor: "blue",
        left: 100,
        bottom: FlappyBirdBottom,
      }}
    />
  );
};


export default FlappyBird;