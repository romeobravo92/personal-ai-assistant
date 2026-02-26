import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IdeasStackParamList } from './types';
import IdeasListScreen from '../screens/IdeasListScreen';
import AddIdeaScreen from '../screens/AddIdeaScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<IdeasStackParamList>();

export default function IdeasStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textBright,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="IdeasList"
        component={IdeasListScreen}
        options={{ title: 'Ideas' }}
      />
      <Stack.Screen
        name="AddIdea"
        component={AddIdeaScreen}
        options={{ title: 'Capture idea' }}
      />
    </Stack.Navigator>
  );
}
