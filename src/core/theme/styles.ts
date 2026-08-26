import { StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows, typography } from '@/core/theme';

export const commonStyles = StyleSheet.create({

    // =========================
    // LAYOUT
    // =========================

    flexCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    rowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },


    // =========================
    // CARDS
    // =========================

    card: {
        backgroundColor: colors.white,
        borderRadius: radius.xxl,
        padding: spacing.xxl,
    },

    cardBorder: {
        backgroundColor: colors.white,
        borderRadius: radius.xl,
        padding: spacing.xl,
        borderWidth: 1,
        borderColor: colors.border,
    },

    cardShadow: {
        backgroundColor: colors.white,
        borderRadius: radius.xxl,
        padding: spacing.xxl,
        ...shadows.sm,
    },


    // =========================
    // BUTTONS
    // =========================

    button: {
        height: 48,
        borderRadius: radius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.md,
    },

    buttonPrimary: {
        backgroundColor: colors.primary,
    },

    buttonDanger: {
        backgroundColor: colors.errorDark,
    },

    buttonSuccess: {
        backgroundColor: colors.success,
    },

    buttonSecondary: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
    },

    buttonText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.white,
    },

    buttonSecondaryText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.text,
    },


    // =========================
    // INPUTS
    // =========================

    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
        backgroundColor: colors.surface,
        color: colors.text,
        fontSize: 15,
    },


    // =========================
    // TEXT
    // =========================

    title: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.text,
    },

    subtitle: {
        fontSize: 14,
        color: colors.textSecondary,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
    },

});