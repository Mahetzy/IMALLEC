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
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
        alignSelf: 'center',
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
        marginLeft: 15,
    },

    inputContainer: {
        width: '95%',
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        justifyContent: 'center',
        paddingHorizontal: 12,
        marginLeft: 15,
    },

    input: {
        width: '100%',
        height: '100%',
        color: '#222222',
        fontSize: 13,
    },

    button: {
        width: '95%',
        height: 75,
        backgroundColor: '#004695',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        marginLeft: 15,
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
        marginLeft: "65%",
        marginTop: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingBottom: 250, 
    },

});