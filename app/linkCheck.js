import { Text, View, Image } from "react-native";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { styles } from "../Styles/linkCheck.style.js";
import { useRouter } from "expo-router";
import { ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { getUser, saveWallet } from "../utils/storage.js";




export default function LinkCheck() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const savedUser = await getUser();
                setUser(savedUser);
            } catch (error) {
                console.error("Error loading user:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    useEffect(() => {
        const checkWalletLink = async () => {
            if (isLoading) {
                return;
            }

            if (!user) {
                router.replace('/logIn');
                return;
            };

            if (!user.walletId) {
                router.replace('/walletVinculation');
                return;
            };

            const walletSnap = await getDoc(doc(db, "Billeteras", user.walletId));
            const walletData = walletSnap.exists() ? walletSnap.data() : null;
            
            if (walletSnap.exists()) {
                await saveWallet(walletData);
                router.replace('/mainScreen');
            } else {
                router.replace('/walletVinculation');
            }
        };

        checkWalletLink();
    }, [isLoading, user]);


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
