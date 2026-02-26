import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RemindersStackParamList } from './types';
import RemindersListScreen from '../screens/RemindersListScreen';
import AddReminderScreen from '../screens/AddReminderScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<RemindersStackParamList>();

export default function RemindersStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textBright,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="RemindersList"
        component={RemindersListScreen}
        options={{ title: 'Reminders' }}
      />
      <Stack.Screen
        name="AddReminder"
        component={AddReminderScreen}
        options={{ title: 'Add reminder' }}
      />
    </Stack.Navigator>
  );
}
