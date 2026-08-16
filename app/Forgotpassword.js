import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
} from "react-native";
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";


export default function ForgotPassword() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
                <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
                    <Defs>
                        <RadialGradient id="backgroundGrad" cx="50%" cy="50%" r="45%">
                            <Stop offset="50%" stopColor="#11386F" stopOpacity="1" />
                            <Stop offset="85%" stopColor="#051630" stopOpacity="1" />
                            <Stop offset="100%" stopColor="#020A14" stopOpacity="1" />
                        </RadialGradient>
                    </Defs>
                    <Rect width="200%" height="100%" fill="url(#backgroundGrad)" />
                </Svg>
            </View>
            <View style={styles.background}>
                <View style={styles.header}>
                    <Text style={styles.headerText}></Text>


                </View>
                <Image
                    source={require("../assets/IMALLEC.png.png")}
                    style={styles.logo}
                />

                <View style={styles.content}>
                    <Text style={styles.title}>
                        Verification Code
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
                            placeholder="Email"
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
                            placeholder="Verification Code"
                            placeholderTextColor="#999"
                            keyboardType="number-pad"
                        />
                    </View>

                    <TouchableOpacity style={styles.button1}>
                        <Text style={styles.buttonText}>Request Code</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button2}>
                        <Text style={styles.buttonText}>Send Code</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
        fontSize: 10,
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