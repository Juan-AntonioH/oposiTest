import { StyleSheet } from 'react-native';

import {
    borderedCardBase,
    cardBase,
    optionCardBase,
    optionDimensions,
} from './exam.styles';

import {
    colors,
    spacing,
    radius,
    shadows,
    commonStyles,
} from '@/core/theme';

export const blockStyles = StyleSheet.create({

    // =========================================================
    // BLOCK SCREEN
    // =========================================================

    toggleCardCheckbox: {
        ...cardBase,
        ...commonStyles.row,
        padding: spacing.xxl,
        marginTop: spacing.lg,
        marginBottom: spacing.xxl,
        borderWidth: 1,
        borderColor: colors.borderLight,
        ...shadows.sm,
    },

    toggleCheckboxText: {
        ...commonStyles.buttonText,
        color: colors.text,
    },

    blocksContainerCard: {
        ...cardBase,
        padding: spacing.xxl,
        borderRadius: radius.xxl,
        borderWidth: 1,
        borderColor: colors.borderLight,
        ...shadows.sm,
    },

    blocksContainerSubtitle: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.text,
        marginBottom: spacing.xxl,
        textAlign: 'center',
    },

    blockRowCard: {
        ...optionCardBase,
        ...commonStyles.row,
        padding: spacing.lg,
        marginBottom: spacing.lg,
    },

    blockRowCardSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.surfaceSecondary,
    },

    blockGridIconBox: {
        marginRight: spacing.xl,
        ...commonStyles.centered,
    },

    blockRowTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.text,
    },

    blockRowSub: {
        fontSize: 13,
        color: colors.textSecondary,
        marginTop: spacing.xxs,
    },

    // =========================================================
    // PROGRESS
    // =========================================================

    progressCard: {
        ...cardBase,
        padding: spacing.xxl,
        marginBottom: spacing.xxl,
        borderWidth: 1,
        borderColor: colors.borderLight,
        ...shadows.sm,
    },

    progressHeader: {
        ...commonStyles.rowBetween,
        marginBottom: spacing.xl,
    },

    // =========================================================
    // HEADER
    // =========================================================

    headerTopRow: {
        ...commonStyles.rowBetween,
    },

    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.text,
    },

    headerSubtitle: {
        marginTop: spacing.xs,
        fontSize: 14,
        color: colors.textSecondary,
    },

    closeButton: {
        ...commonStyles.centered,
        padding: spacing.xs,
        borderRadius: radius.full,
        backgroundColor: colors.error,
    },

    // =========================================================
    // OPTIONS
    // =========================================================

    optionLetter: {
        color: colors.textSecondary,
        fontWeight: '700',
    },

    optionLetterSelected: {
        color: colors.textOnPrimary,
        fontWeight: '700',
    },

});