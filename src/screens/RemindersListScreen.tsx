import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, SectionHeader, EmptyState, Button } from '../components';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import type { RemindersStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RemindersStackParamList, 'RemindersList'>;

export default function RemindersListScreen() {
  const navigation = useNavigation<Nav>();
  const reminders: { id: string; title: string; dueAt: string }[] = [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SectionHeader
          title="Upcoming"
          action={
            <Button
              title="Add"
              variant="secondary"
              onPress={() => navigation.navigate('AddReminder')}
            />
          }
        />
      </View>
      {reminders.length === 0 ? (
        <Card style={styles.card}>
          <EmptyState
            message="No reminders yet"
            detail="Tap Add to create one"
          />
        </Card>
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.row}>
              <View style={styles.bullet} />
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowMeta}>{item.dueAt}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.sm,
  },
  card: {
    marginTop: spacing.sm,
  },
  list: {
    paddingBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neonCyan,
    marginRight: spacing.md,
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  rowMeta: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2,
  },
});
