import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#020E1C",
        paddingHorizontal: 22,
        alignItems: "center",
    },

    title: {
        color: "#FFFFFF",
        fontSize: 37,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 40,
    },

    image: {
        width: "85%",
        height: "50%",
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 15,
        marginBottom: "-5%",
       
    },

    optionsContainer: {
        width: "100%",
        marginTop: 10,
    },

    optionButton: {
        width: "100%",
        height: 72,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        marginBottom: 30,
    },

    optionText: {
        color: "#020E1C",
        fontSize: 20,
        fontWeight: "500",
        marginLeft: 15,
    },

    logoutButton: {
        width: 145,
        height: 50,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },

    logoutText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "500",
    },

    logo: {
        width: 150,
        height: 85,
        alignSelf: "center",
        resizeMode: "contain",
        marginBottom: 20,
        marginTop: 20,
    },

});