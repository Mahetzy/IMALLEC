import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ForgotPassword() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                <View style={styles.header}>
                    <Text style={styles.headerText}></Text>

                    <Text style={styles.logo}>
                        I M <Text style={styles.logoLine}>|</Text> ULEC
                    </Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>
                        Código de{"\n"}verificación
                    </Text>

                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="person"
                            size={17}
                            color="#A0A0A0"
                            style={styles.icon}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Correo electrónico"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="lock-closed"
                            size={17}
                            color="#A0A0A0"
                            style={styles.icon}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Código de verificación"
                            placeholderTextColor="#999"
                            keyboardType="number-pad"
                        />
                    </View>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Solicitar código</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Enviar Código</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#032746",
    },

    background: {
        flex: 1,
        backgroundColor: "#032746",
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
        position: "absolute",
        right: 18,
        top: 14,
        color: "#D8D8D8",
        fontSize: 8,
        letterSpacing: 1.5,
    },

    logoLine: {
        color: "#C5A96A",
    },

    content: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 26,
        paddingTop: 65,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "500",
        textAlign: "center",
        lineHeight: 34,
        marginBottom: 38,
    },

    inputContainer: {
        width: "100%",
        height: 42,
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 13,
        marginBottom: 20,
    },

    icon: {
        marginRight: 8,
    },

    input: {
        flex: 1,
        height: "100%",
        fontSize: 10,
        color: "#333333",
    },

    button: {
        width: "76%",
        height: 42,
        borderRadius: 22,
        backgroundColor: "#0068C9",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
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
        fontSize: 13,
        fontWeight: "500",
    },
});