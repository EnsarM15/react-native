import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import swiper from 'react-native-swiper';
import Swiper from "react-native-swiper";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
     
    <Swiper 
    style={styles.swiper}
    showsPagination
    dotColor="#999"
    activeDotColor="#007AFF"
    >
      <View style={styles.slide}>
        <Image source={require('../assets/image1.png')}
        style={styles.slideImage}
        resizeMode="cover"
    
        ></Image>
        </View>
        <View style={styles.slide}>
        
         <Image source={require('../assets/image2.png')}
        style={styles.slideImage}
        resizeMode="cover"

        ></Image>
        </View>
         <View style={styles.slide}>
         <Image source={require('../assets/image3.png')}
          style={styles.slideImage}
          resizeMode="cover"
        >


        </Image>
        </View>
      
    </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9b2222ff",
  },
  swiper: {
   flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slideImage:{
    width: '100%',
    height: '100%',
    borderRadius: 8,
  }
 
});

export default Home;
