import { StyleSheet } from 'react-native';

import {
    colors,
    spacing,
    radius,
    shadows,
    commonStyles,
} from '@/core/theme';

export const cardBase = {
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    padding: spacing.xxl,
};

export const borderedCardBase = {
    ...cardBase,
    borderWidth: 1,
    borderColor: colors.borderLight,
};

export const optionDimensions = {
    width: 32,
    height: 32,
}

export const centeredBase = {
    ...commonStyles.centered,
};

export const buttonBase = {
    ...commonStyles.centered,
    borderRadius: radius.xl,
};

export const optionCardBase = {
    ...commonStyles.row,
    borderWidth: 2,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
};

export const inputBase = {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
    color: colors.text,
};

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.xxl,
        paddingTop: spacing.xs,
        backgroundColor: colors.surfaceSecondary,
    },

    listContainer: {
        paddingHorizontal: spacing.xxl,
        paddingBottom: spacing.xl,
        backgroundColor: colors.surfaceSecondary,
        flexGrow: 1,
    },

    menuContainer: {
        gap: spacing.xxl,
        marginBottom: spacing.xxxl,
    },

    headerContainer: {
        marginBottom: spacing.lg,
    },

    titleRow: {
        ...commonStyles.row,
        gap: spacing.xl,
        marginBottom: spacing.lg,
    },

    mainTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: spacing.sm,
    },

    mainSubtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: spacing.xxl,
    },

    card: {
        ...cardBase,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xxl,
        ...shadows.sm,
    },

    iconBox: {
        ...commonStyles.centered,
        width: 48,
        height: 48,
        borderRadius: radius.lg,
    },

    iconContainer: {
        ...commonStyles.centered,
        width: 56,
        height: 56,
        borderRadius: radius.xl,
    },
    textContainer: {
        marginLeft: 16,
        flex: 1,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: spacing.xs,
    },

    cardSub: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: spacing.xxs,
    },

    adminActionContainer: {
        gap: spacing.md,
        marginTop: spacing.md,
    },

    btn: {
        ...commonStyles.row,
        justifyContent: 'center',
        height: 48,
        borderRadius: radius.lg,
        gap: spacing.md,
    },

    btnText: {
        color: colors.white,
        ...commonStyles.buttonText,
    },

    cardSubtitle: {
        fontSize: 13,
        color: colors.textSecondary,
    },

    backButtonText: {
        color: colors.textSecondary,
        ...commonStyles.buttonText,
    },

    backButtonContainer: {
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: spacing.xl,
        paddingHorizontal: spacing.xs,
    },

    backButton: {
        paddingVertical: spacing.sm,
        paddingRight: spacing.lg,
    },

    customCardTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.text,
        marginBottom: spacing.xs,
    },

    yearTextBold: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },

    toggleCard: {
        backgroundColor: colors.surface,
        borderRadius: radius.xxl,
        padding: spacing.lg,
        marginBottom: spacing.xl,
        ...shadows.sm,
    },

    toggleHeader: {
        ...commonStyles.row,
        justifyContent: 'space-between',
        marginBottom: spacing.xs,
    },

    toggleTitle: {
        ...commonStyles.buttonText,
        color: colors.text,
        flex: 1,
    },

    toggleSubtitle: {
        fontSize: 12,
        color: colors.textSecondary,
        lineHeight: 16,
        paddingLeft: spacing.xxxl,
    },

    ///// EXAMREVIEWSCREEN
    scrollContainerReview: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        backgroundColor: '#F8F9FC',
    },
    topControlBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        marginVertical: 12,
    },
    navArrowButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    navArrowDisabled: {
        backgroundColor: '#F1F5F9',
        elevation: 0,
    },
    topButtonWrapper: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 16,
    },
    headerActionButton: {
        backgroundColor: '#2F70F2',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    headerActionText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    questionMainCard: {
        ...cardBase,
        marginBottom: spacing.xxl,
        ...shadows.sm,
    },
    progressRow: {
        borderBottomWidth: 1,
        borderColor: '#F1F5F9',
        paddingBottom: 10, marginBottom: 16,
    },
    progressText: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    questionStatement: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C2434',
        lineHeight: 24,
        marginBottom: 20,
    },
    optionsWrapper: {
        gap: 12,
        marginBottom: 20,
    },
    optionCardReview: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
    },
    optionCardNormal: {
        borderColor: '#E2E8F0',
        backgroundColor: '#FFFFFF',
    },
    optionCardCorrectReview: {
        borderColor: '#2ECC71',
        backgroundColor: '#F0FBF4',

    },
    optionCardIncorrectReview: {
        borderColor: '#E74C3C',
        backgroundColor: '#FDF2F1',

    },
    letterBadge: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,

    },
    badgeNormal: {
        borderWidth: 1,
        borderColor: '#94A3B8',
        backgroundColor: '#FFFFFF',

    },
    badgeCorrect: {
        backgroundColor: '#2ECC71',

    },
    badgeIncorrect: {
        backgroundColor: '#E74C3C',
    },
    letterBadgeText: {
        fontSize: 14,
        fontWeight: '600',

    },
    badgeTextNormal: {
        color: '#475569',

    },
    badgeTextWhite: {
        color: '#FFFFFF',
    },
    optionContentText: {
        flex: 1,
        fontSize: 14,
        color: '#334155',
        lineHeight: 20,

    },
    explanationBox: {
        backgroundColor: '#EFF6FF',
        borderLeftWidth: 4,
        borderColor: '#2F70F2',
        borderRadius: 8,
        padding: 14,
        marginTop: 8,
        bottom: 8,

    },
    explanationTitleReview: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1E40AF',
        marginBottom: 6,

    },
    explanationBody: {
        fontSize: 13,
        color: '#1E3A8A',
        lineHeight: 18,

    },
    adminEditButton: {
        flexDirection: 'row',
        backgroundColor: '#00BA52',
        // Mantenemos tu paleta verde para acciones de creación/edición
        borderRadius: 10,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        elevation: 2,
    },
    adminButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    errorText: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 16,
    },
    btnBack: {
        backgroundColor: '#2F70F2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    btnBackText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});