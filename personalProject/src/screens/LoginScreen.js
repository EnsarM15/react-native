import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { post } from '../services/api';
import { AuthContext } from '../../App';

export default function LoginScreen() {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const res = await post('login.php', { email, password });
      if (res.success && res.token) {
        signIn(res.token);
      } else {
        Alert.alert('Login failed', res.message || 'Invalid credentials');
      }
    } catch (e) {
      Alert.alert('Error', 'Could not contact server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goalkeeper Gloves Store</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput secureTextEntry style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',padding:20},
  input:{borderWidth:1,borderColor:'#ccc',padding:10,marginVertical:8,borderRadius:6},
  title:{fontSize:20,fontWeight:'bold',textAlign:'center',marginBottom:12},
});