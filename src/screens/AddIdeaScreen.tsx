import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Button } from '../components';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function AddIdeaScreen() {
  const navigation = useNavigation();
  const [content, setContent] = useState('');

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
        <Text style={styles.label}>What’s the idea?</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe it in a few words or sentences…"
          placeholderTextColor={colors.textMuted}
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
        />
        <View style={styles.actions}>
          <Button title="Cancel" variant="ghost" onPress={() => navigation.goBack()} />
          <Button title="Save idea" onPress={handleSave} />
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
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
    justifyContent: 'flex-end',
  },
});
