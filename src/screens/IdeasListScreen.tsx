import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, SectionHeader, EmptyState, Button } from '../components';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import type { IdeasStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<IdeasStackParamList, 'IdeasList'>;

export default function IdeasListScreen() {
  const navigation = useNavigation<Nav>();
  const ideas: { id: string; content: string; status: string }[] = [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SectionHeader
          title="Ideas"
          action={
            <Button
              title="Capture idea"
              variant="secondary"
              onPress={() => navigation.navigate('AddIdea')}
            />
          }
        />
      </View>
      {ideas.length === 0 ? (
        <Card style={styles.card}>
          <EmptyState
            message="No ideas yet"
            detail="Tap Capture idea to add one"
          />
        </Card>
      ) : (
        <FlatList
          data={ideas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowContent} numberOfLines={2}>
                {item.content}
              </Text>
              <Text style={styles.rowStatus}>{item.status}</Text>
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
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowContent: {
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  rowStatus: {
    fontSize: 12,
    color: colors.textMuted,
    textTransform: 'capitalize',
  },
});
