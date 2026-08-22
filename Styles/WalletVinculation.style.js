import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#020E1C',
        paddingHorizontal: 22,
    },

    title: {
        color: '#FFFFFF',
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 45,
    },

    image: {
        width: 190,
        height: 190,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 18,
    },

    description: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 22,
        marginTop: 5,
    },

    form: {
        marginTop: 25,
    },

    label: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 7,
    },

    inputContainer: {
        width: '100%',
        height: 45,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        justifyContent: 'center',
        paddingHorizontal: 12,
    },

    input: {
        width: '100%',
        height: '100%',
        color: '#222222',
        fontSize: 13,
    },

    button: {
        width: '100%',
        height: 45,
        backgroundColor: '#0755A8',
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
    },

});
