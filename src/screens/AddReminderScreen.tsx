import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Button } from '../components';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function AddReminderScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  const handleSave = () => {
    // TODO: persist via Supabase
    navigation.goBack();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Card>
        <Text style={[styles.label, styles.labelFirst]}>What</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Call mom"
          placeholderTextColor={colors.textMuted}
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={colors.textMuted}
          value={dueDate}
          onChangeText={setDueDate}
        />
        <Text style={styles.label}>Time</Text>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          placeholderTextColor={colors.textMuted}
          value={dueTime}
          onChangeText={setDueTime}
        />
        <View style={styles.actions}>
          <Button title="Cancel" variant="ghost" onPress={() => navigation.goBack()} />
          <Button title="Save reminder" onPress={handleSave} />
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  labelFirst: {
    marginTop: 0,
  },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
    justifyContent: 'flex-end',
  },
});
