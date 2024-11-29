import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; 
// import { Image } from 'expo-image';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/login" style={styles.button}>
        Go to Login
      </Link>

      <Link href="/overview" style={styles.button}>
        Go to Overview
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
