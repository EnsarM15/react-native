

import React, { useState, useContext } from 'react';

import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { login } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success && res.token) {
        signIn(res.token, res.user);
        Alert.alert('Success', 'Login successful!');
      } else {
        Alert.alert('Login failed', res.message || 'Invalid credentials');
      }
    } catch (e) {
      Alert.alert('Error', 'Could not contact server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goalkeeper Gloves Store</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />
      <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
      <Text style={styles.registerLink} onPress={() => navigation?.navigate('Register')}>
        Don't have an account? Sign up here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 8, borderRadius: 6 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  registerLink: { marginTop: 15, color: '#007AFF', textAlign: 'center', textDecorationLine: 'underline' },
});