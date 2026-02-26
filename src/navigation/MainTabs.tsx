import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import RemindersStack from './RemindersStack';
import FeelingsScreen from '../screens/FeelingsScreen';
import IdeasStack from './IdeasStack';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textBright,
        tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Reminders" component={RemindersStack} options={{ tabBarLabel: 'Reminders', headerShown: false }} />
      <Tab.Screen name="Feelings" component={FeelingsScreen} options={{ tabBarLabel: 'Feelings' }} />
      <Tab.Screen name="Ideas" component={IdeasStack} options={{ tabBarLabel: 'Ideas', headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}
