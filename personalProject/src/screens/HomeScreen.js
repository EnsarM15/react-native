import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { get } from '../services/api';
import ProductCard from '../components/ProductCard';
import { AuthContext } from '../../App';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    get('products.php').then(setProducts).catch(() => {});
  }, []);

  return (
    <View style={{flex:1}}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gloves</Text>
        <TouchableOpacity onPress={signOut}><Text style={{color:'red'}}>Logout</Text></TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={i => String(i.id)}
        contentContainerStyle={{padding:12}}
        renderItem={({item}) => (
          <ProductCard item={item} onPress={() => navigation.navigate('Product', { product: item })} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header:{height:60,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:12,backgroundColor:'#f5f5f5'},
  headerTitle:{fontSize:18,fontWeight:'bold'},
});