import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Card, SectionHeader, EmptyState, Button } from '../components';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function FeelingsScreen() {
  const [entry, setEntry] = useState('');
  const recentEntries: { id: string; content: string; createdAt: string }[] = [];

  const handleSave = () => {
    // TODO: persist via Supabase and optionally trigger AI follow-up
    setEntry('');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.section}>
        <Text style={styles.prompt}>How are you feeling?</Text>
        <Card>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write a few words or sentences…"
            placeholderTextColor={colors.textMuted}
            value={entry}
            onChangeText={setEntry}
            multiline
            numberOfLines={4}
          />
          <Button title="Save & reflect" onPress={handleSave} />
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Recent entries" />
        {recentEntries.length === 0 ? (
          <Card>
            <EmptyState
              message="No entries yet"
              detail="Your reflections will appear here"
            />
          </Card>
        ) : (
          recentEntries.map((item) => (
            <Card key={item.id} style={styles.entryCard}>
              <Text style={styles.entryContent}>{item.content}</Text>
              <Text style={styles.entryMeta}>{item.createdAt}</Text>
            </Card>
          ))
        )}
      </View>
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
  section: {
    marginBottom: spacing.lg,
  },
  prompt: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textBright,
    marginBottom: spacing.sm,
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
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: spacing.md,
  },
  entryCard: {
    marginBottom: spacing.sm,
  },
  entryContent: {
    fontSize: 15,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  entryMeta: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
