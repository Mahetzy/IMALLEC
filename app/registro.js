import { Text, View, Image, TextInput, Pressable, Alert, StyleSheet, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { styles } from "../Styles/registro.style";
import Svg, { Path } from 'react-native-svg';
import { router } from 'expo-router';

export default function Registro() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");


    const registrarUsuario = async () => {

        // Validar campos vacíos
        if (!name || !password2 || !email || !password) {

            Alert.alert(
                "Campos incompletos",
                "Complete todos los campos."
            );

            return;
        }


        // Validar contraseña
        if (password.length < 6) {

            Alert.alert(
                "Contraseña inválida",
                "La contraseña debe tener al menos 6 caracteres."
            );

            return;
        }


        try {

            // Crear usuario en Firebase Authentication
            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user = userCredential.user;


            // Guardar información en Firestore
            await setDoc(
                doc(db, "Usuarios", user.uid),
                {
                    nombre: name,
                    correo: email,
                    uid: user.uid
                }
            );


            Alert.alert(
                "Registro exitoso",
                "La cuenta se creó correctamente."
            );


            // Limpiar formulario
            setName("");
            setEmail("");
            setPassword("");
            setPassword2("");


        } catch (error) {

            console.log(error);


            if (error.code === "auth/email-already-in-use") {

                Alert.alert(
                    "Correo existente",
                    "Este correo ya está registrado."
                );

            } else if (error.code === "auth/invalid-email") {

                Alert.alert(
                    "Correo inválido",
                    "Ingrese un correo electrónico válido."
                );

            } else if (error.code === "auth/weak-password") {

                Alert.alert(
                    "Contraseña débil",
                    "La contraseña debe tener al menos 6 caracteres."
                );

            } else {

                Alert.alert(
                    "Error",
                    "No se pudo crear la cuenta.",
                    console.log(error.code)
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
                Sign up
            </Text>


            <View style={styles.inputContainer}>
                <Ionicons
                    name="person-outline"
                    size={25}
                    color="#A0A0A0"
                    style={styles.icon}
                />

                <TextInput
                    style={styles.input}
                    placeholder="User"
                    value={name}
                    onChangeText={setName}
                />

            </View>



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

            <View style={styles.inputContainer}>
                <Ionicons
                    name="lock-closed"
                    size={25}
                    color="#A0A0A0"
                    style={styles.icon}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    value={password2}
                    onChangeText={setPassword2}
                />
            </View>


            <Pressable
                style={styles.button}
                onPress={registrarUsuario}
            >

                <Text style={styles.buttonText}>
                    Sing up
                </Text>

            </Pressable>

            <Text style={styles.subtitle}>
                ¿Do you have an account?
            </Text>

            <Pressable onPress={() => router.push('/login')}>
                <Text style={styles.login}>
                    log in
                </Text>
            </Pressable>



        </View>
    );
};