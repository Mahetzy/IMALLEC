import { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    Pressable,
    useWindowDimensions,
    ScrollView

} from 'react-native';
import { styles } from '../Styles/walletVinculation.style.js';
import { useRouter } from "expo-router";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { getUser, saveUser, saveWallet } from "../utils/storage.js";
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function WalletVinculation() {
    const router = useRouter();

    const { width: windowWidth } = useWindowDimensions();
    const isLargeScreen = windowWidth > 768;
    const [walletId, setWalletId] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const savedUser = await getUser();
                if (!savedUser || savedUser === null) {
                    router.push('/logIn');
                    return;
                }
                setUser(savedUser);
            } catch (error) {
                console.error("Error loading user:", error);
            }
        };

        loadUser();
    }, []);

    const handleLinkWallet = async () => {
        if (!walletId) {
            Alert.alert("Error", "Please enter a wallet ID");
            return;
        }

        try {
            const userRef = doc(db, "Usuarios", user.uid);
            const walletRef = doc(db, "Billeteras", walletId);
            const walletSnap = await getDoc(walletRef);
            const userSnap = await getDoc(userRef);

            if (!walletSnap.exists()) {
                Alert.alert("Error", "Wallet not found");
                return;
            }

            const userData = {
                ...user,
                walletId,
            };

            await updateDoc(userRef, {
                walletId: walletId,
            });
            await updateDoc(walletRef, {
                userId: user.uid,
                walletLinked: true,
            });

            const walletData = walletSnap.exists() ? walletSnap.data() : null;
            await saveWallet(walletData);

            await saveUser(userData);

            if (walletData !== null) {
                if (!walletData.verificationMethod || walletData.verificationMethod === null) {
                    router.push('/walletActivation');
                } else {
                    router.push('/mainScreen');
                }
                Alert.alert("Success", "Wallet linked successfully");
            } else {
                return Alert.alert("Error", "Wallet not found");
            }
        } catch (error) {
            console.error("Error linking wallet:", error);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContainer,
                    { flexGrow: 1, justifyContent: 'flex-start' }
                ]}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={require("../assets/IMALLEC.png.png")}
                    style={[styles.logo, { width: isLargeScreen ? 175 : 140, height: isLargeScreen ? 175 : 140, marginBottom: isLargeScreen ? -10 : 20, marginTop: isLargeScreen ? -40 : -55 }]}
                />

                <Text style={[styles.title, { fontSize: isLargeScreen ? 75 : 40 }]}>
                    Wallet Vinculation
                </Text>

                <Image
                    source={require('../assets/WalletVinculation.png')}
                    style={[styles.image, { width: isLargeScreen ? 575 : 340, height: isLargeScreen ? 675 : 440 }]}
                />

                <Text style={[styles.description, { fontSize: isLargeScreen ? 25 : 16 }]}>
                    Enter your wallet ID to link it.
                </Text>

                <View style={styles.form}>

                    <Text style={styles.label}>
                        Wallet ID
                    </Text>

                    <View style={styles.inputContainer}>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter your linking token"
                            placeholderTextColor="#999999"
                            value={walletId}
                            onChangeText={setWalletId}
                        />
                    </View>

                    <Pressable
                        style={styles.button}
                        onPress={handleLinkWallet}
                    >

                        <Text style={styles.buttonText}>
                            Link Wallet
                        </Text>

                    </Pressable>

                </View>
            </ScrollView>

        </SafeAreaView>
    );
}