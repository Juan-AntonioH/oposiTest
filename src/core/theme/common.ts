import { colors } from './colors';

export const commonStyles = {

  // =========================================================
  // LAYOUT
  // =========================================================

  centered: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },

  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },

  rowBetween: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },

  flex: {
    flex: 1,
  },


  // =========================================================
  // TEXT
  // =========================================================

  textCenter: {
    textAlign: 'center' as const,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: '600' as const,
  },

  titleSmall: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: colors.text,
  },

  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  subtitleSmall: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.text,
  },

  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: colors.textSecondary,
  },

  textMedium: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: colors.text,
  },


  // =========================================================
  // OVERLAY
  // =========================================================

  overlay: {
    position: 'absolute' as const,
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    zIndex: 999,
  },

};