import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
} from 'react-native';

import {
  colors,
  spacing,
  radius,
  shadows,
} from '@/core/theme';

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;

  variant?:
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'danger'
  | 'warning';

  disabled?: boolean;
  loading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
}) => {

  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryBtn;

      case 'outline':
        return styles.outlineBtn;

      case 'danger':
        return styles.dangerBtn;

      case 'warning':
        return styles.warningBtn;

      default:
        return styles.primaryBtn;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineText;

      case 'danger':
        return styles.dangerText;

      case 'secondary':
        return styles.secondaryText;

      case 'warning':
        return styles.warningText;

      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'outline'
              ? colors.secondary
              : colors.white
          }
        />
      ) : (
        <Text style={[styles.text, getTextStyle()]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  button: {
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',

    ...shadows.sm,
  },

  primaryBtn: {
    backgroundColor: colors.primary,
  },

  secondaryBtn: {
    backgroundColor: colors.secondary,
  },

  warningBtn: {
    backgroundColor: colors.warning ?? '#c76e02',
  },

  outlineBtn: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.secondary,
  },

  dangerBtn: {
    backgroundColor: colors.danger,
  },

  disabledButton: {
    backgroundColor: '#D1D5DB', // gris
    borderColor: '#D1D5DB',
  },

  text: {
    fontSize: 16,
    fontWeight: '600',
  },

  primaryText: {
    color: colors.white,
  },

  secondaryText: {
    color: colors.white,
  },

  warningText: {
    color: colors.white,
  },

  outlineText: {
    color: colors.secondary,
  },

  dangerText: {
    color: colors.white,
  },
});