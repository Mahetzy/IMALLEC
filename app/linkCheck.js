import { Text, View, Image, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config.js";
import { styles } from "../Styles/linkCheck.style.js";
import Svg, { Path } from 'react-native-svg';
import { useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';




export default function Login() {
    const router = useRouter();



    useEffect(() => {

        const timer = setTimeout(() => {
            router.replace('/walletVinculation');
        }, 5000);

        return () => clearTimeout(timer);
    }, []);
    return (

        <View style={styles.container}>

            <Image
                source={require("../assets/IMALLEC.png.png")}
                style={styles.logo}
            />

            <Text style={styles.title}>
                Checking connection.
            </Text>

            <View style={styles.icon}>
                <ActivityIndicator size={300} color="#ffffff" />
            </View>


            <Text style={styles.subtitle}>
                We're Checking if your wallet is linked
            </Text>


        </View>
    );
};
