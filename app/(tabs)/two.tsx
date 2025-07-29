import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';

interface Task {
  id: string;
  text: string;
  done: boolean;
}

export default function TabTwoScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [cheerMessage, setCheerMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const confettiRef = useRef<ConfettiCannon>(null);

  const cheerMessages = [
    'Hyvin tehty!',
    'Mahtavaa työtä!',
    'Jes, yksi juttu vähemmän!',
    'Loistavaa edistystä!',
    'Olet huippu!',
    'Jatka samaan malliin!',
    'Tämä on upeaa!',
    'Teit sen!',
    'Olet liekeissä 🔥',
    '💪 Upea suoritus!',
  ];

  function getRandomCheer(): string {
    const index = Math.floor(Math.random() * cheerMessages.length);
    return cheerMessages[index];
  }

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);
  
  const loadTasks = async () => {
    try {
      const saved = await AsyncStorage.getItem('@tasks');
      if (saved) setTasks(JSON.parse(saved));
    } catch (e) {
      console.error('Tehtävien lataus epäonnistui');
    }
  };
  
  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Tehtävien tallennus epäonnistui');
    }
  };

  const addTask = () => {
    if (input.trim() === '') return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: input.trim(),
      done: false,
    };

    setTasks(prev => [newTask, ...prev]);
    setInput('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);

    const randomMsg = cheerMessages[Math.floor(Math.random() * cheerMessages.length)];
    setMessage(randomMsg);
    setShowMessage(true);
    confettiRef.current?.start();

    setTimeout(() => {
      setShowMessage(false);
    }, 2500);
  };

  const renderItem = ({ item }: { item: Task }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={400}
      style={styles.taskItem}
    >
      <TouchableOpacity onPress={() => toggleTask(item.id)} style={{ flex: 1 }}>
        <Text style={[styles.taskText, item.done && styles.taskDone]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // pieni poistoanimaatio
          setTasks(prev =>
            prev.filter(task => task.id !== item.id)
          );
          setShowConfetti(true);
          setCheerMessage(getRandomCheer());
          setTimeout(() => {
            setShowConfetti(false);
            setCheerMessage('');
          }, 2500);
        }}
      >
        <Ionicons name="checkmark-circle-outline" size={24} color="#0080000" />
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Tehtävälista</Text>

      <View style={styles.inputContainer}>
        <TextInput
        placeholder='Kirjoita uusi tehtävä...'
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Lisää</Text>
        </TouchableOpacity>
      </View>

      {showConfetti && (
        <>
          <ConfettiCannon count={50} origin={{ x: -10, y: -10 }} fadeOut />
          <Animatable.Text
            animation="fadeInDown"
            duration={600}
            style={styles.cheerText}
          >
            {cheerMessage}
          </Animatable.Text>
        </>
      )}


      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: '#f7f8fc' }}
      />
      {showMessage && (
        <Animatable.View animation="fadeInDown" style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </Animatable.View>
      )}

      <ConfettiCannon
        count={100}
        origin={{ x: -10, y: -10 }}
        autoStart={false}
        ref={confettiRef}
        fadeOut
      />
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fc',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 48,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#32a852',
    paddingHorizontal: 20,
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskList: {
    paddingBottom: 40,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 14,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  messageBox: {
    position: 'absolute',
    bottom: 100,
    left: '100%',
    right: '100%',
    backgroundColor: '#fff3cd',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  messageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#856404',
  },
  cheerText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2e7d32',
    marginBottom: 16,
    marginTop: 10,
  },
});