import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button } from '../components';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function ProfileScreen() {
  const { session, signOut } = useAuth();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Text style={styles.cardLabel}>Account</Text>
        {session?.user?.email && (
          <Text style={styles.email}>{session.user.email}</Text>
        )}
      </Card>
      <Card style={styles.card}>
        <Text style={styles.cardLabel}>Motivation</Text>
        <Text style={styles.muted}>Schedule and preferences — coming soon.</Text>
      </Card>
      <Button title="Sign out" variant="secondary" onPress={signOut} style={styles.signOut} />
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
  card: {
    marginBottom: spacing.md,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  email: {
    fontSize: 16,
    color: colors.text,
  },
  muted: {
    fontSize: 14,
    color: colors.textMuted,
  },
  signOut: {
    marginTop: spacing.md,
    alignSelf: 'flex-start',
  },
});
