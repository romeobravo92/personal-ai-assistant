import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, SectionHeader, EmptyState, Button } from '../components';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import type { MainTabParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<MainTabParamList, 'Home'>;

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.greeting}>{getGreeting()}</Text>
      <Text style={styles.subtitle}>Here’s your overview.</Text>

      <View style={styles.section}>
        <Card style={styles.motivationCard}>
          <Text style={styles.motivationLabel}>Today’s nudge</Text>
          <Text style={styles.motivationText}>
            “Discipline equals freedom. Get after it.”
          </Text>
          <Text style={styles.motivationAttribution}>— Jocko Willink</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Upcoming" />
        <Card>
          <EmptyState
            message="No reminders due soon"
            detail="Add one from the Reminders tab"
          />
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Quick actions" />
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('Reminders')}
          >
            <Text style={styles.quickActionEmoji}>⏰</Text>
            <Text style={styles.quickActionLabel}>Reminders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('Feelings')}
          >
            <Text style={styles.quickActionEmoji}>✨</Text>
            <Text style={styles.quickActionLabel}>Feelings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('Ideas')}
          >
            <Text style={styles.quickActionEmoji}>💡</Text>
            <Text style={styles.quickActionLabel}>Ideas</Text>
          </TouchableOpacity>
        </View>
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
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textBright,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  motivationCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.neonCyan,
  },
  motivationLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  motivationText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },
  motivationAttribution: {
    fontSize: 14,
    color: colors.textMuted,
  },
  quickActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  quickAction: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickActionEmoji: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  quickActionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
});
