import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#0B2340',
        paddingHorizontal: 30,
        paddingTop: 100,
    },

    header: {
        alignItems: 'center',
        marginBottom: 55,
    },

    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 25,
    },

    subtitle: {
        fontSize: 17,
        color: '#D9E1EA',
        textAlign: 'center',
        lineHeight: 25,
    },

    optionsContainer: {
        gap: 30,
    },

    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 20,
        minHeight: 170,
    },

    iconContainer: {
        width: 90,
        height: 90,
        borderRadius: 18,
        backgroundColor: '#F1F4F8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 25,
    },

    textContainer: {
        flex: 1,
    },

    optionTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0B2340',
        marginBottom: 8,
    },

    optionSubtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#66717D',
        lineHeight: 28,
    },

});