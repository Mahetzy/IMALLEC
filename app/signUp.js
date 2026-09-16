import { Text, View, Image, TextInput, Pressable, Alert, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { styles } from "../Styles/signUp.style";
import Svg, { Path } from 'react-native-svg';
import { router } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";

export default function signUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const { width: windowWidth } = useWindowDimensions();
    const isLargeScreen = windowWidth > 768;
    const isMediunScreen = windowWidth > 600 && windowWidth < 768;


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
                        onPress: () => router.push('/logIn'),
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

        <SafeAreaView style={styles.mainContainer}>
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
                <Svg height="2700" width="150%" viewBox=" -4 -50 60 1050" preserveAspectRatio="none">
                    <Path
                        d="M -1,-100 C 0,350 200,110 -40,510 Z"
                        fill="#00162F"
                        opacity="1"
                    />
                </Svg>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={require("../assets/IMALLEC.png.png")}
                    style={[styles.logo, { width: isLargeScreen ? '120%' : '60%', marginLeft: isLargeScreen ? '70%' : '55%', height: isLargeScreen ? 110 : (isMediunScreen ? 90 : 90) }]}
                />

                <Text style={[styles.title, { fontSize: isLargeScreen ? 130 : (isMediunScreen ? 100 : 75) }]}>
                    Sign up
                </Text>


                <View style={[styles.inputContainer, { height: isLargeScreen ? 75 : (isMediunScreen ? 65 : 55), marginBottom: isLargeScreen ? 35 : 15 }]}>
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



                <View style={[styles.inputContainer, { height: isLargeScreen ? 75 : (isMediunScreen ? 65 : 55), marginBottom: isLargeScreen ? 35 : 15 }]}>
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


                <View style={[styles.inputContainer, { height: isLargeScreen ? 75 : (isMediunScreen ? 65 : 55), marginBottom: isLargeScreen ? 35 : 15 }]}>
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

                <View style={[styles.inputContainer, { height: isLargeScreen ? 75 :(isMediunScreen ? 65 : 55), marginBottom: isLargeScreen ? 50 : 15 }]}>
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
                <View style={[styles.termsRow, { marginLeft: isLargeScreen ? 155 :(isMediunScreen ? 70 : 15) }]}>
                    <Pressable
                        style={[styles.checkbox, isChecked && styles.checkboxChecked]}
                        onPress={() => setIsChecked(!isChecked)}
                    >
                        {isChecked && <Ionicons name="checkmark" size={20} color="#FFF" />}
                    </Pressable>

                    <Text style={[styles.label, { fontSize: isLargeScreen ? 25 :(isMediunScreen ? 20 : 15) }]}>I accept the </Text>

                    <Pressable onPress={() => router.push('/termsAndConditions')}>
                        <Text style={[styles.linkText, { fontSize: isLargeScreen ? 25 : (isMediunScreen ? 20 : 15) }]}>Terms and Conditions</Text>
                    </Pressable>
                </View>


                <Pressable
                    style={[styles.button, { height: isLargeScreen ? 75 :(isMediunScreen ? 60 : 55) }]}
                    onPress={signUpUsuario}
                >

                    <Text style={[styles.buttonText, { fontSize: isLargeScreen ? 30 :(isMediunScreen ? 25 : 20) }]}>
                        Sign up
                    </Text>

                </Pressable>

                <Text style={[styles.subtitle, { fontSize: isLargeScreen ? 35 :(isMediunScreen ? 20 : 15) }]}>
                    ¿Do you have an account?
                </Text>

                <Pressable onPress={() => router.push('/logIn')}>
                    <Text style={[styles.login, { fontSize: isLargeScreen ? 35 :(isMediunScreen ? 20 : 15) }]}>
                        log in
                    </Text>
                </Pressable>


            </ScrollView>

        </SafeAreaView>
    );
};