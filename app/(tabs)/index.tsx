import { Text, View, Image, Pressable, ScrollView } from 'react-native';
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Oma Tahti</Text>
        </View>
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

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Mikä Oma Tahti on?</Text>
          <Text style={styles.infoText}>
          Oma Tahti on digitaalinen kumppani mielen hyvinvoinnin tueksi. Se on suunniteltu erityisesti henkilöille, jotka elävät pakko-oireisen häiriön (OCD) kanssa, tarjoten arjen tueksi monipuolisia ja tutkittuun tietoon pohjautuvia työkaluja. Sovellus sisältää muun muassa helppokäyttöisen päiväkirjan, jossa voit seurata ajatuksiasi ja tunteitasi turvallisessa tilassa, sekä erilaisia harjoituksia, jotka tukevat itseymmärrystä ja oireiden hallintaa.
          {"\n\n"}
          Oma Tahti auttaa rakentamaan omaa hyvinvointia askel kerrallaan, omassa tahdissa – ilman suorituspaineita. Olitpa sitten vasta aloittamassa matkaa kohti parempaa mielen tasapainoa tai jo kokenut omien oireiden hallinnassa, sovellus tarjoaa tukea, tietoa ja tilan itsellesi. Tavoitteena on helpottaa elämää OCD:n kanssa ja luoda hetkiä, joissa voit hengittää vapaammin.          
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Kehittäjä: Jere Lintusalo</Text>
          <Text style={styles.footerText}>Email: joku.tulossa@gmail.com</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
