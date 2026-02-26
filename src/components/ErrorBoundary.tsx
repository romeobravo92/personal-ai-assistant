import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type Props = { children: React.ReactNode };

type State = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>{this.state.error.message}</Text>
          {__DEV__ && this.state.error.stack ? (
            <Text style={styles.stack} selectable>
              {this.state.error.stack}
            </Text>
          ) : null}
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.neonPink,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.md,
  },
  stack: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: 'monospace',
  },
});
