import {Text,View,Image,TextInput,Pressable,Alert} from "react-native";
import { useState } from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {doc,setDoc} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { styles } from "./registro.style";


export const Registro = () => {

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const registrarUsuario = async () => {

        // Validar campos vacíos
        if (!name || !lastname || !email || !password) {

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
                    apellido: lastname,
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
            setLastname("");
            setEmail("");
            setPassword("");


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
                    "No se pudo crear la cuenta."
                );
            }
        }
    };


    return (

        <View style={styles.container}>

            <Image
                source={require("../assets/superate.png")}
                style={styles.logo}
            />


            <Text style={styles.title}>
                Crear una cuenta
            </Text>


            <Text style={styles.subtitle}>
                Completa tus datos para registrarte
            </Text>


            <Text style={styles.label}>
                Nombre
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Ingrese su nombre"
                value={name}
                onChangeText={setName}
            />


            <Text style={styles.label}>
                Apellido
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Ingrese su apellido"
                value={lastname}
                onChangeText={setLastname}
            />


            <Text style={styles.label}>
                Correo electrónico
            </Text>

            <TextInput
                style={styles.input}
                placeholder="ejemplo@correo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />


            <Text style={styles.label}>
                Contraseña
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Ingrese su contraseña"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />


            <Pressable
                style={styles.button}
                onPress={registrarUsuario}
            >

                <Text style={styles.buttonText}>
                    Registrarse
                </Text>

            </Pressable>

        </View>
    );
};