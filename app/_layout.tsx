import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { Platform } from 'react-native';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Start with null to check loading state
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        let token;
        if (Platform.OS === 'web') {
          token = localStorage.getItem('access_token');
        } else {
          token = await SecureStore.getItemAsync('access_token');
        }

        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    // Once authentication check is complete, perform navigation
    if (isAuthenticated === null) return; // Wait until the authentication check is complete

    if (isAuthenticated === false) {
      router.replace('/login'); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, router]);

  // Show a loading spinner or placeholder while authentication check is in progress
  if (isAuthenticated === null) {
    return null; // Or return a loading spinner or splash screen here
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
