
import { StyleSheet } from 'react-native';
import { borderedCardBase, cardBase, optionCardBase, optionDimensions } from './exam.styles';
import {
    colors,
    spacing,
    radius,
    shadows,
    commonStyles,
} from '@/core/theme';

export const summaryStyles = StyleSheet.create({
    mainTitleSumary: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C2434',
    },
    scoreCard: {
        ...cardBase,
        alignItems: 'center',
        marginBottom: spacing.xxl,
        ...shadows.sm,
    },
    badgeContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    scoreNumber: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#1C2434',
    },
    scoreLabel: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    metricBox: {
        ...cardBase,
        width: '48%',
        alignItems: 'center',
        marginBottom: spacing.lg,
        ...shadows.sm,
    },
    metricValue: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1C2434',
        marginTop: 4,
    },
    metricLabel: {
        fontSize: 11,
        color: '#64748B',
        marginTop: 2,
        textAlign: 'center',
        fontWeight: '500',
    },
    footerContainer: {
        marginTop: 12,
    },

    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        marginTop: 8,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    legendText: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
    },
    backButtonContainerSumary: {
        width: '100%',
        marginBottom: 12,
    },
    backButtonSumary: {
        borderRadius: 10,
        paddingVertical: 12,
    },
    backButtonTextSumary: {
        fontSize: 15,
        fontWeight: '600',
    },
    examName: {
        marginTop: 4,
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    answersMap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },

    answerCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },

    summaryButton: {
        marginTop: 24,
        backgroundColor: '#2563EB',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },

    summaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    answersMapTitle: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 12,
    },
    answerNumber: {
        fontSize: 10,
        fontWeight: '700',
    },
    answerCircleCorrect: {
        backgroundColor: '#22C55E',
    },

    answerCircleIncorrect: {
        backgroundColor: '#EF4444',
    },

    answerCircleUnanswered: {
        backgroundColor: '#E9EBEE',
        borderWidth: 1,
        borderColor: '#CBD5E1',
    },

    answerNumberWhite: {
        color: '#FFFFFF',
    },

    answerNumberDark: {
        color: '#475569',
    },
    summaryContainer: {
        flex: 1,
    },

    summaryContent: {
        padding: 16,
        paddingBottom: 40,
    },
})