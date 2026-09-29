import { Text, View, Pressable, useWindowDimensions, Alert } from "react-native";
import { styles } from "../Styles/confirmacionBloqueo.style";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { getUser } from "../utils/storage";
import { useEffect, useState } from "react";

export default function BlockWallet() {
    const router = useRouter();
    const { width: windowWidth } = useWindowDimensions();
    const isLargeScreen = windowWidth > 768;
    const isMediunScreen = windowWidth > 600 && windowWidth < 768;

    const [user, setUser] = useState(null);
    const [walletDoc, setWalletDoc] = useState(null);
    const [loading, setLoading] = useState(true);

   
    const currentlyBlocked = walletDoc?.blocked === true;

    useEffect(() => {
        const getWalletState = async () => {
            try {
                const savedUser = await getUser();

                if (!auth.currentUser || !savedUser?.walletId) {
                    Alert.alert("Error", "Log in and link your wallet first.");
                    router.back();
                    return;
                }

                setUser(savedUser);

                const walletSnap = await getDoc(doc(db, "Billeteras", savedUser.walletId));

                if (!walletSnap.exists()) {
                    Alert.alert("Error", "Wallet not found");
                    router.back();
                    return;
                }

                setWalletDoc(walletSnap.data());
            } catch (error) {
                console.error("Error loading user or walletDoc:", error);
                Alert.alert("Error", "No se pudo cargar la información de la billetera.");
            } finally {
                setLoading(false);
            }
        };

        getWalletState();
    }, []);

    const handleConfirm = async () => {
        try {
            if (!user || !walletDoc) {
                Alert.alert("Loading...", "Currently loading, please wait a moment.");
                return;
            }

            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (!hasHardware || !isEnrolled) {
                Alert.alert(
                    "Authentication not available",
                    "Configure your fingerprint, face ID, PIN or pattern first."
                );
                return;
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: currentlyBlocked
                    ? "Confirm to unlock your wallet"
                    : "Confirm to lock your wallet",
                disableDeviceFallback: false,
            });

            if (!result.success) {
                return;
            }

            const nextBlocked = !currentlyBlocked;

            await updateDoc(doc(db, "Billeteras", user.walletId), {
                blocked: nextBlocked,
            });

            setWalletDoc((current) => ({ ...current, blocked: nextBlocked }));

            Alert.alert(
                nextBlocked ? "Wallet locked" : "Wallet unlocked",
                nextBlocked
                    ? "The wallet was locked successfully."
                    : "The wallet was unlocked successfully."
            );

            router.replace('/mainScreen');
        } catch (error) {
            console.error("Error al actualizar el estado de bloqueo:", error);
            Alert.alert("Error", "No se pudo actualizar el estado de la billetera.");
        }
    };

    if (loading) {
        return null; 
    }

    return (
        <View style={styles.mainContainer}>
            <View style={[styles.walletCard, { height: isLargeScreen ? '90%' : '80%', width: isLargeScreen ? "96%" : "95%" }]}>
                <Ionicons
                    name="warning-outline"
                    size={isLargeScreen ? 300 : isMediunScreen ? 250 : 200}
                    color="#000000"
                    style={[styles.icon, { marginLeft: isLargeScreen ? '30%' : '25%' }]}
                />
                <Text style={[styles.title, { fontSize: isLargeScreen ? 60 : isMediunScreen ? 30 : 20 }]}>
                    Are you sure you want to {currentlyBlocked ? 'unlock' : 'lock'} the wallet?
                </Text>
                <Text style={[styles.subtitle, { fontSize: isLargeScreen ? 30 : isMediunScreen ? 20 : 15 }]}>
                    This action will {currentlyBlocked ? 'unlock' : 'lock'} your wallet{currentlyBlocked ? '' : ' and you won’t be able to use it until you unlock it'}
                </Text>

                <Pressable
                    style={{
                        backgroundColor: "#003673",
                        paddingVertical: 45,
                        paddingHorizontal: 33,
                        borderRadius: 15,
                        margin: 10,
                        width: "38%",
                        height: "22%",
                        marginTop: isLargeScreen ? 100 : 30
                    }}
                    onPress={() => router.push('/mainScreen')}
                >
                    <Text style={{ color: "white", fontSize: isLargeScreen ? 60 : isMediunScreen ? 30 : 20, fontWeight: "bold", textAlign: "center" }}>
                        No
                    </Text>
                </Pressable>

                <Pressable
                    style={{
                        backgroundColor: "#000000",
                        paddingVertical: 45,
                        paddingHorizontal: 33,
                        borderRadius: 15,
                        margin: 10,
                        width: "38%",
                        height: "22%",
                        marginLeft: "60%",
                        marginTop: isLargeScreen ? -220 : isMediunScreen ? -145 : -130,
                    }}
                    onPress={handleConfirm}
                >
                    <Text style={{ color: "white", fontSize: isLargeScreen ? 60 : isMediunScreen ? 30 : 20, fontWeight: "bold", textAlign: "center" }}>
                        Yes
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}