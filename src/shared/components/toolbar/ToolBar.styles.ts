import { StyleSheet } from 'react-native';

import {
  colors,
  spacing,
} from '@/core/theme';
export const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: colors.primary,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: spacing.md,
  },

  menuButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuIcon: {
    color: '#fff',
    fontSize: 24,
  },

  title: {
    flex: 1,

    textAlign: 'center',

    color: '#fff',

    fontSize: 20,
    fontWeight: '600',
  },

  placeholder: {
    width: 40,
  },
});