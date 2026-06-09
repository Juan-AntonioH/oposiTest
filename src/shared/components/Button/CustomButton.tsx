import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

import { colors, spacing, radius, shadows} from '@/core/theme';

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
}) => {

  const getButtonStyle = () => {
    switch (variant) {

      case 'secondary':
        return styles.secondaryBtn;

      case 'outline':
        return styles.outlineBtn;

      case 'danger':
        return styles.dangerBtn;

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

      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle()]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, getTextStyle()]}>
        {title}
      </Text>
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
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 2,
  },

  primaryBtn: {
    backgroundColor: colors.primary,
  },

  secondaryBtn: {
    backgroundColor: colors.secondary,
  },

  outlineBtn: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.secondary,
  },

  dangerBtn: {
    backgroundColor: colors.danger,
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

  outlineText: {
    color: colors.secondary,
  },

  dangerText: {
    color: colors.white,
  },
});