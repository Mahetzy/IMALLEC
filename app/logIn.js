import { Text, View, Image, TextInput, Pressable, Alert, StyleSheet, } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { styles } from "../Styles/logIn.style";
import Svg, { Path } from 'react-native-svg';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";



export default function LogIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();


    const logInUsuario = async () => {

        if (!email || !password) {
            Alert.alert(
                "Incomplete fields",
                "Fill in all the fields."
            );
            return;
        }

        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            Alert.alert(
                "Successful login",
                "Welcome back!"
            );

            router.push('/mainScreen')

        } catch (error) {
            const code = error.code;

            if (code === "auth/user-not-found") {
                Alert.alert(
                    "User not found",
                    "The user does not exist. Please register first."
                );
            } else if (code === "auth/wrong-password") {
                Alert.alert(
                    "Invalid email or password",
                    "The provided credentials are not valid. Please try again."
                );
            } else if (code === "auth/invalid-email") {
                Alert.alert(
                    "Invalid email",
                    "The provided email address is not valid. Please enter a valid email address.",
                );
            } else if (code === "auth/invalid-credential") {
                Alert.alert(
                    "Invalid email or password",
                    "The provided credentials are not valid. Please try again."
                );
            } else {
                Alert.alert(
                    "Login error",
                    "An error occurred while logging in. Please try again later."
                );
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
                <Svg height="2700" width="150%" viewBox=" -4 -50 60 1050" preserveAspectRatio="none">
                    <Path
                        d="M -1,-100 C 0,350 200,110 -40,510 Z"
                        fill="#00162F"
                        opacity="1"
                    />
                </Svg>
            </View>

            <Image
                source={require("../assets/IMALLEC.png.png")}
                style={styles.logo}
            />

            <Text style={styles.title}>
                Log in
            </Text>

            <View style={styles.inputContainer}>
                <Ionicons
                    name="person"
                    size={25}
                    color="#A0A0A0"
                    style={styles.icon}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
            </View>


            <View style={styles.inputContainer}>
                <Ionicons
                    name="lock-closed"
                    size={25}
                    color="#A0A0A0"
                    style={styles.icon}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <Pressable onPress={() => router.push('/forgotPassword')}>
                <Text style={styles.password}>
                    ¿Did you forget your password?
                </Text>
            </Pressable>

            <Pressable
                style={styles.button}
                onPress={logInUsuario}
            >

                <Text style={styles.buttonText}>
                    Log in
                </Text>

            </Pressable>

            <Text style={styles.subtitle}>
                ¿You don't have an account yet?
            </Text>

            <Pressable onPress={() => router.push('/signUp')}>
                <Text style={styles.login}>Sign up</Text>
            </Pressable>




        </View>
    );
};
