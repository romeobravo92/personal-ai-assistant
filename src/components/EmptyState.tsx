import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type EmptyStateProps = {
  message: string;
  detail?: string;
};

export function EmptyState({ message, detail }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {detail ? <Text style={styles.detail}>{detail}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  message: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
  },
  detail: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.xs,
    textAlign: 'center',
    opacity: 0.9,
  },
});
