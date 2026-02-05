import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Ios from "../screens/Ios";

const stack = createStackNavigator();

const IosStackNavigator=()=>{
    return(
        <stack.Navigator>
            <stack.Screen
            name="iOS"
            component={Ios}
            options={
                {
                    headerStyle:{
                        backgroundColor:"#2f3b52"
                    },
                    headerTintColor:"#fff"
                }
            }>

            </stack.Screen>
        </stack.Navigator>
    )
}
export default IosStackNavigator;