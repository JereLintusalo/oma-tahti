import React, { useState, useEffect } from 'react';
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

interface Task {
  id: string;
  text: string;
  done: boolean;
}

export default function TabTwoScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

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
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const renderItem = ({ item}: { item: Task }) => (
    <Animatable.View animation="fadeIn" duration={500}>
      <View style={styles.taskItem}>
        <TouchableOpacity onPress={() => toggleTask(item.id)} style={{ flex: 1 }}>
          <Text style={[styles.taskText, item.done && styles.taskDone]}>
            {item.text}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Ionicons name="trash-outline" size={24} color="#ff3b30" />
        </TouchableOpacity>
      </View>
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

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.taskList}
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 44,
  },
  addButton: {
    backgroundColor: '#4b7bec',
    paddingHorizontal: 16,
    marginLeft: 8,
    borderRadius: 8,
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
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});
