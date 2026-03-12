import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { register } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function RegistrationScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await register(name, email, password, confirmPassword);
      if (res.success && res.token) {
        Alert.alert('Success', 'Registration successful! Please login with your new account');
        navigation?.navigate('Login');
      } else {
        Alert.alert('Registration failed', res.message || 'Could not register');
      }
    } catch (e) {
      Alert.alert('Error', 'Could not contact server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        editable={!loading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
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
      
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        editable={!loading}
      />
      
      <Button
        title={loading ? 'Registering...' : 'Sign Up'}
        onPress={handleRegister}
        disabled={loading}
      />
      
      <Text style={styles.loginLink} onPress={() => navigation?.navigate('Login')}>
        Already have an account? Log in here
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 8, borderRadius: 6 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  loginLink: { marginTop: 15, color: '#007AFF', textAlign: 'center', textDecorationLine: 'underline' },
});
