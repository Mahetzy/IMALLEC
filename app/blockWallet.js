import { Text, View, Pressable, useWindowDimensions, Alert } from "react-native";
import { styles } from "../Styles/confirmacionBloqueo.style";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { getUser } from "../utils/storage";
import { useEffect, useState } from "react";

export default function blockWallet() {
    const router = useRouter();
    const { width: windowWidth } = useWindowDimensions();
    const isLargeScreen = windowWidth > 768;
    const [walletDoc, setWalletDoc] = useState(null)
    const [mainAlertText, setMainAlertText] = useState("Are you sure you want to lock the wallet?")
    const [warningText, setWarningText] = useState("This action will lock your wallet and you won't be able to use it until you unlock it")
    const [user, setUser] = useState(null)
    const isMediunScreen = windowWidth > 600 && windowWidth < 768;


    useEffect(() => {
        const getWalletState = async () => {
            try {
                const user = await getUser();
                setUser(user)

                if (!auth.currentUser || !user?.walletId) {
                    Alert.alert("Error", "Log in and link your wallet first.");
                    return;
                }

                const walletSnap = await getDoc(doc(db, "Billeteras", user.walletId));

                if (!walletSnap.exists()) {
                    Alert.alert("Error", "Wallet not found");
                    return;
                }

                const walletData = walletSnap.data();
                setWalletDoc(walletData);

                if (walletData.locked === true) {
                    setMainAlertText("Are you sure you want to unlock the wallet?");
                    setWarningText("This action will unlock your wallet and make it unsecure as long as it is unlocked");
                }
            } catch (error) {
                console.error("Error loading user or walletDoc:", error)
            }

        };

        getWalletState();
    }, []);

    const handleLockWallet = async () => {
        try {
            if (!user || !walletDoc) {
                Alert.alert("Loading...", "Currently loading lease wait a moment")
                return;
            }

            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (!hasHardware || !isEnrolled) {
                Alert.alert(
                    "Authentication not avaliable",
                    "Configure you fingerprint, face ID, PIN or pattern first"
                );
                return;
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Confirm to unlock your wallet",
                disableDeviceFallback: false,
            });

            if (!result.success) {
                return;
            }

            const nextLocked = walletDoc.locked !== true;

            await updateDoc(doc(db, "Billeteras", user.walletId), {
                locked: nextLocked,
            });

            setWalletDoc((current) => ({ ...current, locked: nextLocked }));

            Alert.alert(
                nextLocked ? "Wallet locked" : "Wallet unlocked",
                nextLocked
                    ? "The wallet was locked successfully."
                    : "The wallet was unlocked successfully."
            );

            router.replace('/mainScreen')
        } catch (error) {
            console.error("Error al bloquear la billetera:", error);
            Alert.alert("Error", "No se pudo bloquear la billetera.");
        }
    };


    return (
        <View style={styles.mainContainer}>
            <View style={[styles.walletCard, { height: isLargeScreen ? '90%' : '80%', width : isLargeScreen ? "96%" : "95%", }]}>
                <Ionicons
                    name="warning-outline"
                    size={isLargeScreen ? 300 : isMediunScreen ? 250 : 200}
                    color="#000000"
                    style={[styles.icon, { marginLeft: isLargeScreen ? '30%' : '25%' }]}
                />
                <Text style={[styles.title, { fontSize: isLargeScreen ? 60 : isMediunScreen ? 30 : 20 }]}>
                    {mainAlertText}
                </Text>
                <Text style={[styles.subtitle, { fontSize: isLargeScreen ? 30 : isMediunScreen ? 20 : 15 }]}>
                    {warningText}
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
                    onPress={() => router.replace('/mainScreen')}
                >
                    <Text style={{ color: "white", fontSize: isLargeScreen ? 60 : isMediunScreen ? 30 : 20, fontWeight: "bold", paddingHorizontal: isLargeScreen ? 65 : isMediunScreen ? 50 : 20, paddingVertical: isLargeScreen ? 20 : isMediunScreen ? 5 : "-10%", }}>
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
                    onPress={handleLockWallet}
                >
                    <Text style={{ color: "white", fontSize: isLargeScreen ? 60 : isMediunScreen ? 30 : 20, fontWeight: "bold", paddingHorizontal: isLargeScreen ? 60 : isMediunScreen ? 48 : 20, paddingVertical: isLargeScreen ? 20 : isMediunScreen ? 5 : 2, }}>
                        Yes
                    </Text>
                </Pressable>
            </View>
        </View>

    );
};
