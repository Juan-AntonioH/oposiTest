import { StyleSheet } from 'react-native';

import {
    colors,
    radius,
    shadows,
    spacing,
} from '@/core/theme';

export const styles = StyleSheet.create({

    card: {
        backgroundColor: colors.white,

        borderRadius: radius.lg,

        padding: spacing.lg,

        marginBottom: spacing.md,

        ...shadows.sm,
    },

    outlined: {
        borderWidth: 1,
        borderColor: colors.border,
    },

    flat: {
        shadowOpacity: 0,
        elevation: 0,
    },

    disabled: {
        opacity: 0.5,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: radius.lg,

        justifyContent: 'center',
        alignItems: 'center',

        marginRight: spacing.md,
    },

    center: {
        flex: 1,
    },

    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    titleContainer: {
        flex: 1,
        marginRight: spacing.sm,
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
    },

    subtitle: {
        marginTop: spacing.xs,
        fontSize: 15,
        color: colors.text,
    },

    description: {
        marginTop: spacing.xs,
        fontSize: 13,
        color: colors.textSecondary,
    },

    headerRight: {
        marginLeft: spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
    },

    children: {
        marginTop: spacing.md,
    },

    footer: {
        marginTop: spacing.lg,
    },

    badge: {
        minWidth: 60,

        paddingHorizontal: spacing.md,

        paddingVertical: spacing.sm,

        borderRadius: radius.md,

        backgroundColor: colors.primary,

        justifyContent: 'center',
        alignItems: 'center',
    },

    badgeText: {
        color: colors.white,
        fontWeight: '700',
        fontSize: 13,
    },

});