import React, { useContext } from 'react';
import { View, Text, Image, Button, Alert, StyleSheet } from 'react-native';
import { post } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function ProductScreen({ route }) {
  const { product } = route.params;
  const { token } = useContext(AuthContext);

  const buy = async () => {
    try {
      const res = await post('purchase.php', { token, product_id: product.id, quantity: 1 });
      if (res.success) {
        Alert.alert('Success', 'Purchase completed');
      } else {
        Alert.alert('Error', res.message || 'Could not purchase');
      }
    } catch (e) {
      Alert.alert('Error', 'Server error');
    }
  };

  return (
    <View style={{flex:1,padding:16}}>
      <Image source={{ uri: product.image }} style={{width:'100%',height:200,resizeMode:'contain'}} />
      <Text style={{fontSize:20,fontWeight:'bold',marginTop:12}}>{product.name}</Text>
      <Text style={{marginVertical:8}}>Brand: {product.brand}</Text>
      <Text style={{fontSize:18,fontWeight:'600'}}>${product.price}</Text>
      <View style={{marginTop:16}}>
        <Button title="Buy" onPress={buy} />
      </View>
    </View>
  );
}