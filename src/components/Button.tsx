import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  loading,
  disabled,
  style,
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity
      style={[
        styles.base,
        isPrimary && styles.primary,
        variant === 'secondary' && styles.secondary,
        isGhost && styles.ghost,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.buttonPrimaryText : colors.accent} size="small" />
      ) : (
        <Text
          style={[
            styles.text,
            isPrimary && styles.textPrimary,
            variant === 'secondary' && styles.textSecondary,
            isGhost && styles.textGhost,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primary: {
    backgroundColor: colors.buttonPrimary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  textPrimary: {
    color: colors.buttonPrimaryText,
  },
  textSecondary: {
    color: colors.text,
  },
  textGhost: {
    color: colors.link,
  },
});
