import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {SafeAreaView,StyleSheet,Text,TextInput,TouchableOpacity,View,Image,} from "react-native";
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { useRouter } from "expo-router";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { styles } from "../Styles/forgotPassword.style";


export default function forgotPassword() {

    const [email, setEmail] = React.useState("");

    const forgotPassword = async () => {
        if (!email) {
            alert("Please enter your email address.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent.");
        } catch (error) {
            const errorCode = error.code;
            if (errorCode === "auth/user-not-found") {
                alert("No user found with this email address.");
            } else if (errorCode === "auth/invalid-email") {
                alert("Invalid email address.");
            } else {
                console.error("Error sending password reset email:", error);
                alert("Failed to send password reset email. Please, try again later");
            }
        }
    };

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
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <TouchableOpacity style={styles.button1} onPress={forgotPassword}>
                        <Text style={styles.buttonText}>Send Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
