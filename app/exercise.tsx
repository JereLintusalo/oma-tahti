import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function ExerciseScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Rauhoittumisharjoitukset</Text>

            <View style={styles.card}>
                <Text style={styles.exerciseTitle}>1. Hengitysharjoitus</Text>
                <Image source={require('@/assets/images/breathing.png')} style={styles.image} />
                <Text style={styles.description}>
                    Keskity hengitykseesi. Hengitä syvään nenän kautta ja puhalla hitaasti suun kautta.
                    Toista tätä 5-10 kertaa, kunnes tunnet olosi rauhallisemmaksi.</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.exerciseTitle}>2. Aistiharjoitus</Text>
                <Image source={require('@/assets/images/senses.png')} style={styles.image} />
                <Text style={styles.description}>
                    Nimeä 5 asiaa, jotka näet, 4 joita voit koskea, 3 joita kuulet, 2 joita haistat, ja 1 jonka maistat.</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.exerciseTitle}>3. Kehotietoisuus</Text>
                <Image source={require('@/assets/images/body.png')} style={styles.image} />
                <Text style={styles.description}>
                    Istu mukavasti ja sulje silmäsi. Keskity kehosi tuntemuksiin. Tunne jalkasi, kätesi, selkäsi ja pääsi.
                    Anna jännityksen haihtua ja tunne rentoutumisen leviävän koko kehoosi.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f4f4fa',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowRadius: 4,
        elevation: 3,
    },
    exerciseTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 8,
    },
    description: {
        fontSize: 15,
        color: '#555',
        marginTop: 8,
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'cover', // tai 'contain' – selitän alempana
        borderRadius: 8,
        marginVertical: 10,
        backgroundColor: '#ddd', // jos kuva ei täytä koko tilaa
      },
});