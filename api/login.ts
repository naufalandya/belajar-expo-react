import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const api = axios.create({
  baseURL: 'https://alobro.my.id',
  timeout: 10000,
});

export async function saveAccessToken(token: string) {

try {
    if (Platform.OS === 'web') {
        console.log(token)
        await AsyncStorage.setItem('access_token', token);
    } else { // mobile
        await SecureStore.setItemAsync('access_token', token.toString());
    }

    } catch (error) {
        console.error("Error saving data:", error); 
    }

}

export async function getAccessToken() {
  return await SecureStore.getItemAsync('access_token');
}

export async function login(email: string, password: string) {
  try {
    const response = await api.post('api/v1/auth/signin', { email, password });
    console.log(response)
    const { token } = response.data.data;

    console.log(token)

    await saveAccessToken(token);

    return token;
  } catch (error : unknown) {
    console.log(error)
    if (error instanceof Error) {
        console.error('Login failed:', error.message);
        throw new Error('Invalid username or password');
      } else {
        console.error('An unknown error occurred');
      }
  }
}
