import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textBright,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: '' }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign up' }} />
    </Stack.Navigator>
  );
}
