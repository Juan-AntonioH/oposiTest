
import { StyleSheet } from 'react-native';
import { optionDimensions } from '@/features/exam/styles/exam.styles';
import { colors, spacing, } from '@/core/theme';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.xxl,
        paddingTop: spacing.xs,
        backgroundColor: colors.surfaceSecondary,
    },
    containerQuestion: {
        flex: 1,
        backgroundColor: '#F8F9FA'
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 32,
        paddingTop: 8

    },
    subHeader: {
        fontSize: 18,
        color: '#333333',
        marginBottom: 16

    },
    cardQuestion: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#495057',
        marginTop: 14,
        marginBottom: 6

    },
    input: {
        borderWidth: 1,
        borderColor: '#CED4DA',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        backgroundColor: '#FAFAFA',
        color: '#212529',
    },
    textArea: {
        textAlignVertical: 'top',
        minHeight: 80
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10

    },
    optionBadge: {
        ...optionDimensions,
        borderRadius: 16,
        backgroundColor: '#E8F0FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    optionBadgeText: {
        color: '#1A73E8',
        fontWeight: 'bold'

    },
    optionInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#CED4DA',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        backgroundColor: '#FAFAFA',
        color: '#212529',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        gap: 8

    },
    btnQuestion: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'

    },
    btnGuardar: {
        backgroundColor: '#00A650'

    },
    btnEliminar: {
        backgroundColor: '#D90404'

    },
    btnCancelar: {
        borderWidth: 1,
        borderColor: '#CED4DA',
        backgroundColor: '#FFFFFF'

    },
    btnTextGuardar: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 13

    },
    btnTextEliminar: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 13

    },
    btnTextCancelar: {
        color: '#495057',
        fontSize: 13

    },
    dropdown: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    placeholder: {
        color: '#999',
        fontSize: 14,
    },
    selectedText: {
        color: '#000',
        fontSize: 14,
    },
})