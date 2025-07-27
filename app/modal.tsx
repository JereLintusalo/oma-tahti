import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';

type Props = {
  onClose?: () => void; // Jos haluat modaalin sulkemisen, lisää props tähän
};

export default function ModalScreen({ onClose }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Tietoa sovelluksesta</Text>

        <Text style={styles.paragraph}>
          Tämä sovellus on tarkoitettu auttamaan OCD:n hallinnassa päiväkirjan ja
          muiden työkalujen avulla.
        </Text>

        <Text style={styles.paragraph}>
          Voit tehdä merkintöjä eri päiville, seurata tunteitasi ja kehitystäsi.
          Sovelluksen tavoitteena on tukea hyvinvointiasi arjessa.
        </Text>

        <Text style={styles.paragraph}>
          Kehitämme sovellusta jatkuvasti, joten lisää ominaisuuksia on tulossa!
        </Text>

        {/* Lisää halutessasi muita ohjeita, linkkejä tai kuvia */}

        {/* Esim. Sulje-nappi, jos modaalin sulkeminen on tarpeen */}
        {onClose && (
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Sulje</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingVertical: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: '#333',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#4b7bec',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});

