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

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'danger'
  | 'warning';

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
}

const VARIANT_STYLES: Record<
  ButtonVariant,
  {
    button: object;
    text: object;
    loaderColor: string;
  }
> = {
  primary: {
    button: {
      backgroundColor: colors.primary,
    },
    text: {
      color: colors.white,
    },
    loaderColor: colors.white,
  },

  secondary: {
    button: {
      backgroundColor: colors.secondary,
    },
    text: {
      color: colors.white,
    },
    loaderColor: colors.white,
  },

  warning: {
    button: {
      backgroundColor: colors.warning ?? '#c76e02',
    },
    text: {
      color: colors.white,
    },
    loaderColor: colors.white,
  },

  danger: {
    button: {
      backgroundColor: colors.danger,
    },
    text: {
      color: colors.white,
    },
    loaderColor: colors.white,
  },

  outline: {
    button: {
      backgroundColor: colors.white,
      borderWidth: 2,
      borderColor: colors.secondary,
    },
    text: {
      color: colors.secondary,
    },
    loaderColor: colors.secondary,
  },
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
}) => {

  const currentVariant = VARIANT_STYLES[variant];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        currentVariant.button,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={currentVariant.loaderColor}
        />
      ) : (
        <Text
          style={[
            styles.text,
            currentVariant.text,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  button: {
    width: '100%',
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',

    ...shadows.sm,
  },

  disabledButton: {
    backgroundColor: '#D1D5DB',
    borderColor: '#D1D5DB',
  },

  text: {
    fontSize: 16,
    fontWeight: '600',
  },

});