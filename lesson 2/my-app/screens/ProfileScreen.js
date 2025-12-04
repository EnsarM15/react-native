import React from "react";
import{View} from "react-native-web"
import StudentInfo from "../components/StudentInfo";

function ProfileScreen(){
    return(
        <View>
            <StudentInfo
            fullname={"donjeta"}
            position={"developer"}
            description={"i am a developer"}
            profileImage
            >

            </StudentInfo>
        </View>
    )
}

export default ProfileScreen;