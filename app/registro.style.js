import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        paddingHorizontal: 25,
        paddingVertical: 35,
        justifyContent: "center",
        backgroundColor: "#F5F7FA",
    },

    logo: {
        width: 180,
        height: 120,
        alignSelf: "center",
        resizeMode: "contain",
        marginBottom: 10,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1F2937",
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 15,
        textAlign: "center",
        color: "#6B7280",
        marginBottom: 30,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 7,
        marginTop: 5,
    },

    input: {
        height: 50,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 15,
        color: "#111827",
        marginBottom: 12,
    },

    inputFocused: {
        borderColor: "#2563EB",
    },

    button: {
        height: 52,
        backgroundColor: "#2563EB",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        elevation: 3,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },

    footer: {
        textAlign: "center",
        marginTop: 20,
        color: "#6B7280",
        fontSize: 13,
    },

});