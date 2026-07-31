import {
    StyleSheet,
} from 'react-native';

export const styles =
    StyleSheet.create({

        container: {

            flex:
                1,

            backgroundColor:
                '#071D2D',

            justifyContent:
                'space-between',

            paddingHorizontal:
                30,

            paddingTop:
                80,

            paddingBottom:
                42,

        },

        content: {

            flex:
                1,

            justifyContent:
                'center',

            alignItems:
                'center',

        },

        logoContainer: {

            width:
                170,

            height:
                170,

            marginBottom:
                38,

            borderRadius:
                42,

            overflow:
                'hidden',

        },

        logo: {

            width:
                '100%',

            height:
                '100%',

        },

        loadingContent: {

            width:
                '100%',

            alignItems:
                'center',

        },

        title: {

            color:
                '#FFFFFF',

            fontSize:
                30,

            fontWeight:
                '800',

            letterSpacing:
                0.3,

        },

        message: {

            color:
                '#A9C1D2',

            fontSize:
                15,

            marginTop:
                10,

            marginBottom:
                38,

        },

        progressHeader: {

            width:
                '100%',

            flexDirection:
                'row',

            justifyContent:
                'space-between',

            alignItems:
                'center',

            marginBottom:
                10,

        },

        progressLabel: {

            color:
                '#D9E7F0',

            fontSize:
                13,

            fontWeight:
                '600',

        },

        progressPercentage: {

            color:
                '#4FD1C5',

            fontSize:
                14,

            fontWeight:
                '800',

        },

        progressTrack: {

            width:
                '100%',

            height:
                8,

            backgroundColor:
                'rgba(255, 255, 255, 0.12)',

            borderRadius:
                999,

            overflow:
                'hidden',

        },

        progressFill: {

            height:
                '100%',

            backgroundColor:
                '#36CFC2',

            borderRadius:
                999,

        },

        footer: {

            color:
                '#6F8CA0',

            fontSize:
                12,

            textAlign:
                'center',

        },

    });