import {
  StyleSheet,
} from 'react-native';

export const styles =
  StyleSheet.create({

    safeArea: {

      flex:
        1,

      backgroundColor:
        '#F5F7FB',

    },

    container: {

      paddingHorizontal:
        18,

      paddingTop:
        12,

      paddingBottom:
        40,

    },

    welcomeContainer: {

      flexDirection:
        'row',

      alignItems:
        'center',

      justifyContent:
        'space-between',

      marginBottom:
        24,

    },

    welcomeContent: {

      flex:
        1,

      paddingRight:
        16,

    },

    welcomeTitle: {

      fontSize:
        25,

      fontWeight:
        '700',

      color:
        '#172033',

      marginBottom:
        6,

    },

    welcomeSubtitle: {

      fontSize:
        15,

      lineHeight:
        22,

      color:
        '#64748B',

    },

    dashboardLogo: {

      width:
        72,

      height:
        72,

    },

    mainCard: {

      flexDirection:
        'row',

      alignItems:
        'center',

      backgroundColor:
        '#FFFFFF',

      borderWidth:
        1,

      borderColor:
        '#DCE5F0',

      borderRadius:
        18,

      padding:
        18,

      marginBottom:
        28,

      shadowColor:
        '#0F172A',

      shadowOffset: {

        width:
          0,

        height:
          3,

      },

      shadowOpacity:
        0.07,

      shadowRadius:
        8,

      elevation:
        3,

    },

    mainCardIcon: {

      width:
        54,

      height:
        54,

      borderRadius:
        16,

      alignItems:
        'center',

      justifyContent:
        'center',

      backgroundColor:
        '#EAF3FF',

      marginRight:
        15,

    },

    mainCardContent: {

      flex:
        1,

    },

    mainCardTitle: {

      fontSize:
        17,

      fontWeight:
        '700',

      color:
        '#172033',

      marginBottom:
        5,

    },

    mainCardDescription: {

      fontSize:
        13,

      lineHeight:
        19,

      color:
        '#64748B',

    },

    sectionTitle: {

      fontSize:
        18,

      fontWeight:
        '700',

      color:
        '#172033',

      marginBottom:
        14,

    },

    quickActionsGrid: {

      flexDirection:
        'row',

      flexWrap:
        'wrap',

      justifyContent:
        'space-between',

      gap:
        12,

    },

    quickAction: {

      width:
        '48%',

      minHeight:
        122,

      alignItems:
        'center',

      justifyContent:
        'center',

      backgroundColor:
        '#FFFFFF',

      borderWidth:
        1,

      borderColor:
        '#DCE5F0',

      borderRadius:
        17,

      paddingHorizontal:
        12,

      paddingVertical:
        18,

    },

    quickActionIcon: {

      width:
        48,

      height:
        48,

      borderRadius:
        15,

      alignItems:
        'center',

      justifyContent:
        'center',

      backgroundColor:
        '#EEF6FF',

      marginBottom:
        10,

    },

    quickActionTitle: {

      fontSize:
        14,

      fontWeight:
        '600',

      color:
        '#334155',

      textAlign:
        'center',

    },
    activityGrid: {

      flexDirection:
        'row',

      gap:
        10,

      width:
        '100%',

    },

    activityCard: {

      flex:
        1,

      minHeight:
        118,

      alignItems:
        'center',

      justifyContent:
        'center',

      backgroundColor:
        '#FFFFFF',

      borderWidth:
        1,

      borderColor:
        '#DCE5F0',

      borderRadius:
        16,

      paddingHorizontal:
        6,

      paddingVertical:
        14,

    },

    activityIcon: {

      width:
        36,

      height:
        36,

      alignItems:
        'center',

      justifyContent:
        'center',

      backgroundColor:
        '#EAF3FF',

      borderRadius:
        18,

      marginBottom:
        8,

    },

    activityValue: {

      color:
        '#172033',

      fontSize:
        22,

      fontWeight:
        '800',

      textAlign:
        'center',

      includeFontPadding:
        false,

    },

    activityLabel: {

      color:
        '#64748B',

      fontSize:
        12,

      fontWeight:
        '600',

      textAlign:
        'center',

      marginTop:
        5,

      includeFontPadding:
        false,

    },
  });