import { Text, View, Image, TextInput, Pressable, Alert, StyleSheet, } from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { styles } from "./registro.style";
import Svg, { Path } from 'react-native-svg';
import { router } from 'expo-router'; 

export const Registro = () => {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");


    const registrarUsuario = async () => {

        if (!name || !lastName || !password2 || !email || !password) {

            Alert.alert(
                "Campos incompletos",
                "Complete todos los campos."
            );

            return;
        }

        if (password !== password2) {
            Alert.alert(
                "Contraseñas distintas",
                "Las contraseñas deben coincidir."
            );
            return;
        }

        if (password.length < 6) {

            Alert.alert(
                "Contraseña inválida",
                "La contraseña debe tener al menos 6 caracteres."
            );

            return;
        }

        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;

            await setDoc(
                doc(db, "Usuarios", user.uid),
                {
                    nombre: name,
                    apellido: lastName,
                    correo: email,
                    uid: user.uid
                }
            );

            Alert.alert(
                "Registro exitoso",
                "La cuenta se creó correctamente."
            );

            setName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setPassword2("");

        } catch (error) {

            const code = error?.code ?? "";

            if (code === "auth/email-already-in-use") {

                Alert.alert(
                    "Correo existente",
                    "Este correo ya está registrado."
                );

            } else if (code === "auth/invalid-email") {

                Alert.alert(
                    "Correo inválido",
                    "Ingrese un correo electrónico válido."
                );

            } else if (code === "auth/weak-password") {

                Alert.alert(
                    "Contraseña débil",
                    "La contraseña debe tener al menos 6 caracteres."
                );

            } else {

                Alert.alert(
                    "Error",
                    "No se pudo crear la cuenta."
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
                Sing up
            </Text>


            <TextInput
                style={styles.input}
                placeholder="User"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Last name"
                value={lastName}
                onChangeText={setLastName}
            />

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

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={true}
                value={password2}
                onChangeText={setPassword2}
            />


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