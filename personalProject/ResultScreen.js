import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ResultScreen({ message, onNewGame }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Result</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onNewGame}>
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121213', padding: 16 },
  title: { fontSize: 28, color: '#fff', marginBottom: 20, fontWeight: 'bold' },
  message: { fontSize: 18, color: '#fff', marginBottom: 30, textAlign: 'center' },
  button: { backgroundColor: '#6aaa64', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 6 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});