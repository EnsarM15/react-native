import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Swiper from "react-native-swiper";
import Icon from "./components/icon";

const Home = () => {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.swiper}
        showsPagination
        dotColor="#999"
        activeDotColor="#007AFF"
      >
        <View style={styles.slide}>
          <Image
            source={require("../../assets/image1.png")}
            style={styles.slideImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../../assets/image1.jpg")}
            style={styles.slideImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../../assets/image1.jpg")}
            style={styles.slideImage}
            resizeMode="cover"
          />
        </View>
      </Swiper>

      <View style={styles.IconsContainer}>
       <Icon name="cellphone" IconText="iphone"></Icon>
        <Icon name="android" IconText="Samsung"></Icon>
        <Icon name="laptop" IconText="laptop"></Icon>
      </View>

       <View>
       <Icon name="tablet" IconText="tablet"></Icon>
        <Icon name="mouse" IconText="mouse"></Icon>
        <Icon name="keyboard-outile" IconText="laptop"></Icon>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  IconsContainer:{
    width:"90%",
    alignSelf:"center",
    marginTop:30,
    flexDirection:"row",
    justifyContent:"space-between"


  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  swiper: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  slideImage: {
    width: "90%",
    height: "300%",
    borderRadius: 10,
  },
});

export default Home;
