import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import ResultScreen from './ResultScreen';

const WORD_LIST = [
  'REACT', 'NATIVE', 'MOBILE', 'GAMES', 'WORDLE', 'STYLE', 'LOGIC', 'SOLVE',
  'BRAIN', 'HAPPY', 'GUESS', 'PHONE', 'SMART', 'QUICK', 'WORDS', 'DAILY'
];

const getRandomWord = () => WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

export default function App() {
  const [word, setWord] = useState(getRandomWord());
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState('');
  const [screen, setScreen] = useState('game');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const handleLetterPress = (letter) => {
    if (gameOver || won || currentGuess.length >= 5) return;
    setCurrentGuess(currentGuess + letter);
  };

  const handleBackspace = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const handleSubmit = () => {
    if (currentGuess.length !== 5) {
      setMessage('Word must be 5 letters!');
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);

    if (currentGuess === word) {
      setWon(true);
      setGameOver(true);
      setMessage(`You won! The word was ${word}`);
      setScreen('result');
      return;
    }

    if (newGuesses.length >= 6) {
      setGameOver(true);
      setMessage(`Game Over! The word was ${word}`);
      setScreen('result');
      return;
    }

    setCurrentGuess('');
    setMessage('');
  };

  const login = async () => {
    setAuthError('');
    if (!email || !password) {
      setAuthError('Email and password required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1/backend/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success) {
        setIsLoggedIn(true);
        setScreen('game');
        setMessage('');
      } else {
        setAuthError(data.message || 'Login failed');
      }
    } catch (error) {
      setAuthError('Unable to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    setAuthError('');
    if (!name || !email || !password || !confirmPassword) {
      setAuthError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setAuthError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1/backend/registration.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
      const data = await response.json();

      if (data.success) {
        setAuthMode('login');
        setAuthError('Registration success. Please login.');
      } else {
        setAuthError(data.message || 'Registration failed');
      }
    } catch (error) {
      setAuthError('Unable to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  const resetGame = () => {
    setWord(getRandomWord());
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setWon(false);
    setMessage('');
    setScreen('game');
  };

  const getLetterColor = (letter) => {
    if (!guesses.length) return '#888';
    
    for (let guess of guesses) {
      if (guess.includes(letter)) {
        if (guess[word.indexOf(letter)] === letter && word.includes(letter)) {
          return '#6aaa64'; // Green
        }
        if (word.includes(letter)) {
          return '#c9b458'; // Yellow
        }
        return '#3a3a3c'; // Gray
      }
    }
    return '#888';
  };

  const getGuessRowColor = (guessIndex, letterIndex) => {
    const guess = guesses[guessIndex];
    if (!guess) return '#1e1b16'; // Empty row
    
    const letter = guess[letterIndex];
    if (!letter) return '#1e1b16'; // Empty tile

    if (letter === word[letterIndex]) return '#6aaa64'; // Green - correct position
    if (word.includes(letter)) return '#c9b458'; // Yellow - wrong position
    return '#3a3a3c'; // Gray - not in word
  };

  if (!isLoggedIn) {
    const isRegister = authMode === 'register';
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{isRegister ? 'Register' : 'Login'}</Text>

        {isRegister && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor="#bbb"
              style={styles.input}
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor="#bbb"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#bbb"
            style={styles.input}
            secureTextEntry
          />
        </View>

        {isRegister && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
              placeholderTextColor="#bbb"
              style={styles.input}
              secureTextEntry
            />
          </View>
        )}

        {authError ? <Text style={styles.authError}>{authError}</Text> : null}

        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={isRegister ? register : login}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? (isRegister ? 'Registering...' : 'Logging in...') : (isRegister ? 'Register' : 'Login')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#444', marginTop: 12 }]}
          onPress={() => {
            setAuthMode(isRegister ? 'login' : 'register');
            setAuthError('');
          }}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{isRegister ? 'Already have an account? Login' : 'No account? Register'}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (screen === 'result') {
    return <ResultScreen message={message || 'Game over'} onNewGame={resetGame} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>WORDLE</Text>
      
      {/* Game Board */}
      <View style={styles.board}>
        {Array(6).fill(0).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {Array(5).fill(0).map((_, colIndex) => {
              const letter = guesses[rowIndex]?.[colIndex] || '';
              const isCurrentRow = rowIndex === guesses.length;
              const bgColor = isCurrentRow ? '#1e1b16' : getGuessRowColor(rowIndex, colIndex);
              
              return (
                <View key={colIndex} style={[styles.tile, { backgroundColor: bgColor }]}>
                  <Text style={styles.tileText}>
                    {isCurrentRow ? currentGuess[colIndex] || '' : letter}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      {/* Message */}
      {message && <Text style={styles.message}>{message}</Text>}

      {/* Keyboard */}
      <View style={styles.keyboard}>
        <View style={styles.keyRow}>
          {alphabet.slice(0, 10).map(letter => (
            <TouchableOpacity
              key={letter}
              style={[styles.key, { backgroundColor: getLetterColor(letter) }]}
              onPress={() => handleLetterPress(letter)}
              disabled={gameOver || won}
            >
              <Text style={styles.keyText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.keyRow}>
          {alphabet.slice(10, 19).map(letter => (
            <TouchableOpacity
              key={letter}
              style={[styles.key, { backgroundColor: getLetterColor(letter) }]}
              onPress={() => handleLetterPress(letter)}
              disabled={gameOver || won}
            >
              <Text style={styles.keyText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={[styles.keyRow, { justifyContent: 'center', gap: 8 }]}>
          {alphabet.slice(19).map(letter => (
            <TouchableOpacity
              key={letter}
              style={[styles.key, { backgroundColor: getLetterColor(letter) }]}
              onPress={() => handleLetterPress(letter)}
              disabled={gameOver || won}
            >
              <Text style={styles.keyText}>{letter}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.key, styles.backspaceKey]} onPress={handleBackspace}>
            <Text style={styles.keyText}>⌫</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, !gameOver && !won && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={gameOver || won}
        >
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
        {(gameOver || won) && (
          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetGame}>
            <Text style={styles.buttonText}>NEW GAME</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121213',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
    letterSpacing: 4,
  },
  board: {
    alignSelf: 'center',
    marginBottom: 24,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    gap: 6,
  },
  tile: {
    width: 50,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3a3a3c',
  },
  tileText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  message: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
    fontWeight: '500',
  },
  keyboard: {
    marginBottom: 20,
    gap: 8,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  key: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 4,
    minWidth: 32,
    alignItems: 'center',
  },
  backspaceKey: {
    paddingHorizontal: 12,
  },
  keyText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 12,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#6aaa64',
    borderRadius: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  resetButton: {
    backgroundColor: '#3a3a3c',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    color: '#fff',
    marginBottom: 4,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#1e1b16',
    color: '#fff',
    width: '100%',
  },
  authError: {
    color: '#ff5555',
    textAlign: 'center',
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: '#1f8cff',
  },
});


