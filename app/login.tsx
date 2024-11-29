import React from 'react';
import { View, Alert, StyleSheet, ToastAndroid } from 'react-native';
import { useRouter } from 'expo-router';
import Form from '@/components/Form';
import { login } from '@/api/login';

const LoginScreen = () => {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const token = await login(email, password);
      Alert.alert('Success', 'Login Successful');
      router.push('/(tabs)');
    } catch (error : unknown) {
        if (error instanceof Error) {
            console.error('error:', error.message);
            Alert.alert('Error', error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
  };

  return (
    <View style={styles.container}>
      <Form onSubmit={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default LoginScreen;
