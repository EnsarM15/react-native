import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.img} />
      <View style={{flex:1,marginLeft:12}}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card:{flexDirection:'row',padding:12,backgroundColor:'#fff',borderRadius:8,marginBottom:12,elevation:2},
  img:{width:80,height:80,resizeMode:'contain'},
  name:{fontWeight:'600'},
  brand:{color:'#666'},
  price:{marginTop:6,fontWeight:'700'}
});