import { StyleSheet } from 'react-native';

import {
    colors,
    spacing,
} from '@/core/theme';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
    },

    text: {
        marginTop: spacing.md,
        color: colors.text,
        textAlign: 'center',
    },

    errorText: {
        color: colors.error,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },

    button: {
        minWidth: 180,
    },

    buttonContainer: {
        width: '70%',
        maxWidth: 260,
    },
});