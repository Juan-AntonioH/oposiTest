import { StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows } from '@/core/theme';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
        backgroundColor: '#F8F9FC',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        backgroundColor: '#F8F9FC', // Fondo gris claro idéntico a la imagen
        flexGrow: 1,
    },
    menuContainer: {
        gap: 16,
        marginBottom: 32,
    },
    headerContainer: {
        marginTop: 24,
        // marginBottom: 20,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 14,
    },
    mainTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1C2434',
        marginBottom: 6,
    },
    mainSubtitle: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 16
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16, // Bordes muy suaves
        padding: 20,
        marginBottom: 16,
        // Configuración de sombras nativas para iOS y Android
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 16,
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C2434',
        marginBottom: 4,
    },
    cardSub: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 2,
    },
    adminActionContainer: {
        gap: 12,
        marginTop: 8,
    },
    btn: {
        flexDirection: 'row',
        height: 48,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    btnGreen: {
        backgroundColor: '#00BA52',
    },
    btnBlue: {
        backgroundColor: '#2F70F2',
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    cardSubtitle: {
        fontSize: 13,
        color: '#64748B',
    },
    backButtonText: {
        color: '#64748B', // Usa tu paleta de colores del tema global si existe
        fontSize: 15,
        fontWeight: '600',
    },
    backButtonContainer: {
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: 12,
        paddingHorizontal: 4, // Pequeño margen para que no pegue directo al borde de la pantalla
    },
    // Área táctil del botón volver (facilita la pulsación del usuario)
    backButton: {
        paddingVertical: 8,
        paddingRight: 16, // Espacio interactivo hacia la derecha
    },
    customCardTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1C2434',
        marginBottom: 4,
    },
    yearTextBold: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C2434',
    },
    toggleCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
        elevation: 2,
    },
    toggleHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    toggleTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1C2434',
        flex: 1,
    },
    toggleSubtitle: {
        fontSize: 12,
        color: '#64748B',
        lineHeight: 16,
        paddingLeft: 28,
    },
    // ESTILOS PARA REALIZACIÓN DE TEST
    headerControlContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderColor: '#E2E8F0',
    },
    examSubtitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748B',
    },
    finishHeaderButton: {
        backgroundColor: '#FEE2E2',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FCA5A5',
    },
    finishHeaderButtonText: {
        color: '#DC2626',
        fontWeight: '700',
        fontSize: 13,
    },
    statusCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressTextContainer: {
        flexDirection: 'row',
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
        height: 6,
        backgroundColor: '#F1F5F9',
        borderRadius: 3,
        marginHorizontal: 12,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#2563EB', // Color primario de tu tema
        borderRadius: 3,
    },
    timerBadge: {
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    timerText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#334155',
    },
    questionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 20,
    },
    questionText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
        lineHeight: 24,
        marginBottom: 20,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
    },
    optionCardSelected: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#2563EB',
        borderRadius: 12,
        padding: 13,
        marginBottom: 12,
        backgroundColor: '#EFF6FF',
    },
    optionCardCorrect: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#10B981',
        borderRadius: 12,
        padding: 13,
        marginBottom: 12,
        backgroundColor: '#ECFDF5',
    },
    optionCardIncorrect: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#EF4444',
        borderRadius: 12,
        padding: 13,
        marginBottom: 12,
        backgroundColor: '#FEF2F2',
    },
    optionCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#CBD5E1',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    optionCircleSelected: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#2563EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    optionCircleCorrect: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#10B981',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    optionCircleIncorrect: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#EF4444',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    optionText: {
        fontSize: 14,
        color: '#475569',
        fontWeight: '600',
    },
    optionTextSelected: {
        fontSize: 14,
        color: '#FFFFFF',
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
        marginTop: 8,
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
        marginBottom: 20,
    },
    primaryButton: {
        flex: 1,
        backgroundColor: '#2563EB',
        borderRadius: 12,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryButtonDisabled: {
        flex: 1,
        backgroundColor: '#CBD5E1',
        borderRadius: 12,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 15,
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CBD5E1',
    },
    secondaryButtonText: {
        color: '#475569',
        fontWeight: '600',
        fontSize: 15,
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32, // Margen extra abajo para que los botones de acción no se peguen al borde físico de la pantalla
        backgroundColor: '#F8FAFC', // Fondo grisáceo claro muy limpio para que resalten las tarjetas blancas
    },
    /// EXAMSUMARYSCREEN
    mainTitleSumary: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C2434',
    },
    scoreCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
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
        backgroundColor: '#FFFFFF',
        width: '48%',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
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
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 6,
        marginBottom: 20,
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
    //QUESTIONFORMSCREEN
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
    boldText: {
        fontWeight: 'bold'
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
        width: 32,
        height: 32,
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
    ///// QuestionsListScreen
    containerList: { flex: 1, backgroundColor: '#F5F7FA' },
    contentContainerList: { padding: 16 },
    filterCard: { backgroundColor: '#FFF', borderRadius: 8, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#EEE' },
    labelList: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6 },
    searchInput: { height: 45, borderColor: '#DDD', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, backgroundColor: '#FFF', marginBottom: 14, fontSize: 14 },
    dropdownList: { height: 45, borderColor: '#DDD', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, backgroundColor: '#FFF', marginBottom: 14 },
    resultsText: { fontSize: 12, color: '#777', marginTop: 4 },
    questionCardList: { backgroundColor: '#FFF', borderRadius: 8, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#EEE' },
    questionHeaderRow: { flexDirection: 'row', alignItems: 'flex-start' },
    questionTextList: { fontSize: 14, color: '#333', lineHeight: 20, flex: 1 },
    metaRow: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
    metaText: { fontSize: 12, color: '#666' },
    metaDot: { marginHorizontal: 8, color: '#999' },
    btnVolver: { backgroundColor: '#FFF', borderColor: '#DDD', borderWidth: 1, borderRadius: 8, height: 48, justifyContent: 'center', alignItems: 'center', marginTop: 12 },
    btnVolverText: { color: '#333', fontSize: 15, fontWeight: '500' },
    btnClearFilters: {
        marginTop: 12,
        backgroundColor: '#F0F4F8',
        borderRadius: 6,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnClearFiltersText: {
        color: '#475569',
        fontSize: 13,
        fontWeight: '600',
    },
    //BLOCKSCREEN
    // Añade esto dentro del StyleSheet.create de tu exam.styles.ts
    toggleCardCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginTop: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    toggleCheckboxText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1E293B',
    },
    blocksContainerCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    blocksContainerSubtitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 16,
        textAlign: 'center',
    },
    blockRowCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
    },
    blockRowCardSelected: {
        borderColor: '#2F70F2',
        backgroundColor: '#F8FAFC',
    },
    blockGridIconBox: {
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blockRowTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    blockRowSub: {
        fontSize: 13,
        color: '#64748B',
        marginTop: 2,
    },

});