import { Text, View, Image, TextInput, Pressable, Alert, StyleSheet, } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { styles } from "./login.style";
import Svg, { Path } from 'react-native-svg';
import { router } from 'expo-router'; 

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

        } catch (error) {
            const code = error?.code ?? "";

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


            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />


            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <Pressable
                style={styles.button}
                onPress={loginUsuario}
            >

                <Text style={styles.buttonText}>
                    Log in
                </Text>

            </Pressable>

            <Text style={styles.subtitle}>
                ¿You don't have an account yet?
            </Text>

            <Pressable onPress={() => router.push('/registro.js')}>
                <Text style={styles.login}>
                    Sign up
                </Text>
            </Pressable>

        

        </View>
    );
};