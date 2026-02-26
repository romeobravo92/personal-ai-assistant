import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type RemindersStackParamList = {
  RemindersList: undefined;
  AddReminder: undefined;
};

export type IdeasStackParamList = {
  IdeasList: undefined;
  AddIdea: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Reminders: undefined;
  Feelings: undefined;
  Ideas: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};
