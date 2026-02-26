import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import RootNavigator from './src/navigation/RootNavigator';

const rootStyle = StyleSheet.create({
  root: {
    flex: 1,
    ...(Platform.OS === 'web'
      ? { position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0, minHeight: '100vh' }
      : {}),
  },
});

export default function App() {
  return (
    <ErrorBoundary>
      <View style={rootStyle.root}>
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="light" />
          </NavigationContainer>
        </AuthProvider>
      </View>
    </ErrorBoundary>
  );
}
