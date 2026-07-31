import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    section: {

        backgroundColor: '#FFFFFF',

        borderRadius: 12,

        borderWidth: 1,

        borderColor: '#E2E8F0',

        padding: 16,

        marginBottom: 16,

    },

    sectionTitle: {

        fontSize: 16,

        fontWeight: '700',

        color: '#1E293B',

        marginBottom: 16,

    },

    blockCard: {

        flexDirection: 'row',

        alignItems: 'center',

        padding: 14,

        borderRadius: 10,

        borderWidth: 1,

        borderColor: '#E2E8F0',

        backgroundColor: '#FFFFFF',

        marginBottom: 12,

    },

    blockCardSelected: {

        borderColor: '#2F70F2',

        backgroundColor: '#EFF6FF',

    },

    blockInfo: {

        flex: 1,

        marginLeft: 12,

    },

    blockTitle: {

        fontSize: 15,

        fontWeight: '600',

        color: '#1E293B',

    },

    blockSubtitle: {

        marginTop: 2,

        fontSize: 13,

        color: '#64748B',

    },

    themeGroup: {

        backgroundColor: '#FFFFFF',

        borderRadius: 10,

        borderWidth: 1,

        borderColor: '#E2E8F0',

        padding: 14,

        marginBottom: 16,

    },

    themeGroupTitle: {

        fontSize: 14,

        fontWeight: '700',

        color: '#475569',

        marginBottom: 12,

    },

    themeCard: {

        flexDirection: 'row',

        alignItems: 'center',

        padding: 12,

        borderRadius: 8,

        borderWidth: 1,

        borderColor: '#E2E8F0',

        backgroundColor: '#FFFFFF',

        marginBottom: 10,

    },

    themeCardSelected: {

        borderColor: '#2F70F2',

        backgroundColor: '#EFF6FF',

    },

    themeInfo: {

        flex: 1,

        marginLeft: 12,

    },

    themeTitle: {

        fontSize: 14,

        fontWeight: '500',

        color: '#1E293B',

    },

    themeSubtitle: {

        marginTop: 2,

        fontSize: 12,

        color: '#64748B',

    },
    startButton: {

        height: 52,

        borderRadius: 10,

        backgroundColor: '#2F70F2',

        justifyContent: 'center',

        alignItems: 'center',

        marginTop: 12,

        marginBottom: 30,

    },

    startButtonDisabled: {

        backgroundColor: '#CBD5E1',

    },

    startButtonText: {

        color: '#FFFFFF',

        fontSize: 15,

        fontWeight: '700',

    },
});