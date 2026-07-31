import {
    StyleSheet,
} from 'react-native';

export const styles =
    StyleSheet.create({

        filterCard: {

            backgroundColor:
                '#FFFFFF',

            borderRadius:
                12,

            borderWidth:
                1,

            borderColor:
                '#E2E8F0',

            padding:
                16,

            marginBottom:
                18,

            shadowColor:
                '#0F172A',

            shadowOffset: {

                width:
                    0,

                height:
                    2,

            },

            shadowOpacity:
                0.05,

            shadowRadius:
                8,

            elevation:
                2,

        },

        filterTitleRow: {

            flexDirection:
                'row',

            alignItems:
                'center',

            marginBottom:
                18,

        },

        filterTitle: {

            fontSize:
                16,

            fontWeight:
                '700',

            color:
                '#1E293B',

            marginLeft:
                8,

        },

        filterLabel: {

            fontSize:
                13,

            fontWeight:
                '500',

            color:
                '#475569',

            marginBottom:
                7,

        },

        dropdown: {

            height:
                46,

            borderWidth:
                1,

            borderColor:
                '#CBD5E1',

            borderRadius:
                9,

            paddingHorizontal:
                13,

            backgroundColor:
                '#FFFFFF',

            marginBottom:
                16,

        },

        dropdownPlaceholder: {

            fontSize:
                14,

            color:
                '#94A3B8',

        },

        dropdownSelectedText: {

            fontSize:
                14,

            color:
                '#1E293B',

            fontWeight:
                '500',

        },

        dateSelector: {

            height:
                46,

            borderWidth:
                1,

            borderColor:
                '#CBD5E1',

            borderRadius:
                9,

            paddingHorizontal:
                13,

            flexDirection:
                'row',

            alignItems:
                'center',

            justifyContent:
                'space-between',

            backgroundColor:
                '#FFFFFF',

        },

        dateSelectorLeft: {

            flexDirection:
                'row',

            alignItems:
                'center',

            flex:
                1,

        },

        dateSelectorText: {

            fontSize:
                14,

            color:
                '#64748B',

            marginLeft:
                9,

        },

        resultsText: {

            fontSize:
                12,

            color:
                '#64748B',

            marginTop:
                15,

        },
        screen: {

            flex:
                1,

            backgroundColor:
                '#F8FAFC',

        },

        screenContent: {

            padding:
                16,

            paddingBottom:
                32,

        },
        bodyContainer: {

            gap:
                12,

            paddingTop:
                16,

            paddingBottom:
                32,

        },

        examCard: {

            flexDirection:
                'row',

            overflow:
                'hidden',

            backgroundColor:
                '#FFFFFF',

            borderRadius:
                14,

            borderWidth:
                1,

            borderColor:
                '#E2E8F0',

        },

        examCardPressed: {

            opacity:
                0.8,

        },

        examCardAccent: {

            width:
                5,

            backgroundColor:
                '#2F70F2',

        },

        examCardContent: {

            flex:
                1,

            padding:
                16,

        },

        examCardHeader: {

            flexDirection:
                'row',

            alignItems:
                'center',

        },



        examCardHeaderText: {

            flex:
                1,

        },

        examCardTitle: {

            color:
                '#1E293B',

            fontSize:
                16,

            fontWeight:
                '700',

        },

        examCardDivider: {

            height:
                1,

            backgroundColor:
                '#E2E8F0',

            marginVertical:
                14,

        },

        examInfoLabel: {

            color:
                '#64748B',

            fontSize:
                13,

            marginLeft:
                8,

            marginRight:
                5,

        },

        examInfoValue: {

            flex:
                1,

            color:
                '#334155',

            fontSize:
                13,

            fontWeight:
                '600',

        },

        emptyContainer: {

            alignItems:
                'center',

            justifyContent:
                'center',

            paddingHorizontal:
                32,

            paddingVertical:
                56,

            backgroundColor:
                '#FFFFFF',

            borderRadius:
                14,

            borderWidth:
                1,

            borderColor:
                '#E2E8F0',

            marginTop:
                16,

        },

        emptyTitle: {

            color:
                '#1E293B',

            fontSize:
                17,

            fontWeight:
                '700',

            marginBottom:
                8,

        },

        emptyText: {

            color:
                '#64748B',

            fontSize:
                14,

            lineHeight:
                21,

            textAlign:
                'center',

        },
        /* ------------------------------------------------------------------ */
        /* CARD                                                               */
        /* ------------------------------------------------------------------ */

        card: {

            flexDirection:
                'row',

            width:
                '100%',

            backgroundColor:
                '#FFFFFF',

            borderRadius:
                14,

            marginBottom:
                14,

            overflow:
                'hidden',

            borderWidth:
                1,

            borderColor:
                '#E2E8F0',

            shadowColor:
                '#0F172A',

            shadowOffset: {

                width:
                    0,

                height:
                    2,

            },

            shadowOpacity:
                0.05,

            shadowRadius:
                5,

            elevation:
                2,

        },

        /* ========================================================== */
        /* BARRA AZUL LATERAL                                        */
        /* ========================================================== */

        cardAccent: {

            width:
                5,

            alignSelf:
                'stretch',

            backgroundColor:
                '#2F70F2',

        },

        /* ========================================================== */
        /* CONTENIDO INTERNO                                         */
        /* ========================================================== */

        cardContent: {

            flex:
                1,

            minWidth:
                0,

            padding:
                16,

        },

        /* ========================================================== */
        /* CABECERA                                                  */
        /* ========================================================== */

        cardHeader: {

            flexDirection:
                'row',

            alignItems:
                'center',

            justifyContent:
                'space-between',

        },

        titleContainer: {

            flex:
                1,

            minWidth:
                0,

            paddingRight:
                10,

        },

        titleRow: {

            flexDirection:
                'row',

            alignItems:
                'center',

        },

        examName: {

            flex:
                1,

            color:
                '#1E293B',

            fontSize:
                16,

            fontWeight:
                '700',

            marginLeft:
                8,

        },

        oppositionRow: {

            flexDirection:
                'row',

            alignItems:
                'center',

            marginTop:
                7,

        },

        oppositionName: {

            flex:
                1,

            color:
                '#64748B',

            fontSize:
                13,

            fontWeight:
                '500',

            marginLeft:
                6,

        },

        /* ========================================================== */
        /* SEPARADOR DE LA CABECERA                                  */
        /* ========================================================== */

        headerSeparator: {

            height:
                1,

            backgroundColor:
                '#E2E8F0',

            marginTop:
                14,

            marginBottom:
                16,

        },

        /* ========================================================== */
        /* INFORMACIÓN Y RESULTADOS                                  */
        /* ========================================================== */

        cardDetails: {

            flexDirection:
                'row',

            alignItems:
                'flex-start',

            width:
                '100%',

            marginBottom:
                16,

        },

        detailColumn: {

            flex:
                1,

            minWidth:
                0,

            paddingRight:
                2,

        },

        detailTopRow: {

            flexDirection:
                'row',

            alignItems:
                'center',

            minHeight:
                20,

            marginBottom:
                9,

        },

        detailTopText: {

            flex:
                1,

            color:
                '#64748B',

            fontSize:
                12,

            fontWeight:
                '600',

            marginLeft:
                5,

        },

        detailResultRow: {

            flexDirection:
                'row',

            alignItems:
                'center',

            minHeight:
                20,

        },

        /* ========================================================== */
        /* ACIERTOS                                                  */
        /* ========================================================== */

        successText: {

            color:
                '#16A34A',

            fontSize:
                13,

            fontWeight:
                '700',

            marginLeft:
                4,

        },

        /* ========================================================== */
        /* ERRORES                                                   */
        /* ========================================================== */

        errorText: {

            color:
                '#DC2626',

            fontSize:
                13,

            fontWeight:
                '700',

            marginLeft:
                4,

        },

        /* ========================================================== */
        /* SIN RESPONDER                                             */
        /* ========================================================== */

        unansweredText: {

            color:
                '#64748B',

            fontSize:
                13,

            fontWeight:
                '700',

            marginLeft:
                4,

        },

        resultLabel: {

            flexShrink:
                1,

            color:
                '#64748B',

            fontSize:
                10,

            fontWeight:
                '500',

            marginLeft:
                3,

        },

        /* ========================================================== */
        /* NOTA                                                      */
        /* ========================================================== */

        noteContainer: {

            flexDirection:
                'row',

            alignItems:
                'center',

            justifyContent:
                'space-between',

            width:
                '100%',

            maxWidth:
                '100%',

            alignSelf:
                'stretch',

            backgroundColor:
                '#F8FAFC',

            borderWidth:
                2,

            borderColor:
                '#BCCBDD',

            borderRadius:
                10,

            paddingHorizontal:
                12,

            paddingVertical:
                10,

        },

        noteLabel: {

            color:
                '#475569',

            fontSize:
                13,

            fontWeight:
                '600',

            marginRight: 10,
        },

        noteValue: {

            color:
                '#2F70F2',

            fontSize:
                18,

            fontWeight:
                '800',
        },

        lastDetailColumn: {

            flex:
                1.25,

        },
        /*
 * =================================
 * EXAM HISTORY CALENDAR
 * =================================
 */

        calendarOverlay: {

            flex:
                1,

            justifyContent:
                'center',

            alignItems:
                'center',

            paddingHorizontal:
                16,

            backgroundColor:
                'rgba(15, 23, 42, 0.45)',

        },

        calendarBackdrop: {

            position:
                'absolute',

            top:
                0,

            right:
                0,

            bottom:
                0,

            left:
                0,

        },

        calendarModal: {

            width:
                '100%',

            maxWidth:
                460,

            maxHeight:
                '90%',

            backgroundColor:
                '#FFFFFF',

            borderRadius:
                20,

            overflow:
                'hidden',

            shadowColor:
                '#0F172A',

            shadowOffset: {

                width:
                    0,

                height:
                    10,

            },

            shadowOpacity:
                0.22,

            shadowRadius:
                24,

            elevation:
                12,

        },

        /*
         * Cabecera
         */

        calendarTopBar: {

            flexDirection:
                'row',

            alignItems:
                'center',

            justifyContent:
                'space-between',

            paddingHorizontal:
                20,

            paddingTop:
                20,

            paddingBottom:
                16,

            borderBottomWidth:
                1,

            borderBottomColor:
                '#E2E8F0',

        },

        calendarTitle: {

            fontSize:
                20,

            fontWeight:
                '700',

            color:
                '#1E293B',

        },

        calendarSubtitle: {

            marginTop:
                4,

            fontSize:
                13,

            fontWeight:
                '500',

            color:
                '#64748B',

        },

        calendarCloseButton: {

            width:
                40,

            height:
                40,

            justifyContent:
                'center',

            alignItems:
                'center',

            borderRadius:
                20,

            backgroundColor:
                '#F1F5F9',

        },

        /*
         * Navegación entre meses
         */

        calendarMonthHeader: {

            flexDirection:
                'row',

            alignItems:
                'center',

            justifyContent:
                'space-between',

            paddingHorizontal:
                16,

            paddingTop:
                18,

            paddingBottom:
                14,

        },

        calendarArrowButton: {

            width:
                40,

            height:
                40,

            justifyContent:
                'center',

            alignItems:
                'center',

            borderRadius:
                20,

            backgroundColor:
                '#EFF6FF',

        },

        calendarMonthText: {

            fontSize:
                17,

            fontWeight:
                '700',

            color:
                '#1E3A5F',

            textTransform:
                'capitalize',

        },

        /*
         * Días de la semana
         */

        calendarWeekRow: {

            flexDirection:
                'row',

            paddingHorizontal:
                12,

            paddingBottom:
                8,

        },

        calendarWeekDay: {

            width:
                '14.2857%',

            alignItems:
                'center',

            justifyContent:
                'center',

            paddingVertical:
                7,

        },

        calendarWeekDayText: {

            fontSize:
                12,

            fontWeight:
                '700',

            color:
                '#94A3B8',

        },

        /*
         * Cuadrícula de días
         */

        calendarDays: {

            flexDirection:
                'row',

            flexWrap:
                'wrap',

            paddingHorizontal:
                12,

            paddingBottom:
                16,

        },

        calendarDayCell: {

            width:
                '14.2857%',

            alignItems:
                'center',

            justifyContent:
                'center',

            paddingVertical:
                4,

        },

        calendarDay: {

            width:
                42,

            height:
                42,

            justifyContent:
                'center',

            alignItems:
                'center',

            borderRadius:
                12,

            position:
                'relative',

        },

        /*
         * Día que tiene uno o más
         * exámenes disponibles.
         */

        calendarDayAvailable: {

            backgroundColor:
                '#DDF3FA',

            borderWidth:
                1,

            borderColor:
                '#B8E3F0',

        },

        /*
         * Día seleccionado.
         */

        calendarDaySelected: {

            backgroundColor:
                '#2563EB',

            borderColor:
                '#2563EB',

        },

        calendarDayText: {

            fontSize:
                14,

            fontWeight:
                '600',

            color:
                '#334155',

        },

        calendarDayDisabledText: {

            color:
                '#CBD5E1',

            fontWeight:
                '400',

        },

        calendarDaySelectedText: {

            color:
                '#FFFFFF',

            fontWeight:
                '700',

        },

        /*
         * Número de exámenes cuando
         * hay más de uno en un día.
         */

        calendarExamCount: {

            position:
                'absolute',

            top:
                -5,

            right:
                -5,

            minWidth:
                17,

            height:
                17,

            paddingHorizontal:
                3,

            justifyContent:
                'center',

            alignItems:
                'center',

            borderRadius:
                9,

            backgroundColor:
                '#0F766E',

            borderWidth:
                2,

            borderColor:
                '#FFFFFF',

        },

        calendarExamCountText: {

            fontSize:
                9,

            fontWeight:
                '700',

            color:
                '#FFFFFF',

        },

        /*
         * Pie del calendario
         */

        calendarFooter: {

            flexDirection:
                'row',

            alignItems:
                'center',

            justifyContent:
                'flex-end',

            gap:
                12,

            paddingHorizontal:
                20,

            paddingTop:
                16,

            paddingBottom:
                20,

            borderTopWidth:
                1,

            borderTopColor:
                '#E2E8F0',

            backgroundColor:
                '#F8FAFC',

        },

        calendarClearButton: {

            minWidth:
                125,

            height:
                44,

            justifyContent:
                'center',

            alignItems:
                'center',

            paddingHorizontal:
                18,

            borderRadius:
                10,

            borderWidth:
                1,

            borderColor:
                '#CBD5E1',

            backgroundColor:
                '#FFFFFF',

        },

        calendarClearButtonText: {

            fontSize:
                14,

            fontWeight:
                '600',

            color:
                '#475569',

        },

        calendarApplyButton: {

            minWidth:
                105,

            height:
                44,

            justifyContent:
                'center',

            alignItems:
                'center',

            paddingHorizontal:
                20,

            borderRadius:
                10,

            backgroundColor:
                '#2563EB',

        },

        calendarApplyButtonText: {

            fontSize:
                14,

            fontWeight:
                '700',

            color:
                '#FFFFFF',

        },
    });