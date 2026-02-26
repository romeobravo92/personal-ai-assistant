import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type SectionHeaderProps = {
  title: string;
  action?: React.ReactNode;
};

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action != null ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textBright,
  },
  action: {
    marginLeft: spacing.sm,
  },
});
