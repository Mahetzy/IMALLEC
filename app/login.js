import { Text, View, Image, TextInput, Pressable, Alert, StyleSheet, } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { styles } from "../Styles/login.style";
import Svg, { Path } from 'react-native-svg';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";



export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();


    const loginUsuario = async () => {

        if (!email || !password) {
            Alert.alert(
                "Campos incompletos",
                "Complete todos los campos."
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
                "Inicio de sesión exitoso",
                "¡Bienvenido de nuevo!"
            );

            router.push('/Pantalla_principal');

        } catch (error) {
            const code = error.code;

            if (code === "auth/user-not-found") {
                Alert.alert(
                    "Usuario no encontrado",
                    "El usuario no existe. Por favor, regístrese primero."
                );
            } else if (code === "auth/wrong-password") {
                Alert.alert(
                    "Correo o contraseña incorrectos.",
                    "Las credenciales proporcionadas no son válidas. Por favor, inténtelo de nuevo."
                );
            } else if (code === "auth/invalid-email") {
                Alert.alert(
                    "Correo electrónico inválido",
                    "El correo electrónico ingresado no es válido. Por favor, ingrese un correo electrónico válido."
                );
            } else if (code === "auth/invalid-credential") {
                Alert.alert(
                    "Correo o contraseña incorrectos.",
                    "Las credenciales proporcionadas no son válidas. Por favor, inténtelo de nuevo."
                );
            } else {
                Alert.alert(
                    "Error de inicio de sesión",
                    "Ocurrió un error al iniciar sesión. Por favor, inténtelo de nuevo más tarde."
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
            <Pressable onPress={() => router.push('/Forgotpassword')}>
                <Text style={styles.password}>
                    ¿Did you forget your password?
                </Text>
            </Pressable>

            <Pressable
                style={styles.button}
                onPress={loginUsuario}
            >

                <Text style={styles.buttonText}>
                    Log in
                </Text>

            </Pressable>

            <Pressable onPress={() => router.push('/registro')}>
                <Text style={styles.login}>¿You don't have an account yet?</Text>
            </Pressable>



        </View>
    );
};