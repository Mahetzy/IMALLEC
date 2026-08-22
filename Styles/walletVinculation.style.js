import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#020E1C',
        paddingHorizontal: 22,
    },

    title: {
        color: '#FFFFFF',
        fontSize: 37,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: -30,
    },

    image: {
        width: 290,
        height: 390,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 18,
    },

    description: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 22,
        marginTop: -10,
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
        height: 75,
        backgroundColor: '#004695',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold',
    },
    logo: {
        width: 150,
        height: 85,
        alignSelf: "center",
        resizeMode: "contain",
        marginBottom: 50,
        marginLeft: 235,
        marginTop: 20,
    },

});