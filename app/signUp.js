import { Text, View, Image, TextInput, Pressable, Alert, StyleSheet, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { styles } from "../Styles/signUp.style";
import Svg, { Path } from 'react-native-svg';
import { router } from 'expo-router';

export default function signUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [isChecked, setIsChecked] = useState(false);


    const signUpUsuario = async () => {

        // Validar campos vacíos
        if (!name || !password2 || !email || !password) {

            Alert.alert(
                "Incomplete fields",
                "Fill in all the fields."
            );

            return;
        }





        // Validar contraseña
        if (password.length < 6) {

            Alert.alert(
                "Invalid password",
                "The password must have at least 6 characters."
            );

            return;
        }

        if (password !== password2) {
            Alert.alert(
                "Password mismatch",
                "The passwords do not match."
            );

            return;
        }

        if (!isChecked) {
            Alert.alert(
                "Terms and Conditions",
                "You must accept the terms and conditions to continue."
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
                    correo: email,
                    uid: user.uid,
                    Password: password,
                    walletId: null
                }
            );

            // Limpiar formulario
            setName("");
            setEmail("");
            setPassword("");
            setPassword2("");

            Alert.alert(
                "Successful registration",
                "The account was created successfully.",
                [
                    {
                        text: "OK",
                        onPress: () => router.push('/linkCheck'),
                    }
                ]
            );


        } catch (error) {

            console.log(error);


            if (error.code === "auth/email-already-in-use") {

                Alert.alert(
                    "Existing email",
                    "This email is already registered."
                );

            } else if (error.code === "auth/invalid-email") {

                Alert.alert(
                    "Invalid email",
                    "Please enter a valid email address."
                );

            } else if (error.code === "auth/weak-password") {

                Alert.alert(
                    "Weak password",
                    "The password must have at least 6 characters."
                );

            } else {

                Alert.alert(
                    "Error",
                    "Failed to create account.",
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
            <View style={styles.termsRow}>
                <Pressable
                    style={[styles.checkbox, isChecked && styles.checkboxChecked]}
                    onPress={() => setIsChecked(!isChecked)}
                >
                    {isChecked && <Ionicons name="checkmark" size={14} color="#FFF" />}
                </Pressable>

                <Text style={styles.label}>I accept the </Text>

                <Pressable onPress={() => router.push('/terminosAndConditions')}>
                    <Text style={styles.linkText}>Terms and Conditions</Text>
                </Pressable>
            </View>


            <Pressable
                style={styles.button}
                onPress={signUpUsuario}
            >

                <Text style={styles.buttonText}>
                    Sign up
                </Text>

            </Pressable>

            <Text style={styles.subtitle}>
                ¿Do you have an account?
            </Text>

            <Pressable onPress={() => router.push('/logIn')}>
                <Text style={styles.login}>
                    log in
                </Text>
            </Pressable>



        </View>
    );
};