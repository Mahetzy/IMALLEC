import { Text, View, Image, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config.js";
import { styles } from "../Styles/linkCheck.style.js";
import Svg, { Path } from 'react-native-svg';
import { useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { getUser, saveWallet } from "../utils/storage.js";




export default function LinkCheck() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const savedUser = await getUser();
                setUser(savedUser);
            } catch (error) {
                console.error("Error loading user:", error);
            }
        };

        loadUser();
    }, []);

    useEffect(() => {
        const checkWalletLink = async () => {
            if (!user) {
                return;
            };

            if (!user.walletId) {
                router.replace('/walletVinculation');
            };

            const walletSnap = await getDoc(doc(db, "Billeteras", user.walletId));

            if (walletSnap.exists()) {
                await saveWallet(user.walletId);
                router.replace('/home');
            } else {
                router.replace('/walletVinculation');
            }
        };

        checkWalletLink();
    }, [user]);

    checkWalletLink();

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
