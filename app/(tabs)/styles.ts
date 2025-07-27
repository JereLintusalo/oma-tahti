import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#4b7bec',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginVertical: 10,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  buttonHover: {
    backgroundColor: '#357ABD',
  },
  buttonPressed: {
    backgroundColor: '#2e6bbf',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
});
