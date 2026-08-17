import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },

    header: {
        height: 70,
        justifyContent: "center",
        paddingHorizontal: 22,
    },

    headerText: {
        color: "#D8D8D8",
        fontSize: 12,
        position: "absolute",
        left: 22,
        top: 14,
    },

    logo: {
        width: 150,
        height: 85,
        alignSelf: "center",
        resizeMode: "contain",
        marginBottom: 10,
        marginLeft: 235,
        marginTop: -50,
    },


    content: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 26,
        paddingTop: 65,
    },



    inputContainer: {
        width: "100%",
        height: 52,
        backgroundColor: "#FFFFFF",
        borderRadius: 75,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 13,
        marginBottom: 20,
        marginTop: 20,
    },

    icon: {
        marginRight: 8,
    },

    input: {
        flex: 1,
        height: "100%",
        fontSize: 15,
        color: "#333333",

    },

    button1: {
        width: "76%",
        height: 72,
        borderRadius: 75,
        backgroundColor: "#0068C9AB",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 75,
        marginBottom: 14,
        shadowColor: "#000000",
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.45,
        shadowRadius: 3,
        elevation: 5,
    },

    button2: {
        width: "76%",
        height: 72,
        borderRadius: 75,
        backgroundColor: "#0068C9AB",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 14,
        shadowColor: "#000000",
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.45,
        shadowRadius: 3,
        elevation: 5,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 23,
        fontWeight: "500",

    },
    title: {
        fontSize: 57,
        fontWeight: "bold",
        textAlign: "center",
        color: "#ffffff",
        marginBottom: 70,
        padding: 1
    },
});