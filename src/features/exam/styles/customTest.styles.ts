import { StyleSheet } from 'react-native';

import { radius, spacing, colors, commonStyles } from '@/core/theme';

export const customStyles = StyleSheet.create({

    // =========================================================
    // SECCIÓN
    // =========================================================

    section: {
        backgroundColor: colors.surface,
        borderRadius: radius.xl,
        borderWidth: 1,
        borderColor: colors.borderLight,
        padding: spacing.xxl,
        marginBottom: spacing.xxl,
    },

    sectionTitle: {
        ...commonStyles.sectionTitle,
        marginBottom: spacing.xxl,
    },

    // =========================================================
    // BLOQUES
    // =========================================================

    blockCard: {
        ...commonStyles.row,
        padding: spacing.lg,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.borderLight,
        backgroundColor: colors.surface,
        marginBottom: spacing.xl,
    },

    blockCardSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primaryLight,
    },

    blockInfo: {
        flex: 1,
        marginLeft: spacing.xl,
    },

    blockTitle: {
        ...commonStyles.titleSmall,
    },

    blockSubtitle: {
        ...commonStyles.subtitle,
        marginTop: spacing.xxs,
    },

    // =========================================================
    // GRUPO DE TEMAS
    // =========================================================

    themeGroup: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.borderLight,
        padding: spacing.lg,
        marginBottom: spacing.xxl,
    },

    themeGroupTitle: {
        ...commonStyles.sectionSubtitle,
        marginBottom: spacing.xl,
    },

    themeCard: {
        ...commonStyles.row,
        padding: spacing.md,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.borderLight,
        backgroundColor: colors.surface,
        marginBottom: spacing.lg,
    },

    themeCardSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primaryLight,
    },

    themeInfo: {
        flex: 1,
        marginLeft: spacing.xl,
    },

    themeTitle: {
        ...commonStyles.textMedium,
    },

    themeSubtitle: {
        ...commonStyles.subtitleSmall,
        marginTop: spacing.xxs,
    },

    // =========================================================
    // BOTÓN COMENZAR
    // =========================================================

    startButton: {
        height: 52,
        borderRadius: radius.lg,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing.xl,
        marginBottom: 30,
    },

    startButtonDisabled: {
        backgroundColor: colors.disabled,
    },

    startButtonText: {
        ...commonStyles.buttonText,
    },
    configSection: {
        backgroundColor: colors.surface,
        padding: spacing.xxl,
        borderRadius: radius.xl,
        marginBottom: spacing.xxl,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },

    configSectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.xxl,
    },

    configLabel: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: spacing.sm,
    },

    numberInputContainer: {
        ...commonStyles.row,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        marginBottom: spacing.lg,
        paddingHorizontal: spacing.xl,
        height: 48,
    },

    numberInput: {
        flex: 1,
        color: colors.text,
        fontSize: 16,
        fontWeight: '500',
    },

    numberInputControls: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
    },

    numberInputButton: {
        padding: spacing.xxs,
    },
    solutionCard: {
        ...commonStyles.rowBetween,
        backgroundColor: colors.surface,
        padding: spacing.lg,
        borderRadius: radius.xl,
        marginBottom: spacing.xxl,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },

    solutionContent: {
        ...commonStyles.row,
    },

    solutionIcon: {
        marginRight: spacing.md,
    },

    solutionText: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: colors.text,
    },
});