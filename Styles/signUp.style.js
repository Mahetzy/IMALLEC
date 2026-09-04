import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent: "center",
        backgroundColor: "#013a7a",
        paddingTop: 70,
        marginTop: -30,
    },

    logo: {
        width: 150,
        height: 85,
        alignSelf: "center",
        resizeMode: "contain",
        marginBottom: 110,
        marginLeft: 235,
    },

    title: {
        fontSize: 57,
        fontWeight: "bold",
        textAlign: "center",
        color: "#ffffff",
        marginBottom: 10,
        padding: 1
    },
    subtitle: {
        paddingTop: 30,
        fontSize: 20,
        textAlign: "center",
        color: "#ffffff",
        marginBottom: 25,
    },

    login: {
        paddingTop: 1,
        fontSize: 15,
        textAlign: "center",
        color: "#ffffff",
        marginBottom: 120,
        fontWeight: "bold",
    },



    inputContainer: {
        marginLeft: 20,
        marginRight: 20,
        height: 55,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 75,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        marginTop: 20,

    },

    icon: {
        marginLeft: 18,
        marginRight: 5,
    },

    input: {
        flex: 1,
        height: 55,
        paddingHorizontal: 10,
        fontSize: 15,
        color: "#0e0d0d",
    },

    inputFocused: {
        borderColor: "#2563EB",
    },

    button: {
        marginLeft: 30,
        marginRight: 30,
        height: 70,
        backgroundColor: "#004695",
        borderRadius: 75,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        elevation: 3,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 25,

    },

    footer: {
        textAlign: "center",
        marginTop: 20,
        color: "#6B7280",
        fontSize: 13,
    },

    linkText: {
        marginTop: 15,
        paddingVertical: 15,
        alignSelf: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#003673',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: '#FFF',
        marginLeft: 50,
    },
    checkboxChecked: {
        backgroundColor: '#003673',
    },
    termsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginVertical: 15,
    },
    label: {
        fontSize: 14,
        color: '#ffffff',
    },
    linkText: {
        fontSize: 14,
        color: '#003673',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    menu: {
        width: "78%",
        height: "100%",
        backgroundColor: "#FFFFFF",
        paddingTop: 40,
        paddingHorizontal: 55,
    },

    cerrar: {
        fontSize: 45,
        color: "#06264A",
        marginBottom: 45,
    },

    boton: {
        height: 78,
        backgroundColor: "#06264A",
        borderRadius: 18,
        marginBottom: 28,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,

        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },

    icono: {
        width: 45,
        fontSize: 30,
        color: "#000000",
        textAlign: "center",
        marginRight: 15,
    },

    texto: {
        color: "#FFFFFF",
        fontSize: 19,
        fontWeight: "500",
    },
});

