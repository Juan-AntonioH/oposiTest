import { StyleSheet } from 'react-native';
import { borderedCardBase, optionCardBase, optionDimensions } from './exam.styles';
import {
    colors,
    spacing,
    radius,
    shadows,
    commonStyles,
} from '@/core/theme';

export const testStyles = StyleSheet.create({
    headerControlContainer: {
        ...commonStyles.rowBetween,
        paddingHorizontal: spacing.xxl,
        paddingVertical: spacing.xl,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderColor: colors.borderLight,
    },
    examSubtitle: {
        ...commonStyles.buttonText,
        color: '#64748B',
    },
    finishHeaderButton: {
        backgroundColor: colors.errorLight,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: '#FCA5A5',
    },
    finishHeaderButtonText: {
        color: colors.error,
        fontWeight: '700',
        fontSize: 13,
    },
    statusCard: {
        ...commonStyles.row,
        backgroundColor: colors.surface,
        borderRadius: radius.xl,
        padding: spacing.xxl,
        marginBottom: spacing.xxl,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    progressTextContainer: {
        ...commonStyles.row,
        alignItems: 'baseline',
    },
    progressTitle: {
        fontSize: 13,
        color: '#64748B',
    },
    progressTotal: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    progressBarBackground: {
        flex: 1,
        height: 10,
        backgroundColor: colors.surfaceSecondary,
        borderRadius: radius.full,
        marginHorizontal: spacing.md,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: colors.primary, // Color primario de tu tema
        borderRadius: 3,
    },
    timerBadge: {
        backgroundColor: colors.surfaceSecondary,
        borderWidth: 1,
        borderColor: colors.borderLight,
        borderRadius: radius.full,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        ...commonStyles.centered,
        minWidth: 95,
    },

    timerText: {
        ...commonStyles.buttonText,
        color: '#334155',
    },
    questionCard: {
        ...borderedCardBase,
        marginBottom: spacing.xxl,
    },
    questionText: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
        lineHeight: 24,
        marginBottom: spacing.xxl,
    },

    optionCard: {
        ...optionCardBase,
        borderColor: colors.borderLight,
        backgroundColor: colors.surface,
    },

    optionCardSelected: {
        ...optionCardBase,
        borderColor: colors.answerSelected,
        padding: spacing.lg - 1,
        backgroundColor: colors.answerSelectedBackground,
    },

    optionCardCorrect: {
        ...optionCardBase,
        borderColor: colors.answerCorrect,
        padding: spacing.lg - 1,
        backgroundColor: colors.answerCorrectBackground,
    },

    optionCardIncorrect: {
        ...optionCardBase,
        borderColor: colors.answerIncorrect,
        padding: spacing.lg - 1,
        backgroundColor: colors.answerIncorrectBackground,
    },
    optionCircle: {
        ...commonStyles.centered,
        ...optionDimensions,
        borderRadius: radius.full,
        borderWidth: 1,
        borderColor: colors.border,
        marginRight: spacing.xl,
    },
    optionCircleSelected: {
        ...commonStyles.centered,
        ...optionDimensions,
        borderRadius: radius.full,
        backgroundColor: colors.answerSelected,
        marginRight: spacing.xl,
    },

    optionCircleCorrect: {
        ...commonStyles.centered,
        ...optionDimensions,
        borderRadius: radius.full,
        backgroundColor: colors.answerCorrect,
        marginRight: spacing.xl,
    },

    optionCircleIncorrect: {
        ...commonStyles.centered,
        ...optionDimensions,
        borderRadius: radius.full,
        backgroundColor: colors.answerIncorrect,
        marginRight: spacing.xl,
    },
    optionText: {
        ...commonStyles.buttonText,
        color: '#475569',
    },
    optionTextSelected: {
        fontWeight: '700',
    },
    optionLabel: {
        fontSize: 15,
        color: '#334155',
        flex: 1,
    },
    explanationCard: {
        backgroundColor: '#F0F9FF',
        borderRadius: 12,
        padding: 14,
        marginTop: 6,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#BAE6FD',
    },
    explanationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    explanationTitle: {
        fontSize: 14,
        paddingLeft: 6,
        fontWeight: '700',
        color: '#0369A1',
    },
    explanationText: {
        fontSize: 13,
        color: '#0C4A6E',
        lineHeight: 18,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    primaryButton: {
        flex: 1,
        backgroundColor: colors.primary,
        borderRadius: radius.xl,
        paddingVertical: spacing.lg,
        ...commonStyles.centered,
    },

    primaryButtonDisabled: {
        flex: 1,
        backgroundColor: colors.disabled,
        borderRadius: radius.xl,
        paddingVertical: spacing.lg,
        ...commonStyles.centered,
    },

    primaryButtonText: {
        color: colors.textOnPrimary,
        ...commonStyles.buttonText,
    },

    secondaryButton: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: radius.xl,
        paddingVertical: spacing.lg,
        ...commonStyles.centered,
        borderWidth: 1,
        borderColor: colors.border,
    },
    secondaryButtonText: {
        color: '#475569',
        ...commonStyles.buttonText,
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32, // Margen extra abajo para que los botones de acción no se peguen al borde físico de la pantalla
        backgroundColor: '#F8FAFC', // Fondo grisáceo claro muy limpio para que resalten las tarjetas blancas
    },
})