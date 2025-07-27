import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  AppState,
  AppStateStatus,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";

export default function DiaryScreen() {
  const [selectedDate, setSelectedDate] = useState<string>(getToday());
  const [text, setText] = useState('');
  const [entries, setEntries] = useState<Record<string, string>>({});
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    loadEntries();

    const subscription = AppState.addEventListener("change", nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        loadEntries(); // päivitetään merkinnät kun palataan takaisin
      }
      setAppState(nextAppState);
    });

    return () => subscription.remove(); // siivotaan kuuntelija
  }, []);

  useEffect(() => {
    setText(entries[selectedDate] || '');
  }, [selectedDate, entries]);

  const loadEntries = async () => {
    try {
      const saved = await AsyncStorage.getItem('@diary_entries');
      if (saved !== null) {
        setEntries(JSON.parse(saved));
      }
    } catch (e) {
      Alert.alert("Virhe", "Päiväkirjamerkintöjen lataaminen epäonnistui.");
    }
  };

  const saveEntry = async () => {
    try {
      const newEntries = { ...entries, [selectedDate]: text };
      await AsyncStorage.setItem('@diary_entries', JSON.stringify(newEntries));
      setEntries(newEntries);
      Alert.alert('Tallennettu', `Merkintä päivälle ${selectedDate} tallennettu!`);
    } catch (e) {
      Alert.alert('Virhe', 'Tallennus epäonnistui');
    }
  };

  function getToday(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  const today = getToday();
  const markedDates: Record<string, any> = {};

  Object.keys(entries).forEach(date => {
    markedDates[date] = {
      marked: true,
      dotColor: '#4b7bec',
      selected: date === selectedDate,
      selectedColor: '#4b7bec',
    };
  });

  // Näytä tämän päivän piste, vaikka ei olisi merkintää
  if (!entries[today]) {
    markedDates[today] = {
      marked: true,
      dotColor: '#a5b1c2',
      selected: selectedDate === today,
      selectedColor: '#4b7bec',
    };
  }

  // Jos valittua päivää ei ole vielä merkattu, näytetään se silti
  if (!markedDates[selectedDate]) {
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: '#4b7bec',
    };
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Calendar
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        style={styles.calendar}
      />
      <Text style={styles.selectedDate}>Valittu päivä: {selectedDate}</Text>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Kirjoita tähän ajatuksesi..."
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.button} onPress={saveEntry}>
        <Text style={styles.buttonText}>Tallenna merkintä</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6f6ff',
  },
  calendar: {
    marginBottom: 10,
  },
  selectedDate: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    height: 140,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4b7bec',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

