import { Text, View, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { styles } from './styles'; // siirretään tyylit omaan tiedostoon

export default function IndexScreen() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins: require('@/assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <LinearGradient colors={['#e0f7fa', '#ffffff']} style={styles.container}>
      <Image
        source={require('@/assets/images/peace.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
        <Text style={styles.title}>Tervetuloa Oma Tahti -sovellukseen</Text>
        <Text style={styles.subtitle}>
          Aloitetaan yhdessä matka kohti rauhallisempaa arkea.
        </Text>

        <Pressable
        onPress={() => router.push('/diary')}
        style={({ hovered, pressed }) => [
          styles.button,
          hovered && styles.buttonHover,
          pressed && styles.buttonPressed,
        ]}
      >
          <Text style={styles.buttonText}>Päiväkirja</Text>
        </Pressable>

        <Pressable
        onPress={() => router.push('/exercise')}
        style={({ hovered, pressed }) => [
          styles.button,
          hovered && styles.buttonHover,
          pressed && styles.buttonPressed,
        ]}
      >
          <Text style={styles.buttonText}>Avaa harjoitukset</Text>
        </Pressable>
      </Animatable.View>
    </LinearGradient>
  );
}
