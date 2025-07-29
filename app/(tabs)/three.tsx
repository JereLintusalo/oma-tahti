import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { useTheme } from './theme-context'; // varmista oikea polku!

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const { theme, setTheme } = useTheme();
  const [themeDark, setThemeDark] = useState(theme === 'dark');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [stats, setStats] = useState({ diary: 12, tasks: 8, exercise: 5 });

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    saveProfile();
  }, [name, goal, themeDark, imageUri]);

  useEffect(() => {
    setTheme(themeDark ? 'dark' : 'light');
  }, [themeDark]);

  const loadProfile = async () => {
    try {
      const savedName = await AsyncStorage.getItem('@profile_name');
      const savedGoal = await AsyncStorage.getItem('@profile_goal');
      const savedTheme = await AsyncStorage.getItem('@profile_theme');
      const savedImage = await AsyncStorage.getItem('@profile_image');

      if (savedName) setName(savedName);
      if (savedGoal) setGoal(savedGoal);
      if (savedTheme) setThemeDark(savedTheme === 'dark');
      if (savedImage) setImageUri(savedImage);
    } catch (e) {
      console.error('Profiilin lataaminen epäonnistui', e);
    }
  };

  const saveProfile = async () => {
    await AsyncStorage.setItem('@profile_name', name);
    await AsyncStorage.setItem('@profile_goal', goal);
    await AsyncStorage.setItem('@profile_theme', themeDark ? 'dark' : 'light');
    if (imageUri) await AsyncStorage.setItem('@profile_image', imageUri);
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const themeStyles = themeDark ? darkStyles : lightStyles;
  const progressTotal = stats.diary + stats.tasks + stats.exercise;
  const progressPercent = Math.min(progressTotal / 30, 1);

  return (
    <View style={[styles.container, themeStyles.container]}>
      <TouchableOpacity onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={themeStyles.text}>Valitse kuva</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Nimesi"
        value={name}
        onChangeText={setName}
        style={[styles.input, themeStyles.input]}
        placeholderTextColor={themeDark ? '#aaa' : '#666'}
      />

      <TextInput
        placeholder="Tavoitteesi"
        value={goal}
        onChangeText={setGoal}
        style={[styles.input, themeStyles.input]}
        placeholderTextColor={themeDark ? '#aaa' : '#666'}
      />

      <View style={styles.switchRow}>
        <Text style={themeStyles.text}>Tumma teema</Text>
        <Switch value={themeDark} onValueChange={setThemeDark} />
      </View>

      <View style={styles.switchRow}>
        <Text style={themeStyles.text}>Edistyminen</Text>
        <Progress.Bar
          progress={progressPercent}
          width={null}
          height={14}
          color="#4b7bec"
        />
        <Text style={themeStyles.textSmall}>
          {progressTotal} merkintää yhteensä
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarPlaceholder: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    alignItems: 'center',
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  input: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
    color: '#000',
  },
  textSmall: {
    color: '#666',
    fontSize: 12,
    marginTop: 6,
  },
  text: {
    color: '#333',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1e',
  },
  input: {
    borderColor: '#444',
    backgroundColor: '#2c2c2c',
    color: '#fff',
  },
  text: {
    color: '#eee',
  },
  textSmall: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 6,
  },
});
