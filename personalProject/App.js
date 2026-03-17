import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default function App() {
  const [view, setView] = useState('home');
  const [quizzes, setQuizzes] = useState([
    {
      id: '1',
      title: 'JS Basics',
      description: 'JS syntax and core concepts',
      questions: [
        { id: 'q1', question: 'Which keyword declares a constant in JS?', options: ['var', 'let', 'const', 'function'], answer: 'const' },
        { id: 'q2', question: 'What is the type of NaN?', options: ['number', 'string', 'object', 'undefined'], answer: 'number' },
        { id: 'q3', question: 'Which method converts a string to an integer?', options: ['parseInt', 'toString', 'Math.floor', 'parseFloat'], answer: 'parseInt' },
      ],
    },
    {
      id: '2',
      title: 'Python Basics',
      description: 'Python foundational knowledge',
      questions: [
        { id: 'q1', question: 'What symbol starts a comment in Python?', options: ['//', '#', '<!--', '%'], answer: '#' },
        { id: 'q2', question: 'Which data type is immutable?', options: ['list', 'set', 'tuple', 'dict'], answer: 'tuple' },
        { id: 'q3', question: 'How do you create a list?', options: ['{}', '[]', '()', '<>'], answer: '[]' },
      ],
    },
    {
      id: '3',
      title: 'HTML & CSS',
      description: 'Web styling and markup',
      questions: [
        { id: 'q1', question: 'What tag is used for a paragraph?', options: ['<div>', '<p>', '<span>', '<a>'], answer: '<p>' },
        { id: 'q2', question: 'Which property changes text color?', options: ['font-color', 'color', 'text-color', 'font'], answer: 'color' },
        { id: 'q3', question: 'How do you add an external stylesheet?', options: ['<css>', '<link rel="stylesheet" href="...">', '<style src="...">', '<script src="...">'], answer: '<link rel="stylesheet" href="...">' },
      ],
    },
    {
      id: '4',
      title: 'React Native',
      description: 'Mobile app building blocks',
      questions: [
        { id: 'q1', question: 'Which core component is used for layout in React Native?', options: ['div', 'View', 'Container', 'Layout'], answer: 'View' },
        { id: 'q2', question: 'How do you style in React Native?', options: ['CSS file', 'StyleSheet.create', 'inline CSS', 'styled-components only'], answer: 'StyleSheet.create' },
        { id: 'q3', question: 'Which component handles touch events?', options: ['TextInput', 'TouchableOpacity', 'View', 'Image'], answer: 'TouchableOpacity' },
      ],
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newQuestions, setNewQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [newAnswer, setNewAnswer] = useState('');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lastResult, setLastResult] = useState(null);

  const startQuiz = quiz => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setScore(0);
    setLastResult(null);
    setView('quiz');
  };

  const handleAnswer = option => {
    const question = activeQuiz.questions[currentQuestionIndex];
    const correct = option === question.answer;
    const nextScore = correct ? score + 1 : score;
    if (correct) setScore(nextScore);
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= activeQuiz.questions.length) {
      const total = activeQuiz.questions.length;
      const percent = Math.round((nextScore / total) * 100);
      let rank = 'Beginner';
      if (percent >= 90) rank = 'Master';
      else if (percent >= 75) rank = 'Expert';
      else if (percent >= 50) rank = 'Intermediate';

      setLastResult({
        quizTitle: activeQuiz.title,
        correct: nextScore,
        total,
        percent,
        rank,
      });
      setActiveQuiz(null);
      setView('rank');
      return;
    }
    setCurrentQuestionIndex(nextIndex);
  };

  const addQuestion = () => {
    if (!newQuestionText || newOptions.some(o => !o) || !newAnswer) {
      Alert.alert('Validation error', 'Fill all question fields before adding.');
      return;
    }
    if (!['A', 'B', 'C', 'D'].includes(newAnswer.toUpperCase())) {
      Alert.alert('Validation error', 'Correct answer must be A, B, C or D.');
      return;
    }

    const question = {
      id: Date.now().toString(),
      question: newQuestionText,
      options: [...newOptions],
      answer: newAnswer.toUpperCase(),
    };

    setNewQuestions(prev => [...prev, question]);
    setNewQuestionText('');
    setNewOptions(['', '', '', '']);
    setNewAnswer('');
  };

  const addQuiz = () => {
    if (!newTitle || !newDescription || newQuestions.length === 0) {
      Alert.alert('Validation error', 'Provide title, description, and at least one question.');
      return;
    }

    const quiz = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDescription,
      questions: newQuestions,
    };

    const updated = [...quizzes, quiz];
    persistQuizzes(updated);

    setNewTitle('');
    setNewDescription('');
    setNewQuestions([]);
    setNewQuestionText('');
    setNewOptions(['', '', '', '']);
    setNewAnswer('');
    setView('home');
  };

  const renderHome = () => (
    <View style={styles.container}>
      <Text style={styles.heading}>Programming Languages Quiz App</Text>
      <Button title="Create a new quiz" onPress={() => setView('create')} />
      <View style={{ height: 10 }} />
      <Button title="About this app" onPress={() => setView('about')} color="#4a5568" />
      <Text style={styles.subheading}>Available quizzes</Text>
      <FlatList
        data={quizzes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.quizCard} onPress={() => startQuiz(item)}>
            <Text style={styles.quizTitle}>{item.title}</Text>
            <Text style={styles.quizMeta}>{item.questions.length} question(s)</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderCreate = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Create Quiz</Text>
      <TextInput style={styles.input} placeholder="Quiz Title" value={newTitle} onChangeText={setNewTitle} />
      <TextInput style={styles.input} placeholder="Quiz Description" value={newDescription} onChangeText={setNewDescription} />
      <Text style={styles.subheading}>New Question</Text>
      <TextInput style={styles.input} placeholder="Question text" value={newQuestionText} onChangeText={setNewQuestionText} />
      {newOptions.map((opt, i) => (
        <TextInput
          key={i}
          style={styles.input}
          placeholder={`Option ${String.fromCharCode(65 + i)}:`}
          value={opt}
          onChangeText={text => {
            const next = [...newOptions];
            next[i] = text;
            setNewOptions(next);
          }}
        />
      ))}
      <TextInput style={styles.input} placeholder="Correct answer (A/B/C/D)" value={newAnswer} onChangeText={setNewAnswer} />
      <Button title="Add question" onPress={addQuestion} />

      {newQuestions.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <Text style={styles.subheading}>Questions added:</Text>
          {newQuestions.map((q, i) => (
            <View key={q.id} style={styles.questionItem}>
              <Text style={{ color: '#edf2f7' }}>{i + 1}. {q.question}</Text>
            </View>
          ))}
        </View>
      )}

      <Button title="Save quiz" onPress={addQuiz} />
      <Button title="Back" onPress={() => setView('home')} color="#555" />
    </ScrollView>
  );

  const renderQuiz = () => {
    const q = activeQuiz.questions[currentQuestionIndex];
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{activeQuiz.title}</Text>
        <Text style={styles.question}>{q.question}</Text>
        {q.options.map(option => (
          <TouchableOpacity key={option} style={styles.optionButton} onPress={() => handleAnswer(option)}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.score}>Score: {score}/{activeQuiz.questions.length}</Text>
      </View>
    );
  };

  const renderRank = () => (
    <View style={styles.container}>
      <Text style={styles.heading}>Quiz Results</Text>
      {lastResult ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Quiz: {lastResult.quizTitle}</Text>
          <Text style={styles.resultText}>Score: {lastResult.correct} / {lastResult.total}</Text>
          <Text style={styles.resultText}>Accuracy: {lastResult.percent}%</Text>
          <Text style={styles.resultText}>Rank: {lastResult.rank}</Text>
        </View>
      ) : (
        <Text style={styles.resultText}>No results yet.</Text>
      )}
      <Button title="Back to home" onPress={() => setView('home')} />
      <Button title="Try another quiz" onPress={() => setView('home')} color="#4a5568" />
    </View>
  );

  const renderAbout = () => (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={styles.heading}>About This Quiz App</Text>
      <Text style={styles.aboutText}>
        This is a React Native quiz app for programming languages. You can choose from prebuilt quizzes in JavaScript,
        Python, HTML & CSS, and React Native. You can also create your own quiz with a custom question and answers.
      </Text>
      <Text style={styles.aboutText}>
        Built without TypeScript, only React Native components and simple state management using useState. No backend
        connection is needed for this demo version.
      </Text>
      <Text style={styles.aboutText}>
        Use the "Create a new quiz" button to add your own quiz instantly, and tap a quiz card to play.
      </Text>
      <Button title="Back to home" onPress={() => setView('home')} />
    </ScrollView>
  );

  return view === 'home'
    ? renderHome()
    : view === 'create'
    ? renderCreate()
    : view === 'about'
    ? renderAbout()
    : view === 'rank'
    ? renderRank()
    : renderQuiz();
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, backgroundColor: '#1a202c' },
  heading: { fontSize: 26, fontWeight: 'bold', marginBottom: 12, textAlign: 'center', color: '#f8fafc' },
  subheading: { fontSize: 18, marginTop: 16, marginBottom: 8, color: '#cbd5e1' },
  quizCard: { backgroundColor: '#2d3748', marginBottom: 10, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#4a5568' },
  quizTitle: { fontSize: 20, fontWeight: '700', color: '#e2e8f0' },
  questionItem: { backgroundColor: '#1f2937', padding: 10, borderRadius: 8, marginTop: 6 },
  input: { borderWidth: 1, borderColor: '#4a5568', borderRadius: 8, padding: 12, marginBottom: 10, backgroundColor: '#2d3748', color: '#e2e8f0' },
  question: { fontSize: 20, marginBottom: 16, textAlign: 'center', color: '#edf2f7', fontWeight: '600' },
  quizMeta: { color: '#a0aec0', marginTop: 4 },
  resultBox: { backgroundColor: '#2a4365', borderRadius: 10, padding: 14, marginBottom: 16 },
  resultText: { color: '#e2e8f0', fontSize: 18, marginBottom: 6 },
  optionButton: { backgroundColor: '#38b2ac', marginBottom: 10, borderRadius: 8, padding: 14 },
  optionText: { color: '#1a202c', fontWeight: '700', textAlign: 'center', fontSize: 16 },
  score: { marginTop: 18, fontSize: 17, textAlign: 'center', color: '#9ae6b4' },
  aboutText: { color: '#e2e8f0', fontSize: 16, marginBottom: 12, lineHeight: 24 },
});

