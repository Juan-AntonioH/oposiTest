import {
    StyleSheet,
} from 'react-native';

export const styles =
    StyleSheet.create({

        filterCard: {

            backgroundColor:
                '#FFFFFF',

            padding:
                16,

            borderRadius:
                12,

            marginBottom:
                16,

            borderWidth:
                1,

            borderColor:
                '#E2E8F0',

        },

        labelList: {

            fontSize:
                14,

            fontWeight:
                '600',

            color:
                '#475569',

            marginBottom:
                7,

            marginTop:
                12,

        },

        searchContainer: {

            flexDirection:
                'row',

            alignItems:
                'center',

            height:
                48,

            paddingHorizontal:
                13,

            marginBottom:
                8,

            borderWidth:
                1,

            borderColor:
                '#CBD5E1',

            borderRadius:
                9,

            backgroundColor:
                '#FFFFFF',

        },

        searchInput: {

            flex:
                1,

            height:
                '100%',

            marginLeft:
                10,

            fontSize:
                15,

            color:
                '#1E293B',

        },

        dropdownList: {

            height:
                48,

            paddingHorizontal:
                13,

            marginBottom:
                2,

            borderWidth:
                1,

            borderColor:
                '#CBD5E1',

            borderRadius:
                9,

            backgroundColor:
                '#FFFFFF',

        },

        placeholder: {

            fontSize:
                14,

            color:
                '#94A3B8',

        },

        selectedText: {

            fontSize:
                14,

            fontWeight:
                '500',

            color:
                '#1E293B',

        },

        resultsText: {

            marginTop:
                18,

            marginBottom:
                12,

            fontSize:
                13,

            fontWeight:
                '600',

            color:
                '#64748B',

            textAlign:
                'center',

        },

        btnClearFilters: {

            height:
                44,

            flexDirection:
                'row',

            alignItems:
                'center',

            justifyContent:
                'center',

            gap:
                7,

            borderRadius:
                9,

            backgroundColor:
                '#64748B',

        },

        btnClearFiltersText: {

            fontSize:
                14,

            fontWeight:
                '700',

            color:
                '#FFFFFF',

        },
        questionsList: {

            gap:
                12,

            paddingBottom:
                32,

        },

        questionCardList: {

            padding:
                15,

            borderWidth:
                1,

            borderColor:
                '#E2E8F0',

            borderRadius:
                12,

            backgroundColor:
                '#FFFFFF',

        },

        questionCardPressed: {

            opacity:
                0.75,

            transform: [
                {
                    scale:
                        0.99,
                },
            ],

        },

        questionHeaderRow: {

            flexDirection:
                'row',

            alignItems:
                'center',

            marginBottom:
                11,

        },

        questionIconContainer: {

            width:
                36,

            height:
                36,

            alignItems:
                'center',

            justifyContent:
                'center',

            marginRight:
                10,

            borderRadius:
                9,

            backgroundColor:
                '#EFF6FF',

        },

        questionIdText: {

            flex:
                1,

            fontSize:
                14,

            fontWeight:
                '700',

            color:
                '#334155',

        },

        questionTextList: {

            fontSize:
                15,

            lineHeight:
                22,

            color:
                '#1E293B',

        },

        metaRow: {

            flexDirection:
                'row',

            flexWrap:
                'wrap',

            gap:
                8,

            marginTop:
                14,

        },

        metaBadge: {

            flexDirection:
                'row',

            alignItems:
                'center',

            gap:
                5,

            paddingHorizontal:
                9,

            paddingVertical:
                6,

            borderRadius:
                7,

            backgroundColor:
                '#F1F5F9',

        },

        metaText: {

            fontSize:
                12,

            fontWeight:
                '600',

            color:
                '#475569',

        },

        emptyQuestionsCard: {

            alignItems:
                'center',

            justifyContent:
                'center',

            paddingHorizontal:
                24,

            paddingVertical:
                42,

            borderWidth:
                1,

            borderColor:
                '#E2E8F0',

            borderRadius:
                12,

            backgroundColor:
                '#FFFFFF',

        },

        emptyQuestionsTitle: {

            marginTop:
                14,

            fontSize:
                16,

            fontWeight:
                '700',

            color:
                '#334155',

        },

        emptyQuestionsText: {

            marginTop:
                7,

            fontSize:
                14,

            lineHeight:
                20,

            textAlign:
                'center',

            color:
                '#64748B',

        },
        containerList: {

            flex:
                1,

            backgroundColor:
                '#F8FAFC',

        },

        contentContainerList: {

            padding:
                16,

            paddingBottom:
                40,

        },
        scrollTopButton: {

            position:
                'absolute',

            right:
                20,

            bottom:
                24,

            width:
                52,

            height:
                52,

            borderRadius:
                26,

            backgroundColor:
                '#2F70F2',

            justifyContent:
                'center',

            alignItems:
                'center',

            elevation:
                6,

            shadowColor:
                '#000000',

            shadowOffset: {

                width:
                    0,

                height:
                    3,

            },

            shadowOpacity:
                0.2,

            shadowRadius:
                5,

        },

        scrollTopButtonPressed: {

            opacity:
                0.8,

            transform: [

                {

                    scale:
                        0.94,

                },

            ],

        },
        oppositionName: {

            fontSize:
                20,

            fontWeight:
                '700',

            color:
                '#1E293B',

            marginBottom:
                20,

        },
    });